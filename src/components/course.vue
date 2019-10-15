<style lang="less" scope>
    .course .tabBar {
        top: 46px;
        z-index: 999
    }

    @width88: 88px;
    .mustpush-item {
        background: #ffffff;
        width: 100%;
        /* height: 100px; */
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 10px;

        .img-box {
            width: @width88;
            height: @width88;
            background-color: #eaeeef;
            float: left;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .tit {
            margin-left: 8px;
        }

        .headTit {
            height: 60px;
        }

        .info-box {
            float: right;
            /* width: calc(~"100% - @{width88}"); */
            height: 100%;
            padding: 10px 15px 10px 5px;
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
        }

        .blue {
            background-color: darkturquoise;
            color: white;
        }

        .green {
            background-color: forestgreen;
            color: white;
        }

        .vux-fixed {
            z-index: 9999;
        }

        .order-all {
            .listGroup {
                margin-top: 0
            }
        }
    }
</style>
<style lang="less">
    .order-all {
        .vux-no-group-title {
            margin-top: 0
        }
    }
</style>

<template>
    <div class="course">
        <div style="height:44px;">
            <sticky
                scroll-box="vux_view_box_body"
                ref="sticky"
                :offset="46"
                :check-sticky-support="false"
                :disabled="disabled"
            >
                <div class="vux-fixed tabBar">
                    <tab :line-width="1" v-model="indexType">
                        <tab-item
                            class="vux-center"
                            :selected="index ==indexType"
                            v-for="(item, index) in list"
                            :key="index"
                            @on-item-click="tabClick(index)"
                        >{{item}}
                        </tab-item><!--:selected=""-->
                    </tab>
                </div>
            </sticky>
        </div>
        <!--显示全部-->
        <div class="order-all">
            <box gap="5px 5px">
                <group class="listGroup">
                    <cell class="listItem" :title="item.Name" is-link
                          :data-id="item.Id"
                          v-for="(item,index) in subjects"
                          :key="index"
                          @click.native="toVedio(item.Id)"></cell>
                </group>
            </box>
        </div>
    </div>
</template>
<script>
    import {Tab, TabItem, Sticky, Box, Flexbox, FlexboxItem} from "vux";

    export default {
        components: {
            Tab,
            TabItem,
            Sticky,
            Box,
            Flexbox,
            FlexboxItem
        },
        data() {
            return {
                list: ["精品课程", "基础课程", "冲刺课程"],
                indexType: 0,
                disabled:
                    typeof navigator !== "undefined" &&
                    /iphone/i.test(navigator.userAgent) &&
                    /ucbrowser/i.test(navigator.userAgent),
                subjects: [],
                selected: this.$route.query.id ? Number(this.$route.query.id) : "0",
                courseId: 0
            };
        },
        created() {
            let params = {
                action: 'CourseMainList',
                dataType: 0,
                page: 1,
                pageSize: 999
            };
            //debugger
            if (this.$route.query.id) {
                //debugger
                this.indexType = Number(this.$route.query.id);
            }
            this.tabClick(this.indexType);
        },
        methods: {
            tabClick(index) {
                this.courseId = index;
                console.log(this.$store.state.subjectType[index + 1].Id);
                //debugger
                //以下代码也可以封装在函数中，在其他地方调用
                this.$axios.get('/WebServices.ashx?action=CourseMainList&code=' + this.$store.state.courseCode + '&dataID=' + this.$store.state.subjectType[index + 1].Id + '&page=1&pageSize=999',)
                    .then((res) => {
                        this.subjects = res.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            toVedio(id) {
                let userId = localStorage.getItem('Uid'),
                    dataId = id;
                this.$axios.get('/webServices.ashx?action=CheckBuyState&code=' + this.$store.state.courseCode + '&dataID=' + dataId + '&userID=' + userId,)
                    .then((res) => {
                        //debugger
                        if (res.data.data!=null) {
                            this.$router.push({
                                path: '/freeSubject',
                                query: {
                                    id: id,
                                    kind: 0,
                                    course: 'course',
                                    courseId: Number(this.courseId)
                                }
                            })
                        }else{
                            this.$router.push({
                                path: '/order'
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                /**/
            }
        }
    };
</script>
