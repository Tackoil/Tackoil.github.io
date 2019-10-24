---
title: 算法笔记
date: 2019-09-19 15:33:53
categories: [笔记]
mathjax: true
---

***

　　本篇为算法学习过程的笔记，但和数值方法的那种算法略有不同。倒不如说是在重新学习一下数据结构（？）

　　本篇的内容都来自与leetcode刷题学习到的各种算法等等。总之学到什么就写在这里了。虽然不确定这些知识对以后从事的领域会不会有很大的帮助，多学一点也是好事。（大概

<!-- more -->

## Version

- ver0.1 2019/9/25 创建文档
- ver0.2 2019/9/26 Manacher算法编写
- ver0.3 2019/9/28 编辑距离算法编写
- ver0.4 2019/9/30 合并k个链表算法编写

## 动态规划 Dynamic Programming

### Manacher 算法

> 解决的问题：最长回文子串 -> [Leetcode:Q5 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)
>
> 算法复杂度：$O(n)$
>
> 空间复杂度：$O(n)$

　　这个算法放在动态规划的第一个，总觉得有一点不太合适。不过本来这个BLOG只是为了记录各种比较著名的算法，所以也就不关心难度了。

　　在确定子问题之前，先对数据进行处理。由于奇数个字符的回文串和偶数个字符的回文串的处理方式不太一致，因此在**每两个字符中间**以及字符串的**开头**和**结尾**插入`#`，从而将所有回文串调整成奇数个字符的回文串。（偶数个字符的回文串将以`#`为回文串中心）

![初步处理](./mrc_insert.png "初步处理")

　　当然，也不一定要是`#`，只要不会影响原字符串的任意符号就可以。

　　下一步就可以正式进行动态规划了。我们构造这样一个问题：

> 已知所有$i, i < k$为中心的最长回文串的半径（长度+1的一半），求以$k$为中心的最长回文串的半径。

![应有的计算结果](./mrc_result.png "应有的计算结果")

　　所以正确的结果应该就像上面的那个表格一样。

　　那么上面的问题应该如何解决？既然时间复杂度以$O(n)$为目标，那么如何充分利用之前字符串的数据会变得非常重要。

　　首先我们确定通常的做法，计算以$i$为中心的最长回文半径，只需要不断比较$i+1$与$i-1$，$i+2$与$i-2$的字符是否相同即可。

![通常做法](./mrc_common.png "通常做法")

　　下面就考虑如何充分利用之前的数据。先设定一个位置叫作**扫描边界**$B$。在这条边界左侧的字符我们都已经扫描过。如果我们当前字符位置$k$在边界**右侧**，显然我们无法根据前面的信息，计算该位置的最长回文半径，因此我们使用普通的方式，进行扩展。同时更新扫描边界$B = k + r_k - 1$

　　那如果当前字符的位置在边界的左侧，说明我们已经了解了一部分该位置的信息。因此通过考虑回文**对称性**来利用该信息。如前文所述，扫描边界同样也是一段回文串的边界。我们把这串回文串的中心记为$C$。这样我们就可以找到与当前位置$k$对称的位置，我们记为$k'$。当然我们也要把$B$对称过去以确定左边界$B'$。这样，我们就可以根据$k'$为中心的回文串情况去分析当前位置$k$的回文串情况。

![描述问题的相关变量](./mrc_var.png "描述问题的相关变量")

　　如果以$k'$为中心的最长回文串在以$C$为中心的最长回文串之内，显然我们可以断定$k$的最长回文串长度与$k'$的最长回文串长度保持一致。即$r[k] = r[k']$。

　　如果以$k'$为中心的最长回文串超出了以$C$为中心的最长回文串的范围，由于$B$右侧部分**一定**无法与$B'$的左侧部分对称（根据**最长**回文串的性质），因此对称过去的$k'$要被砍掉超出$[B', B]$范围的数据，剩下的部分为$k$的最长回文串。

　　如果以$k'$为中心的最长回文串的左边界与以$C$为中心的最长回文串的左边界重合，由于$B'$左侧的部分没有成功形成以$k'$为中心的回文串，则为$B$右侧的字符提供了机会（因为$B'$左侧与$B$右侧**一定**不对称），因此需要进行扩展搜索最长回文串。同时更新**扫描边界**$B$以及与扫描边界相关的**对称中心**$C$。

![三种情况](./mrc_cases.png "三种情况")

　　总结以上的情况，并考虑一些边界情况，即可以写出Manacher算法的编码。显然这是一个时间复杂度为$O(n)$的算法。

``` python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        s_new = []
        for s_item in s:
            s_new.append('#')
            s_new.append(s_item)
        s_new.append('#')
        r = []
        k = 0
        b = -1
        c = -1
        s_length = len(s_new)
        r_max = -1
        for k in range(0, s_length):
            kr = 0
            if p > k:
                while k - kr >= 0 and k + kr < s_length and s_new[k - kr] == s_new[k + kr]:
                    kr += 1
                r.append(kr)
                b = k + kr - 1
                c = k
            else:
                k2 = 2 * c - k
                kl = k2 - r[k2] + 1
                bl = 2 * c - b
                if bl < kl:
                    kr = r[k2]
                elif bl > kl:
                    kr = b - k + 1
                else:
                    kr = b - k + 1
                    while k - kr >= 0 and k + kr < s_length and s_new[k - kr] == s_new[k + kr]:
                        kr += 1
                    b = k + kr - 1
                    c = k
                r.append(kr)
            if r_max == -1:
                r_max = k
            elif r[r_max] < kr:
                r_max = k
        kcl = int((r_max - r[r_max] + 1) / 2)
        kcr = pcl + r[r_max] - 1
        return s[kcl : kcr]
```

