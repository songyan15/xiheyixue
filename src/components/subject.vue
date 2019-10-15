<style lang="less" scope>
  .subject {
    min-height:83.5vh;
    .subjectList {
      padding: 10px 5px;
      vertical-align: middle;

      .subjectList-selected {
        .iconImg {
          background-color: #000
        }
      }
    }

    .subjectTitle {
      padding: .5rem;
    }

    .census {
      padding: .5rem;
    }

    .answer {
      margin: .5rem;
      padding: .5rem .3rem;
      background-color: #fae5ad;

      .tit {
        color: red;
      }

      p {

        margin-top: .3rem;
      }

      &.note {
        position: relative;
        min-height: 8rem;
        .tit{
          float:left;
        }
        .noteContent{
          display: inline-block;
          width: 85%;
          padding-bottom: 4rem;
          text-align: left;
        }
        .noteList{
          display: inline-block;
          width: 100%;
        }
        .editBtn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          width: 4rem;
        }
      }
    }

    .cell-x-icon {
      fill: green;
      color: green;
    }

    .error {
      fill: red;
      color: red;
    }
  }
</style>

<template>

  <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" >
  <div class="chapter subject">
      <group v-if='subject.Title'>
      <group-title slot="title" style="text-align: center;">
        <span style="text-align: center;">{{$store.state.subTitle}}</span>
        <span style="float: right;" @click="submitAll" v-if="$route.query.kind==0">交卷</span> <!--v-if="nextStatus ==''"-->

        <!--<span style="float: right;margin-right:.8rem;" @click="getNext" v-if="nextStatus !=''&&$route.query.type!='error'">下一题</span>-->
        <!--&&subject.SubjectUser==null-->

        <span style="float: right;margin-right:.8rem;" @click="goSubjectNum" v-if="$route.query.type!='error'">题卡</span>
      </group-title>
      <grid :cols="5" :show-lr-borders="false" :show-vertical-dividers="false">
        <p class="subjectTitle">{{subject.Title}}</p> <!--subject.Sort+'.'+-->
        <checker
          v-model="checklist"
          default-item-class="subjectList"
          selected-item-class="subjectList-selected" @on-change='change'>
          <div class="block" v-for="(item, index) in subject.Opeations" :key="index" v-show="subject.SubjectUser==null">
            <p @click.stop="clickOption(index,item)">
              <checker-item :value="item">
                <x-icon class="iconImg" type="ios-circle-filled" size="30" v-show="activeIndex===index"></x-icon>
                <x-icon class="iconImg" type="ios-circle-outline" size="30" v-show="activeIndex!=index"></x-icon>
              </checker-item>
              {{item.key+'.'+item.value}}
            </p>
          </div>
        </checker>

        <checker v-model="rightKey"
                 default-item-class="subjectList"
                 selected-item-class="subjectList-selected" @on-change='change' v-if="subject.SubjectUser!=null">
          <div class="block" v-for="(item, index) in subject.Opeations" :key="index">
            <p class="rightAnswer">
              <checker-item :value="item">
                <x-icon class="iconImg cell-x-icon" type="ios-checkmark" size="30"
                        v-if="subject.Opeationcorrect.indexOf(item.key) !== -1"></x-icon>
                <x-icon class="iconImg error" type="ios-close" size="30"
                        v-else-if="subject.SubjectUser.OpeationCorrect.indexOf(item.key)!== -1"></x-icon>
                <x-icon class="iconImg" type="ios-circle-outline" size="30" v-else-if="activeIndex!=index"></x-icon>
              </checker-item>
              {{item.key+'.'+item.value}}
            </p>
          </div>
        </checker>
      </grid>
      <div style="width:40%;margin:0 auto;padding:15px;"
           v-if="subject.SubjectUser==null&&$route.query.kind!=0">
        <x-button
          @click.native="submitBtn">
          提交答案
        </x-button>
      </div>
      <!-- <div class="census" v-if="subject.status!=0">
          统计：全部考生作答681620次，对378634次，正确率55.0%，本人作答2次，对0次，正确率0.0%
      </div> -->
      <div class="answer" v-if="subject.SubjectUser!=null">
        <p class="rightKey"><span class="tit">[正确答案]</span> {{subject.Opeationcorrect}}</p>
        <p class="reduction"><span class="tit">[考点还原]</span> {{subject.Kdhy}}</p>
        <p class="answerKey"><span class="tit">[答案解析]</span> {{subject.Dajx}}</p>
      </div>
      <div class="answer note" v-if='subject.SubjectUser!=null'>
        <span class="tit">[笔记]</span>
        <div class="noteContent">
          <span class="noteList" v-for='(item,index) in subject.Notes' :key='index'>
                      {{(index+1)+'、'+item.Note}}
                  </span>
          <x-button class="editBtn"
                    @click.native="editBtn">
            编辑
          </x-button>
        </div>
      </div>
    </group>
    <group v-else>
      <div style="text-align:center;background-color:#eee">
        暂无数据
      </div>
    </group>
    <toast v-model="showToast" type="text">请选择答案</toast>
  </div>

  </v-touch>
