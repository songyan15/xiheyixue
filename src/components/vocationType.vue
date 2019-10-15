<style lang="less" scoped>
.vocation {
  .media {
    width: calc(~"100% - 4px");
    margin: 8px 2px 0;
    li {
      display: inline-block;
      width: 49%;
      margin-bottom: 10px;
      padding: 8px 1px;
      background-color: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      &:nth-child(even){
        float: right;
      }
    }
    .tit {
      width: 100%;
      text-overflow: ellipsis; /*这就是省略号喽*/
      overflow: hidden; /*设置超过的隐藏*/
      white-space: nowrap; /*设置不断行*/
    }
    .mediaImg {
      width: 40px;
      height: 40px;
      margin-left: 5px;
      margin-right: 5px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .mediaContent {
      display: inline-block;
      width: calc(~"100% - 80px");
      vertical-align: middle;
      .tit {
        color: #000;
      }
      .info {
        color: #666;
        font-size: 13px;
      }
    }
    .mediaContent.secondLevel{
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      text-align:center;
    }
  }
  
}
</style>
<template>
  <div class="vocation">
    <ul class="media">
      <template v-if="level == 1">
      <li v-for="item in list" :key="item.id" @click="searchChild(level,item.tit,item.id)">
        <router-link to="">
          <div>
            <img class="mediaImg" :src="item.mediaImg" alt>
            <div class="mediaContent">
              <h4 class="tit" v-text="item.tit"></h4>
            </div>
          </div>
        </router-link>
      </li>
      </template>
      <template v-if="level == 2">
      <li v-for="item in listGroup" :key="item.id" @click="searchChild(level,item.tit,item.id)">
        <router-link to="">
          <div class="mediaContent secondLevel">
            <h4 class="tit" v-text="item.tit"></h4>
          </div>
        </router-link>
      </li>
      </template>
      <template v-if="level == 3">
      <li v-for="item in listGroup" :key="item.id" @click="handleGetName(item)">
        <router-link to="">
          <div class="mediaContent secondLevel">
            <h4 class="tit" v-text="item.tit"></h4>
          </div>
        </router-link>
      </li>
      </template>
      <template v-if="level == 4">
        <div  class="mediaContent secondLevel">
          敬请期待！
        </div>
      </template>
    </ul>
  </div>
</template>

<script>
import { Grid, GridItem } from "vux";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      level:1,
      uid:"",
      list:[
        {
          id:'1',
          mediaImg:require("../assets/images/lianxi.png"),
          tit:"医学检验",
          uid:1
        },
        {
          id:'2',
          mediaImg:require("../assets/images/time.png"),
          tit:"输血病理",
          uid:2
        },
        {
          id:'3',
          mediaImg:require("../assets/images/mianshen.png"),
          tit:"护理",
          uid:3
        }
      ],
      list2:[
        {
          id:"111",
          tit:"检验技士",
          uid:111
        },
        {
          id:"112",
          tit:"检验技师",
          uid:112
        },
        {
          id:"113",
          tit:"主管技师",
          uid:113
        },
        {
          id:"114",
          tit:"检验高级职称",
          uid:114
        }
      ],
      list3:[
        {
          id:"121",
          tit:"输血初中级",
          uid:121
        },
        {
          id:"122",
          tit:"病理初中级",
          uid:122
        }
      ],
      list4:[
        {
          id:'131',
          tit:"护理高级职称",
          uid:131
        }
      ],
      listGroup:[],
      totalName:""
    }
  },
  components: {
    Grid,
    GridItem
  },
  methods: {
    handleGetName(item){
      if(item){        
        this.totalName = item.tit;
        this.$store.commit('UPDATE_TYPENAME',this.totalName);  
        this.$store.commit('setCourseCode',item.id);  
        console.log(this.$store.state.courseCode);
        //debugger
      }    
      this.$router.go(-1);
    },
    searchChild(lev,tit,id){
      //debugger
      if(id.indexOf("1") != -1 ){
        if(lev==1){
          this.level =3;
          this.listGroup = this.list2.map(item => {
            return {
              id:item.id,
              tit:item.tit,
              uid:item.uid
            }
          });
          this.totalName = tit;
          this.uid = id;
        }/* else if(lev==2){
          this.level =3;
          this.listGroup = this.list3.map(item => {
            return {
              id:(id+item.id),
              tit:item.tit,
              uid:item.uid
            }
          });
          this.totalName += tit;
        } */
      }else if(id==2){
        if(lev==1){
          this.level =3;
          this.listGroup = this.list3.map(item => {
            return {
              id:item.id,
              tit:item.tit,
              uid:item.uid
            }
          });
          this.totalName = tit;
          this.uid = id;
        }
      }else if(id==3){
        //this.level = 4;
        if(lev==1){
          this.level =4;
          this.listGroup = this.list4.map(item => {
            return {
              id:item.id,
              tit:item.tit,
              uid:item.uid
            }
          });
          this.totalName = tit;
          this.uid = id;
        }
      }
      
    }
  }
};
</script>

