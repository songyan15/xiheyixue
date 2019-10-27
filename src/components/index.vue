<template>
    <div style="height:100%;" class="indexPage">
        <swiper :list="demo01_list" v-model="demo01_index" dots-class="custom-bottom" dots-position="center"></swiper>
        <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="5">
            <!--<grid-item label="免费课程" @click.native="freeSubject($store.state.subjectType[0].Id)">
                <img slot="icon" src="../assets/images/free.png">
            </grid-item>-->
            <grid-item label="章节练习" @click.native="exam">
                <img slot="icon" src="../assets/images/lianxi2.png">
            </grid-item>
            <grid-item label="模拟考场" @click.native="imitateExam">
                <img slot="icon" src="../assets/images/time.png">
            </grid-item>
            <grid-item label="历年真题" @click.native="word">
                <img slot="icon" src="../assets/images/mianshen.png">
            </grid-item>
            <grid-item label="熙和押题" @click.native="predict">
                <img slot="icon" src="../assets/images/zhinan.png">
            </grid-item>
        </grid>
        <!-- <div class="panel">
          <img class="mediaImg" src="../assets/images/1.jpg" alt="">
          <span class="mediaContent">您还没有开启学习计划，快去量身定制吧</span>
          <x-button mini plain type="primary" class="custom-primary-red mediaBtn" >立即查看</x-button>
        </div> -->
        <panel :header="header" :list="list" :type="type" @on-click-item="handlerJump"></panel>
        <!--@on-click-item="clickTo"-->
    </div>
</template>

