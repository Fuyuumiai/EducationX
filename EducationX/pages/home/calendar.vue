<template>
	<view class="content">
		<u-navbar title="学习签到" :title-bold="true" :border-bottom="false" />
		<ren-calendar
			ref="ren"
			:disabledAfter="false"
			:markDays="markDays"
		/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markDays: []
			}
		},
		components:{
			renCalender: reslove => require(['components/ren-calendar/ren-calendar'], reslove)
		},
		onReady(){
			this.markDays.push('2020-11-13')
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100vh;
	}
</style>
