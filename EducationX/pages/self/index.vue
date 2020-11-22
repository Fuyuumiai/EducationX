<template>
	<view class="content">
		<view class="main-box">
			<view class="box-header">
				<view class="header-icons">
					<u-icon name="setting-fill" color="#FFFFFF" size="45"></u-icon>
				</view>
			</view>
		</view>
		<u-tabbar 
			:list="tabBerList"
			:mid-button="midBtn"
			:active-color="activeColor"
			:inactive-color="inactiveColor"
			:border-top="borderTop"
		></u-tabbar>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				borderTop: false,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
				login: false
			}
		},
		computed: {
			...mapGetters([
				'tabBerList',
				'midBtn'
			])
		}
	}
</script>

<style scoped lang="scss">
	.main-box {
		position: relative;
	}
	.box-header {
		height: 520rpx;
		background-image: linear-gradient(45deg, #0FE9F8, #9A06F8);
		color: #FFFFFF;
		padding-top: var(--status-bar-height);
	}
</style>