### 编辑距离 (Levenshtein 距离)

> 解决的问题：编辑距离 -> [Leetcode:Q72 编辑距离](https://leetcode-cn.com/problems/edit-distance/)
>
> 算法复杂度：$O(mn)$
>
> 空间复杂度：$O(n)$

　　给定两个字符串$s_1$及$s_2$，两者的**编辑距离**定义为将$s_1$转换成$s_2$的最小**编辑操作**数。通常，这样的编辑操作包括：

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

　　对于这个问题而言，该问题的子问题是：

> 已知$s_1[0:i']$与$s_2[0:j']$的编辑距离为$d(i',j')$，其中$i' < i, j' < j$，求$d(i,j)$

　　不过这样的描述过于抽象，可以简单的举一个例子。假设我们要计算`horse`和`rost`的编辑距离，并且已知`horse`与`ros`，`hors`与`rost`,`hors`与`ros`的编辑距离。为了方便说明，我们假设从`horse`转换成`rost`。经过观察可知：

- 如果已知`horse`与`ros`需要$d(i, j-1)$次操作，那么只需要在`ros`后插入`t`就可以获得目标字符串，因此$d_\mathrm{Insert}(i, j) = d(i, j-1) + 1$。
- 如果已知`hors`与`rost`需要$d(i-1, j)$次操作，那么只需要将`horse`删除`e`就可以获得`hors`从而得到目标字符串，因此$d_\mathrm{Delete}(i, j) = d(i-1, j) + 1$。
- 如果已知`hors`与`ros`需要$d(i-1, j-1)$次操作，那么只需要将`horse`中的`e`改成`t`，就可以获得目标字符串，因此$d_\mathrm{Replace}(i, j) = d(i-1, j-1) + 1$。

![三种编辑方式](./ed_idp.png "三种编辑方式")

　　上述最后一种情况，如果最后一个字母相同，显然不需要进行操作，那么就不需要加一。上述三种操作的最小值就是我们要求的$d(i, j)$。

　　我们从**空字符串**开始遍历全部情况，即可获得$s_1$与$s_2$的编辑距离。

![距离表格](./ed_ops.png "距离表格")

　　显然，我们遍历了全部元素，所以时间复杂度为$O(mn)$。但空间复杂度可以通过只记录一行零两个元素的方式进行简化。具体参见下面的代码。

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        memo = list(range(len(word1)+1))
        upleft = 0
        up = 0
        j = 0
        while j < len(word2):
            i = 0
            while i < len(word1) + 1:
                upleft, up = up, memo[i]
                if i == 0:
                    memo[i] = memo[i] + 1
                elif word1[i-1] == word2[j]:
                    memo[i] = min(upleft, memo[i-1]+1, memo[i]+1)
                else:
                    memo[i] = min(upleft+1, memo[i-1]+1, memo[i]+1)
                i += 1
            j += 1
        return memo.pop()
```

## 分治 Divide and Conquer

### 合并K个排序链表

> 解决的问题：合并K个排序链表 -> [Leetcode:Q23 合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
>
> 算法复杂度：$O(N\log k)$
>
> 空间复杂度：$O(1)$

　　分治需要将问题拆分，然后交给一个小机器进行处理，并不断合并机器产生的结果。如何拆分和合并问题是分治中比较重要的内容。

　　该问题做如下拆分与合并：

> 拆分：每2个链表一组
>
> 合并：合并2个链表

　　分组可以每两个一组交给合并器，合并器可以使用最普通的**双指针**方案，也是常见的合并链表的方案。在考虑一些简单的边界条件就可以完成合并。

　　双指针方法最终也会遍历完成两个链表，因此每一轮合并时，所有链表都将被遍历一次。设$k$个链表的总节点数为$N$，因此每一轮的时间复杂度为$O(N)$。由于使用2的幂次递减待合并的链表，因此共循环$\log k$次，总时间复杂度为$O(N \log k)$。

　　以下代码为[leetcode官方题解](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/he-bing-kge-pai-xu-lian-biao-by-leetcode/)的代码。

```python
class Solution(object):
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """
        amount = len(lists)
        interval = 1
        while interval < amount:
            for i in range(0, amount - interval, interval * 2):
                lists[i] = self.merge2Lists(lists[i], lists[i + interval])
            interval *= 2
        return lists[0] if amount > 0 else lists

    def merge2Lists(self, l1, l2):
        head = point = ListNode(0)
        while l1 and l2:
            if l1.val <= l2.val:
                point.next = l1
                l1 = l1.next
            else:
                point.next = l2
                l2 = l1
                l1 = point.next.next
            point = point.next
        if not l1:
            point.next=l2
        else:
            point.next=l1
        return head.next
```