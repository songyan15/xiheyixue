<style lang="less" scoped>
.freeSubject{

}

@width88: 88px;
.mustpush-item {
  background: #ffffff;
  width: 100%;
  height: 100px;
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
}
</style>

<template>
    <div class="freeSubject">
        <!--<group v-if="this.$route.query.dataType==0||this.$route.query.dataType==4||this.$route.query.dataType==16">-->
        <group v-if="this.$route.query.flg==1">
            <cell :title="item.Name" is-link  
              :data-id="item.Id"
              v-for="(item,index) in subjects"
              :key="index"
              @click.native="toChild(item.Id,item.Name)"></cell>
        </group> 
        <group v-if="this.$route.query.course == 'course'">
            <cell :title="item.Title" is-link  
              :data-id="item.Id"
              v-for="(item,index) in list"
              :key="index"
              @click.native="toVedio(item.Id,item.Title)"></cell>
        </group>
        <group class="listGroup" v-if="this.$route.query.mainSub == 'freeSubject'">
            <cell class="listItem" :title="item.Name" is-link
                  :data-id="item.Id"
                  v-for="(item,index) in list"
                  :key="index"
                  @click.native="toVedio(item.Id,item.Name)">
                  <!--<span style="color: #00bfff;margin-right:.3rem;display:inline-block;font-size:.6rem;">
                      <p>{{formatYMD(item.CreateTime)}}</p>
                  </span>
                  <div class="rightWrap">
                    <span style="color:red" v-if='item.Price>0'>购买</span>
                  </div>-->
            </cell>
        </group>
        <div style="text-align:center;" v-if="list.length==0&&subjects.length==0">
            <span>暂无数据</span>
        </div>
    </div>
</template>
<script>
import { Group,Cell} from "vux";
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        Group,
        Cell
    },
    computed:{
        ...mapState({
            subTitle: state=>state.subTitle
        })
    },
    data(){
        return {
            subjects: [],
            list: []
        }
    },
    watch: {
        '$route' (to, from) {
          this.getData()
        }
    },
    created() {
        this.getData();
        this.delName();
        localStorage.setItem('pId','');
        //localStorage.setItem('pDataType','');
    },
    methods: {
      getData(){
        //debugger
        if(typeof this.$route.query.dataType != "undefined"){
          //debugger
          //this.$axios.get('/WebServices.ashx?action=CourseMainList&dataID='+this.$route.query.dataType+'&page=1&pageSize=999',)
          this.$axios.get('/WebServices.ashx?action=SubjectPaperList&Code='+this.$store.state.courseCode+'&dataType='+3+'&page=1&pageSize=999')
          .then((res) =>{
            this.subjects = res.data.data
          })
          .catch(function (error) {
              console.log(error);
          }) 
        }else if(this.$route.query.course == "course"){
          this.$axios.get('/WebServices.ashx?action=CourseChildrenList&parentID='+this.$route.query.id)
          .then((res) =>{
              if(res.data.data.length>0){                    
                  this.list = res.data.data
              }else{
                  this.list = [];
                  this.subjects = [];
              }
          })
          .catch(function (error) {
              console.log(error);
          }) 
        }else if(this.$route.query.mainSub == 'freeSubject'){
          this.$axios.get('/WebServices.ashx?action=SubjectPaperChildrenList&Code='+this.$store.state.courseCode+'&parentID='+this.$route.query.id+'&page=1&pageSize=999')
            .then((res) =>{
              if(res.data.data.length>0){
                this.list = res.data.data
              }else{
                this.list = [];
                this.subjects = [];
              }
            })
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      toChild(id,name){
        //this.$store.commit('updSubTitle',name);
        localStorage.setItem('pDataType',this.$route.query.dataType);
        //debugger
        this.$router.push({
            path: '/freeSubject',
            query: {
                id: id,
                kind:this.$route.query.kind,
                mainSub:'freeSubject',
                courser:this.$route.query.courser?this.$route.query.courser:"",
                courserId:this.$route.query.courserId?this.$route.query.courserId:"",
            }
        })
      },
      delName(){
        //debugger
        let secondName = localStorage.getItem('secondName'),
            str = this.$store.state.subTitle;
        if(secondName){
          str = str.replace(' '+secondName,'')          
          this.$store.commit('updSubTitle',str);
          localStorage.setItem('secondName','');
        }
      },
      toVedio(id,name){
        localStorage.setItem('secondName',name);        
        this.$store.commit('updSubTitle',name);
        if(this.$route.query.kind == 0){
          this.$router.push({
              path: '/vedio',
              query: {
                  id: id,
                  kind:this.$route.query.kind
              }
          })
        }else{
          localStorage.setItem('pId',this.$route.query.id);
          this.$router.push({
              path: '/option',
              query: {
                  id: id,
                  kind:this.$route.query.kind,
                  mainSub:'freeSubject'
              }
          })
        }
          
      }
    }
}
</script>
