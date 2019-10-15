
<style lang="less">
.option{
    /* .vux-flexbox .vux-flexbox-item:first-child {
        margin-left: .55rem!important;
        margin-top: .1rem!important;
    } */
    .vux-flex-row {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .vux-flexbox .vux-flexbox-item {
        /* margin-bottom: .2rem; */
        padding: .2rem;
        text-align: center;
        height: 4rem;
        /* line-height: 3rem; */
        border-radius: .4rem;
        /* background-color: #eee; */
        box-sizing: border-box;

    }
    .optionWrap{
        //margin: .4rem;
        text-align: center;
        height: 3.8rem;
        line-height: 3.8rem;
        border-radius: .4rem;
        background-color: #eee;
        &.active{
            background-color: red;
            color:#fff;
        }
    }
    .weui-cells__title{
        text-align: center;
    }
    .weui-icon-success-no-circle,.weui-icon-waiting-circle{
        color:red;
        margin-left: .2rem;
    }
    .fr{
        float: right;
        color:red
    }
    .noData{
      padding-top: 2rem;
      text-align: center;
    }
}
</style>

<template>
    <div class="chapter option">
        <group v-if="list.length>0">
            <!-- <group-title  slot="title">
                <div style="text-align:right;">
                    <span style="display:inline-block;text-align:center;">
                        <icon type="waiting-circle"></icon>
                        <br>{{countdownNum}}
                    </span>
                    <span style="display:inline-block;text-align:center;">
                        <icon type="success-no-circle"></icon>
                        <br>交卷
                    </span>
                </div>
            </group-title> -->
            <group-title slot="title">
                <div style="text-align: center;">
                    <span>{{subTitle}}</span>
                    <a class="fr red" @click="resetOption">重做</a>
                </div>
            </group-title>
            <!-- <grid :cols="5" :show-lr-borders="false" :show-vertical-dividers="false"> -->
                <flexbox :gutter="0"  wrap="wrap">
                    <flexbox-item :span="1/5"  v-for="(item,index) in list" :key="index"
                        @click.native="getItem(item.Id)" >
                        <div class="optionWrap" :class="item.WriteState == 1 ? 'active':''">
                            {{index+1}}
                        </div>
                    </flexbox-item>
                </flexbox>
            <!-- </grid> -->
        </group>
        <div class="noData" v-else>
            暂无数据
        </div>
    </div>
</template>
<script>
    import { GroupTitle,Grid,GridItem,Flexbox, FlexboxItem,Icon} from 'vux'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: "vedioMenu",
        components: {
            GroupTitle,
            Grid,
            GridItem,
            Flexbox,
            FlexboxItem,
            Icon
        },
        data(){
            return {
                activeClass: -1,
                list:[],
                countdownNum:'',
                maxtime:90*60
            }
        },
        computed:{
            ...mapState({
                subTitle: state=>state.subTitle
            })
        },
        created() {
            this.getData()
        },
        methods:{
            getData(){
                let userID = localStorage.getItem('Uid');
                this.$axios.get('/WebServices.ashx?action=SubjectMainList&dataID='+this.$route.query.id+'&userID='+userID)
                .then((res) =>{
                    if(res.data.data.length>0){
                        this.list = res.data.data
                        this.$store.commit('setSubjectIndexList',res.data.data);
                        //this.resetTime();
                    }else{

                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getItem(id) {
                //debugger
                let index = this.findIndex(this.list,id)
                console.log(this.list[index+1]);
                //this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
                this.$router.push({
                    path:'/subject',
                    query:{
                        id:id,
                        examId:this.$route.query.id,
                        kind:this.$route.query.kind,
                        mainSub:this.$route.query.mainSub,
                        prevId:this.list[index-1]?this.list[index-1].Id:id,
                        nextId:this.list[index+1]?this.list[index+1].Id:id
                    }
                })
            },
            findIndex(l,id){
                let indexNum = ""
                l.map((item,index)=>{
                    if(item.Id === id) {
                      indexNum = index
                    }
                })
                return indexNum
            },
            resetTime(){
                let self = this,minutes='',seconds='',msg='',timer="";
                var time = window.setInterval(function () {
                    if(self.maxtime>=0){
                        minutes = Math.floor(self.maxtime/60); //计算出分钟
                        seconds = Math.floor(self.maxtime%60);  //计算出秒
                        msg = (minutes<10?'0'+minutes:minutes)+':'+(seconds<10?'0'+seconds:seconds);
                        self.countdownNum = msg;
                        --self.maxtime;
                    }
                    else{
                        clearInterval(time);
                        alert("时间到，考试结束!");
                    }
                },1000)
            },
            resetOption(){
                let self = this,userID = localStorage.getItem('Uid');;
                this.$vux.confirm.show({
                    title: '',
                    content: '确认要重做本章节下的题目',
                    /* onShow () {
                        console.log('plugin show')
                    },
                    onHide () {
                        console.log('plugin hide')
                    },*/
                    onCancel () {
                        console.log('plugin cancel')
                    },
                    onConfirm () {
                        self.$axios.get('/WebServices.ashx?action=SubjectUserReset&dataID='+self.$route.query.id+'&userID='+userID)
                        .then((res) =>{
                          //debugger
                            if(res.data&&res.data.code==0&&res.data.data&&res.data.data!=null){
                                self.getData()
                                return
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                    }
                })
            }
        }
    }
</script>
