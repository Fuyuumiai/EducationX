<template>
	<view>
		<u-navbar title-color="#fff" :is-back="false" :title-bold="true"   :background="background" title="角色选择" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// navbar背景颜色
				background: {
					backgroundColor:'#FF978D'
				},
			}
		}
	}
</script>

<style lang="scss">

</style>
