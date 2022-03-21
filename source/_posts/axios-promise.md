---
title: Axios 中关于 Promise 的使用与理解
date: 2022-03-19 14:37:05
categories: [学习, JavaScript]
mermaid: true
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

## Axios 中的拦截器

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
3. 将拦截器列表中的元素两个一组，放入 [`then`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 中，并将返回的新 `Promise` 替代原始的 `Promise`。
4. 返回最终得到的 `Promise` 链。

将上述 Promise 链具体化，如下图所示。

![Promise 链](./promise-chain.jpg)

> 您可能发现了，这里面**请求拦截器**的 `onRejected` 好像有些诡异。是的，笔者也是写到这里才发现这个问题，现已提交 [issue](https://github.com/axios/axios/issues/4537)。

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

Promise 链中所有在主请求前的 Promise 传递修改 config，在主请求后的 Promise 传递并修改 response。这样就完成了对请求和响应的拦截。那么 `Promise.resolve()` 与 `Promise.prototype.then()` 是如何实现这个可以把同步请求也包装进 Promise 链的功能的？

## Promise.resolve()

参考 MDN 中关于 `Promise.resolve()` 的描述，可以发现其作用就是返回一个新的 `Promise`。但根据入参的类型不同行为有一定区别。
1. 如果是另一个 `Promise`，则返回这个 `Promise`
2. 如果是一个含有 `then` 方法的对象，则会尝试执行该 `then` 方法，根据执行结果返回对应状态的 `Promise`。（类似于`new Promise(then)`）**这里会递归执行所有嵌套的 `then`，直到 `fuilfilled` 或者 `rejected`**。
3. 其他情况则返回一个新的 `Promise` ，并且这个 `Promise` 将处于 `fulfilled` 状态，`fulfilled` 值为入参。

可以发现这个函数非常适合将一个对象包装成 Promise，并作为 Promise 链的开头使用。

如果对上述描述还有困惑的话，可以参考下面的简易 Polyfill。~~（不过都有 `Promise` 了，还能没有 `Promise.resolve()` 么）~~

```JavaScript
Promise.resolve = function(value){
  if(value instanceof Promise){
    return value; // 情况1，入参为 Promise，则直接返回该 Promise
  }
  if(value && typeof value.then === 'function'){
    return new Promise(value.then); // 情况2，入参对象含有 then 方法，则执行该 then 方法
  }
  return new Promise(function(resolve){
    resolve(value); // 情况3，返回 fulfilled 的 Promise
  })
}
```

对于这种含有 `then` 方法的对象，可以称之为 `thenable`。可以认为是一个 **弱化版** 的 `Promise`，但没有JavaScript解释器的 **微任务** 的保障。为了加深对 `thenable` 的印象，来看下面这个例子。

```JavaScript
var p_thenable = {
  then: function(resolve_outter){
    resolve_outter({
      then: function(resolve_middle){
        resolve_middle({
          then: function(resolve_inner){
            // throw Error("Rejected in Inner thenable.");
            resolve_inner("Fulfilled in Inner thenable.");
          }
        });
      }
    })
  }
}
var p_promise = Promise.resolve(p_thenable);
p_promise.then(function onFulfilled(value) {
  console.log("FULFILLED with:", value);
}, function onRejected(err){
  console.log("REJECTED with:", err);
})
```

在注释和取消注释 `throw` 语句之后，console 中分别输出以下内容。

```
FULFILLED with: Fulfilled in Inner thenable.
REJECTED with: Error: Rejected in Inner thenable.
```

如果根据上文给出的 Polyfill 理解 `Promise.resolve()` 的话，输出应该都是 `FULFILLED with: {then: function ...}`，因为只调用了两次 `then`，第三个对象应该会作为 `fulfilled` 的值传给 `value`。这就说明 `Promise.resolve()` 会尝试解析 `thenable` 的最终结果，并把最终结果包装成 `Promise` 进行返回。

因此如果使用 `thenable` 特性的时候，**不要将自身作为 `fulfilled` 的值**，否则解释器会死循环。（不过应该没有多人想用 `thenable` 吧。）

```JavaScript
let thenable = {
  then: (resolve, reject) => {
    resolve(thenable)
  }
}
Promise.resolve(thenable)  // Will lead to infinite recursion.
```

> PS: 其实尝试执行的话，发现上面 `Promise.resolve()` 的 Polyfill 也是正确的。可能是因为 `Promise` 构造函数在入参（执行器）执行过程中调用的 `resolve()` 与 `Promise.resolve()` 的功能相同。

## Promise.prototype.then()

如果使用过 Axios 的话，那对于 `Promise.prototype.then()` 应该不陌生了。其作为构建 `Promise` 链的胶水，传入两个函数分别处理**前一个** `Promise` 处于 `fulfilled` 或者 `rejected` 状态下的执行内容。然而正因为`then` **返回值**的特性，才使得其可以作为构建 `Promise` 链的胶水使用。

> 下文中的执行函数指的是 `onFulfilled` 或 `onRejected`。

1. 当执行函数返回一个值，则 `then` 函数返回一个 `fulfilled` 状态的 `Promise`，`fulfilled` 值为执行函数的返回值
2. 当执行函数不返回任何值，则 `then` 函数返回一个 `fulfilled` 状态的 `Promise`, `fulfilled` 值为 `undefined`
3. 当执行函数抛出一个错误，则 `then` 函数返回一个 `rejected` 状态的 `Promise`，`rejected` 值为该错误。
4. 当执行函数返回一个  `Promise`，则 `then` 函数返回该 `Promise`。

可以发现 `Promise.prototype.then()` 也有包装非 `Promise` 的作用。那么 `Promise.prototype.then()` 会和 `Promise.resolve()` 一样尝试处理 `thenable` 么？答案是会尝试处理 `thenable`。就不在下文举例说明啦。 

# Axios 中关于取消的实现



# Axios 中的浏览器 adapter


# Reference

> 其实写这篇文章的时候主要参考的是 [官方文档](https://axios-http.com/zh/docs/intro) 与 [MDN 文档](https://developer.mozilla.org/zh-CN/) 。下面列出来的主要是学习 Axios 源码时所参考的文章。

- [Axios 源码解析 - 掘金](https://juejin.cn/post/6844903824583294984)
