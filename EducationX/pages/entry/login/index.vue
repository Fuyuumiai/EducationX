<template>
	<view class="content">
		<u-navbar title-color="#fff" :is-back="false" :title-bold="true" :background="background" title="用户登录" />
		<view class="login-bg">
			<view class="login-card">
				<view class="login-head"></view>
				<view class="login-input login-margin-b">
					<input v-model="email.value" ref="email" :focus="email.focus" type="text" placeholder="请输入您的邮箱" />
				</view>
				<view class="login-input">
					<input v-model="password.value" ref="password" :focus="password.focus" type="text" password placeholder="请输入您的密码" />
				</view>
				<view class="login-function">
					<view class="login-forget" @click="goForget">忘记密码？</view>
					<view class="login-register" @click="goRegister">快速注册 ></view>
				</view>
			</view>
		</view>
		<view class="login-btn">
			<button class="landing" type="primary" @click="onSubmit">登 录</button>
		</view>
		<view class="login-other">
			<u-divider half-width="250">第三方登录</u-divider>
			<u-row gutter="16" justify="around" class="other-box">
				<u-col span="4" text-align="right">
					<u-icon size="72" color="#03DC6C" index="微信" name="weixin-fill" @click="iconClick"></u-icon>
				</u-col>
				<u-col span="4" text-align="center">
					<u-icon size="72" color="#6EA8DF"  index="QQ" name="qq-circle-fill" @click="iconClick"></u-icon>
				</u-col>
				<u-col span="4" text-align="left">
					<u-icon  size="72"  color="#FF0000" index="微博" name="weibo" @click="iconClick"></u-icon>
				</u-col>
			</u-row>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				// navbar背景颜色
				background: {
					backgroundColor:'#FF978D'
				},
				// 登录内容
				// 邮箱
				email: {
					value: '',
					regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
					msg: '邮箱格式错误！',
					focus: false
				},
				// 密码
				password: {
					value: '',
					regex: /^(?:\d+|[a-zA-Z]+|[\.!@#$%^&*]+){6,16}$/,
					msg: '密码格式错误！',
					focus: false
				},
			}
		},
		methods: {
			// 校验表单元素
			// el 元素名
			// regex 正则表达式
			checkFrom (el) {
				console.log(el)
				if (!this[el].regex.test(this[el].value)) {
					// 清除数据
					this[el].value = ''
					// 输入框获取焦点
					this[el].focus = true
					// 调用弹出层
					this.$refs.uToast.show({
						title: this[el].msg,
						type: 'error',
						duration: 1700
					})
					return false
				}
				return true
			},
			// 登录
			onSubmit(){
				let flag = ['email', 'password'].some( el => !this.checkFrom(el))
				if (!flag) {
					this.$apis.login({
						email: this.email.value,
						password: this.password.value
					}).then(res => {
						console.log(res)
					}).catch(err => {
						console.log(err)
					})
				}
			},
			iconClick(name){
				this.$refs.uToast.show({
					type: 'warning',
					title: `暂不支持${name}登录。`
				})
			},
			goForget(){
				uni.navigateTo({
				    url: '../forget/index'
				})
			},
			goRegister(){
				uni.navigateTo({
					url: '../register/index'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.u-border-bottom:after {
		border-bottom-width: 0px !important;
	}
	.landing{
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		background: $thenme-color;
	}
	.login-btn{
		padding: 10rpx 20rpx;
		margin-top: 260rpx;
	}
	.login-function{
		overflow: auto;
		padding: 20rpx 20rpx 30rpx 20rpx;
	}
	.login-forget{
		float: left;
		font-size: 26rpx;
		color: #999;
	}
	.login-register{
		color: #2979ff;
		float: right;
		font-size: 26rpx;

	}
	.login-input input{
		background: #F2F5F6;
		font-size: 28rpx;
		padding: 10rpx 25rpx;
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 8rpx;
	}
	.login-margin-b{
		margin-bottom: 25rpx;
	}
	.login-input{
		padding: 10rpx 20rpx;
	}
	.login-head{
		font-size: 34rpx;
		text-align: center;
		padding: 20rpx 10rpx 50rpx 10rpx;
	}
	.login-card{
		background: #fff;
		border-radius: 12rpx;
		padding: 10rpx 25rpx;
		box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.12);
		position: relative;
		margin-top: 60rpx;
	}
	.login-bg {
		height: 260rpx;
		padding: 25rpx;
		background: linear-gradient(#FF978D, #FFBB69);
	}
	.login-other {
		position: absolute;
		width: 100%;
		bottom: 100rpx;
	}
	.other-box {
		margin-top: 50rpx;
	}
	.other-icon {
		font-size: $uni-font-size-lg;
	}
</style>
