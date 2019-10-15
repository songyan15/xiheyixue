<template>
	<div class="login">
		<group>
	        <x-input title="" name="mobile" placeholder="请输入用户名"
                v-model="username"> <!-- keyboard="number" is-type="china-mobile" required -->

            </x-input>
	        <x-input title="" type="password" placeholder="请输入密码"
                v-model="password" :min="1" :max="16"
                @on-change="change">
            </x-input>
	    </group>
	    <!-- <p><span class="forget-pass">忘记密码?</span></p> -->
	    <box gap="10px 25px">
	    	<x-button  :gradients="['#1D62F0', '#19D5FD']" @click.native="handleLogin">登录</x-button>
	    	<!-- <x-button><img class="icon-wx" src="../assets/icon-wx.png" />微信登录</x-button> -->
	    </box>
	    <p><a class="to-regist" @click="toReg">还没有账号？快去注册</a></p>
	</div>
</template>

<script>
	import { XInput,Box, Group, XButton } from 'vux'
	export default {
		name: 'login',
		data() {
			return {
				username:'',//用户手机号
				password:'',//用户密码
			}
		},
		components: {
		    XInput,
		    XButton,
		    Group,
		    Box
		},
		methods:{
			change (val) {
		      console.log('on change', val)
			},
			handleLogin(){
                if(this.username ==""){
                    this.$vux.toast.text('用户名不能为空');
                    return
                }else if(this.password ==""){
                    this.$vux.toast.text('密码不能为空');
                    return
                }/* else if(1<=this.password.length&&this.password.length<=16){
                    this.$vux.toast.text('密码长度为1到16位');
                    return
                } */else{
                    this.$axios.get('/WebServices.ashx?action=Login&username='+this.username+'&password='+this.password)
                    .then((res) =>{
                        //debugger
                        if(res.data.data != null){
                            let rerult = res.data.data;
                            //debugger
                            localStorage.setItem('Uid',rerult.Uid)
                            localStorage.setItem('Username',rerult.Username)
                            localStorage.setItem('Mobile',rerult.Mobile)
                            this.$router.push({
                                path:'/index/vocationType'
                            })
                        }else{
                            this.$toast(res.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }
            },
            toReg(){
                this.$router.push({
					path:'/register'
				})
            }
		}
	}
</script>

<style scoped lang="less">
	@color666:#666666;
	@color393a31:#393a31;
	.input-box{
		background-color: #FFFFFF;
	}
	.login{
        margin-top:10rem;
		& p:first-of-type{
			padding: 20px 15px 40px;
			float: right;
			color: @color666;
			font-size:14px;
		}
		& p:last-of-type{
			width: 100%;
			text-align: center;
			color: @color393a31;
			font-size:14px;
			/* position: absolute;
			bottom: 25px; */
		}
	}
	.icon-wx{
		width: 18px;
		height: 14px;
		margin-right: 6px;
	}
</style>
