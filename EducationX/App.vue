<script>
export default {
	onLaunch: function() {
		// 第一次加载触发时间
	},
	onShow: function() {
		// 页面显示触发
	},
	onHide: function() {
		// 页面隐藏触发
	}
};
</script>

<style lang="scss">
/*uview-ui css*/
@import "components/uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/font/uni.ttf');
}
/* #endif */
</style>
