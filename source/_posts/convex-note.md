---
title: 凸优化笔记
date: 2019-10-10 12:00:31
categories: [笔记]
mathjax: true
---

***

　　这篇是 **《Convex Optimization》 | Stephen Boyd, Lieven Vandenberghe | Cambridge University Press** 一书的笔记。第一次尝试阅读英文原版书籍，可能会有些不好理解的内容，整理在这篇笔记中。另外，一部分英文术语与中文术语的对照也会放在本文中。

　　本篇编号系统与原书一致。（但右边栏的BUG不太想修了x

<!--more-->
## Version

- 2019/10/10  ver0.1 创建文档

## 2 Convex sets

### 2.1 Affine and convex sets

#### 2.1.3 Affine dimension and relative interior

> $$
>\mathrm{relint}\ C = \lbrace x \in C \ | \ B(x, r)  \cap \mathrm{aff}\ C \subseteq C \  \text{for some} \  r > 0 \rbrace
> $$
> 
> where $B(x, r) = \lbrace y \ | \  \Vert y-x \Vert \leq r \rbrace$

　　将公式翻译成中文可以译为：邻域与仿射包的交集是$C$的子集的 全部$x$的集合。

> We can then define the *relative boundary* of a set $C$ as $\mathrm{cl}\ C \setminus \mathrm{relint}\ C $, where $\mathrm{cl}\ C$ is the closure of $C$.

　　这里涉及到了很多符号和文中没有事先给出定义的一部分概念。

> - 开集：集合内任意一点，存在该点的一个**邻域**也全在集合中。
> - 闭集：补集为开集的集合。
(来源请求)

　　反斜杠$\setminus$表示差集，这样就可以比较容易地理解relative boundary的含义。

#### 2.1.5 Cones

　　这里对比一下三种组合(combination)的区别与联系：

> - affine combination: $\theta_1 x_1 + \cdots \theta_k x_k$ where $\theta_1 + \cdots + \theta_k = 1$
> - convex combination: $\theta_1 x_1 + \cdots \theta_k x_k$ where $\theta_1 + \cdots + \theta_k = 1, \theta_i \geq 0$
> - conic combination: $\theta_1 x_1 + \cdots \theta_k x_k$ where $\theta_i \geq 0$

　　可以发现，**锥组合(conic combination)**和**仿射组合(affine combination)**的要求相对于**凸组合(convex combination)的要求更小**。

　　再对比一下三种集合(set)的区别与联系，这里我们使用基于各自对应的组合的定义：

> - **affine** set: an *affine set* contains every **affine combination** of its points.
> - **convex** set: a set is *convex* if and only if it contains every **convex combination** of its points.
> - **convex cone**: a set $C$ is a *convex cone* if and only if it contains all **conic combinations** of its elements.

　　尤其注意第三行，我们发现锥组合所对应的集合并不是锥(cone)，而是凸锥(convex cone)。因此比较三种组合条件的强弱，我们可以得出：

> 仿射集合一定是凸集合，凸锥集合也一定是凸集合。 

　　是锥但不是凸集合和例子：两条不在同一直线上的射线。[by Johntheuser]

### 2.2 Some important examples

#### 2.2.1 Hyperplanes and halfspaces

　　内点：$x \in C$， 若$U(x, \delta) \in C$，则$x$为内点

### 2.3 Operations that preserve convexity

#### 2.3.1 Intersection

> (Subspaces, affine sets, and convex cones are also closed under arbitrary intersections.)

　　翻译：对于任意的交集运算(arbitrary insersections)而言，子空间、仿射集合、凸锥集合也是封闭的。

#### 2.3.2 Affine functions

　　根据性质，如果可以构建一个仿射函数，并证明定义域或值域其中一个为凸集，那么另一个也一定是凸集。

