<template>
	<view class="content">
		
		<view class="main-box" v-if="pageShow">
		</view>
		<view class="null-box" v-else>
			<u-empty text="购物车为空" mode="car"></u-empty>
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
				pageShow: false
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
	.main-box{
		width: 100%;
		height: 100vh;
		background-color: #F1F1F1;
	}
	.null-box {
		margin-top: 300rpx;
	}
</style>