</template>
<script>
  import {GroupTitle, Grid, Checklist, Checker, CheckerItem, Toast} from 'vux'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: "vedioMenu",
    components: {
      GroupTitle,
      Grid,
      Checklist,
      Checker,
      CheckerItem,
      Toast
    },
    data() {
      return {
        checklist: [],
        subject: {
          Opeations: [
            {
              key: "",
              value: ""
            }
          ]
        },
        activeIndex: -1,
        rightKey: [],
        showToast: false,
        userId: localStorage.getItem('Uid'),
        //nextStatus:this.$route.query.nextId,
        totalScore:0,
        json:[],
        json2:[]
      }
    },
    computed: {
      type(key) {
        return key == this.subject.rightKey ? 'ios-close' : 'ios-circle-outline'
      },
      changeId(){
        return this.$route.query.id
      },
      nextStatus(){
        return this.$route.query.nextId;
      }
    },
    watch:{
      changeId(){
        this.checklist = [];
        this.activeIndex = -1;
        this.getData();
      }
    },
    created() {
      this.getData();
    },
    methods: {
      onSwipeLeft: function () {//左滑动
        //写入向左滑触发事件
        //例如跳转页面
        this.getNext();
      },
      onSwipeRight: function () {//右滑动
        this.getBefore();
      },
      //上一页
      getBefore(){
        let list = this.$store.state.subjectIndexList;
        let index = this.findIndex(list,this.$route.query.prevId);
        //debugger;
        console.log(list[index]);
        if(this.$route.query.prevId ){
          this.$router.push({
            path:'/subject',
            query:{
              id:this.$route.query.prevId,
              kind:this.$route.query.kind?this.$route.query.kind:'',
              mainSub:this.$route.query.mainSub,
              examId:this.$route.query.examId?this.$route.query.examId:'',
              prevId:list[index-1]?list[index-1].Id:this.$route.query.prevId,
              nextId:list[index+1]?list[index+1].Id:this.$route.query.nextId
            }
          })
        }
      },
      //下一页
      getNext(){
        let list = this.$store.state.subjectIndexList;
        let index = this.findIndex(list,this.$route.query.nextId);
        //debugger;
        console.log(list[index]);
        if(this.$route.query.nextId ){
          this.$router.push({
            path:'/subject',
            query:{
              id:this.$route.query.nextId,
              kind:this.$route.query.kind?this.$route.query.kind:'',
              mainSub:this.$route.query.mainSub,
              examId:this.$route.query.examId?this.$route.query.examId:'',
              prevId:list[index-1]?list[index-1].Id:this.$route.query.prevId,
              nextId:list[index+1]?list[index+1].Id:this.$route.query.nextId
            }
          })
        }
      },
      getData() {
        this.$axios.get('/WebServices.ashx?action=SubjectMainDetails&dataID=' + this.$route.query.id + '&userID=' + this.userId)
          .then((res) => {
            if (res.data.data != "" && res.data.data != null) {
              // debugger
              this.subject = res.data.data
              /* this.subject.SubjectUser.OpeationCorrect = 'A'
              debugger  */
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      change(val) {
        //console.log('change', val)
        if (val != this.subject.Opeationcorrect) {
          this.subject.Scores = 0;
        }
        //console.log(this.checklist);
      },
      goSubjectNum(){
        this.$router.push({
          path: '/option',
          query:{
            id:this.$route.query.examId,
            kind:this.$route.query.kind,
            mainSub:this.$route.query.mainSub
          }
        });
      },
      clickOption(index, item) {
        //debugger
        this.activeIndex = index;
        this.checklist = item.key;
        //console.log(this.subject);
        this.totalScore =  this.totalScore + this.subject.Scores;
        //debugger
        if(this.$route.query.examId){
          let obj = {
            UserID: this.userId,
            Code: this.$store.state.courseCode,
            SubjectID: this.subject.Id,
            OpeationCorrect: this.checklist,
            Scores: this.subject.Scores,
            DataID: this.subject.Dataid
          }
          this.json2.push(obj);
          console.log(JSON.stringify(this.json2));
        }
      },
      submitAll(){
        this.json = {
          UserID:this.userId,
          Code:this.$store.state.courseCode,
          PaperID:this.$route.query.examId,
          Scores: this.totalScore
        }
        let params = {
          'action':'PaperCommit',
          'json':JSON.stringify(this.json),
          'json2':JSON.stringify(this.json2)
        }
        this.$axios.post('/WebServices.ashx',params).then((res) => {
            //debugger
            if(res.data.code == 0){
              this.getData();
            }
        })
      },
      submitBtn() {
        if (this.checklist.length < 1) {
          this.showToast = true;
          return
        }
        /* this.getData();
        this.subject.status = 1; */
        let json = {
          UserID: this.userId,
          Code: this.$store.state.courseCode,
          SubjectID: this.subject.Id,
          OpeationCorrect: this.checklist,
          Scores: this.subject.Scores,
          DataID: this.subject.Dataid
        }
        json = JSON.stringify(json)
        console.log(json);
        this.$axios.get('/WebServices.ashx?action=SubjectUserChange&json=' + json)
          .then((res) => {
            if (res.data.data != "" && res.data.data != null) {
              //this.subject = res.data.data
              this.getData();
              /* this.subject.SubjectUser.OpeationCorrect = 'A'
              debugger  */
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      editBtn() {
        this.$router.push({
          path: '/note',
          query:{
            Dataid:this.subject.Id
          }
        });
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
    }
  }
</script>
