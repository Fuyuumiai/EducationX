<template>
	<view class="content">
		<u-navbar title="搜索" :title-bold="true" :border-bottom="false" />
		<view class="main-box">
			<u-search
			  v-model.trim="keyword" 
			  placeholder="请输入搜索关键字"
			  :height="76"
			  :action-style="actionStyle"
			  maxlength="20"
			  @search="onSearch"
			  @custom="onSearch"
			 />
			 <view class="box-history box-config" v-if="historyShow">
				<view class="box-hedaer">
					<!-- <u-icon 
						class="hedaer-text"
						name="/static/images/utilIcon/history.png"
						size="37" 
						label="历史记录"
						label-color="#000"
					/> -->
					<text class="hedaer-text">历史记录</text>
					<u-icon size="34" name="/static/images/utilIcon/delete.png" class="hedaer-text hedaer-right" @click="modalShow = true"></u-icon>
				</view>
				<view class="header-tags-box">
					<u-tag 
						class="header-tags"
						v-for="(item, index) in keywordHistory" 
						mode="dark"
						type="info"
						:key="index" 
						:text="item"
						shape="circle"
						:index="index"
						:closeable="true"
						@click="onHistory"
						@close="deleteHistory"
					/>
				</view>
			 </view>
			 <!-- 热门推送 -->
			 <view class="box-recommend box-config">
			 	<view class="box-hedaer ">
			 		<!-- <u-icon 
			 			class="hedaer-text"
			 			name="/static/images/utilIcon/recommend.png"
			 			size="40" 
			 			label="热门推送"
			 			label-color="#000"
			 		/> -->
					<text class="hedaer-text">热门推送</text>
			 	</view>
				<view class="header-tags-box">
					<u-tag 
						class="header-tags"
						v-for="(item, index) in hotList" 
						mode="dark"
						type="info"
						:key="index" 
						:text="item"
						shape="circle"
						:index="index"
						@click="onRecommend"
					/>
				</view>
			 </view>
		</view>
		<u-modal 
			v-model="modalShow"
			:show-cancel-button="true" 
			:async-close="true" 
			@confirm="deleteAllHistory"
			content="您确定删除搜索历史吗？">
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalShow: false,
				keyword: '',
				// 输入框右侧文字样式配置
				actionStyle: {
					'color': '#007aff',
					'fontSize': '15px'
				},
				// 搜索记录历史数组
				keywordHistory: [],
				// 热门搜索的历史数组
				hotList: [
					'小升初数学大决战',
					'高二5科重难点如何突破',
					'高二英语写作句式',
					'初中化学高校提升',
					'初中语文知识点'
				],
				// 控制搜索历史的显示
				historyShow: false
			}
		},
		onLoad(){
			this.$nextTick(() => {
				this.keywordHistory = uni.getStorageSync('yuiai_keyword') ? JSON.parse(uni.getStorageSync('yuiai_keyword')) : []
				this.historyShow = this.keywordHistory.length ? true : false
			})
		},
		methods:{
			// 搜索事件
			onSearch(val, type = 0){
				if (val.trim() === '') {
					this.$refs.uToast.show({
						title: '搜索内容为空！'
					})
				} else {
					// 跳转页面，并添加搜索记录
					if (!type) {
						this.historyShow = true
						this.keywordHistory.push(val)
						uni.setStorageSync('yuiai_keyword', JSON.stringify(this.keywordHistory))
					}
					this.keyword = ''
					uni.navigateTo({
					    url: `/pages/search/result?query=${val}`,
						animationType: 'slide-in-bottom',
						animationDuration: 380
					})
				}
			},
			// 点击搜索历史
			onHistory(index){
				this.onSearch(this.keywordHistory[index], 1)
			},
			// 点击推送
			onRecommend(index) {
				this.onSearch(this.hotList[index], 1)
			},
			// 删除单个搜索历史
			deleteHistory(index){
				this.keywordHistory.splice(index, 1)
				this.historyShow = this.keywordHistory.length ? true : false
				uni.setStorageSync('yuiai_keyword', JSON.stringify(this.keywordHistory))
			},
			// 删除全部搜索历史
			deleteAllHistory() {
				this.keywordHistory = []
				this.historyShow = false
				uni.removeStorageSync('yuiai_keyword')
				setTimeout(() => {
					this.modalShow = false
					this.$refs.uToast.show({
						title: '删除成功！'
					})
				}, 500)
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-box {
		width: calc(100% - 70rpx);
		margin: 20rpx 0rpx 0rpx 40rpx;
		.box-config {
			padding: 60rpx 0rpx 0rpx 0rpx;
		}
		.box-hedaer {
			height: 60rpx;
			display: flex;
			.hedaer-text {
				vertical-align: text-bottom;
				font-weight: bold;
				flex: 1;
			}
			.hedaer-right {
				display: flex;
				justify-content: flex-end;
			}
		}
		.header-tags-box {
			margin: 10rpx 0px 20rpx 0rpx;
			.header-tags {
				background-color: #C0C4CC;
				color: #fff;
				margin: 20rpx 20rpx 0rpx 0rpx;
			}
		}
	}
</style>
