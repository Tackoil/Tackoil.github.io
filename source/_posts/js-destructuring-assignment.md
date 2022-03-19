---
title: JavaScript 的列表解构赋值执行顺序
date: 2021-07-27 09:35:13
categories: [学习, JavaScript]
---

这篇文章将简单解释一下 JavaScript 中列表的解构赋值的细节和执行顺序。新特性还是要谨慎使用。

<!-- more -->

# 起因

在有次 leetcode 中的经典题目 [剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/) 中遇到一个小问题。简单概括，这道题需要从左往右依次将数字放到对应下标上，直到发现两个相同的数字为止。一个很直观的想法就是使用解构赋值以避免使用程序员搬家。完整的程序就大概是长下面这个样子。

```JavaScript
var findRepeatNumber = function(nums){
    for(let i=0; i<nums.length; i++){
        while(nums[i] !== i){
            // The following line will not work as the expect.
            [nums[i], nums[nums[i]]] = [nums[nums[i]], nums[i]]
            if(nums[i] === nums[nums[i]]) return nums[i];
        }
    }
    return -1;
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]))
``` 

如果输入进行测试，可以喜闻乐见地发现 TLE 了。这么简单的代码应该不会超时啊。

# 调试

在每次交换后输出 `nums` 观察结果。第一步的输出显然应该是 `[1, 3, 2, 0, 2, 5, 3]` ，因为把`2`移动到了下标`2`上，和原本那个位置上的数字`1`进行交换。然而实际上是这样的：

```
[ 1, 2, 1, 0, 2, 5, 3 ]
[ 2, 2, 1, 0, 2, 5, 3 ]
[ 1, 2, 1, 0, 2, 5, 3 ]
[ 2, 2, 1, 0, 2, 5, 3 ]
...
```

发现第一行输出就与期望值严重不符。从输出实在看不出来原因，就调试了一下。

![调试中](./jsdebug.png "调试中")

可以发现调试步骤可以停在左侧列表中的第二项。意味着 JavaScript 会先对左侧第一项`nums[i]`进行赋值并存储，然后再对第二项`nums[nums[i]]`进行赋值。可以发现在赋值左侧第二项时，索引`nums[i]`已经发生了修改，也就导致无法正常工作了。

结合上面的例子。`i=0`时，`nums[i]=1`。`nums[nums[i]]=2`。因此第0项赋值为`2`，然后对第2项赋值为1。最终得到上面的结果。（当然，死循环是巧合，并非每次都会触发。）

# 总结

当时觉得这个问题只有 JavaScript 才会遇到，Python是没问题的。后来实验了一下，Python也是按照这种方式进行赋值的。所以还是尽量不要写这种奇怪的语法吧。

