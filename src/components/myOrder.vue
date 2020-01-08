<style lang="less" scoped>
    .myOrder{
        .name,.desc{
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-align: left;
        }
        .name {
            color: #000;
            margin-bottom: 4px;
        }
        .desc {
            color: #aaa;
        }
        .noData{
            height: 70vh;
            line-height: 70vh;
            font-size: 1.2rem;
            text-align: center;
        }
    }
</style>
<style>
    .orderList .vux-cell-primary{
        display: none;
    }
</style>
<template>
    <div class="myOrder">
        <div class="orderList">
            <group>
                <cell v-for='(item,i) in list' :key='i' v-if="!isIOSStatus">
                        <p class="name">订单ID:{{item.TradeNo}}</p>
                        <p class="desc">商品种类：{{item.CommodityID}}</p>
                        <p class="desc">支付金额：{{item.Amount}}</p>
                        <p class="desc" v-if="item.PayType==0">支付方式：支付宝</p>
                        <p class="desc" v-if="item.PayType==1">支付方式：微信</p>
                        <p class="desc" v-if="item.PayType==2">支付方式：苹果支付</p>
                    <!--</div>-->
                    <!--<div v-if="isIOSStatus">-->
                        <!--<p class="name">订单ID:{{item.TradeNo}}</p>-->
                        <!--<p class="desc">商品种类：{{item.CommodityID}}</p>-->
                        <!--<p class="desc">支付金额：{{item.Amount}}</p>-->
                        <!--<p class="desc" v-if="item.PayType==2">支付方式：苹果支付</p>-->
                    <!--</div>-->
                </cell>
                <cell v-for='(item,i) in list' :key='item.TradeNo' v-if="isIOSStatus&&item.PayType==2">
                    <p class="name">订单ID:{{item.TradeNo}}</p>
                    <p class="desc">商品种类：{{item.CommodityID}}</p>
                    <p class="desc">支付金额：{{item.Amount}}</p>
                    <p class="desc" v-if="item.PayType==2">支付方式：苹果支付</p>
                </cell>
            </group>
        </div>
        <div class="noData" v-if="noData">
            暂无开通科目！
        </div>
    </div>
</template>
<script>
    import { Cell,Group} from 'vux'
    export default{
        name: "myOrder",
        component:{
            Cell,
            Group
        },
        data(){
            return {
                userId:localStorage.getItem('Uid'),
                noData:false,
                list:[],
                isIOSStatus:false
            }
        },
        created(){
            this.getData();
        },
        methods: {

            getData(){
                let ua = navigator.userAgent.toLowerCase();
                //android终端
                let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
                //ios终端
                let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    //debugger
                    this.isIOSStatus = true;
                }else{
                    this.isIOSStatus = false;
                }
                console.log(this.isIOSStatus);
                this.$axios.get('/webServices.ashx?action=UserOrderList&page=1&pageSize=999&userID=' + this.userId)
                    .then((res) => {
                        debugger
                        if (res.data.data != null&&res.data.data.length>0) {
                            this.list = res.data.data;
                        } else {
                            this.noData =true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
    }
</script>