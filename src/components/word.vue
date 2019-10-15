<style lang="less" scoped>
    .simulation{
        .tabBar {
            top: 46px;
            z-index: 99
        }
        .rightWrap{
            float: right;
        }
        .noData{
            padding-top: 2rem;
            text-align: center;
        }
    }
</style>
<template>
    <div class="simulation">
        <!-- <sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
            <tab :line-width=1>
                <tab-item :selected="demo4 === item" v-for="(item, index) in list4" @click="demo4 = item" :key="index">{{item}}</tab-item>
            </tab>
        </sticky> -->
        <!-- <div style="height:44px;">
            <sticky
                scroll-box="vux_view_box_body"
                ref="sticky"
                :offset="46"
                :check-sticky-support="false"
                :disabled="disabled"
            >
                <div class="vux-fixed tabBar">
                    <tab :line-width="1" v-model="index">
                        <tab-item
                        class="vux-center"
                        :selected="index==0"
                        v-for="(item, index) in list"
                        :key="index"
                        @on-item-click="tabClick(index)"
                        >{{item}}</tab-item>
                    </tab>
                </div>
            </sticky>
        </div> -->
        <!--显示全部-->
        <div class="order-all" v-if="!nodataStatus">
            <box gap="5px 5px">

              <group class="listGroup"  v-if="this.$route.query.dataType==1">
                <cell class="listItem" :title="item.Name" :is-link="item.Price==0"
                      :data-id="item.Id"
                      v-for="(item,index) in subjects"
                      :key="index"
                      @click.native="toChild(item.Id,item.Name)">
                        <span style="color: #00bfff;margin-right:.3rem;display:inline-block;font-size:.6rem;">
                            <p>{{formatYMD(item.CreateTime)}}</p>
                        </span>
                  <div class="rightWrap">
                    <span style="color:red" v-if='item.Price>0'>购买</span>
                  </div>
                </cell>
              </group>
              <group class="listGroup" v-if="typeof this.$route.query.id != 'undefined'">
                <cell class="listItem" :title="item.Name" :is-link="item.Price==0"
                      :data-id="item.Id"
                      v-for="(item,index) in subjects"
                      :key="index"
                      @click.native="toVedio(item)">
                        <span style="color: #00bfff;margin-right:.3rem;display:inline-block;font-size:.6rem;">
                            <p>{{formatYMD(item.CreateTime)}}</p>
                        </span>
                  <div class="rightWrap">
                    <span style="color:red" v-if='item.Price>0'>购买</span>
                  </div>
                </cell>
              </group>
            </box>
        </div>
        <div class="noData" v-else>
            暂无数据
        </div>
    </div>
</template>

<script>
import { TransferDom, Popup,Tab, TabItem, Sticky, Box, Flexbox, FlexboxItem,Checklist } from "vux";
import { mapMutations } from 'vuex'
import {formatYYMMDD} from '@/utils/datetime'
    export default {
        name: "word",
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
            FlexboxItem,Checklist
        },
        data(){
            return {
                list: ["模拟", "真题"],
                index: 1,
                subjects: [],
                disabled:
                    typeof navigator !== "undefined" &&
                    /iphone/i.test(navigator.userAgent) &&
                    /ucbrowser/i.test(navigator.userAgent),
                showBottom:false,
                dialog:{
                    price:0,
                    payType:[1]
                },
                commonList:[
                    {key: '1', value: '支付宝'},
                    {key: '2', value: '微信'}
                ],
                nodataStatus:false
            }
        },
      watch: {
        '$route' (to, from) {
          this.getData()
        }
      },
        created() {
            //this.tabClick(this.index);
          this.getData();
        },
        methods: {
            tabClick(index){
                //WebServices.ashx?action=SubjectPaperList&Code=111&page=1&pageSize=10&dataType=0
                this.$axios.get('/WebServices.ashx?action=SubjectPaperList&Code='+this.$store.state.courseCode+'&dataType='+index+'&page=1&pageSize=999',)
                .then((res) =>{
                    //debugger
                    this.subjects = res.data.data
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
          getData(){
            if(typeof this.$route.query.dataType != "undefined"){
              //debugger
              this.$axios.get('/WebServices.ashx?action=SubjectPaperList&Code='+this.$store.state.courseCode+'&dataType='+this.$route.query.dataType+'&page=1&pageSize=999')
                .then((res) =>{
                    if(res.data.data!=null){
                        this.subjects = res.data.data
                        this.nodataStatus =false
                    }else{
                        this.nodataStatus =true
                    }
                })
                .catch(function (error) {
                  console.log(error);
                })
            }else if(typeof this.$route.query.id != "undefined"){
              this.$axios.get('/WebServices.ashx?action=SubjectPaperChildrenList&Code='+this.$store.state.courseCode+'&parentID='+this.$route.query.id+'&page=1&pageSize=999')
                .then((res) =>{
                  if(res.data.data.length>0){
                    this.subjects = res.data.data
                      this.nodataStatus =false
                  }else{
                      this.nodataStatus =true
                  }
                })
                .catch(function (error) {
                  console.log(error);
                })
            }
          },
          toChild(id,name){
            this.$store.commit('updSubTitle',name);
            localStorage.setItem('pDataType',this.$route.query.dataType);
            this.$router.push({
              path: '/word',
              query: {
                id: id,
                kind:this.$route.query.kind,
                mainSub:'word'
              }
            })
          },
            toVedio(item){
              //debugger
              this.$store.commit('updSubTitle',item.Name);
              localStorage.setItem('wordId',this.$route.query.id);
              this.$router.push({
                path: '/option',
                query: {
                  id: item.Id,
                  kind:0,
                  mainSub:'word'
                }
              })

            },
            formatYMD(item){
                return formatYYMMDD(item)
            },
            changePayType(val, label) {
                console.log('change', val, label)
            }
        }
    }
</script>


