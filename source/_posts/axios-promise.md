---
title: Axios 中关于 Promise 的使用与理解
date: 2022-03-19 14:37:05
categories: [学习, JavaScript]
---

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

最近在看了 Axios 的源码。在已有 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的情况下，Axios 做了哪些改进吸引大家使用？抱着这样的想法尝试理解与阅读 Axios 仓库。

[Link: axios/axios](https://github.com/axios/axios)
![](https://opengraph.githubassets.com/ddb54613cedd4ca9c7c32776111dc36f7622b78611708ca86fa850b692919aec/axios/axios)

<!--more-->

# Axios 的基本组成

> 这里的**基本组成**是指 `lib` 文件夹下的内容。其他文件夹主要是用来存放示例文件、测试文件、开源相关说明文件等。

首先，观察目录结构。每个模块的作用可以通过文件夹的名字了解个大概。整个结构也非常整洁，还是很适合初学者（比如笔者）阅读的。
- `adapters/` 为提供 HTTP 请求的适配器。用以支持 node.js 与 浏览器发送 HTTP 请求。
- `cancel/` 负责实现请求取消的功能。包含了将要废除的 Cancel Token 模式的实现。
- `core/` 为核心内容，主要负责加载配置文件、处理拦截器、发送请求等功能。
- `defaults/` 存放一些默认的配置文件。
- `env/` 自动生成，主要用来标识版本。
- `helpers/` 各种各样的帮助文件，显然里面有一些功能已经成为 JavaScript 的内置功能了，交给 Babel 也未尝不可。
- `axios.js` 入口文件。除了暴露 API 以外，还有一小部分逻辑用来实现非实例化直接使用的功能。
- `utils.js` 一些小工具函数。感觉也有不少其实可以直接调用 JavaScript 的内置函数。主要还是减少工作环境的影响。

Axios 既然被称之为**基于Promise的网络请求库**，其对于 JavaScript 中 `Promise` 的理解也应该是非常透彻的。本文主要针对笔者所认为两处对 `Promise` 特性运用较为充分的两部分进行介绍，最后会顺带介绍一下浏览器的 `XMLHttpRequests` 是如何包装成 `Promise` 的。

在开始下文之前，还需要介绍一下 Axios 是通过 `config` 控制的。这个 `config` 除了 `url` 以外，还包含 `headers`、`proxy` 等其他配置。可以认为 Axios 实例如果传入相同的 `config`，就会执行完全一致的操作。

# Axios 中关于拦截器的实现

拦截器的作用是在**发送请求前**与**收到响应后**分别对请求与响应进行处理，从而实现一些便捷操作。例如 JWT 权限验证、响应数据的分析等。拦截器使用如下方式定义：

```JavaScript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config; // 一定要返回 config，很重要
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response; // 一定要返回 response，很重要
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

对照 `core/InterceptorManager.js`，可以发现还包含了一个 `options` 选项，为拦截器提供特殊功能。

```JavaScript
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({ // 存放拦截器的数组
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1; // 返回 index 以进行拦截器的移除
};
```

了解了这些，就可以仔细看看 Axios 是如何实现拦截器的。

首先，对请求拦截器与响应拦截器进行处理。判断是否包含异步拦截器、跳过部分拦截器。主要注意的是，请求拦截器中后绑定的放在队列的前面（`unshift`），响应拦截器则相反（`push`）。其中，Axios 默认所有请求拦截器都是**异步的**，即`interceptor.synchronous = false;`。

拦截器列表由偶数个函数构成，每**两个函数**一组。分别表示一个拦截器的执行函数与错误处理函数。类似于 [`Promise.prototype.then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 的入参。

```JavaScript
// core/Axios.js
  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) { // 过滤
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous; // 判断是否都为同步

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected); // 注意顺序：unshift
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected); // 注意顺序：push
  });
```

之后，Axios 针对异步请求拦截器与同步请求拦截器分情况进行了处理。其中如果所有请求拦截器都是同步的，则循环执行更新 `config` 即可。下面介绍包含异步的拦截器链进行介绍。

1. 把主请求（指除去拦截器以外的请求）与一个**空元素**放在列表中间。然后将请求拦截器列表放在前面，把响应拦截器列表放在后面。
2. 调用 [`Promise.resolve()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 函数，生成一个 `Promise` 对象。
3. 将拦截器列表中的元素两个一组，放入 then 中，并将返回的新 `Promise` 替代原始的 `Promise。`
4. 返回最终得到的 `Promise` 链。

```JavaScript
// core/Axios.js
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }
```


# Axios 中关于取消的实现

# Axios 中的浏览器 adapter


# Reference

> 其实写这篇文章的时候主要参考的是[官方文档](https://axios-http.com/zh/docs/intro)与[MDN 文档](https://developer.mozilla.org/zh-CN/)。下面列出来的主要是学习 Axios 源码时所参考的文章。

- [Axios 源码解析 - 掘金](https://juejin.cn/post/6844903824583294984)
