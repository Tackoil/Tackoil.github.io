---
title: 暑期实习2021
date: 2021-07-26 10:53:56
categories: 吐槽
---

　　又是由于各种原因，开始找今年暑假的实习，但好像按照套路应该叫在**暑假进行的日常实习**。虽说已经不是第一次找实习了，但毕竟和之前的实习方向完全不同，所以也算是再一次从头开始吧。先占坑，等时机合适了再补充完整。先放上面经供参考吧。

<!-- more -->

### 公司P - 一面

- TypeScript有用过么？
    - 确实没用过，虽然得到了消息临时抱佛脚看了看，不过面试官也没继续问下去。估计是怕被问的太惨吧。
- Material Design UI用过么？
    - 我用过的那个叫 [Material UI](https://material-ui.com/zh/)。感觉可能说的是一个东西吧。不过也没问，可能只是想介绍下公司的技术栈。
- 对 JavaScript 原型和继承的理解
    - blabla自己讲了一堆。面试官：好
- 那你有了解 this 的指向么？大概是什么原理。
    - 始终指向调用该函数的地方。
- 如何遍历一个对象所属的 keys 和遍历一个对象包括原型链上的 keys
    - 我说的用 [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 实现前者，后者想不起来了。（但实际上这个方法会获得原型链上的 keys，也就是后者）
- 但`Object.keys()`是新方法吧，如何用老版本的方法实现呢？
    - 面试官：`Object.prototype.hasOwnProperty()` (但我当时并没有看出哪里不对，现在想想这个方法也没法实现 `Object.keys()`。面试官可能想说的是如何实现前者吧。
- `__proto__` 和 `prototype` 的区别。
- 如何新建一个完全空的对象？如果直接写`{}`其实也是有`Object`的属性，那么如果获得一个没有`Object`属性的对象呢？
    - 我：我不太确定，我能想到的就只有`Object.create(null)`了。
    - 面试官：对，就是这个。应该也没别的方法了。
- babel有看过么？
    - 我：有看过几个实现。
    - 面试官：那你知道这个东西应该放在 AST 里还是 ployfill 里？~~（我：对不起我没看过）~~
- 介绍下ES6的新特性吧。就介绍下Promise吧。
    - blabla~
- 那么 catch 后面的 then 会执行么？（我：会的）
- 那么如何让 catch 后面的 then 不执行？（我：在catch里面throw和错误吧。）
- 如果我的 Promise 链是 `Promise.then().catch().then().catch()`。那么在前面的 catch 里面 throw 一个错误，后面的catch能收到么？（我：应该可以。）
- 那如果我的错误种类有很多，想放在一起处理，如何实现一个拦截器这样的东西呢？
    - 我：一顿胡言乱语
    - 后来看了一下 Axios 的实现，它在原始 Promise 上加了很多个then，然后返回最后一个then。
- 介绍下箭头函数吧。
- React Hooks 有用过吧，如何用 `useEffect()` 实现类组件的 `componentDidMounted()`
    - 我：在deps传空列表
- 这种操作和原始的 `componentDidMounted()` 有区别么？
    - 我：组件重渲染会重新绑定 hooks。如果 `useEffect()` 里回调函数是新建一个定时器，那就会重复新建很多个定时器。
- 我们都知道 `useEffect()` 只会获得绑定时的外部值，如何解决呢？
    - ~~（啥？还有这种情况）~~
    - 面试官：用 `useRefs()` 就可以了。
- 我们有时候会在 `componentDidMounted()` 里下埋点。那么用 `useEffect()` 的话，如何触发埋点呢？
    - 我：在回调函数里返回一个函数，这个函数会在 unmounted 时执行，可以在这里触发。
- 说说 `useEffect()` 里 `deps` 的作用吧。
    - blabla~
- 在 `deps` 里总能得到想要的结果么？
    - 我：不行，引用值不可以，比如Object中的属性修改就无法正常工作。
- 那如果要传 `Object` 的话，还想正常工作的话？
    - 我：复制一下就行了。比如 `Object.assign()`
    - 面试官：assign?
    - 我：（慌张）总之能换一个地址就行。（后来发现assign也可以做浅拷贝，应该是没问题的。）
- 那我的依赖如果是一个函数，那该怎么办。函数就没法轻易复制了吧。
    - 我：（思考）要不再写一个hook吧。
    - 面试官：你是说写一个hook，里面用useEffect？（
    - 我：对对对
    - 面试官：那有没有自带的 hook 可以使用呢？
    - 我：开始乱蒙
    - 面试官：`useMemo` `useCallback` 就可以。
- 那为什么 React hooks 一定要设计成只能获得绑定时的值呢？
    - 面试官在反问的时候说是函数式编程。
- class 和 function 组件有什么不同？你倾向于用哪个？
    - 倾向于用 function 吧。
- 为什么倾向于用 function
    - 这样就可以省去很多意义不明的 this
- CSS in JS 和 CSS 文件你更喜欢用哪种？为什么
    - 我回答了半天才理解 CSS in JS 是什么东西。
- 你了解我们公司么？（大概吧）
- 反问。

### 公司P - 二面

> 感觉这次面试就是面试官在努力找一面没问过的能问的问题。但发现好像并没有多少我会的问题。

- 项目里的权限管理用的 JWT 么？介绍一下。
- 那你介绍下 session 和 cookie 吧
- JWT的优势
- JWT都包含哪些信息
- 如何处理登录时的账号密码错误
- 如何处理没有权限的访问
- ES6 的新特性
- 箭头函数和普通函数的区别
- let 和 const 的作用，与之前的区别
- 生成器（没用过
- React Hooks 用过哪些
- 在哪里使用 useCallBack()
- useMemo() 可以起到控制更新的作用么
- 为什么 hooks 不能写在条件和循环里
- 列表生成为什么使用 keys
- React-router 用过么（用过 vue的
- Router-link的原理是什么
- 高阶组件
- Vue 响应式原理
- 用过状态管理器么？那你简单介绍下Redux吧
- reducer为什么是纯函数
- 如何在reducer里进行异步操作
- 用过TypeScript么？
- Type 和 interface
- 配置过webpack么？
- webpack是如何打包CSS
- 独立编写网页的能力怎么样
- 介绍下 CSS 的 flex 吧
- SSR了解么（不了解
- 如何计算一棵多叉树的高度
- 用过 docker 么

### 公司M - 一二混合面

- 介绍下自己
- 项目上的一点小问题
- CSS 水平垂直居中
- HTTP code
- HTTP 用过哪些方法，GET和POST的区别
- 如何判断一个Array
- 原型链
- null 和 undefined 的区别
    - null === undefined
    - null == undefined
- Promise
- React 的类组件和函数组件
- React 的hook用过哪些
- useEffect 如何实现生命周期钩子
- refs用过么？作用是什么
- 组件间传数据使用的什么？Props 介绍一下
- 写个展开（item只有数字和Array
- 如果想返回正序结果，怎么修改
    - 说说这里。我当时打算再写一个函数处理插入排序。因为觉得直接在最后的return用 `Array.prototype.sort()` 会不会太简单了。
- 你了解我们公司么？
- 反问