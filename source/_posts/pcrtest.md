---
title: 从核酸检测开始
date: 2021-09-08 15:37:21
categories: 吐槽
banner_img: /img/bg/79306176_p0.jpg
index_img: /img/bg/79306176_p0.jpg
banner_info: 
    text: 封面画师：Xeph＇s Artworks
    link: "https://www.pixiv.net/artworks/79306176"
---

仅记录道听途说的笑话，以及联想。

<!-- more -->

## 管中窥豹

实验室开会，可能是抨击我们的时候突然想到了前一天给新研一开会的事情。老师突然抓一个人问了几个问题。

> 老师：你从哪里回的学校？从 XX 市？
> 同学：是的。
> 老师：**怎么做的核酸？**
> 同学：携带48小时内的报告上车，然后……

老师：你看，这才是正常的回答。你们知道昨天开会的那个新生怎么回答的么？

> 老师：你从哪里来的学校？
> 同学：XX 市。
> 老师：**怎么做的核酸？**
> 同学：张开嘴，然后……

老师：昨天我还在想，是我们有代沟么，还是我问的有问题。今天看你这么一回答，就放心多了。

老师讲完这件事后，实验室传来快活的气息。不过出于个人兴趣，所以我就陷入了这样的一个思考。为什么会有这样的回答？

## 盲人摸象

首先，可以判断一下，这样的对话成立么？如果把第一组问答和第二组问答分开看的话，显然是成立的。这显然涉及到了“**怎么做的核酸？**”这个问题中的“怎么”到底在询问什么。在第一个回答中，回答了返校的疫情防控规定；在第二个回答中，回答了如何进行核酸检测。如果独立来看，显然后者的回答更加准确。

可以通过根据答案提问题的方式得出上面的推论。

> 回答：携带48小时内的核酸检测阴性报告上车，……
> 提问：
> - 疫情期间，返校的流程是什么？
> - 返校的核酸检测应该怎么做？
> - 返校的时候，核酸检测的流程是什么？

显然，上面的问题都需要**返校**这个条件。

> 回答：张开嘴，发出“啊”的声音，……
> 提问：
> - 如何进行核酸检测？
> - 核酸检测的流程是什么？
> - 怎样配合医生进行核酸检测？

而这里的问题就更加符合原始问题。可见在不考虑上下文的情况下，后者的回答更加准确。

但读完这个故事，大部分人（包括我）的反应也是后者的回答过于荒唐。以普遍理性而论，是因为第一组问答包含了一定的信息，才导致第二组问答的问题的含义发生了变化。但我个人认为，除了第一组问答外，背景知识则是更加重要的原因。

## 按图索骥

在自然语言处理领域中，背景知识是导致模型性能不尽如人意的重要原因。近来很多模型通过大量的训练数据和模型参数，也可以认为其学习了不少背景知识，从而使模型有一定的提高。但人们在平时的对话聊天中，背景知识很可能会自然而然的忽略掉。

我们可以分析一下这组问答，看看合理回答这简单的两个问题需要哪些背景知识。

### 问题：你从哪里来的学校？

“来学校”，一般说明是第一次在学校，或者说很少在学校。在提问者的理解中，对于答者而言，学校是个新地方，或者不属于自己的地方。

“从哪里”，显然是表示地点，但并没有明确限定是哪种粒度的地点。本着提供最大信息量的想法，首先排除包含学校的地点：例如太阳系、地球、……、北京、海淀。所以在北京的话，可能会回答在西直门、在望京或者在学校附近。而不在北京就可能会回答所在省或者所在市。

问题的提问时间：“九月份”。在中国九月是开学的月份。再结合前两点可知，在提问者的角度，回答者应该是从放暑假的状态进入开学状态，可以简单称作：返校或者开学。所以回答“哪里”的时候，一般指的是家乡。这也就有了提问者可以根据自己对答者的理解，给出猜测的答案。

### 问题：怎么做的核酸？

首先，缺失的主语肯定是“你”，也就是答者。

其次，显然“核酸”是“核酸检测”的简写。可以通过“做核酸检测”这一常用词汇推知。

“怎么做”，这个就是问题歧义的源头。所以首先想到的就是借用上个问题包含的信息：返校或者开学、还有答者回学校路途的起点，我们假设为 XX 市。把这两条信息加入，问题就变成了“**从 XX 市返校时的核酸检测时怎么做的呢？**”既然带上了这两个修饰词，说明这里的怎么做核酸检测与 XX 市这一地点和返校这一时间点有关。在这两条信息的约束下，与其他不同的核酸检测，就应该是返校疫情防控规定中不同地区进行的不同有效时间的核酸检测了。

综上可以发现，在人类的日常对话中实际上使用了大量的背景知识。这些背景知识不仅是时间、地点、说话人的身份。甚至还包含时事政策、说话人的家庭环境等等。

## 虚构推理

> 怎么突然不是成语了？

在这部分做一段有意思的思考：
1. 在已有条件下不变的情况下，如何添加其他的条件，使回答者可以合理地给出这个答案。
2. 不考虑现有条件，对于同一个问句，通过改变背景条件，可以给出怎样不同的答案？

{% note warning %}
以下推理仅为猜想，与任何真实事件无关。文章作者不对以下内容的真实性负责。
{% endnote %}

### 添加新条件

