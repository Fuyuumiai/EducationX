<template>
	<view class="content">
		<view class="main-box">
			chat
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
				activeColor: '#5098FF'
			}
		},
		computed: {
			...mapGetters([
				'tabBerList',
				'midBtn'
			])
		},
		onLoad() {
			console.log(this.midBtn)
		}
	}
</script>

<style scoped lang="scss">

</style>
