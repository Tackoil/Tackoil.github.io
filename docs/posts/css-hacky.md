---
title: 一些奇怪的CSS方法
date: 2022-07-09 16:47:02
categories: [学习]
headpic: /headpics/komisan-anime.png
desp: 实习期间遇到了一些页面上的需求，虽然这些需求可能也没有那么重要，但还是希望越接近设计稿越好。毕竟设计稿的效果看着真不错，还是由衷希望这些效果也能在页面上呈现出来。计划在这里整理一些不太好实现的样式，以做记录，~~也希望以后回来看看的时候能吐槽下这实现的是什么鬼东西~~。
index_img: /img/bg/komisan-anime.png
---

实习期间遇到了一些页面上的需求，虽然这些需求可能也没有那么重要，但还是希望越接近设计稿越好。毕竟设计稿的效果看着真不错，还是由衷希望这些效果也能在页面上呈现出来。计划在这里整理一些不太好实现的样式，以做记录，~~也希望以后回来看看的时候能吐槽下这实现的是什么鬼东西~~。

# 布局

## 非边缘的滚动条

这里是指滚动条没有位于卡片的最边缘，而是左右两侧都有一定的空白。如果两侧的空白完全相等的话，确实看起来效果会更好。不过通常来讲，应该不会有人在意滚动条的位置。

实现也很简单（或者说过于简单）。只需要在右侧同时加上`margin`和`padding`就可以了。可以发现，在盒模型中，scrollbar是出现在border里面的。

```CSS
.scroller-demo__container {
    margin-right: 4px;
    padding-right: 4px;
    overflow-y: auto;
}
```

<div id="scroller-demo" class="scroller-demo">
    <div class="scroller-demo__container">
        <div class="scroller-demo__content">
            rolling girl 🎵
        </div>
    </div>
</div>

<style>
.scroller-demo {
    width: 100%;
    height: 200px;
    margin-bottom: 12px;
    border: 2px #66CCFF solid;
}

.scroller-demo__container {
    margin-left: 24px;
    margin-right: 4px;
    padding-right: 4px;
    height: 100%;
    overflow-y: auto;
    border: 0px #F00 solid;
    transition: border-width 1s;
}

.scroller-demo__container:hover {
    border-width: 2px;
}

.scroller-demo__container::-webkit-scrollbar {
    width: 16px;
}

.scroller-demo__container::-webkit-scrollbar-thumb {
    background: #66CCFFAA;
    border-radius: 16px;
}

.scroller-demo__content {
    padding: 12px;
    height: 1000px;
    background: #66CCFF;
    color: #FFF;
}


</style>

# 样式

## 毛玻璃

虽说这个博客主题中header部分就有毛玻璃效果，但一直没有关注过这个的实现方式（甚至以为需要用JS），但实际上CSS就可以实现。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter

```CSS
.filter-demo {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
}
```

需要特殊注意的是，这个元素一定要有一点透明，否则这个元素就会完全挡住背景，也就完全看不到被高斯模糊的背景了。效果还是不错的，但如果有动画的话，可能会遇到一个小问题。

<div id="filter-demo" class="filter-demo">
    <div class="filter-demo__background">
        <div class="filter-demo__container">
            <div class="filter-demo__glasscard"></div>
        </div>
    </div>
</div>

<style>
.filter-demo {
    width: 100%;
    height: 200px;
    margin-bottom: 12px;
}

.filter-demo__background {
    background-image: url("https://tackoil.github.io/img/bg/natsumi23.jpg");
    background-size: cover;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter-demo__container {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 100%;
    border: 2px #66CCFF solid;
    width: 100px;
    height: 80px;
    transition: opacity 1s;
}

.filter-demo__glasscard {
    width: 90px;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
}

.filter-demo:hover .filter-demo__container {
    opacity: 0;
}
</style>


可以发现当黑色方块的透明度恢复到100%时，模糊效果才出现。这是由于`opacity` 和`backdrop-filter` 不在同一个元素上导致的，所以使用时需要多留意。
