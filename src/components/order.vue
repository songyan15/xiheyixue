<style scoped lang="less">
    .noData {
        text-align: center;
    }
    .card{
        margin:10px;
        padding: 15px;
        position: relative;
        background: #fff;
        border-radius: 4px;
    }
    .header{
        font-weight: 400;
        font-size: 17px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        word-wrap: break-word;
        word-break: break-all;
        padding-bottom:5px;
        border-bottom: 1px solid #aaa;
    }
    .chkGroup{
        display: inline-block;
        padding: 15px ;
        .active{
            background: #ff9446;
        }
    }
    .info{
        font-size: 12px;
        padding:5px 0;
        .blue{
            display: inline-block;
            padding: 2px 5px;
            text-align: center;
            color:deepskyblue;
            font-size: 10px;
            border:1px solid deepskyblue;
            border-radius: 3px;
        }
    }
    .footer{
        padding-top:5px;
        border-top:1px solid #aaa;
        text-align: right;
        .oldPrice{
            font-size: 10px;
            color:#aaa;
            margin-right:15px;
            text-decoration:line-through
        }
        .curPrice{
            color: #E64340;
            margin-right:15px;
        }
    }
</style>
<template>
    <div class="order">
        <div class="list">
            <div class="card" v-for="(item, index) in coursePrices" :key="index">
                <h4 class="header">{{item.CatalogName}}</h4>
                <!--<p class="info">考点全覆盖，逐一讲解，打牢基础；</p>-->
                <p class="info">服务课程：<span class="blue">{{item.CatalogName}}</span></p>
                <div class="footer">
                    <!--<span class="oldPrice">原价¥99</span>
                    <span class="curPrice">¥35</span>-->
                    <x-button mini type="warn"  @click.native="buySelect(item.CatalogList)">购买</x-button>
                </div>
            </div>
            <div class="card" v-for="(result, index) in modelPrices" :key="result.CatalogName">
                <h4 class="header">{{result.CatalogName}}</h4>
                <p class="info">服务内容：<span class="blue">{{result.CatalogName}}</span></p>
                <div class="footer">
                    <x-button mini type="warn"  @click.native="buySelect(result.CatalogList)">购买</x-button>
                </div>
            </div>
        </div>
        <div v-transfer-dom>
            <popup v-model="dialogCourse">
                <popup-header
                    title="充值购买"
                    :show-bottom-border="false"
                    @on-click-left="dialogCourse = false"
                    @on-click-right="dialogCourse = false"><!--left-text="取消" right-text="确定"-->
                </popup-header>
                <span class="chkGroup" v-for="(rs,n) in catalogList" :key="n">
                    <x-button mini :type="activeIndex==n?'warn':'default'"  @click.native="dateSelect(rs,n)"  >{{rs.Name}}</x-button> <!--:class="'active':''"-->
                </span>
                <div class="payType">
                    <group title="支付方式" v-if="!isIphone">
                        <radio  :options="radio" value="1" @on-change="change"></radio>
                    </group>
                    <!-- <group title="支付方式" v-if="isIphone">
                        <radio  :options="radio2" value="2" @on-change="change"></radio>
                    </group> -->
                </div>
                <div class="footer" style="padding: 20px">
                    <span class="oldPrice">原价¥{{price}}</span>
                    <span class="curPrice">现价¥{{realPrice}}</span>
                    <!--<p style="margin-top:8px;">-->
                        <x-button mini type="warn" @click.native="paySubmit">提交</x-button>
                    <!--</p>-->
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import { PopupHeader, Popup, TransferDom, Group, Radio } from 'vux'
    import {mPay} from '@/utils/pay'
    window['payResult'] = function(res) {
        //let ress = JSON.parse(res);
        //alert(res);
        history.back(-1);
        //window.location.href = window.location.href.replace('order','paymentOk');
    };
    export default {
        components:{
            PopupHeader, Popup, TransferDom, Group, Radio
        },
        data() {            
            let ua = navigator.userAgent.toLowerCase();
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            return {
                coursePrices:'',
                modelPrices:'',
                dialogCourse:false,
                catalogList:[],
                list: [],
                price:'',
                realPrice:'',
                activeIndex:-1,
                radio: [{
                    icon: require('../assets/images/wechat.png'),
                    key: '0',
                    value: '微信'
                }, {
                    icon: require('../assets/images/zhifubao.jpg'),
                    key: '1',
                    value: '支付宝'
                }],
                radio2:[{
                    icon: require('../assets/images/applePay.jpg'),
                    key: '2',
                    value: '苹果支付'
                }],
                payInfo:{},
                payWay:/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?2:1,
                isIphone:/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?true:false
            }
        },
        created() {
            this.getData();
        },
        watch:{
            payWay(val){
                this.payInfo.type=val;
            }
        },
        methods: {
            getData() {
                this.$axios.get('/WebServices.ashx?action=TablePricesList&code=' + this.$store.state.courseCode)
                    .then((res) => {
                        if (res.data.data!=null&&res.data.data!='') {
                            //debugger
                            this.list = res.data.data;
                            this.coursePrices = this.list.CoursePrices;
                            this.modelPrices = this.list.ModelPrices;
                            console.log(this.list);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            handlerJump(){
                console.log('1')
            },
            buySelect(res){
                this.catalogList = res;
                this.dateSelect(res[0],0);
                this.dialogCourse = true;
            },
            dateSelect(res,index){
                this.price = res.Price;
                this.activeIndex = index;
                this.realPrice = res.RealPrice;
                this.payInfo = res;
                this.payInfo.type = this.payWay;
            },
            change(value, label){
                console.log('change:', value, label)
                this.payWay = value;
            },
            paySubmit(){
                this.payInfo.userId = localStorage.getItem('Uid');
                mPay(this.payInfo);
            }
        }
    }
</script>