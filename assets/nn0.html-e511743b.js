const l=JSON.parse('{"key":"v-08aaea5e","path":"/posts/nn0.html","title":"人工神经网络的基本知识","lang":"en-US","frontmatter":{"title":"人工神经网络的基本知识","date":"2019-09-12T16:03:42.000Z","description":"这个原本是通信网理论与应用这门课的一个调研型的大作业。（不过这个和通信网有什么关系）就当是笔者从零开始学习深度学习吧。本篇BLOG含有大量的公式，用来阐明最基本的神经网络在优化问题的基本算法。此外根据查到的各种资料，本篇也会简单说明基于神经网络而发展的典型网络结构以及使用这些网络结构的领域。虽说含有大量的公式，不过用到的原理也只是最基本的高等数学。为了比较美观的展现公式和算法，还会使用一些基本的线性代数运算。不过，毕竟初来乍到，可能有很多漏洞和疏忽之处，恳请理解指正。","categories":["学习"]},"headers":[{"level":2,"title":"神经网络","slug":"神经网络","link":"#神经网络","children":[]},{"level":2,"title":"m-p神经元模型","slug":"m-p神经元模型","link":"#m-p神经元模型","children":[]},{"level":2,"title":"激活函数","slug":"激活函数","link":"#激活函数","children":[]},{"level":2,"title":"多层前馈神经网络","slug":"多层前馈神经网络","link":"#多层前馈神经网络","children":[]},{"level":2,"title":"简单的逻辑运算（与或非）","slug":"简单的逻辑运算-与或非","link":"#简单的逻辑运算-与或非","children":[]},{"level":2,"title":"较复杂的逻辑运算（异或）","slug":"较复杂的逻辑运算-异或","link":"#较复杂的逻辑运算-异或","children":[]},{"level":2,"title":"再复杂一点的问题（简单的二分类问题）","slug":"再复杂一点的问题-简单的二分类问题","link":"#再复杂一点的问题-简单的二分类问题","children":[]},{"level":2,"title":"更复杂一点的问题（MNIST数据集识别）","slug":"更复杂一点的问题-mnist数据集识别","link":"#更复杂一点的问题-mnist数据集识别","children":[]},{"level":2,"title":"神经网络优化问题的基本流程","slug":"神经网络优化问题的基本流程","link":"#神经网络优化问题的基本流程","children":[{"level":3,"title":"1.初始化、、","slug":"_1-初始化、、","link":"#_1-初始化、、","children":[]},{"level":3,"title":"2.输入一组训练数据、得到输出","slug":"_2-输入一组训练数据、得到输出","link":"#_2-输入一组训练数据、得到输出","children":[]},{"level":3,"title":"3.根据该训练数据的标签计算，得到误差","slug":"_3-根据该训练数据的标签计算-得到误差","link":"#_3-根据该训练数据的标签计算-得到误差","children":[]},{"level":3,"title":"4.根据误差调整、、","slug":"_4-根据误差调整、、","link":"#_4-根据误差调整、、","children":[]}]},{"level":2,"title":"神经网络优化问题的数学建模与算法","slug":"神经网络优化问题的数学建模与算法","link":"#神经网络优化问题的数学建模与算法","children":[]},{"level":2,"title":"多层前馈神经网络的不足","slug":"多层前馈神经网络的不足","link":"#多层前馈神经网络的不足","children":[{"level":3,"title":"运算量大","slug":"运算量大","link":"#运算量大","children":[]},{"level":3,"title":"输入节点固定","slug":"输入节点固定","link":"#输入节点固定","children":[]},{"level":3,"title":"梯度弥散与梯度爆炸","slug":"梯度弥散与梯度爆炸","link":"#梯度弥散与梯度爆炸","children":[]}]},{"level":2,"title":"卷积神经网络与模型压缩","slug":"卷积神经网络与模型压缩","link":"#卷积神经网络与模型压缩","children":[]},{"level":2,"title":"循环神经网络与长短期记忆网络","slug":"循环神经网络与长短期记忆网络","link":"#循环神经网络与长短期记忆网络","children":[]},{"level":2,"title":"残差神经网络","slug":"残差神经网络","link":"#残差神经网络","children":[]}]}');export{l as data};