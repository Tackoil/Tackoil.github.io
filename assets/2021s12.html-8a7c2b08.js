import{_ as e,p as a,q as o,v as n,y as t,Q as r}from"./framework-1508a596.js";const i="/assets/traneg-5455450d.png",s="/assets/bleu_tran-1486ccbb.png",l="/assets/bleueg1-e3e5643f.png",p="/assets/aligneg-08b6b5b0.png",c="/assets/meteoreg-d267392b.png",f="/assets/bertscore-8c81dfa2.png",d="/assets/bleurt-7dc4ae95.png",h={},u=t("blockquote",null,[t("p",null,"（把每双周周报在BLOG上整理一下，以防止自己做的PPT最后都想不起来是在说什么。）")],-1),m=t("p",null,"这次周报的题目非常的别扭，可能是我翻译的不太好。英文的话应该是 Automatic Evaluation of Machine Translation ，也就是对机器翻译的结果给出一个自动的评价或者评分，用来对比哪一个机器翻译模型的性能更好。当然，自动也是题目中非常重要的一部分。基于人工的评价自然无法应付现在大规模的评估需求。",-1),g=r('<p>机器翻译是指实现一种语言到另一种语言的自动翻译。<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup> 该系统的输入是语言 A 的一个文本段落。输出是语言 B 的段落。这两个段落都是不定长的文本序列。对于同一句话可能存在多种合理的翻译，也可能存在明显不合理的翻译。例如下图中的最后一个翻译，把 docter 错翻译成博士，显然是不符合原义的。</p><blockquote><p><s>（阿米娅：博士，您还有许多事情需要处理。现在还不能休息哦。）</s></p></blockquote><p><img src="'+i+'" alt="翻译例子"></p><p>那么在这么多翻译中，如何评价它们，得出一个更好的翻译呢？这就需要对翻译进行评估，或者称评价。对于如何做好翻译，有大家耳熟能详的严复提出的提出译事三大难：<strong>信</strong>、<strong>达</strong>、<strong>雅</strong>。在 Hovy 等人的论文<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup>中也提出了类似的观点：好的翻译要追求<strong>充分性</strong>（adequacy）、<strong>准确性</strong>（fidelity）和<strong>流畅性</strong>（fluency）。例如在上面的句子中，除了我的翻译无法做到正确之外，有道的翻译则更加流畅，可以认为在这句话上的翻译更好。</p><p>上述需要人类参与、使用人类对语言的理解的评估可以成为<strong>人工评估</strong>，相对的如果可以计算地得出评估结果，这种可以称为<strong>自动评估</strong>。显然，人工评估不仅费时费力，而且为了弥补人类的不客观性，需要采纳大量人类的结果，显然无法为现今大规模的翻译模型测试提供帮助。由此对自动评估的期望越来越高。对于一个自动评估方案来讲，其通常需要引入由人类提供的<strong>正确答案</strong>（Ground Truth / Reference）。对模型输出的<strong>候选结果</strong>（Candidate）与正确答案进行可重复性的计算，为每个候选结果提供一个表示其翻译质量的分数。自动评估不仅成本低、速度快，而且可以重复，为翻译模型间相互比较提供了可能。</p><h1 id="传统自动评估方法" tabindex="-1"><a class="header-anchor" href="#传统自动评估方法" aria-hidden="true">#</a> 传统自动评估方法</h1><h2 id="bleu-the-bilingual-evaluation-understudy" tabindex="-1"><a class="header-anchor" href="#bleu-the-bilingual-evaluation-understudy" aria-hidden="true">#</a> BLEU（The Bilingual Evaluation Understudy）</h2><p>BLEU<sup class="footnote-ref"><a href="#footnote3">[3]</a><a class="footnote-anchor" id="footnote-ref3"></a></sup> 是比较经典的自动评估方法。这个词和蓝色（BLUE）比较像，但看在原论文特意把这四个字母写成蓝色，我觉得读音应该一致。此外经过搜索，BLEU在法语里就是蓝色的意思。</p><p><img src="'+s+'" alt="bleu的翻译"></p><p>BLEU主要分为两部分：n元准确度修改版（Modified $n$-gram precision）、简短惩罚系数（Brevity Penalty）。下面以一个候选句c和多个参考句R为输入。</p><h3 id="修改的n元准确度" tabindex="-1"><a class="header-anchor" href="#修改的n元准确度" aria-hidden="true">#</a> 修改的n元准确度</h3><p>$$ p_n = \\frac{\\sum_{n\\text{-gram}<em>\\text{uniq} \\in c} \\text{Count}</em>\\text{clip}(n\\text{-gram}<em>\\text{uniq}, R)}{\\sum</em>{n\\text{-gram}<em>\\text{uniq}&#39; \\in c} \\text{Count}(n\\text{-gram}</em>\\text{uniq}&#39;, c)} $$</p><p>该公式计算的是准确率（相对于召回率），统计的是**候选句$c$<strong>中出现在</strong>句子$R$<strong>中的$n$-gram数量占</strong>候选句$c$**中所有$n$-gram数量的比例。但与普通的准确率不同的是，BLEU对分子部分进行裁切，使同一个n-gram的匹配数量得到限制。先看公式。</p><p>$$ \\text{Count}<em>\\text{clip}(n\\text{-gram}, R) = \\min(\\text{Count}(n\\text{-gram}, c), \\max</em>{r \\in R}(\\text{Count}(n\\text{-gram}, r))) $$</p><p>其中：</p><p>$$ \\text{Count}(n\\text{-gram}, w)= \\sum_{n\\text{-gram}&#39;\\in w} I(n\\text{-gram}, n\\text{-gram}&#39;) $$</p><p>$$ I(a,b) = \\begin{cases} 1 \\quad \\text{if} \\ a = b \\ 0 \\quad \\text{else} \\end{cases} $$</p><p>该公式说明的是每一个$n$-gram，都不能超过参考句中匹配数量最大的一项。这样说很抽象，以下面的例子作为参考。</p><p><img src="'+l+'" alt="n元准确度的例子"></p><p>我们计算这个例子的1元准确度。可以发现 the 在参考句 1 和参考句 2 中分别出现了 2 次和 1 次。那么 $1$-gram 在其中的最大匹配数为 2. 因此最终的1元准确率为 $\\frac{2}{7}$.</p><p>$$ \\text{Count}_\\text{clip}(\\text{[the]}, R) = \\min(7, \\max(2, 1)) = 2 $$</p><p>$$ p_1 = \\frac{2}{7} $$</p><h3 id="简短惩罚系数" tabindex="-1"><a class="header-anchor" href="#简短惩罚系数" aria-hidden="true">#</a> 简短惩罚系数</h3><p>上述准确度的不足显然是：如果**候选句$c$**过短，且其中$n$-gram完全匹配，那么这个候选句的准确度为满分。为了对这样的候选句进行惩罚，引入简短惩罚系数。</p><p>$$ \\text{BP}(c, R) = \\begin{cases} 1 &amp; \\text{len}(c) &gt; \\text{len}(r^<em>) \\ \\exp(1 - \\frac{\\text{len}(r^</em>)}{\\text{len(c)}}) &amp; \\text{len}(c) \\leq \\text{len}(r^*) \\end{cases} $$</p><p>其中：</p><p>$$ r^* = \\arg \\min_{r \\in R} | \\text{len}(r) - \\text{len}(c)| $$</p><p>关于候选句的参考，有两种方案。上面公式给出的是 IBM 方案，即选择与候选句长度差距最小的一个参考句。当候选句小于参考句时，惩罚系数会逐渐降低。</p><p>最终 BLEU 评分将两部分相乘得到。</p><p>$$ \\text{BLEU}(c, R) = \\text{BP}(c, R) \\cdot \\exp \\left( \\sum_{n=1}^N w_n \\log p_n\\right) $$</p><p>其中：</p><p>$$ w_n = \\frac{1}{N} $$</p><p>右侧的求和式意为对多个不同大小的$n$-gram取平均。</p><h3 id="bleu的缺点" tabindex="-1"><a class="header-anchor" href="#bleu的缺点" aria-hidden="true">#</a> BLEU的缺点</h3><ul><li>缺少对<strong>召回率</strong>的考量。虽然用惩罚系数的方式进行了弥补，但采用准确率和召回率的调和平均值分数显然更具优势。</li><li>对仅含有一个参考句的数据集效果较差。若只含有一个参考句，则削弱了 BLEU 的性能。</li><li>缺少对同义词的考量。BLEU 仅通过完全匹配的方式给出得分，包容度更低。</li></ul><h2 id="meteor-metric-for-evaluation-of-translation-with-explicit-ordering" tabindex="-1"><a class="header-anchor" href="#meteor-metric-for-evaluation-of-translation-with-explicit-ordering" aria-hidden="true">#</a> METEOR （Metric for Evaluation of Translation with Explicit Ordering）</h2><p>METEOR<sup class="footnote-ref"><a href="#footnote4">[4]</a><a class="footnote-anchor" id="footnote-ref4"></a></sup> 是一个基于对齐的一种评分方法，在一定程度上弥补了 BLEU 的不足。但该评分方法较为复杂，还需要引用外界知识。毕竟要考量同义词的话，外界知识是必不可少的。下面以一个候选句$c$和一个参考句$r$为输入。</p><h3 id="对齐-alignment" tabindex="-1"><a class="header-anchor" href="#对齐-alignment" aria-hidden="true">#</a> 对齐（Alignment）</h3><p>对齐，或者说连线？意在将候选句与参考句中的n-gram对应起来，对应的越多则越接近。</p><p>对齐也分为两步：<strong>映射</strong>和<strong>选择</strong>。</p><h4 id="映射-mapping" tabindex="-1"><a class="header-anchor" href="#映射-mapping" aria-hidden="true">#</a> 映射（Mapping）</h4><ul><li>精确模式（exact）：要求词与词之间完全对应，不允许词形变化。例如 computer 只能与 computer 形成映射。</li><li>词根模式（porter stem）：两个词的词根相同也允许建立映射，需要使用一些外部的词根化工具。例如 computer - compters.</li><li>同义词模式（WN synonymy）：两个词的意思相同即可，需要使用一些外部的同义词词表。例如：computer - PC.</li></ul><p>选用上述的某一个规则，在候选句与参考句中间构成映射。映射可以不完全覆盖候选句或参考句中的所有n-gram。但实际上仅满足上述规则的的话，会存在多个满足条件的映射。因此需要对映射进行选择。</p><h4 id="选择-select" tabindex="-1"><a class="header-anchor" href="#选择-select" aria-hidden="true">#</a> 选择（Select）</h4><ul><li>选择已匹配条目最多的映射（the largest subset）</li><li>选择交叉最少的映射（the least number of crosses）</li></ul><p>根据上述的全部规则，就可以选择出最佳映射了。关于交叉这一概念，论文中进行了形式化表达。我们可以简单理解为两条映射所对应的词出现顺序相反。若画成词与词链接的图，可以发现两条线段有一个交点。</p><p><img src="'+p+'" alt="选择的例子"></p><p>我们以上图<sup class="footnote-ref"><a href="#footnote5">[5]</a><a class="footnote-anchor" id="footnote-ref5"></a></sup>为例，r为参考句，c为候选句。左图的交叉数为7，右图为11. 因此选择左图的映射方法。</p><p>原论文中，以上的两步将会循环进行三次。其中映射规则分别使用精确模式、词根模式、同义词模式。每一轮尝试对<strong>未被映射的词</strong>构建映射。这三种映射规则逐渐宽松，也更容易将所有存在可能的词映射起来，为下一步的计算提供可能。</p><h3 id="计算-compute" tabindex="-1"><a class="header-anchor" href="#计算-compute" aria-hidden="true">#</a> 计算（Compute）</h3><p>计算部分也分为两部分：F均值与惩罚系数。其中的惩罚系数比较复杂，而 F均值较好理解。</p><h4 id="f均值-fmean" tabindex="-1"><a class="header-anchor" href="#f均值-fmean" aria-hidden="true">#</a> F均值（Fmean）</h4><p>F均值是在判断分类任务中很常用的指标，综合考量了准确率与召回率。这里使用了<strong>召回率</strong>权重很高的F均值。</p><p>$$ F_\\text{mean} = \\frac{10PR}{R+ 9P} $$</p><p>其中：</p><p>$$ P= \\frac{\\sum_{n\\text{-gram} \\in c} I(n\\text{-gram}\\text{ is aligned})}{\\sum_{n\\text{-gram} \\in c}1} $$</p><p>$$ R= \\frac{\\sum_{n\\text{-gram} \\in c} I(n\\text{-gram}\\text{ is aligned})}{\\sum_{n\\text{-gram} \\in r}1} $$</p><p>准确率的分母为候选句的n-gram数量，召回率的分母是参考句的n-gram数量。</p><h4 id="惩罚系数-penalty" tabindex="-1"><a class="header-anchor" href="#惩罚系数-penalty" aria-hidden="true">#</a> 惩罚系数（Penalty）</h4><p>这里的惩罚系数是为了评价前面对齐的情况。即使候选句中所有单词都来自于参考句，F评分为1，但顺序与参考句完全不一致，也无法获得高分数。</p><p>$$ \\text{Penalty} = 0.5 \\times \\left( \\frac{\\text{chunks}}{n\\text{-gram_matched}} \\right) ^3 $$</p><p>其中分子位置的$\\text{chunks}$表示在候选句$c$和参考句$r$中都连续的块数。分母部分是最终匹配的n-gram数。将两部分结合到一起就为METEOR分数。用下面的例子<sup class="footnote-ref"><a href="#footnote6">[6]</a><a class="footnote-anchor" id="footnote-ref6"></a></sup>解释惩罚系数的作用。</p><p><img src="'+c+'" alt="METEOR示例"></p><p>比较示例1与示例2，虽然它们的F均值均为1，但示例2对齐的更好，所以块数较少，惩罚系数更小。</p><p>最终的METEOR分数为下式。</p><p>$$ \\text{METEOR}(c, r) = F_\\text{mean} \\times (1- \\text{Penalty}) $$</p><h1 id="基于预训练的自动评估方法" tabindex="-1"><a class="header-anchor" href="#基于预训练的自动评估方法" aria-hidden="true">#</a> 基于预训练的自动评估方法</h1><p>还有一类方法就是基于预训练的自动评估方法，其思路主要利用BERT的综合分析文本上下文的能力，从而完成对翻译的自动评估。但多少有一种用规则内的东西证明规则内的东西，多少是有极限的感觉。</p><h2 id="bertscore" tabindex="-1"><a class="header-anchor" href="#bertscore" aria-hidden="true">#</a> BERTScore</h2><p>BERTScore<sup class="footnote-ref"><a href="#footnote7">[7]</a><a class="footnote-anchor" id="footnote-ref7"></a></sup> 顾名思义是一个基于 BERT 的自动评估方法。其出发点为让候选句和参考句中的每一个词，分别携带其上下文信息。由此得到的词向量再进行相似度计算，得到最终分数。从方法上讲，属于基于<strong>词向量</strong>的自动评估方法。只不过这里的词向量信息更加丰富。</p><p><img src="'+f+'" alt="BERTScore"></p><p>BERTScore中也使用了F均值，其召回率和准确率定义如下。</p><p>$$ R_\\text{BERT} = \\frac{1}{|r|} \\sum_{r_i \\in r} \\max_{c_j \\in c} \\boldsymbol{r}^\\text{T}_i \\boldsymbol{c}_j $$</p><p>$$ P_\\text{BERT} = \\frac{1}{|c|} \\sum_{c_j \\in c} \\max_{r_i \\in r} \\boldsymbol{r}^\\text{T}_i \\boldsymbol{c}_j $$</p><h2 id="bleurt-bilingual-evaluation-understudy-with-representations-from-transformers" tabindex="-1"><a class="header-anchor" href="#bleurt-bilingual-evaluation-understudy-with-representations-from-transformers" aria-hidden="true">#</a> BLEURT（Bilingual Evaluation Understudy with Representations from Transformers）</h2><p>这个模型<sup class="footnote-ref"><a href="#footnote8">[8]</a><a class="footnote-anchor" id="footnote-ref8"></a></sup>在结构上更加简单粗暴，但该方法的重点在于训练这个 BERT 模型。该模型将候选句和参考句直接输入进 BERT，在 [CLS] 位置的输出上添加一个全连接层得到分数。</p><p><img src="'+d+'" alt="BLEURT的训练任务"></p><p>训练任务如下：</p><ul><li>BLEU：输入为Wikipedia的句子对，直接拟合BLEU的分数。</li><li>ROUGE：输入为Wikipedia的句子对，直接拟合ROUGE的分数。</li><li>BERTScore：输入为Wikipedia的句子对，直接拟合BERTScore的分数。<s>(用BERT拟合BERT)</s></li><li>回译似然度：概括来说就是产生回译数据，将Transformers的损失作为评分，然后拟合这个分数。<s>(用BERT拟合Transformers)</s></li><li>包含关系：使用包含关系数据集训练分类任务。</li><li>回译标签：判断数据是否是由回译产生的。</li></ul><p>总的来说这篇文章定义了一堆关于翻译度量的预训练任务。</p><h1 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h1><p>翻译的自动评估原本以为会是一个比较偏向语言学和数学的领域，但也好像理所当然的走到了预训练模型这条路上。虽然说这些复杂的自动评估方法性能很好，但在各种机器翻译论文中 BLEU 依旧在使用。可能还是因为 BLEU 虽然性能一般，但也比较方便。外加机器翻译论文通常使用多个指标同时比较，某一个指标的性能有倾向性，多个指标放在一起也就没有太多影响了。</p><p>END</p><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>宗成庆. 统计自然语言处理[M]. 清华大学出版社, 2013. <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li><li id="footnote2" class="footnote-item"><p>Hovy E H . Toward Finely Differentiated Evaluation Metrics for Machine Translation[J]. proceedings of the eagles workshop on standards &amp; evaluation.pisa italy.international standards for language engineering, 1999. <a href="#footnote-ref2" class="footnote-backref">↩︎</a></p></li><li id="footnote3" class="footnote-item"><p>Papineni S . Blue ; A method for Automatic Evaluation of Machine Translation[C]// Meeting of the Association for Computational Linguistics. Association for Computational Linguistics, 2002. <a href="#footnote-ref3" class="footnote-backref">↩︎</a></p></li><li id="footnote4" class="footnote-item"><p>Satanjeev B . METEOR: An Automatic Metric for MT Evaluation with Improved Correlation with Human Judgments[J]. ACL-2005, 2005:228-231. <a href="#footnote-ref4" class="footnote-backref">↩︎</a></p></li><li id="footnote5" class="footnote-item"><p>Wikipedia <a href="#footnote-ref5" class="footnote-backref">↩︎</a></p></li><li id="footnote6" class="footnote-item"><p>Wikipedia contributors.METEOR[DB/OL].https://en.wikipedia.org/w/index.php?title=METEOR&amp;oldid=962913935,2020-6-16. <a href="#footnote-ref6" class="footnote-backref">↩︎</a></p></li><li id="footnote7" class="footnote-item"><p>Zhang T , Kishore V , Wu F , et al. BERTScore: Evaluating Text Generation with BERT[J]. 2019. <a href="#footnote-ref7" class="footnote-backref">↩︎</a></p></li><li id="footnote8" class="footnote-item"><p>Sellam T , Das D , Parikh A P . BLEURT: Learning Robust Metrics for Text Generation[J]. Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics, 2020. <a href="#footnote-ref8" class="footnote-backref">↩︎</a></p></li></ol></section>',85);function $(x,E){return a(),o("div",null,[u,m,n(" more "),g])}const _=e(h,[["render",$],["__file","2021s12.html.vue"]]);export{_ as default};
