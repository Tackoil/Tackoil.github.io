---
title: 矩阵论笔记
date: 2019-12-26 09:30:54
categories: [笔记]
---

忘了什么时候整理的矩阵论笔记。（希望自己能想起来）

<!-- more -->

## 矩阵代数基础

### 矩阵代数的基本运算

#### 幂等矩阵

> $\bold A^2 = \bold A \bold A = \bold A$

$$
f(s \bold I + t \bold A) = (\bold I - \bold A) f(s) + \bold A f(s+t)
$$

证明：[Zhihu](https://www.zhihu.com/question/64391808)
$$
\begin{aligned}
f(s\bold I +t \bold A) &= \sum_{n=0}^\infty \frac{f^{(n)}(0)}{n!}(s \bold I + t\bold A)^n \\\\
&= \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} (\sum_{i=0}^n \mathrm{C}_n^i (s \bold I)^{n-i}(t \bold A)^i)\\\\
&= \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} (\underbrace {s^n \bold I}_{i=0} +  \bold A \sum_{i=1}^n\mathrm{C}_n^i s^{n-i}t^i) \\\\
&= \sum_{n=0}^\infty  \frac{f^{(n)}(0)}{n!} \lbrace s^n \bold I + \bold A[(s+t)^n - s^n] \rbrace \\\\
&= \sum_{n=0} \frac{f^{(n)}(0)}{n!} [(\bold I - \bold A)s^n + \bold A(s+t)^n] \\\\
&= (\bold I - \bold A) \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}s^n + \bold A \sum_{n=0}^\infty \frac{f^{(n)}(0)}{n!}(s+t)^n \\\\
&= (\bold I - \bold A)f(s) + \bold A f(s+t)
\end{aligned}
$$

***

#### 对合矩阵

> $\bold A^2 = \bold A \bold A = \bold I$

$$
f(s \bold I + t \bold A) = \frac{1}{2} [(\bold I + \bold A)f(s+t) + (\bold I - \bold A)f(s-t)]
$$

证明： by 六叔
$$
\begin{aligned}
f(s\bold I + t \bold A) &= \sum_{n=0}^\infty  \frac{f^{(n)}(0)}{n!} \left[ \sum_{i=0}^n \mathrm{C}_n^i (s\bold I )^{n-i}(t \bold A)^{i} \right] \\\\
&= \sum_{n=0}^\infty \frac{f^{(n)}(0)}{n!} \left[ \sum_{i = \text{odd}} \mathrm{C}_n^i (s \bold I)^{n-i} (t \bold A)^i  + \sum_{i=\text{even}} \mathrm{C}_n^i (s \bold I)^{n-i} (t \bold A)^i\right] \\\\
&= \sum_{n=0}^\infty \frac{f^{(n)}(0)}{n!} \left(  \bold A \sum_{i = \text{odd}} s^{n-i}t^i + \bold I  \sum_{i = \text{even}} \mathrm{C}_n^i s^{n-i}t^i \right) \\\\
&= \sum_{n=0}^\infty \frac{f^{(n)}(0)}{n!} \left\lbrace \bold A [\frac{1}{2} (s+t)^n - (s-t)^n ] + \bold I [\frac{1}{2} (s+t)^n + (s-t)^n]\right\rbrace \\\\
&= \frac{1}{2} \left[ (\bold I + \bold A) f(s+t) + (\bold I - \bold A) f(s-t) \right]

\end{aligned}
$$

***

#### 幂等矩阵与对合矩阵的关系

若 $\bold A$ 是对合矩阵，当且仅当 $\frac{1}{2} (\bold A + \bold I)$ 是幂等矩阵。

证明：
$$
\begin{aligned}
\frac{1}{2}(\bold A + \bold I) \cdot \frac{1}{2}(\bold A + \bold I) = \frac{1}{4}(\bold A^2 + \bold I + 2 \bold A) &= \frac{1}{2}(\bold A + \bold I) \\\\

\bold A^2 + \bold I + 2\bold A &= 2\bold A + 2\bold I \\\\
\bold A^2 &= \bold I
\end{aligned}
$$

***

### 内积与范数

#### 向量的内积与范数

$$
\langle \boldsymbol x, \boldsymbol y \rangle = \frac{1}{4} (\Vert \boldsymbol x + \boldsymbol y \Vert^2 - \Vert \boldsymbol x - \boldsymbol y \Vert^2)
$$

证明：

​	条件：范数由内积诱导，即满足$ \Vert \boldsymbol x \Vert = \sqrt{\langle \boldsymbol x, \boldsymbol x\rangle}$
$$
\begin{aligned}
\Vert \boldsymbol x + \boldsymbol y \Vert^2 - \Vert \boldsymbol x - \boldsymbol y \Vert^2 &= \langle \boldsymbol x + \boldsymbol y , \boldsymbol x + \boldsymbol y \rangle - \langle \boldsymbol x - \boldsymbol y, \boldsymbol x - \boldsymbol y \rangle \\\\
&= \langle \boldsymbol x, \boldsymbol x + \boldsymbol y \rangle + \langle \boldsymbol y, \boldsymbol x + \boldsymbol y \rangle - \langle \boldsymbol x , \boldsymbol x - \boldsymbol y \rangle + \langle \boldsymbol y, \boldsymbol x - \boldsymbol y \rangle \\\\
&= \langle \boldsymbol x, \boldsymbol x \rangle + \langle \boldsymbol x , \boldsymbol y \rangle + \langle \boldsymbol y, \boldsymbol x \rangle + \langle \boldsymbol y , \boldsymbol y \rangle - \langle \boldsymbol x, \boldsymbol x \rangle + \langle \boldsymbol x ,\boldsymbol y \rangle + \langle\boldsymbol y , \boldsymbol x \rangle - \langle \boldsymbol y, \boldsymbol y \rangle \\\\
&= 4 \langle \boldsymbol x , \boldsymbol y \rangle
\end{aligned}
$$

***

**Euclidean 范数 $\Vert \cdot \Vert_2$ 是酉不变的。**

证明：



