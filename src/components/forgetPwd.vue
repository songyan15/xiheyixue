<template>
    <div>
        <form action="">
            <group>
                <x-input title="" name="email" placeholder="请输入邮箱"
                         v-model="email">

                </x-input>
            </group>
            <box gap="10px 25px">
                <x-button  :gradients="['#1D62F0', '#19D5FD']" @click.native="handleSubmit">提交</x-button>
            </box>
        </form>
    </div>
</template>
<script>
    import { XInput,Box, Group, XButton } from 'vux'
    export default {
        data(){
            return {
                email:""
            }
        },
        components: {
            XInput,
            XButton,
            Group,
            Box
        },
        methods:{
            handleSubmit(){
                if(this.email ==""){
                    this.$vux.toast.text('邮箱不能为空');
                    return
                }else{
                    this.$axios.get('/WebServices.ashx?action=SendEmail&Email='+this.email)
                        .then((res) =>{
                            debugger
                            if(res.data.data != null){
                                this.$router.push({
                                    path:'/login'
                                })
                            }else{
                                this.$toast(res.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            }
        }
    }
</script>