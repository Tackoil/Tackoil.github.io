---
title: 距离整理笔记
date: 2019-11-06 16:26:29
categories: [笔记]
mathjax: true
---

***

　　本篇是在日常看论文的时候所整理的关于**距离**或者**度量**的内容。主要会记录一些度量的方法，和这种度量方法所适用的范围。

<!-- more -->

## Version

- ver0.1 2019/11/6 创建文档

## 编辑距离

### 汉明距离

　　设$x$，$y$为两个长度为$n$的二进制向量，则汉明距离为

$$
d(x, y) = \sum_{i=1}^n I(x_i, y_i) \\\\
I(a, b) = \begin{cases}
1, & a = b \\\\
0, & \text{else} \\\\
\end{cases}
$$

　　汉明距离满足**距离公理**：非负性、对称性、三角不等式。

### Levenshtein距离

　　设$x$，$y$是两个字符串。那么Levenshtein距离定义为：将$s_1$转换成$s_2$的最小**编辑操作**数。通常，这样的编辑操作包括：

1. 将一个字符插入字符串
2. 从字符串中删除一个字符
3. 将字符串中的一个字符替换成另外一个字符

　　关于该编辑距离是否可以满足距离的三定义（非负性，对称性，三角不等式）只查到已被证明，但没有查询到相关的证明过程。在维基百科的 [编辑距离](https://en.wikipedia.org/wiki/Edit_distance) 词条中，简单的说明了该编辑距离满足距离定义。简略翻译如下：

> 　　具有非负成本(non-negative cost)的编辑距离满足距离公理(the axioms of a metric)。当满足以下条件时，该编辑距离生成一个距离空间(metric space)：
>
> - 每一个编辑操作都具有正成本。
> - 对于每一个编辑操作，都有相同成本的逆操作(inverse operation)。
>
> 具有以上这些属性，将满足如下的距离公理：
>
> - $d(a,b) = 0$当且仅当$a = b$，因为每一个字符串都可以通过0个操作转换成自身。
> - $d(a,b) > 0$当$a \neq b$，因为这将至少需要一个操作。
> - $d(a,b) = d(b,a)$，每一个操作的成本与其逆操作的成本是相同的。
> - $d(a,c) \leq d(a,b) + d(b,c)$，三角不等式。
>
> 　　Levenshtein distance 和 LCS distance 具有单元成本并满足以上条件，因此满足距离公理。一些编辑距离的变体即使不是真正的(proper)距离，也被在一些文献中使用。

　　该距离由递推式定义：

$$
d(x[0:i], y[0:j]) = \begin{cases}
\max (i, j) & \text{if} \min(i, j) = 0 \\\\
\min \left[ d(x[0:i-1], y[0:j]) +1 , d(x[0:i],y[0:j-1]) +1 , d(x[0:i-1], y[0:j-1]) + 1 _{(x_i \neq y_j)} \right] \\\\
\end{cases}
$$

### Max-Match($M^2$) Evaluation

[Paper: Better Evaluation for Grammatical Error Correction](https://www.aclweb.org/anthology/N12-1067/)

　　我们这里提到的评估，有以下的限制与使用环境。

- 我们对两个句子$C$，$S$进行评估，并使用“黄金标准”$G$决定性评价句子。
- 评估的最小粒度为单词（词条）。
- 我们希望这个评估可以对包含$G$的$C$给予**较高**的分数，对接近$S$的$C$给予**较低**的分数。

　　文章中使用了一种称之为**编辑晶格（Edit lattice）**的方法辅助计算该调整过的距离。首先，我们计算$C$和$S$在单词（词条）粒度上的编辑距离。在计算编辑距离时会使用表格进行动态规划。之后将这个表格转化成一个有向无环图。便于理解，我们按照下面的步骤进行生成。

1. 首先我们将表格中的最优编辑（编辑距离最小的编辑方式）画成如图所示的有向无环图。
2. 我们定义了合并过程中的不变单词的最大数量$u$，这里我们让$u=2$，这也是文章中的默认配置。
3. 我们开始对编辑操作进行合并：对任意两个结点进行连线，并满足第二条的**不变单词的最大数量**的限制，从而得到完整的有向无环图。
4. 我们对所有的单位操作赋予权值$1$，对于合并的操作赋予被合并的权值之和。此外，我们将黄金标准中的编辑操作赋予权值$-(u+1) \times |E|$，其中$|E|$是这张图中的边的总数。也就是含有黄金标准的路径将**一定**会获得一个负数的权值。这样，我们就得到了一个**编辑晶格**。

　　之后计算$M^2$距离时，仅需要先计算$C$，$S$的最小权值路径所对应的编辑操作$e$。对于所有的测试句子的编辑操作组成一个集合$\lbrace e_1, \cdots, e_n \rbrace$，与其对应的黄金标准集合为$\lbrace g_1, \cdots , g_n \rbrace$。之后计算两个集合的准确率、召回率和$F_1$分数即可。
$$
\begin{aligned}
P &= \frac{\sum_{i=1}^n | e_i \cap g_i |}{\sum_{i=1}^n | e_i | } \\\\
R &= \frac{\sum_{i=1}^n | e_i \cap g_i |}{\sum_{i=1}^n |g_i|} \\\\
F_1 &=  2 \times \frac{P \times R}{P + R}
\end{aligned}
$$
　　这里的$|e_i \cap g_i |$表示的是$e_i$操作是否与$g_i$操作match。
$$
\mathrm{match}(e,g) \Leftrightarrow (e.a = g.a) \land (e.b = g,b) \land (e.C \in g.C)
$$

### I-measure Evaluation

[Paper: Towards a standard evaluation method for grammatical error detection and correction](https://www.aclweb.org/anthology/N15-1060/)

　　我们这里提到的评估，有以下的限制与使用环境。

- 我们对三个句子$C$，$S$，$R$进行评估。
- 评估的最小粒度为单词（词条）。
- 我们希望这个评估可以对接近$R$的$C$给予**较高**的分数，对接近$S$的$C$给予**较低**的分数。

　　文章的核心在于使用了**SP对齐（the Sum of Pairs alignment）的方式**，将三个句子同时对齐。同样是基于Levenshtein距离的方法，我们对插入删除操作（gap）和替换操作（mismatch）分别赋予不同的代价（cost），分别为$c_\text{gap}$，$c_\text{mis}$，得到一种总代价最小的对齐方案。

　　*该算法该天再补。*

　　之后的部分是计算PRF1。首先，我们使用改进版的*WAS*方法定义TP、TN、FP、FN。

|      | Written（Source） | Annotated（Reference） | System（Candidate） |
| :--: | :---------------: | :--------------------: | :-----------------: |
|  TN  |         X         |           X            |          X          |
|  FP  |         X         |           X            |          Y          |
|  FN  |         X         |           Y            |          X          |
|  TP  |         X         |           Y            |          Y          |
| FPN  |         X         |           Y            |          Z          |

　　简单解释，我们将W与A是否匹配分成两类：不匹配（即需要更改）【P】、匹配（即不需要更改）【N】。由此我们可以将S的预测分为TP、TN、FP、FN四类。因为在本次计算中，我们还会遇到最后一种情况，此时我们将其定义为FPN类。这样，我们得出加权准确性指标。
$$
\mathrm{WAcc} = \frac{w \cdot \mathrm{TP} + \mathrm{TN}}{w \cdot \mathrm{TP} + \mathrm{TN} + w \cdot (\mathrm{FP} - \frac{\mathrm{FPN}}{2}) + (\mathrm{FN} - \frac{\mathrm{FPN}}{2})}
$$
　　我们希望给予$\mathrm{TP}$多于$\mathrm{TN}$的奖励（即正确的更改好于不更改）；我们希望基于$\mathrm{FP}$多于$\mathrm{FN}$的惩罚（即错误的更改不如不更改），因此这里$w \geq 1$。通常$w = 2$。

　　最后为了对比在不同数据集下的模型情况，我们构建了每个数据集格子的基线标准，即：将Reference直接作为Candidate，计算加权准确性指标$\mathrm{WAcc}_{\text{base}}$，然后我们得到I-measure
$$
I = \begin{cases}
\lfloor \mathrm{WAcc}_{\text{sys}} \rfloor & \text{if}\  \mathrm{WAcc}_{\text{sys}} = \mathrm{WAcc}_{\text{base}} \\\\
\frac{\mathrm{WAcc}_{\text{sys}} - \mathrm{WAcc}_{\text{base}}}{1 - \mathrm{WAcc}_{\text{base}}} & \text{if}\ \mathrm{WAcc}_{\text{sys}} > \mathrm{WAcc}_{\text{base}} \\\\
\frac{\mathrm{WAcc}_\text{sys}}{\mathrm{WAcc}_\text{base}} - 1 & \text{otherwise}
\end{cases}
$$