> ##### Example 2.9
> 
> $$  \lbrace x \ | \  Ax \preceq b, Cx = d \rbrace = \lbrace x \ | \ f(x) \in \mathbb{R}^m_{+} \times \lbrace 0 \rbrace \rbrace $$
>
> 其中 $f(x) = (b −Ax, d −Cx)$
>
> 　　用一个$x$将满足不等式与等式要求的解组合成列向量，前一部分向量大于等于$0$，后一部分向量等于$0$。值域是凸锥，所以定义域是凸集。

> ##### Example 2.10
>
> $$  \lbrace x \ | \  A(x) \preceq B \rbrace = \lbrace x \ | \ f(x) \in \mathbb{S}^m_{+} \rbrace$$
>
> 其中 $f(x) = B - A(x) = B - x_1 A_1 - \cdots - x_n A_n, \text{where}\ A_i , B \in \mathbb{S}^m$
>
> 　　由于$A_i, B$都是对称矩阵，且$x_i$为标量，因此$f(x)$的值域也是对称矩阵。但为了满足不等式，我们要求值域是半正定对称矩阵。由于半正定对称矩阵是凸锥，因此定义域是凸集。

> ##### Example 2.11
>
> $$  \lbrace x \ | \  x^\mathrm{T} P x \leq (c^\mathrm{T} x)^2, c^\mathrm{T} x \geq 0 \rbrace = \lbrace x \ | \ f(x) \in \lbrace (z, t) \ | \ z^\mathrm{T} z \leq t^2, t \geq 0 \rbrace \rbrace$$
>
> 其中 $f(x) = (P^{\frac{1}{2}}x, c^\mathrm{T}x ), \text{where}\ P \in \mathbb{S}^n_{+}, c \in \mathbb{R}^n$
>
> 　　将列向量分成两部分，一部分满足$x^\mathrm{T} P x \leq (c^\mathrm{T} x)^2$，第二部分满足$c^\mathrm{T} x \geq 0$。由于值域是凸锥，所以定义域是凸集。

#### 2.3.3 Linear-fractional and perspective functions

##### Linear-fractional functions

$$ f(x) = (Ax + b) / (c^\mathrm{T}x + d), \qquad \mathrm{dom} f = \lbrace x \ | \ c^\mathrm{T}x + d > 0 \rbrace $$

　　书中的**Remark 2.2**简单说明该函数保持集合的凸性。

> ##### Remark 2.11
>
> 　　首先定义一个矩阵$Q$
>
> $$ Q = \left[ \begin{matrix}
>        A & b \\\\
>        c^\mathrm{T} & d \\\\
>   \end{matrix}
>   \right]
> \in \mathbb{R}^{(m+1) \times (n+1)} $$
>
>　　于是可以得到
> $$ Q \  \left[ \begin{matrix} x \\\\ 1 \\\\ \end{matrix} \right] 
> = \left[  \begin{matrix} Ax+b \\\\ c^\mathrm{T}x + d \\\\ \end{matrix} \right]
> $$
>
> 　　显然，将得到的列向量除以$c^\mathrm{T}x + d$就可以得到$(f(x), 1)$。并且，该操作是仿射的。
>
> 　　我们再定义一个函数$\mathcal{P}(v)$
>
> $$ \mathcal{P}(v) = \lbrace t (v, 1) \ | \ t \geq 0 \rbrace $$
>
> 　　该函数将一个向量$v \in \mathbb{R}^n$映射成高维的一条射线$\lbrace t (v, 1) \ | \ t \geq 0 \rbrace \in \mathbb{R}^{(n+1)}$。因此，该函数构造了一个**$n$维实数域**到**$n+1$维实数域的半空间**之间的映射。因此，该函数保持了集合的凸性。
>
> ![P函数](./linear_frac_Pfunc.png "$\mathcal{P}$函数")
>
> 　　最后，我们将线性分式函数表示成：
>
> $$ f(x) = \mathcal{P}^{-1} (Q \mathcal{P}(x)) $$
>
> 从而推知该函数也将保持集合的凸性。
