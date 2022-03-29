---
title: 负外边距与非语义三栏布局
date: 2022-03-29 11:10:19
categories: [学习, CSS]
---

<script src="https://unpkg.com/vue@next"></script>
<link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css" />
 <script src="https://unpkg.com/element-plus"></script>

<style>
    :root {
    --el-color-primary: #3ea09e;
    }

    @media (min-width: 1530px) {
        .show {
            display: flex;
        }
        .result {
            width: 300px;
            margin: 0 16px;
        }
        .controller {
            flex: 1;
            margin: 0 8px;
        }
    }
    @media (max-width: 1530px){
        .show {
            width: 100%;
        }
        .result {
            width: 100%;
            margin-bottom: 12px;
        }
        .controller {
            width: 100%;
            margin-top: 12px;
        }
    }
    @media (min-width: 425px){
        .controller-item {
            margin: 16px 4px;
            flex-direction: row;
            align-items: center;
        }
        .controller-item .controller-label {
            flex: 1;
        }
        .controller-item .elcom {
            flex: 2;
            margin-left: 12px;
        }
    }
    @media (max-width: 425px){
        .controller-item {
            margin: 24px 16px;
            flex-direction: column;
            align-items: left;
        }
        .controller-item .controller-label {
            flex: 1;
            font-size: 12px;
        }
        .controller-item .elcom {
            flex: 2;
            margin-top: 8px;
            margin-left: 0;
        }
    }
    .result {
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    }
    .controller-item {
        display: flex;
    }
</style>

# 圣杯布局

<div id="holy-grail" class="playground">
    <div class="show">
        <div class="result">
            <div style="height: 300px" :style="hgContainer">
                <div style="background-color: #F5FAF0DD; height: 150px; text-align: center; z-index: 999;" :style="hgCenter"></div>
                <div style="background-color: #6DAFA4DD; height: 80px; width: 50px; text-align: center;" :style="hgLeft"></div>
                <div style="background-color: #276562DD; height: 80px; width: 100px; text-align: center; z-index: 999;" :style="hgRight"></div>
            </div>
        </div>
        {% raw %}
        <div class="controller">
            <div class="controller-item">
                <div class="controller-label"> container:padding-left </div>
                <el-slider class="elcom" size="small" v-model="hgContainerRaw.paddingLeft" :min="0" :max="200" :marks="{50: '50px'}" ></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> container:padding-right </div>
                <el-slider class="elcom" size="small" v-model="hgContainerRaw.paddingRight" :min="0" :max="200" :marks="{100: '100px'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> center:float </div>
                <div class="elcom">
                    <el-radio-group v-model="hgCenterRaw.float" size="small">
                        <el-radio-button label="left" >left</el-radio-button>
                        <el-radio-button label="right">right</el-radio-button>
                        <el-radio-button label="none">none</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> center:width </div>
                <el-slider class="elcom" size="small" v-model="hgCenterRaw.width" :min="0" :max="100" :marks="{100: '100%'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> left:float </div>
                <div class="elcom">
                    <el-radio-group v-model="hgLeftRaw.float" size="small">
                        <el-radio-button label="left" >left</el-radio-button>
                        <el-radio-button label="right">right</el-radio-button>
                        <el-radio-button label="none">none</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> left:position </div>
                <div class="elcom">
                    <el-radio-group v-model="hgLeftRaw.position" size="small">
                        <el-radio-button label="static" >static</el-radio-button>
                        <el-radio-button label="relative">relative</el-radio-button>
                        <el-radio-button label="absolute">absolute</el-radio-button>
                        <el-radio-button label="fixed">fixed</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> left:margin-left </div>
                <el-slider class="elcom" size="small" v-model="hgLeftRaw.marginLeft" :min="-100" :max="100" :marks="lmlmarks"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> left:right </div>
                <el-slider class="elcom" size="small" v-model="hgLeftRaw.right" :min="0" :max="200" :marks="{50: '50px'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> right:float </div>
                <div class="elcom">
                    <el-radio-group v-model="hgRightRaw.float" size="small">
                        <el-radio-button label="left" >left</el-radio-button>
                        <el-radio-button label="right">right</el-radio-button>
                        <el-radio-button label="none">none</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> right:position </div>
                <div class="elcom">
                    <el-radio-group v-model="hgRightRaw.position" size="small">
                        <el-radio-button label="static" >static</el-radio-button>
                        <el-radio-button label="relative">relative</el-radio-button>
                        <el-radio-button label="absolute">absolute</el-radio-button>
                        <el-radio-button label="fixed">fixed</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> right:left </div>
                <el-slider class="elcom" size="small" v-model="hgRightRaw.left" :min="0" :max="200" :marks="{100: '100px'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> right:margin-left </div>
                <el-slider class="elcom" size="small" v-model="hgRightRaw.marginLeft" :min="-100" :max="200" :marks="rmrmarks"></el-slider>
            </div>
        </div>
    {% endraw %}
    </div>
</div>


