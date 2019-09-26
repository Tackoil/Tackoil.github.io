---
title: 信息论基础笔记
date: 2019-09-19 15:33:53
categories: [笔记]
mathjax: true
---

***

　　本篇为 **机械工业出版社 |《信息论基础》| Thomas M. Cover  Joy A. Thomas 著 | 阮吉寿 张华 译** 的笔记。虽然大部分笔记都随手记在书上了，不过由于笔者难以理解书上的部分证明过程，因此单独整理出来以便查阅。

　　由于这里大部分对原书的补充说明是由笔者自己完成的，如有疏漏请多指教。

　　本篇编号系统与原书一致。（但右边栏的BUG不太想修了x

<!-- more -->

## 2. 熵、相对熵与互信息

### 2.7 对数和不等式及其应用

> **定理2.7.1**（对数和不等式）  对于非负数$a_1, a_2, \cdots, a_n$和$b_a, b_2, \cdots, b_n$，
> $$
> \begin{equation}
>  \sum_{i=1}^n a_i \log{\frac{a_i}{b_i}} \geq \left( \sum_{i = 1}^n a_i \right) \log{ \frac{ \sum_{i = 1}^n a_i}{ \sum_{i = 1}^n b_i} }
> \tag{2-99}
> \end{equation}
> $$
>
> 当且仅当$\frac{a_i}{b_i} = \mathrm{常数}$，等号成立。
>
> **证明：** 不失一般性，假定$a_i > 0, b_i > 0$。由于对任意的正数$t$有$f''(t) = \frac{1}{t} \log{\mathrm{e}} > 0$，可知函数 $f(x) = t \log{t}$ **严格凸**。因而，由Jensen不等式，有
>
> $$ \begin{equation}
>  \sum \alpha_i f(t_i) \geq f \left( \sum \alpha_i t_i \right)
> \tag{2-100}
> \label{eq:2-100}
> \end{equation}
> $$
>
> 其中$\alpha_i \geq 1, \sum_i \alpha_i = 1$。令$\alpha_i = \frac{b_i}{\sum_{j = 1}^n b_j}, t_i = \frac{a_i}{b_i}$，可得
>
> $$\begin{equation}
>   \sum \frac{a_i}{\sum b_j} \log{\frac{a_i}{b_i}} \geq \sum \frac{a_i}{\sum b_j} \log{\sum \frac{a_i}{\sum b_j}}
> \tag{2-101}
> \label{eq:2-101}
> \end{equation}
> $$
>
> 这就是对数和不等式。 $\square$
>

　　但上述公式\eqref{eq:2-101}中的所有求和符号缺少角标，题设中的$\alpha_i$的分子书写有误（本文已改正）。因此重新解释这部分证明。

> **证明2.7.1：**
>
> 前略
>
> 公式\eqref{eq:2-100}，其中$\alpha_i \geq 1, \sum_i \alpha_i = 1$。为满足第二个条件，构造$\alpha_i = \frac{b_i}{B}$，其中$B = \sum_{j=1}^n b_j$， 也就是$b_i$的和。再构造$t_i = \frac{a_i}{b_i}$，可得
>
> $$\begin{equation}
>   \sum_i \frac{b_i}{B} \cdot \frac{a_i}{b_i} \log{\frac{a_i}{b_i}} \geq \sum_i \frac{b_i}{B} \cdot \frac{a_i}{b_i} \cdot \log{\sum_i \frac{b_i}{B} \cdot \frac{a_i}{b_i}}
> \tag{2-101'}
> \end{equation}
> $$
>
> 右侧$\log{}$中的求和，由于分母$B = \sum_{j=1}^n b_j$与$i$无关，可将求和符号移动至分子，不等式两侧约去$B$最后可证。$\square$
>

### 2.8 数据处理不等式

> 　　**定义**　如果$Z$的条件分布仅依赖于$Y$的分布，而与$X$是条件独立的，则称随机变量$X,Y,Z$依序构成马尔可夫(Markov)链(记为$X \to Y \to Z$)。具体讲，若$X,Y,Z$的联合概率密度函数可以写为
>
> $$\begin{equation}
> p(x,y,z) = p(x)p(y|x)p(z|y)
> \tag{2-117}
> \label{eq:2-117}
> \end{equation}
> $$
>
> 则$X,Y,Z$构成马尔可夫链$X \to Y \to Z$
> 
> 　　一些简单的结果如下：
> - $X \to Y \to Z$，当且仅当在给定$Y$时，$X$与$Z$是条件独立的。马尔可夫性蕴含条件独立性是因为
>
> $$\begin{equation}
> p(x,z|y) = \frac{p(x,y,z)}{p(y)} = \frac{p(x,y)p(z|y)}{p(y)} = p(x|y)p(z|y)
> \tag{2-118}
> \label{eq:2-118}
> \end{equation}
> $$
> 马尔可夫链的这个特性可以推广到定义$n$维随机过程的马尔可夫场，它的马尔可夫性为：当给定边界值时，内部和外部相互独立。

　　上述公式\eqref{eq:2-118}中间使用了马尔可夫性，即公式\eqref{eq:2-117}。其中
$$ p(x)p(y|x) = p(x,y) $$

