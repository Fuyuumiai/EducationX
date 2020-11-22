<template>
	<view class="content">
		<u-navbar title-color="#fff"  back-icon-color="#fff" :title-bold="true" :background="background" title="用户注册">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="info-circle" size="40" @click="onInfo"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="forget-bg">
			<view class="forget-card">
				<view class="forget-input forget-margin">
					<input v-model="email.value" :focus="email.focus"  type="text"  placeholder="请输入您的邮箱"/>
				</view>
				<view class="forget-input forget-margin">
					<view class="verify-left">
						<input v-model="code.value"  :focus="code.focus" type="text"  placeholder="请输入验证码" />
					</view>
					<view class="verify-right">
						<button v-if="codeType" class="verify-btn" type="primary"  @click="getCode">获取验证码</button>
						<button v-else  disabled="true" class="verify-btn btn-disabled" type="primary">{{ loadingText }}</button>
					</view>
				</view>
				<view class="forget-input">
					<input v-model="password.value" :focus="password.focus" password  type="text" placeholder="请输入密码(8-16位)" />
				</view>
			</view>
		</view>
		<view class="forget-btn">
			<button class="landing" type="primary" @click="onSubmit">提 交</button>
		</view>
		<view class="guidelines">
			<u-checkbox class="guidelines-checkbox" v-model="userCheck" size="30" active-color="#409EFF"> 我已阅读 <text class="guidelines-text" @click.stop="onUserCheck">《用户协议》</text> </u-checkbox>
		</view>
		<u-modal v-model="modelShow" :content="modelContent" title="用户协议"></u-modal>
		<u-popup v-model="popupShow" mode="center" border-radius="6">
			<view class="popup-view">
				太穷了，搞不起手机号注册 ┭┮﹏┭┮
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航栏背景颜色
				background: {
					backgroundColor:'#FF978D'
				},
				// popup 提示的显示
				popupShow: false,
				// model 提示的显示
				modelShow: false,
				// 用户协议勾线
				userCheck: true,
				// model显示的文本
				modelContent: '暂时为空，(*^▽^*)',
				// 切换发送验证码按钮
				codeType: true,
				// 加载时文本
				loadingText: '',
				// 本页需校验全部字段的字符串数组
				checkList: ['email', 'code', 'password'],
				// 邮箱
				email: {
					value: '',
					regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
					msg: '邮箱格式错误！',
					focus: false
				},
				// 验证码
				code: {
					value: '',
					regex: /^(\w){6}$/,
					msg: '验证码格式错误！',
					focus: false
				},
				// 密码
				password: {
					value: '',
					regex: /^(?:\d+|[a-zA-Z]+|[\.!@#$%^&*]+){6,16}$/,
					msg: '密码格式错误！',
					focus: false
				},
				// 校验
				btnDisabled: false
			}
		},
		methods: {
			onInfo() {
				this.popupShow = true
			},
			// 用户协议
			onUserCheck(){
				this.modelShow = true
			},
			// 校验表单元素
			// el 元素名
			// regex 正则表达式
			checkFrom (el) {
				// // 修复第一次校验后之后focus无效
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
			// 验证码按钮倒计时
			// num: 秒数
			// 要操作的data属性
			countdownText(num, text){
				this[text] = `${ num-- }秒后重发`
				let id = setInterval(() => {
					if (num === 0) { 
						this.codeType = true
						clearInterval(id)
					}
					this[text] = `${ num-- }秒后重发`
				}, 1000)
			},
			// 请求发送验证码
			getCode () {
				// 首先校验格式
				let flag = this.checkFrom('email')
				if (flag) {
					uni.showLoading({
						title: '验证码发送中...',
						mask: true
					})
					this.$apis.getCode({
						to: this.email.value,
						type: 'email',
						operation: 'register'
					}).then(res => {
						if (res.data.code === 200) {
							// 切换按钮并开始倒计时
							this.codeType = false
							// 调用切换文本
							this.countdownText(60, 'loadingText')
							this.$refs.uToast.show({
								type: 'success',
								title: '发送成功！' 
							})
						} else {
							this.$refs.uToast.show({
								type: 'warning',
								title: res.data.message
							})
						}
					}).catch(err => {
						console.log(err)
						this.$refs.uToast.show({
							type: 'warning',
							title: '服务器开小差了，请稍后重试~' 
						})
					}).finally(
						setTimeout(() => {
							uni.hideLoading()
						}, 200)
					)
				}
			},
			// 提交注册
			onSubmit() {
				if (!this.userCheck) {
					return this.$refs.uToast.show({
						type: 'warning',
						title: '用户协议暂未勾选'
					})
				}
				let flag = ['email', 'code', 'password'].some(el => !this.checkFrom(el))
				if (!flag) {
					uni.showLoading({
						title: '提交中...',
						mask: true
					})
					this.$apis.register({
						email: this.email.value,
						code: this.code.value,
						password: this.email.value
					}).then(res => {
						if (res.data.code === 200) {
							// 注册成功
							this.$refs.uToast.show({
								type: 'success',
								title: '注册成功！' 
							})
						} else {
							// 注册失败
							this.$refs.uToast.show({
								type: 'warning',
								title: res.data.message
							})
						}
					}).catch(err => {
						this.$refs.uToast.show({
							type: 'error',
							title: '服务器开小差了，请稍后重试~' 
						})
					}).finally(
						setTimeout(() => {
							uni.hideLoading()
						}, 150)
					)
				}
			}
		}
	}
</script>

<style lang="scss">
	.u-border-bottom:after {
		border-bottom-width: 0px !important;
	}
	.verify-left{
		width: calc(100% - 260rpx);
	}
	.verify-right{
		padding-left: 20rpx;
	}
	.verify-btn{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		width: 240rpx;
		border-radius: 8rpx;
		background: $thenme-color;
		vertical-align: text-bottom;
	}
	.btn-disabled {
		background: #adadad;
		background-color: #adadad;
		color: #fff;
	}
	.verify-left,.verify-right{
		float: left;
	}
	.landing{
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		background: $thenme-color;
	}
	.forget-btn{
		padding: 10rpx 20rpx;
		margin-top: 300rpx;
	}

	.forget-input input{
		background: #F2F5F6;
		font-size: 28rpx;
		padding: 10rpx 25rpx;
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 8rpx;
	}
	.forget-margin{
		margin-bottom: 25rpx;
	}
	.forget-input{
		padding: 10rpx 20rpx;
		overflow: auto;
	}
	.forget-card{
		background: #fff;
		border-radius: 12rpx;
		padding: 60rpx 25rpx;
		box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.12);
		position: relative;
		margin-top: 30rpx;
	}
	.forget-bg {
		height: 260rpx;
		padding: 25rpx;
		background: linear-gradient(#FF978D, #FFBB69);
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	.popup-view {
		padding: 30rpx 40rpx;
	}
	.guidelines {
		margin-top: 45rpx;
		text-align: center;
	}
	.guidelines-text {
		color: #2b85e4;
		font-size: 28rpx;
	}
</style>
