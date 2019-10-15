<style lang="less">
  .note{
    text-align: center;
  }
  .noteInfo{
    .weui-label{
      padding-top: .5rem;
    }
    textarea{
      padding: .5rem;
      border-radius: .3rem;
    }
  }
</style>
<template>
    <div class="note">
      <x-textarea class="noteInfo" title="笔记：" v-model="note" placeholder="请填写笔记信息" :show-counter="false" :rows="10"></x-textarea>
      <x-button mini type="primary" @click.native="submitNote" style="background-color: #00bfff">提交</x-button>
    </div>
</template>

<script>
  import { XTextarea,XButton}  from 'vux'
    export default {
        name: "note.vue",
      components: {
        XTextarea,
        XButton
      },
      data(){
          return {
            note:''
          }
      },
      methods:{
        submitNote(){
          let json = {
            Userid:localStorage.getItem('Uid'),
            Note:this.note,
            Dataid:this.$route.query.Dataid
          };
          json = JSON.stringify(json);
          this.$axios.get('/WebServices.ashx?action=SubjectNoteAdd&json=' + json)
            .then((res) => {
              if(res.data !=null&&res.data.data ==1){
                this.$router.go(-1);
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
