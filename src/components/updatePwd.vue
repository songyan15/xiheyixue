<template>
    <div>
            <group>
                <x-input type="password" name="email" placeholder="请输入原密码"
                         v-model="oldPwd">
                </x-input>
                <x-input type="password" name="email" placeholder="请输入新密码"
                         v-model="newPwd">
                </x-input>
                <x-input type="password" name="email" placeholder="请输入新密码"
                                   v-model="agPwd">
                </x-input>
            </group>
            <box gap="10px 25px">
                <x-button  :gradients="['#1D62F0', '#19D5FD']" @click.native="handleSubmit">提交</x-button>
            </box>
    </div>
</template>
<script>
    import { XInput,Box, Group, XButton } from 'vux'
    export default {
        data(){
            return {
                oldPwd:"",
                newPwd:"",
                agPwd:''
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
                if(this.oldPwd ==""){
                    this.$vux.toast.text('原密码不能为空');
                    return false;
                }else if(this.newPwd ==""){
                    this.$vux.toast.text('新密码不能为空');
                    return false;
                }else if(this.agPwd ==""){
                    this.$vux.toast.text('确认新密码不能为空');
                    return false;
                }else if(this.agPwd !=this.newPwd){
                    this.$vux.toast.text('确认新密码与原密码不匹配');
                    return false;
                }else{
                    this.$axios.get('/WebServices.ashx?action=UpdatePwd&userID='+localStorage.getItem('Uid')+'&oldPwd='+this.oldPwd+'&newPwd='+this.newPwd)
                        .then((res) =>{
                            //debugger
                            if(res.data.data != null){
                                this.$vux.toast.text('密码修改成功');
                                this.$router.push({
                                    path:'/index/personal'
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