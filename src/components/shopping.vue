<template>
    <div>
        <div style="height:44px;display:none;">
            <sticky
                scroll-box="vux_view_box_body"
                ref="sticky"
                :offset="46"
                :check-sticky-support="false"
                :disabled="disabled">
                <div class="vux-fixed tabBar">
                    <tab :line-width="1" v-model="index">
                        <tab-item class="vux-center" :selected="index==0"
                                  v-for="(item, index) in list"
                                  :key="index"
                                  @on-item-click="selected = index">{{item}}
                        </tab-item>
                    </tab>
                </div>
            </sticky>
        </div>
        <!--显示全部-->
        <div class="order-all">
            <box gap="5px 5px" v-if="goods.length>0">
                <div class="mustpush-item" v-for="(item,index) in goods" :key="index"
                     v-show="item.state == selected || selected == '0'">
                    <div @click="goTo(item.Url)">
                        <div class="img-box">
                            <img :src="imgSrc"/>
                        </div>
                        <div class="info-box">
                            <flexbox :gutter="0" class="tit">
                                <flexbox-item :span="12">
                                    <div class="headTit">
                                        <div class="goods-name">{{item.Name}}</div>
                                        <div class="sub">
                                            <!-- <span class="red">热卖</span>
                                            <span class="blue">原创</span>
                                            <span class="green">上线</span> -->
                                            <span class="red">{{item.CourseType}}</span>
                                        </div>
                                    </div>
                                </flexbox-item>
                            </flexbox>
                            <flexbox :gutter="0">
                                <flexbox-item :span="12">
                                    <div class="goods-price">￥{{item.Price}}</div>
                                    <div class="return-price">{{item.SaleCount}}人付款</div>
                                </flexbox-item>
                            </flexbox>
                        </div>
                    </div>
                </div>
            </box>
            <box gap="5px 5px" v-else>
                <div class="noData">
                    暂无数据
                </div>
            </box>
        </div>
    </div>
</template>

<script>
    import {
        Tab, TabItem, Sticky, Box,
        Flexbox,
        FlexboxItem,
    } from 'vux'
    import {gotoBrowserFun} from '@/utils/jump'

    export default {
        components: {
            Tab,
            TabItem,
            Sticky,
            Box,
            Flexbox,
            FlexboxItem,
        },
        data() {
            return {
                imgSrc: require('../assets/images/lichuangjianyanjichu.jpg'),
                list: ['全部', '课程', '图书', '其他'],
                index: 0,
                disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
                goods: [/* {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯1',
					price: '1234',
          returnPrice: '10',
          state:1
				}, {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯1',
					price: '1234',
          returnPrice: '10',
          state:1
				}, {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯1',
					price: '1234',
          returnPrice: '10',
          state:1
				}, {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯2',
					price: '1234',
					returnPrice: '10',
          state:2
				}, {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯2',
					price: '1234',
					returnPrice: '10',
          state:2
				}, {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯3',
					price: '1234',
					returnPrice: '10',
          state:3
				}, {
					imgSrc: '',
					name: 'JSLJD-32 好大一个灯3',
					price: '1234',
					returnPrice: '10',
          state:3
        } */],
                selected: this.$route.query.selected ? this.$route.query.selected : '0',//tab选中状态
            }
        },
        created() {
            this.getData(1, 999);
        },
        methods: {
            getData(page, pageSize) {
                //debugger
                this.$axios.get('/WebServices.ashx?action=TableGoodsList&code=' + this.$store.state.courseCode + '&page=' + page + '&pageSize=' + pageSize)
                    .then((res) => {
                        if (res.data.data.length > 0) {
                            this.goods = res.data.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            goTo(url) {
                gotoBrowserFun(url)
            }
        }
    }
</script>
<style scoped lang="less">
    .noData {
        text-align: center;
    }

    .tabBar {
        top: 46px;
    }

    @width88: 6rem;
    .mustpush-item {
        background: #FFFFFF;
        width: 100%;
        height: 6.5rem;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 10px;

        .img-box {
            width: @width88;
            height: @width88;
            background-color: #eaeeef;
            float: left;
            margin: .3rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .headTit {
            height: 60px;
        }

        .info-box {
            float: right;
            width: calc(~"100% - @{width88} - 0.6rem");
            height: 100%;
            padding: 10px 15px 10px 10px;
            font-size: 14px;
            box-sizing: border-box;

            .goods-name {
                /* height: 40px; */
                line-height: 20px;
                -webkit-line-clamp: 2;
                /*用来限制在一个块元素显示的文本的行数*/
                display: -webkit-box;
                /*必须结合的属性，将对象作为弹性伸缩盒子模型显示*/
                -webkit-box-orient: vertical;
                /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
                overflow: hidden;
            }

            .icon-share {
                text-align: right;
                height: 40px;

                img {
                    width: 20px;
                    height: 20px;
                }
            }

            .goods-price {
                display: inline-block;
                margin-top: 5px;
                font-size: 13px;
                color: #666666;
            }

            .return-price {
                display: inline-block;
                margin-left: 20px;
                margin-top: 5px;
                font-size: 13px;
                color: #ff9446;
            }

            .vux-flex-row {
                flex-wrap: wrap;
            }
        }

        .red {
            background-color: red;
            color: white;
            /*font-size: .3rem;*/
        }

        .blue {
            background-color: darkturquoise;
            color: white;
        }

        .green {
            background-color: forestgreen;
            color: white;
        }
    }
</style>
