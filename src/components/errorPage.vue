<style lang="less" scoped>
.errorPage{

}
</style>

<template>
    <div class="errorPage">
        <group>
            <cell :title="item.Sort+'.'+item.Title"  :inline-desc='item.SubjectName' v-for='item in list' :key='item.Id' @click.native="goto(item.SubjectID,item.SubjectName)"></cell>
        </group>    
    </div>
</template>
<script>
import { Cell,Group} from 'vux'
import { mapMutations } from 'vuex'
export default {
    component:{
        Cell,
        Group
    },
    data(){
        return {
            list:[],
            userID:localStorage.getItem('Uid')
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            this.$axios.get('/WebServices.ashx?action=SubjectUserList&userID='+this.userID+'&Code='+this.$store.state.courseCode+'&page=1&pageSize=999',)
            .then((res) =>{
                //debugger
                this.list = res.data.data
            })
            .catch(function (error) {
                console.log(error);
            }) 
        },
        goto(id,name){
            this.$store.commit('updSubTitle',name); 
            this.$router.push({
                path:'/subject',
                query:{
                    id:id,
                    type:'error'
                }
            })
        }
    }
}
</script>
