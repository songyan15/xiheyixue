<template>
  <div id="app">

      <x-header
        v-if="isShowNav"
        slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :title="title"
        :left-options="{backText: '',showBack: showBack,preventGoBack:true}"
        :transition="headerTransition"
        @on-click-back="handlerBack"
        @on-click-title="headerClick">
        <div class="mainTit">{{title}}</div>
        <x-icon type="ios-arrow-down" size="30" class="icon-down" v-if="!showBack"></x-icon>
          <router-link class="rightBack" slot="right" to="/index/questions" v-if="subjectStatus">题库</router-link>
      </x-header>
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition
          @after-enter=""
          :name="viewTransition" :css="!!direction">
          <router-view class="router-view"></router-view>
        </transition>
      </view-box>
      <tabbar v-if="!showBack">
        <tabbar-item :selected="isSelected(item.link)" :link="item.link" v-for="(item,index) in bottomList" :key="index">
          <i :class="item.className" slot="icon"></i>
          <span slot="label">{{item.label}}</span>
        </tabbar-item>
      </tabbar>
      <div v-transfer-dom>
        <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="moreClick"></actionsheet>
      </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      entryUrl: document.location.href,
      bottomList:[{
        link:'/index',
        className:'icon home',
        label:'首页'
      },{
        link:'/index/course',
        className:'icon course',
        label:'课程'
      },{
        link:'/index/questions',
        className:'icon questions',
        label:'题库'
      },/*{
        link:'/index/shopping',
        className:'icon questions',
        label:'商城'
      },*/{
        link:'/index/personal',
        className:'icon personal',
        label:'个人中心'
      }],
      menus: {
        menu1: '更多科目'
      },
      showMenus: false,
        subjectStatus:false
    }
  },
  computed:{
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction,
      typeName: state=>state.typeName
    }),
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false
      }
      return true
    },
    componentName () {
      debugger
      if (this.route.path) {
        const parts = this.$route.path.split('/')
        if (/component/.test(this.$route.path) && parts[2]) return parts[2]
      }
    },
    title () {
      /* if (this.$route.path == '/'||this.$route.path == '/course'
          ||this.$route.path == '/questions'||this.$route.path == '/personal'
          ||this.$route.path == '/shopping'){
            debugger;
            return this.typeName;
      }  */
      if(!this.$route.meta.showMenus){
        this.showMenus = false;
        return this.$route.meta.title
      }else{
        //this.showMenus = true;
        return this.typeName;
      }

        /* if (this.$route.path === '/vediomenu'){
          this.showMenus = false;
          return '视频';
        }
        if (this.$route.path === '/vocationType'){
          this.showMenus = false;
          return '职业类别';
        }  */
      //return this.typeName;
      //return this.componentName ? `${this.componentName}` : ''
    },
    showBack(){
      if (this.$route.path == '/index'||this.$route.path == '/index/course'
          ||this.$route.path == '/index/questions'||this.$route.path == '/index/personal'
          ||this.$route.path == '/index/shopping') return false

        //debugger
        if (this.$route.path === '/subject'){
            this.subjectStatus = true;
        }else{
            this.subjectStatus = false;
        }
      return true;
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    },
    sort(){
      return  this.$route.query.courseId
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
      'updateDemoPosition'
    ]),
    isSelected(link){
      if(this.$route.path ==link){
        return true;
      }
    },
    headerClick(){
      if(this.$route.meta.showMenus){
        this.showMenus = true;
        return true;
      }else{
        return false;
      }
    },
    handlerBack(){
        /*let path = localStorage.getItem('urlPath'),
            query = JSON.parse(localStorage.getItem("query"));
        debugger
        this.$router.push({
            path:path,
            query:query
        })*/
        window.history.back()
     /* if(this.$route.path == '/subject'&&this.$route.query.mainSub){
        this.$router.push({
          path: '/option',
          query:{
            id:this.$route.query.examId,
            kind:this.$route.query.kind,
            mainSub:this.$route.query.mainSub
          }
        });
      }else if(this.$route.path == '/freeSubject'){
        let pDataType = localStorage.getItem('pDataType');
        if(this.$route.query.mainSub =='questions'||this.$route.query.dataType=="0"){
          this.$router.push({
            path: '/index/questions'
          });
        }else if(this.$route.query.course =='course'){
          this.$router.push({
            path: '/index/course',
            query:{
              id:this.$route.query.courseId
            }
          });
        }else{
          this.$router.push({
            path: '/freeSubject',
            query:{
              dataType:pDataType,
              kind:this.$route.query.kind,
              mainSub:'questions'
            }
          });
        }
      } else if(this.$route.path == ('/'+this.$route.query.mainSub)){
        let pDataType = localStorage.getItem('pDataType');
        console.log(pDataType);
        if(pDataType&&pDataType != ''){
          localStorage.setItem('pDataType','');
          this.$router.push({
            path: '/'+this.$route.query.mainSub,
            query:{
              dataType:pDataType,
              kind:this.$route.query.kind,
              mainSub:this.$route.query.mainSub
            }
          });
        }else{
          this.$router.push({
            path: '/index/questions'
          });
        }
      } else if(this.$route.path == '/option'){
        if(this.$route.query.mainSub == 'freeSubject'){
          //debugger
          let id = localStorage.getItem('pId');
          if(id==''){
            let pDataType = localStorage.getItem('pDataType');
            this.$router.push({
              path: '/'+this.$route.query.mainSub,
              query:{
                dataType:pDataType,
                kind:this.$route.query.kind,
                mainSub:this.$route.query.mainSub
              }
            });
          }else{
            this.$router.push({
              path: '/'+this.$route.query.mainSub,
              query:{
                id:id,
                kind:this.$route.query.kind,
                mainSub:this.$route.query.mainSub
              }
            });
          }

        }else{
          let id = localStorage.getItem(this.$route.query.mainSub+'Id');
          if(id&&id==''){
            let pDataType = localStorage.getItem('pDataType');
            this.$router.push({
              path: '/'+this.$route.query.mainSub,
              query:{
                dataType:pDataType,
                kind:this.$route.query.kind,
                mainSub:this.$route.query.mainSub
              }
            });
          }else {
            this.$router.push({
              path: '/' + this.$route.query.mainSub,
              query: {
                id: id,
                kind: this.$route.query.kind,
                mainSub:this.$route.query.mainSub
              }
            });
          }
        }
      }else if(this.$route.path == '/simulation'||this.$route.path == '/word'||this.$route.path == '/pivot'){
        this.$router.push({
          path: '/index/questions'
        });
      }else{
        window.history.back()
      }*/
    },
    moreClick(key){
      this.$router.push({path:'/index/vocationType'})
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  //background-color: #fbf9fe;
  background-color: #eee;
}
.vux-header .vux-header-right .rightBack{
    float: right;
    color: #fff;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
.mainTit{
  display: inline;
  vertical-align: text-bottom;
}
.vux-header{
  background-color: #00bfff !important;
  .icon-down.vux-x-icon {
    fill: #fff;
  }
}


.vux-header .vux-header-left .left-arrow:before {
  content: "";
  border: 1px solid #fff !important;
  border-width: 2px 0 0 2px !important;
}
.router-view {
  position: relative;
  width: 100%;
  /*top: 46px;
  margin-bottom: 60px;*/
}

.weui-tabbar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #1296db;
}

  i.icon{
    display: inline-block;
    width: 27px;
    height:27px;
    &.home{
      background: url("./assets/images/home.png") center;
      background-size: cover;
    }
    &.course{
      background: url("./assets/images/movie.png") center;
      background-size: cover;
    }
    &.questions{
      background: url("./assets/images/tiku.png") center;
      background-size: cover;
    }
    &.personal{
      background: url("./assets/images/user.png") center;
      background-size: cover;
    }
  }
.weui-tabbar__item.weui-bar__item_on {
  .home{
    color: #1296db;
    background: url("./assets/images/home1.png") center;
    background-size: cover;
  }
  .course{
    color: #1296db;
    background: url("./assets/images/movie1.png") center;
    background-size: cover;
  }
  .questions{
    color: #1296db;
    background: url("./assets/images/tiku1.png") center;
    background-size: cover;
  }
  .personal{
    color: #1296db;
    background: url("./assets/images/user1.png") center;
    background-size: cover;
  }
}
</style>
