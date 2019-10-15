<style lang="less" scoped>
    .rightWrap {
        float: right;
    }
</style>

<template>
    <div class="pivot">
        <group class="listGroup" v-if="this.$route.query.dataType==2">
            <cell class="listItem" :title="item.Name"  is-link
                  :data-id="item.Id"
                  v-for="(item,index) in subjects"
                  :key="index"
                  @click.native="toChild(item.Id,item.Name)"> <!--:is-link="item.Price==0"-->
                <!--<div class="rightWrap">
                    <span style="color:red" v-if='item.Price>0'>购买</span>
                </div>-->
            </cell>
        </group>
        <group class="listGroup" v-if="typeof this.$route.query.id != 'undefined'">
            <cell class="listItem" :title="item.Name" is-link
                  :data-id="item.Id"
                  v-for="(item,index) in subjects"
                  :key="index"
                  @click.native="toVedio(item)">
                <!--<div class="rightWrap">
                    <span style="color:red" v-if='item.Price>0'>购买</span>
                </div>-->
            </cell>
        </group>

        <div v-transfer-dom>
            <popup v-model="showBottom" is-transparent>
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group>
                        <!-- <cell title="Product" value="Donate"></cell> -->
                        <checklist :options="commonList" v-model="dialog.payType" :max="1"
                                   @on-change="changePayType"></checklist>
                        <cell title="总价" :value="dialog.price"></cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary">购买</x-button>
                        <x-button @click.native="showBottom = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import {TransferDom, Popup, Tab, TabItem, Sticky, Box, Flexbox, FlexboxItem, Checklist} from "vux";
    import {mapMutations} from 'vuex'

    export default {
        directives: {
            TransferDom
        },
        components: {
            TransferDom, Popup,
            Tab,
            TabItem,
            Sticky,
            Box,
            Flexbox,
            FlexboxItem, Checklist
        },
        data() {
            return {
                subjects: "",
                showBottom: false,
                dialog: {
                    price: 0,
                    payType: [1]
                },
                commonList: [
                    {key: '1', value: '支付宝'},
                    {key: '2', value: '微信'}
                ]
            }
        },
        watch: {
            '$route'(to, from) {
                this.getData()
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                //debugger
                if (typeof this.$route.query.dataType != "undefined") {
                    //debugger
                    this.$axios.get('/WebServices.ashx?action=SubjectPaperList&Code=' + this.$store.state.courseCode + '&dataType=' + this.$route.query.dataType + '&page=1&pageSize=999')
                        .then((res) => {
                            this.subjects = res.data.data
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                } else if (typeof this.$route.query.id != "undefined") {
                    this.$axios.get('/WebServices.ashx?action=SubjectPaperChildrenList&Code=' + this.$store.state.courseCode + '&parentID=' + this.$route.query.id + '&page=1&pageSize=999')
                        .then((res) => {
                            if (res.data.data.length > 0) {
                                this.subjects = res.data.data
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            },
            toChild(id, name) {
                this.$store.commit('updSubTitle', name);
                localStorage.setItem('pDataType', this.$route.query.dataType);
                this.$router.push({
                    path: '/pivot',
                    query: {
                        id: id,
                        kind: this.$route.query.kind,
                        mainSub: 'pivot'
                    }
                })
            },
            toVedio(item) {
                this.$store.commit('updSubTitle', item.Name);
                localStorage.setItem('pivotId', this.$route.query.id);
                this.$router.push({
                    path: '/option',
                    query: {
                        id: item.Id,
                        kind: 2,
                        mainSub: 'pivot'
                    }
                })
                /*if(item.Price == 0){
                  this.$router.push({
                    path: '/option',
                    query: {
                      id: item.Id,
                      kind:2,
                      mainSub:'pivot'
                    }
                  })
                }else{
                  this.dialog.price = item.Price;
                  this.showBottom = true;
                }*/

            },
            goTo(id, name) {
                this.$store.commit('updSubTitle', name);
                //debugger
                this.$router.push({
                    path: '/option',
                    query: {
                        id: id,
                        kind: 2,
                        mainSub: 'pivot'
                    }
                })
            },
            changePayType(val, label) {
                console.log('change', val, label)
            }
        }
    }
</script>