首先，做一个假设：**回答者总之本着提供更多信息的想法回答问题。**通常来讲，只有满足上述条件的回答才是礼貌、积极的回答。可以举一个例子来解释这个现象。如果一个人问：“你住在哪里？”而回答是“家里”，那么对于提问的人而言这就是几乎没有信息的回答，那么提问者就会觉得被敷衍。

现在我们明确一下已有条件都有哪些。可能还会有一些其他的已有条件。不过可能干扰不大，就先不列举在这里了。

- 时间：9月初
- 地点：实验室内
- 人物：老师（提问者）、研究生新生（回答者）
- 社会背景：刚刚结束一段疫情。导致学校需要根据学生所在地调整返校政策。该政策主要通过控制学生的核酸检测有效时间的方式实现。核酸检测是人类检测新型冠状病毒的无症状感染者与患者的有力手段。通常包含咽拭子采样与鼻拭子采样两种方式。

好了，下面可以开始了。

#### 回答者的家庭背景

这也是我当时想到的第一个方案。首先，为什么一个人会在这样的对话中回答核酸检测的流程？这说明这个人认为核酸检测是比较少见的东西，可能认为大部分人都没有做过核酸检测。因此猜测提问者想知道核酸检测的流程（并且提问句的本意就应该是这样），所以给出了如此回答。

这里引入的第一个条件就是：**回答者及其所认识的人没有经历过核酸检测**。但这个条件非常苛刻，还是需要添加其他条件对其进行解释。回答者是一名研究生，那么ta一定读过大学。这样ta认识的人就应该包括家人、朋友、同学和网友了。从人的常住地角度分析，家人、朋友大概率在同一常住地，网友虽然分布更广但一般不会聊这一话题，那么这里的同学就要被限定在“没做过核酸检测”这一范围内了。

如果一个学校里的所有人都没做过核酸检测，说明**ta所在大学的生源大部分都是本地的**，所以这也就是第二个条件。简单查一下，ta可能是来自西藏、青海或者宁夏的同学。

那么这个故事就完整了。ta从大学以来一直在家附近，考研到学校是第一次做核酸检测。因此ta对这个问题给出了如此回答。（可喜可贺）

#### 核酸检测的类型

还有一种可能性就是，答者所强调的是这种核酸检测的流程，即咽拭子采样的核酸检测流程。那么为什么会需要强调这一点呢？说明**回答者至少两种核酸检测方式都做过**，甚至可以说ta可能两种方式都做过很多次。这一点可以作为引入的条件。

但仅仅引入上面的条件应该是不够的，需要为回答者找到一个使用前一问题中信息的方式。那么还是从家乡的角度入手，如果一个人经常进行核酸检测，要么是因为从事高危行业（航空运输、冷链运输等），要么是因为所在地曾经是中高风险地区。答者作为一名学生，显然是因为其所在学校或者家乡曾经是中高风险地区。更细化一点，**答主的家乡应该是一个做过多轮全民核酸检测筛查的地区。**

这样就有比较完善的动机了。因为回答者家乡是一个经常做核酸检测的地区，所以结合前面提问者询问作者的家乡情况，因此回答者认为提问者知道自己的家乡是经常做核酸检测的地区，所以给出了咽拭子核酸检测的流程作为回答。

### 设立新背景

这部分就是比较天马行空的联想了。下面会给出“怎么做的核酸？”这一问题的答案，然后再解释这些答案的背景条件是什么。

#### 先手消毒然后……

> 提问：怎么做的核酸？
> 回答：先手消毒，然后将拭子放入无菌生理盐水中湿润，将拭子越过舌根，在被采集者两侧咽扁桃体稍微用力来回擦拭至少3次，然后再在咽后壁上下擦拭至少3次，将拭子头放入保存液，尾部扔掉，旋紧管盖，手消毒。

以上回答参考自《医疗机构新型冠状病毒核酸检测工作手册》。显然这个回答不是被检测者所需要关心的，说明是**回答者是医务人员**。但问题中包含“做”这一动词，所以回答者不是简单地背诵工作手册，而是在描述自己进行核酸检测时的操作步骤。但如果操作步骤与手册完全一致的话，这个提问就没有动机了，因此这里的操作步骤有自己的特殊性。但显然，和手册不同的操作是不规范或者错误的。不被发现的错误通常不会被作为话题，因此**该核酸检测点可能发生了事故**。

#### 得网上预约挂号才能做……

> 提问：怎么做的核酸？
> 回答：得网上预约挂号才能做。挂好号当天去医院就可以了。

可以发现这组问答中的提问者和回答者的身份又有了些不同。首先对于回答者而言，他知道提问者最近一段时间没有做过核酸检测，或者医院的通知并不明确，所以给出了如何去医院进行核酸检测的流程。因此可以猜测两人所处环境应该是非中高风险地区，提问者是一位不怎么流动的居民，但最近需要出门了。

## 后记

当然，这篇文章的出发点就是那个被老师调侃的对话了。然后出于个人兴趣开始分析这段话可能的原因。毕竟人类即使注意力再分散，这种程度的对话也应该不会出问题。所以就自然想到了会不会是实验室内的大家有一个默认共识，而这个共识再那位学生身上并没有。

不过这些推理都是猜测，或者说是一次思维游戏吧。也是第一次尝试把自己突然蹦出来的想法以有条理的方式写出来，希望有兴趣读完的读者能看懂吧。在推理可能原因的时候，使用了《虚构推理》这一名字，也是突然想到了现在做的事情也有一种虚构推理的感觉。总之写下这堆东西还挺有趣的，以后有什么奇怪的思路也可以记录下来。