<script>
    import {Group, Cell, Swiper, Grid, GridItem, GroupTitle, Panel} from 'vux'
    import {gotoBrowserFun} from '@/utils/jump'
    import {mapMutations} from 'vuex'

    export default {
        components: {
            Group,
            Cell,
            Swiper,
            Grid,
            GridItem,
            GroupTitle,
            Panel
        },
        data() {
            return {
                demo01_list: [{
                    url: 'javascript:',
                    img: require('../assets/images/banner2.png'),
                    title: ''
                }, {
                    url: 'javascript:',
                    img: require('../assets/images/banner3.png'), // 404
                    title: ''
                }, {
                    url: 'javascript:',
                    img: require('../assets/images/banner1.jpg'),
                    title: ''
                }],
                demo01_index: 0,
                type: '5',
                header: "热门课程",
                list: [
                    {
                        src: require('../assets/images/hotClass1.png'),
                        fallbackSrc: 'www.baidu.com',
                        title: '基础课程',
                        desc: '考点全覆盖，逐一讲解，打牢基础；',
                        subSrc: "",
                        index: 1,
                        meta: {
                            source: '600人参与',
                            other: '查看详情'
                        }
                    }, {
                        src: require('../assets/images/hotClass2.jpg'),
                        title: '精讲课程',
                        desc: ' 重点稳突破，轻松记忆，全面掌握；',
                        subSrc: "",
                        index: 0,
                        meta: {
                            source: '500人参与',
                            other: '查看详情'
                        }
                    }, {
                        src: require('../assets/images/hotClass3.png'),
                        fallbackSrc: '',
                        title: '冲刺课程',
                        desc: '考前划重点，推演押题，直击考点。',
                        index: 2,
                        subSrc: "",
                        meta: {
                            source: '500 人参与',
                            other: '查看详情'
                        }
                    }
                ],
                subjectType: "",
                baseStatus:false,
                simulateStatus:false,
                wordStatus:false,
                pivotStatus:false
            }
        },
        created() {
            this.$axios.get('/WebServices.ashx?action=CourseCatalogList&code=' + this.$store.state.courseCode)
                .then((res) => {
                    this.$store.commit('setSubjectType', res.data.data);
                    console.log(this.$store.state.subjectType);
                });

            this.baseMethod('章节练习');
            this.baseMethod('模拟考场');
            this.baseMethod('历年真题');
            this.baseMethod('熙和押题');
        },
        methods: {
            baseMethod(dataName) {
                let userId = localStorage.getItem('Uid'),
                    dataId = dataName;//'基础试题';
                this.$axios.get('/WebServices.ashx?action=CheckBuyState&Code=' + this.$store.state.courseCode + '&userID=' + userId + "&dataID=" + dataId)
                    .then((res) => {
                        if (res.data.data!=null) {
                            //dataStauts = "true";
                            if(dataName == '章节练习'){
                                this.baseStatus = true;
                            }else if(dataName == '模拟考场'){
                                this.simulateStatus = true;
                            }else if(dataName == '历年真题'){
                                this.wordStatus = true;
                            }else if(dataName == '熙和押题'){
                                this.pivotStatus = true;
                            }
                        }else{
                            if(dataName == '章节练习'){
                                this.baseStatus = false;
                            }else if(dataName == '模拟考场'){
                                this.simulateStatus = false;
                            }else if(dataName == '历年真题'){
                                this.wordStatus = false;
                            }else if(dataName == '熙和押题'){
                                this.pivotStatus = false;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            freeSubject(dataType) {
                // this.$router.push('/resource')
            },
            exam() {
                if (this.baseStatus) {
                    this.$router.push({
                        path: '/freeSubject',
                        query: {
                            dataType: this.$store.state.subjectType[0].Id,
                            kind: 1,
                            flg:1 //flg=1代表课程
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            imitateExam() {
                if (this.simulateStatus) {
                    this.$router.push({
                        path: '/simulation',
                        query: {
                            dataType: 0,
                            kind: 0
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            word() {
                if (this.wordStatus) {
                    this.$router.push({
                        path: '/word',
                        query: {
                            dataType: 1,
                            kind: 0
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            predict() {
                if (this.pivotStatus) {
                    this.$router.push({
                        path: '/pivot',
                        query: {
                            dataType: 2,
                            kind: 2
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            /*clickTo(item, $event){
              //debugger
              this.$store.commit('UPDATE_TYPENAME',item.title);
              gotoBrowserFun(item.subSrc);
            }*/
            handlerJump(item) {
                console.log(item);
                //debugger
                this.$router.push({
                    path: '/index/course',
                    query: {
                        id: item.index
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    .indexPage .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {
        background: none;
        background-size: cover;
    }

    .weui-grid:after {
        border: none;
    }

    .weui-grids {
        background-color: #fff;
        margin-bottom: 15px;

        .weui-grid__label {
            font-size: 12px;
        }
    }

    .panel {
        display: inline-block;
        width: 100%;
        background-color: #fff;
        padding: 18px 10px;
        box-sizing: border-box;

        .mediaImg {
            float: left;
            width: 50px;
            height: 50px;
            margin-right: 5px;
            border-radius: 50%;
        }

        .mediaContent {
            float: left;
            width: calc(~'100% - 150px');
            font-size: small;
        }

        .mediaBtn {
            float: right;
            width: 90px;
            border-radius: 90px;
        }
    }

    .weui-media-box__info .weui-media-box__info__meta {
        color: #1aad19;
    }

    .weui-panel .weui-panel__hd {
        padding: 14px 15px 10px;
        color: #333;
        font-size: 16px;
        font-weight: bolder;
        position: relative;
    }

    .weui-panel__hd:before {
        content: "";
        margin-right: 5px;
        border-left: 5px solid #1aad19;
    }

    .weui-media-box {
        margin: 10px;
        padding: 0 10px 5px !important;
        position: relative;
        border: 1px solid cornflowerblue;
        border-radius: 4px;
        background-color: #e7ebed;
    }

    .weui-media-box .weui-media-box_appmsg {
        height: 80px;
        margin-bottom: 5px;
        border-bottom: 1px solid #bbb;
    }

    .weui-media-box .weui-media-box__info__meta_extra {
        float: right;
        border-left: 0;
        color: #fbaf03;
    }

    .weui-media-box .weui-media-box_appmsg .weui-media-box__hd {
        width: 100px;
    }

    .weui-media-box .weui-media-box_appmsg .weui-media-box__thumb {
        width: 100%;
        /*height:100%;*/
        vertical-align: middle;
    }
</style>