<script>
    const HolyGrailDemo = {
        data() {
            const lmlmarks = {};
            lmlmarks[-100] = '-100%';
            const rmrmarks = {};
            rmrmarks[-100] = '-100px';
            return {
                lmlmarks,
                rmrmarks,
                hgContainerRaw: {
                    paddingLeft: 50,
                    paddingRight: 100,
                },
                hgCenterRaw: {
                    float: 'left',
                    width: 100,
                },
                hgLeftRaw: {
                    float: 'left',
                    marginLeft: -100,
                    position: 'relative',
                    right: 50,
                },
                hgRightRaw: {
                    float: 'left',
                    marginLeft: -100,
                    position: 'relative',
                    left: 100,
                }
            }
        },
        computed: {
            hgContainer(){
                return {
                    paddingLeft: `${this.hgContainerRaw.paddingLeft}px`,
                    paddingRight: `${this.hgContainerRaw.paddingRight}px`
                }
            },
            hgCenter(){
                return {
                    float: this.hgCenterRaw.float,
                    width: `${this.hgCenterRaw.width}%`
                }
            },
            hgLeft(){
                return {
                    float: this.hgLeftRaw.float,
                    position: this.hgLeftRaw.position,
                    marginLeft: `${this.hgLeftRaw.marginLeft}%`,
                    right: `${this.hgLeftRaw.right}px`,
                }
            },
            hgRight(){
                return {
                    float: this.hgRightRaw.float,
                    marginLeft: `${this.hgRightRaw.marginLeft}px`,
                    position: this.hgRightRaw.position,
                    left: `${this.hgRightRaw.left}px`
                }
            }
        }
    }
    const app = Vue.createApp(HolyGrailDemo);
    app.use(ElementPlus);
    app.mount('#holy-grail');
</script>

# 双飞翼布局

<div id="flying-wing" class="playground">
    <div class="show">
        <div class="result">
            <div style="min-height: 300px" :style="fwContainer">
                <div style="background-color: #F5FAF0DD; height: 150px;" :style="fwCenter">
                    <div style="background-color: #DDDDDDDD; height: 120px; text-align: center;" :style="fwCenterInner">
                    </div>
                </div>
                <div style="background-color: #6DAFA4DD; height: 80px; width: 50px; text-align: center;" :style="fwLeft"></div>
                <div style="background-color: #276562DD; height: 80px; width: 100px; text-align: center;" :style="fwRight"></div>
            </div>
        </div>
        {% raw %}
        <div class="controller">
            <div class="controller-item">
                <div class="controller-label"> center:float </div>
                <div class="elcom">
                    <el-radio-group v-model="fwCenterRaw.float" size="small">
                        <el-radio-button label="left" >left</el-radio-button>
                        <el-radio-button label="right">right</el-radio-button>
                        <el-radio-button label="none">none</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> center:width </div>
                <el-slider class="elcom" size="small" v-model="fwCenterRaw.width" :min="0" :max="100" :marks="{100: '100%'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> center-inner:margin-left </div>
                <el-slider class="elcom" size="small" v-model="fwCenterInnerRaw.marginLeft" :min="-100" :max="100" :marks="{50: '50px'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> center-inner:margin-right </div>
                <el-slider class="elcom" size="small" v-model="fwCenterInnerRaw.marginRight" :min="-100" :max="200" :marks="{100 : '100px'}"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> left:float </div>
                <div class="elcom">
                    <el-radio-group v-model="fwLeftRaw.float" size="small">
                        <el-radio-button label="left" >left</el-radio-button>
                        <el-radio-button label="right">right</el-radio-button>
                        <el-radio-button label="none">none</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> left:margin-left </div>
                <el-slider class="elcom" size="small" v-model="fwLeftRaw.marginLeft" :min="-100" :max="100" :marks="lmlmarks"></el-slider>
            </div>
            <div class="controller-item">
                <div class="controller-label"> right:float </div>
                <div class="elcom">
                    <el-radio-group v-model="fwRightRaw.float" size="small">
                        <el-radio-button label="left" >left</el-radio-button>
                        <el-radio-button label="right">right</el-radio-button>
                        <el-radio-button label="none">none</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="controller-item">
                <div class="controller-label"> right:margin-left </div>
                <el-slider class="elcom" size="small" v-model="fwRightRaw.marginLeft" :min="-100" :max="200" :marks="rmrmarks"></el-slider>
            </div>
        </div>
    {% endraw %}
    </div>
</div>

<script>
     const FlyingWingDemo = {
        data() {
            const lmlmarks = {};
            lmlmarks[-100] = '-100%';
            const rmrmarks = {};
            rmrmarks[-100] = '-100px';
            return {
                lmlmarks,
                rmrmarks,
                fwContainer: {},
                fwCenterRaw: {
                    float: 'left',
                    width: 100,
                },
                fwCenterInnerRaw: {
                    marginLeft: 50,
                    marginRight: 100
                },
                fwLeftRaw: {
                    float: 'left',
                    marginLeft: -100,
                },
                fwRightRaw: {
                    float: 'left',
                    marginLeft: -100,
                }
            }
        },
        computed: {
            fwCenter(){
                return {
                    float: this.fwCenterRaw.float,
                    width: `${this.fwCenterRaw.width}%`
                }
            },
            fwCenterInner(){
                return {
                    marginLeft: `${this.fwCenterInnerRaw.marginLeft}px`,
                    marginRight: `${this.fwCenterInnerRaw.marginRight}px`
                }
            },
            fwLeft(){
                return {
                    float: this.fwLeftRaw.float,
                    marginLeft: `${this.fwLeftRaw.marginLeft}%`,
                }
            },
            fwRight(){
                return {
                    float: this.fwRightRaw.float,
                    marginLeft: `${this.fwRightRaw.marginLeft}px`
                }
            }
        }
    }
    const app1 = Vue.createApp(FlyingWingDemo);
    app1.use(ElementPlus);
    app1.mount('#flying-wing');
</script>