<style lang="less" scoped>
  .personal{
    .panel{
      background-color: #fff;
      padding: 10px 0;
      padding-left: 5px;
      .mediaImg{
        width: 50px;
        height:50px;
        border-radius: 50%;
      }
    }
    .buyBtn{
      font-size: 13px;
      border-radius: 99px;
    }
    .p1{
      font-size: 14px;
    }
    .logout{
      color:#00bfff;
    }
  }
</style>
<template>
  <div class="personal">
    <div class="panel">
      <flexbox class="media" :gutter="3">
        <flexbox-item :span="2">
          <div class="flex-demo">
            <img src="../assets/images/boshi.jpg" alt="" class="mediaImg">
          </div>
        </flexbox-item>
        <flexbox-item :span="6">
          <div class="flex-demo">
            <p class="p1"><span>昵称：</span>{{Username}}</p>
            <p class="p1"><span>通行证：</span>{{Mobile}}</p>
          </div>
        </flexbox-item>
        <!-- <flexbox-item :span="3.2">
          <div class="flex-demo">
            <x-button class="buyBtn"  type="warn">充值购买</x-button>
          </div>
        </flexbox-item> -->
      </flexbox>
    </div>
    <group>
      <cell title="已开通科目" :link="{path:'/myOrder'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/read.png">
      </cell>
      <!--<cell title="系统消息" :link="{path:'/'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/message.png">
      </cell>
      <cell title="视频管理" :link="{path:'/'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/vedio.png">
      </cell>-->
    </group>
    <group>
      <cell title="客服中心" :link="{path:'/'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/kefu.png">
      </cell>
      <cell title="清除缓存" is-link @click.native="clear">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/qingchu.png">
      </cell>
    </group>
    <group>
      <x-button class="logout" @click.native="logout">退出登录</x-button>
    </group>
  </div>
</template>

<script>
    export default {
        name: "personal",
        data(){
          return {
            Username:localStorage.getItem('Username'),                            
            Mobile:localStorage.getItem('Mobile') 
          }
        },
        methods: {
          clear(){
            localStorage.clear();
          },
          logout(){
            localStorage.clear();
            this.$router.push({
              path:'/login'
            })
          }
        },
    }
</script>


