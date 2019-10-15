<template>
	<div class="login">
		<group>
	        <x-input title="账号：" name="username" placeholder="请输入账号" 
                v-model="form.Username">
            </x-input>
	        <x-input title="密码：" type="password"  placeholder="请输入密码" 
                v-model="form.Password" :min="1" :max="16" >
            </x-input>
	        <x-input title="手机：" type="tel" placeholder="请输入手机号码"  
                v-model="form.Mobile" :min="1" :max="16" >
            </x-input>
	        <x-input title="邮箱：" type="email"  placeholder="请输入邮箱" 
                v-model="form.Email" :min="1" :max="16" 
                @on-enter="onEnter">
            </x-input>
	    </group>
	    <!-- <p><span class="forget-pass">忘记密码?</span></p> -->
	    <box gap="10px 25px">
	    	<x-button  :gradients="['#1D62F0', '#19D5FD']" @click.native="handleLogin">注册</x-button>
	    	<!-- <x-button><img class="icon-wx" src="../assets/icon-wx.png" />微信登录</x-button> -->
	    </box>
	    <p><span class="to-regist" @click="toLogin">已有账号？去登录</span></p>
	</div>
</template>

<script>
	import { XInput,Box, Group, XButton } from 'vux'
	export default {
		name: 'login',
		data() {
			return {
                form:{
                    Username:'',
                    Password:'',
                    Email:'',
                    Mobile:'',
                    Updatetime:'',                    
                    Delflag:0,
                    Updateby:'',
                    Createtime:'',
                    Createby:'',
                    ImageUrl:'',
                    Authkey:''
                }				
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
            onEnter (val) {
                this.handleLogin()
            },
			handleLogin(){
                let isMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
                let isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(this.form.Username ==""){
                    this.$vux.toast.text('用户名不能为空');
                    return
                }else if(this.form.Password ==""){
                    this.$vux.toast.text('密码不能为空');
                    return
                }else if(this.form.Mobile ==""){
                    this.$vux.toast.text('手机不能为空');
                    return
                }else if(!isMobile.test(this.form.Mobile) ||this.form.Mobile.length !=11){
                    this.$vux.toast.text('请输入正确手机号码！');
                    return
                }else if(this.form.Email ==""){
                    this.$vux.toast.text('邮箱不能为空');
                    return
                }else if(!isEmail.test(this.form.Email)){
                    this.$vux.toast.text('请输入正确邮箱！');
                    return
                }else{
                    let json = JSON.stringify(this.form);
                    this.$axios.get('/WebServices.ashx?action=AddUser&json='+json)
                    .then((res) =>{
                        debugger
                        if(res.data.code ==0&&res.data.data != null){
                            let rerult = res.data.data;
                            this.$vux.toast.text('注册成功！');                            
                            this.$router.push({
                                path:'/login'
                            })
                        }else{
                            this.$vux.toast.text(res.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }
            },
            toLogin(){
                this.$router.push({
					path:'/login'
				})
            }
		}
	}
</script>

<style scoped lang="less">
	@color666:#666666;
    @color393a31:#393a31;
    body{
        background-color: #fff !important;
    }
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