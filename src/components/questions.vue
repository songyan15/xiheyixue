<template>
    <div class="questions">
        <div class="panel">
            <img src="../assets/images/boshi.jpg" alt="" class="userImg">
            <x-button class="dateTime" @click.native="showTime">考试倒计时0天</x-button>
            <!-- <x-button class="buyBtn"><i class="icon buyIcon"></i>充值购买</x-button> -->
            <div class="info">
                <i class="icon time"></i>
                学而时习之，才能让考试更简单
            </div>
        </div>
        <ul class="media">
            <li>
                <div @click="freeSubject">
                    <img class="mediaImg" src="../assets/images/lianxi.png" alt="">
                    <div class="mediaContent">
                        <h4 class="tit">章节练习</h4>
                        <p class="info">精选试题 智能分析</p>
                    </div>
                </div>
            </li>
            <li>
                <div @click="handeleSimulation">
                    <img class="mediaImg" src="../assets/images/time.png" alt="">
                    <div class="mediaContent">
                        <h4 class="tit">模拟考场</h4>
                        <p class="info">模拟试题 随机模考</p>
                    </div>
                </div>
            </li>
            <li>
                <div @click="handeleWord">
                    <img class="mediaImg" src="../assets/images/mianshen.png" alt="">
                    <div class="mediaContent">
                        <h4 class="tit">历年真题</h4>
                        <p class="info">提升技巧 对答如流</p>
                    </div>
                </div>
            </li>
            <li>
                <div @click="handelePivot">
                    <img class="mediaImg" src="../assets/images/zhinan.png" alt="">
                    <div class="mediaContent">
                        <h4 class="tit">熙和押题</h4>
                        <p class="info">考试大纲 应试技巧</p>
                    </div>
                </div>
            </li>
            <li>
                <router-link to="/errorPage">
                    <img class="mediaImg" src="../assets/images/zhixin.png" alt="">
                    <div class="mediaContent">
                        <h4 class="tit">错题</h4>
                        <p class="info">错题收藏 笔记搜题</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "questions",
        data() {
            return {
                baseStatus:false,
                simulateStatus:false,
                wordStatus:false,
                pivotStatus:false
            }
        },
        created() {
            this.baseMethod('章节练习');
            this.baseMethod('模拟考场');
            this.baseMethod('历年真题');
            this.baseMethod('熙和押题');
        },
        methods: {
            showTime() {
                /*this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM-DD',
                    onConfirm(val) {
                        console.log('plugin confirm', val)
                    },
                    onShow() {
                        console.log('plugin show')
                    },
                    onHide() {
                        console.log('plugin hide')
                    }
                })*/
            },
            baseMethod(dataName){
                let userId = localStorage.getItem('Uid'),
                    dataId = dataName;//'基础试题';
                this.$axios.get('/WebServices.ashx?action=CheckBuyState&Code=' + this.$store.state.courseCode + '&userID='+userId+"&dataID="+ dataId )
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
            freeSubject() {
                if (this.baseStatus) {
                    this.$router.push({
                        path: '/freeSubject',
                        query: {
                            dataType: this.$store.state.subjectType.length > 0 ? this.$store.state.subjectType[0].Id : "",
                            kind: 1,
                            flg:1 //1代表课程
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            handeleSimulation() {
                if (this.simulateStatus) {
                    this.$router.push({
                        path: '/simulation',
                        query: {
                            dataType: 0,
                            kind: 0
                        }
                    })
                }else {
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            handeleWord() {
                if (this.wordStatus) {
                    this.$router.push({
                        path: '/word',
                        query: {
                            dataType: 1,
                            kind: 0
                        }
                    })
                }else {
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            handelePivot() {
                if (this.pivotStatus) {
                    this.$router.push({
                        path: '/pivot',
                        query: {
                            dataType: 2,
                            kind: 2
                        }
                    })
                }else {
                    this.$router.push({
                        path: '/order'
                    })
                }
            },
            goTo(index) {
                switch (index) {
                    case 1:
                        this.$router.push({path: '/chapter'})
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .questions {
        .panel {
            width: 100%;
            background-color: #fff;
            padding: 20px 0;
        }

        .userImg {
            display: inline-block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            vertical-align: bottom;
        }

        .dateTime {
            display: inline-block;
            width: 42%;
            margin: 0 3px;
            font-size: 16px;
        }

        .buyBtn {
            display: inline-block;
            width: 36%;
            font-size: 16px;
            padding: 2px 0;
        }

        .buyIcon {
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url("../assets/images/qiandai.png") center;
            background-size: cover;
            vertical-align: sub;
            margin-right: 3px;
        }

        .icon.time {
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url("../assets/images/time.png") center;
            background-size: cover;
            vertical-align: middle;
            margin-right: 3px;
        }

        .panel .info {
            position: relative;
            background-color: lavender;
            margin: 20px 5px 0;
            padding: 10px;
            border-radius: 5px;

            &:before {
                content: "";
                width: 0;
                height: 0;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 18px solid lavender;
                top: -16px;
                position: absolute;
            }
        }

        .media {
            width: calc(~'100% - 4px');
            margin: 8px 2px 0;

            li {
                display: inline-block;
                width: 49%;
                margin-bottom: 10px;
                padding: 8px 1px;
                background-color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
            }

            .tit {
                width: 100%;
                text-overflow: ellipsis; /*这就是省略号喽*/
                overflow: hidden; /*设置超过的隐藏*/
                white-space: nowrap; /*设置不断行*/
            }

            .mediaImg {
                float: left;
                width: 30px;
                height: 30px;
                margin-top: 12px;
                margin-left: 5px;
                margin-right: 5px;
                border-radius: 50%;
            }

            .mediaContent {
                float: left;
                width: calc(~'100% - 40px');

                .tit {
                    color: #000;
                }

                .info {
                    color: #666;
                    font-size: 13px;
                }
            }
        }
    }

</style>
