<template>
	<view class="content">
		<u-navbar :background="{ backgroundColor: '#fff' }" :is-back="true" :border-bottom="false">
			<view class="slot-wrap">
				<view class="search-wrap">
					<u-search :show-action="false" :disabled="true" input-align="center" height="76" placeholder="" />
					<!-- 定位一个tag -->
					<u-tag class="wrap-tag" mode="dark" type="info" shape="circle" index="0" :text="query" :closeable="true" />
				</view>
			</view>
		</u-navbar>
		<!-- 筛选框 -->
		<u-dropdown class="playnone-dropdown">
			<u-dropdown-item 
				v-for="(item, index) in searchItems" 
				:key="index"  
				v-model="item.id"
				:title="item.text" 
				:options="searchOptions[index]">
			</u-dropdown-item>
		</u-dropdown>
		<!-- 显示搜索内容框 -->
		<view class="content-main">
			<u-empty  v-if="!courseList.length" margin-top="260" class="main-none" text="暂无匹配数据" mode="search"></u-empty>
			<view v-else class="main-box" >
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			query: '',
			// 筛选内容
			searchItems: [
				{
					text: '价格',
					id: 'price'
				},
				{
					text: '评价',
					id: 'assess'
				},
				{
					text: '距离',
					id: 'range'
				}
			],
			// 对应上面的筛选选项
			searchOptions: [
				[
					{
						label: '综合排序',
						value: 1
					},
					{
						label: '价格降序',
						value: 2
					},
					{
						label: '价格升序',
						value: 3
					},
				],
				[
					{
						label: '综合排序',
						value: 1
					},
					{
						label: '评价降序',
						value: 2
					},
					{
						label: '评价升序',
						value: 3
					},
				],
				[
					{
						label: '综合排序',
						value: 1
					},
					{
						label: '距离降序',
						value: 2
					},
					{
						label: '距离升序',
						value: 3
					}
				]
			],
			courseList: []
		}
	},
	onLoad(options) {
		this.$nextTick(() => {
			this.query = options.query
		})
	},
	methods:{
		getTest(val){
			console.log(val)
			return '11'
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100vh;
}
.slot-wrap {
	display: flex;
	align-items: center;
	flex: 1;
	.search-wrap {
		position: relative;
		flex: 1;
		margin: 0rpx 35rpx 0rpx 0rpx;
		.wrap-tag {
			position: absolute;
			top: 50%;
			left: 70rpx;
			transform: translateY(-50%);
		}
	}
}
.content-top-screen {
	display: flex;
	align-items: center;
	.screen-tabs {
		flex: 3;
	}
	.screen-dropdown{
		flex: 2;
	}
	.screen-icon{
		flex: 1;
	}
}
.content-main {
	width: 100%;
}
</style>
