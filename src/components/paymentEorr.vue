<style scoped lang="less">
  div{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
      background-color: #fff;
    img{
      width: 10rem;
    }
    span{
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }

</style>
<template>
  <div>
    <p>
      <img src="../assets/paymentEorr.png" alt="">
      <span>3秒后自动跳转到充值页面</span>
    </p>
  </div>
</template>
<script>
  export default {
    created (){
      setTimeout(()=>{
        this.$router.push({
          path : '/order'
        })
      },400000)
    }
  }
</script>
