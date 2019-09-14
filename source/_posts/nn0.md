---
title: 人工神经网络的基本知识
date: 2019-09-12 16:03:42
categories: [机器学习]
mathjax: true
---

这个原本是通信网理论与应用这门课的一个调研型的大作业。（不过这个和通信网有什么关系）就当是笔者从零开始学习深度学习吧。

本篇BLOG含有大量的公式，用来阐明最基本的神经网络在优化问题的基本算法。此外根据查到的各种资料，本篇也会简单说明基于神经网络而发展的典型网络结构以及使用这些网络结构的领域。虽说含有大量的公式，不过用到的原理也只是最基本的高等数学。为了比较美观的展现公式和算法，还会使用一些基本的线性代数运算。

不过，毕竟初来乍到，可能有很多漏洞和疏忽之处，恳请理解指正。

<!-- more -->

<p id="symbol"></p>

## 符号声明

符号   | 作用 
----- | ---  
$x_k^{(L)}$ | 第$L$层的第$k$个神经元的值
$w_{kn}^{(L)}$ | 第$L$层的第$k$个神经元与第$L-1$层的第$n$个神经元的连接权重    
$\theta_k^{(L)}$ | 第$L$层的第$k$个神经元的输入偏置
$z_k^{(L)}$ | 第$L$层的第$k$个神经元通过激活函数之前的值
$E$ | 误差
$\hat{x}_k^{(L)}$ | 第$L$层的第$k$个神经元的估计值（通常指最后一层）
$N^{(L)}$ | 第$L$层的神经元的个数

## 参考与推荐阅读

本篇大部分内容参考自周志华的《机器学习》（西瓜书）和3Blue1Brown关于神经网络的视频。私心推荐一下3Blue1Brown这位作者的视频。

3Blue1Brown: [YouTube](https://youtu.be/aircAruvnKk) [Bilibili](https://space.bilibili.com/88461692)

## 基本概念

### 神经网络

> 神经网络是由具有适应性的简单单元组成的广泛并行互联的网络，它的组织能够模拟生物神经系统对真实世界物体所作出的交互反应。

上述概念来源于周志华在《机器学习》这本书中的对原论文的翻译。神经网络是由多个进行特定运算的单元组成的网络。

### m-p神经元模型

上文提到论文中的神经元模型是含有**时间**这个参数的。在下面这张图中，忽略时间的影响得到神经元的结构。

![M-P 神经元模型](./mp_model.jpg "M-P 神经元模型")

M-P神经元的数学模型为：

$$
\begin{equation}
    y = f(\sum_{k = 1}^{n} w_k x_k + \theta)
    \label{eq:1}
\end{equation}
$$

关于这张图上的模型，仍需几点特殊说明：

- 对于一个神经元而言，这里$x$表示输入，$y$表示输出。而在多级神经网络中，$y$将表示下一级神经元的一个输入。
- 为了便于理解，在这里我们将输入和输出人为规定成0和1之间的数。在实际应用中不存在这样的限制。

### 激活函数

激活函数的出发点是将各个神经元的值限制在0到1之间，于是有**单位阶跃函数**和**Sigmoid函数**。随着这个限制的消失，追求更高收敛速度和性能的激活函数得以出现。例如**ReLU函数**、**Softplus函数**。

单位阶跃函数：
$$
\begin{equation}
    H(x) = \begin{cases}
    1, & x \geq 0 \\\\
    0, & x < 0 \end{cases} 
\end{equation} 
$$

Sigmoid函数：
$$
 \begin{equation}
    \mathrm{Sigmoid}(x) = \frac{1}{1 + \mathrm{e}^{-x}}
\end{equation}
$$

ReLU函数：
$$
                      \begin{equation}
                      \mathrm{ReLU}(x) = \begin{cases}
                      x, & x > 0 \\\\
                      0, & x \leq 0
                      \end{cases}
                      \end{equation}
$$

Softplus函数：
$$
\begin{equation}
                      \mathrm{Softplus}(x) = \ln{(1 + \mathrm{e}^{x})}
                      \end{equation}
$$

![激活函数](./activfuc.jpg "激活函数")

### 多层前馈神经网络
这部分的公式会开始复杂起来，可以参考<a href="#symbol">符号声明</a>回顾各个符号的含义。

通常来说，一个基本的神经网络不会只有一层，而是由很多层构成的。我们把每个圆圈都当作可以存放数值的一个神经元，上一层神经元的数值会通过连线影响到下一层的数值。大概就像下面的这张图一样。通常我们把不是输入输出层的神经元称作**隐含层**。而**输入层**的值由输入向量完全决定，所以该层是所有层中最特殊的一层。我们把隐含层和输出层的神经元称作**功能神经元**。

![多层感知机](./mlp.png "多层感知机")

我们参考公式\eqref{eq:1}，更换符号和角标使得更加符合多层感知机的应用情况。

$$
\begin{equation}
                      x_{k}^{(L)} = f(\sum_{n=0}^{N^{(L-1)}} w_{kn}^{(L-1)} x_n^{(L-1)} + \theta_k^{(L)})
                      \end{equation}
$$

由此我们可以写出从第$L-1$层的各神经元的值计算第$L$层各神经元的值的公式。

$$
\begin{equation}
\left[ \begin{matrix}
        x_0^{(L)} \\\\
        x_1^{(L)} \\\\
        \vdots \\\\
        x_k^{(L)}
        \end{matrix}
\right] = f \left(
                \left[ \begin{matrix}
                      w_{0,0}^{(L-1)} & w_{0,1}^{(L-1)} & \cdots & w_{0,n}^{(L-1)}\\\\
                      w_{1,0}^{(L-1)} & w_{1,1}^{(L-1)} & \cdots & w_{1,n}^{(L-1)}\\\\
                      \vdots & \vdots & \ddots & \vdots \\\\
                      w_{k,0}^{(L-1)} & w_{k,1}^{(L-1)} & \cdots & w_{k,n}^{(L-1)}\\\\
                      \end{matrix}
                \right]
                \left[ \begin{matrix}
                      x_0^{(L-1)} \\\\
                      x_1^{(L-1)} \\\\
                      \vdots \\\\
                      x_n^{(L-1)}
                        \end{matrix}
                \right]
                +
                \left[ \begin{matrix}
                      \theta_0^{(L)} \\\\
                      \theta_1^{(L)} \\\\
                      \vdots \\\\
                      \theta_k^{(L)}
                      \end{matrix}
                \right]
            \right)
    \label{eq:2}
\end{equation}
$$

简化后就是:

$$
                    \begin{equation}
                      \boldsymbol{x}^{(L)} = \boldsymbol{f} \left(
                      \mathbf{W}^{(L-1)} \boldsymbol{x}^{(L-1)} + \boldsymbol{\theta}^{(L)}
                      \right)
                      \end{equation}
$$

