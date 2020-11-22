<template>
	<view class="content">
		<u-navbar title-color="#fff"  back-icon-color="#fff" height="60" :background="background" title="忘记密码" />
		<view class="forget-bg">
			<view class="forget-card">
				<view class="forget-input forget-margin">
					<view class="login-head">忘记了密码？可在此重置密码！</view>
				</view>
				<view class="forget-input forget-margin">
					<input type="number" placeholder="请输入您的邮箱" />
				</view>
				<view class="forget-input forget-margin">
					<view class="verify-left">
						<input type="number" placeholder="请输入验证码" />
					</view>
					<view class="verify-right">
						<button class="verify-btn" type="primary">获取验证码</button>
					</view>
				</view>
				<view class="forget-input">
					<input type="number" placeholder="请输入新的密码(8-16位)" />
				</view>
			</view>
		</view>
		<view class="forget-btn">
			<button class="landing" type="primary">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor:'#FF978D'
				}
			}
		},
		onLoad() {

		},
		methods: {

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
		margin-top: 380rpx;
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
</style>
