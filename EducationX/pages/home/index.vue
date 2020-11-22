<template>
	<view>
		<view class="main-box">
			<!-- 导航栏 -->
			<u-navbar :background="{ backgroundColor:'#fff' }" :is-back="false">
				<view class="slot-wrap">
					<view class="navbar-left">
						<u-badge size="mini" :is-dot="true" :offset="[10, 15]"></u-badge>
						<u-icon name="calendar-fill" size="38" color="#909399" @click="goCalendar" />
					</view>
					<view class="search-wrap">
						<u-search 
							:show-action="false"
							:disabled="true"
							input-align="center"
							placeholder="请输入关键字搜索"
							@click="goSearch"
						/>
					</view>
					<view class="navbar-right">
						<u-icon name="scan" size="38" color="#909399" @click="handleScan" />
					</view>
				</view>
			</u-navbar>
			<!-- 主体内容 -->
			<view class="box-content">
				<!-- 轮播图 -->
				<u-swiper
					:list="swiperList"
					:effect3d="true"
					bg-color="#ffffff"
					height="300"
				/>
				<!-- 功能图标 -->
				<view class="content-wrap">
					<u-row gutter="16" justify="center">
						<u-col offset="0.3" span="2" v-for="(item, index) in wrapList" :key="item.title" text-align="center">
							<u-icon :name="item.iconUrl" size="100"></u-icon>
							<text class="warp-text">
								{{item.title}}
							</text>
						</u-col>
					</u-row>
				</view>
				<view class="content-advert">
					<image  class="content-advert-img" src="/static/images/swiper/swiper-0.jpg"></image>
				</view>
				<!-- 切换选择的课程列表 -->
				<view class="content-swiper">
					<view class="u-tabs-box">
						<view class="tabs-box-set" @click="infoShow = true">
							<text class="tabs-box-text">{{userInfo.grade.type}}</text>
							<u-icon name="arrow-down" size="30" style="vertical-align: text-bottom; margin-left: 10rpx;"></u-icon>
						</view>
						<u-tabs-swiper activeColor="#409EFF" gutter="60"  ref="uTabs" :list="tabsList" :current="swiperCurrent" @change="tabsChange"></u-tabs-swiper>
					</view>
					<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
						<swiper-item class="swiper-item" v-for="(item, index) in swiperItemList" :key="index">
							<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
									
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
				<!-- 回到顶部 -->
				<u-back-top :scroll-top="scrollTop" right="30" >
					<!-- 覆盖原先的backTop -->
					<slot>
						<view class="backtop-box">
							<u-icon name="/static/images/utilIcon/goTop.png"  size="65"></u-icon>
						</view>
					</slot>
				</u-back-top>
			</view>
		</view>
		<u-tabbar 
			active-color="#5098FF"
			inactive-color="#909399"
			:list="tabBerList"
			:mid-button="midBtn"
			:border-top="false"
		/>
		<!-- 重置信息弹出层 -->
		<u-popup v-model="infoShow" mode="center" border-radius="8" :custom-style="popupStyle">
			<view class="popup-info-box">
				<view class="info-box-header">
					<text class="info-box-text">年级设置</text>
					<u-icon class="info-box-icon" name="map" color="#303133" size="20" :label="handleAddress()" @click="aderssShow = true"></u-icon>
				</view>
				<view class="info-list" v-for="(item, i) in gradeList" :key="item.type">
					<view class="list-header">
						<text>{{item.type}}</text>
					</view>
					<view class="list-items">
						<u-row justify="between">
							<u-col class="items-col" v-for="(col, j) in item.list" :key="j" span="4" text-align="center">
								<u-tag :mode="setMode(i, j)" :text="col" type="info" shape="circle" @click="onChangeCol(i, j)"/>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 地址选择 -->
		<u-picker v-model="aderssShow" mode="region" @confirm="onAderss" ></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>	
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				// 回到顶部
				scrollTop: 0,
				goTopUrl: '/static/images/fncicon/goTop.png',
				// tabsswiper的配置
				swiperCurrent: 0,
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				tabsList: [
					{
						name: '语文'
					},
					{
						name: '数学'
					},
					{
						name: '英语'
					},
					{
						name: '物理'
					},
					{
						name: '化学'
					},
					{
						name: '生物'
					},
					{
						name: '历史'
					},
					{
						name: '地理'
					}
				],
				// 轮播图的配置
				swiperList: [
					{
						image: '/static/images/swiper/swiper-0.jpg',
						title: '心光'
					},
					{
						image: '/static/images/swiper/swiper-1.jpg',
						title: '樱花'
					},
					{
						image: '/static/images/swiper/swiper-2.jpg',
						title: '晨曦'
					}
				],
				wrapList: [
					{
						iconUrl: '/static/images/warp/yuwen.png',
						title: '语文'
					},
					{
						iconUrl: '/static/images/warp/shuxue.png',
						title: '数学'
					},
					{
						iconUrl: '/static/images/warp/yingyu.png',
						title: '英语'
					},
					{
						iconUrl: '/static/images/warp/wuli.png',
						title: '物理'
					},
					{
						iconUrl: '/static/images/warp/huaxue.png',
						title: '化学'
					},
					{
						iconUrl: '/static/images/warp/shengwu.png',
						title: '生物'
					},
					{
						iconUrl: '/static/images/warp/dili.png',
						title: '史地政'
					},
					{
						iconUrl: '/static/images/warp/study.png',
						title: '资料'
					},
					{
						iconUrl: '/static/images/warp/faceToface.png',
						title: '直播课'
					},
					{
						iconUrl: '/static/images/warp/course.png',
						title: '全部'
					}
				],
				swiperItemList: [[],[],[],[]],
				// 年级列表
				gradeList: [
					{
						type: '小学',
						list: ['六年级', '五年级', '四年级', '三年级', '二年级', '一年级'],
						coruse: ['语文', '数学', '英语']
					},
					{
						type: '初中',
						list: ['三年级', '二年级', '一年级']
					},
					{
						type: '高中',
						list: ['三年级', '二年级', '一年级']
					}
				],
				// infoShow
				infoShow: false,
				// 默认用户设置
				userInfo: {
					grade: {
						type: '高二',
						// 年级坐标 => 根据gradeList 排列
						coordinate: [2, 1]
					},
					address: {
						province: {
							label: "北京市",
							value: "11"
						},
						city: {
							label: "市辖区",
							value: "1101"
						},
						area: {
							label: "东城区",
							value: "110101"
						},
						list: []
					}
				},
				// 地址picker
				aderssShow: false,
				// popup
				popupStyle: {
					padding: '30px 40px'
				}
			}
		},
		onReady() {
			this.$nextTick(() =>{
				let address = this.userInfo.address
				this.userInfo.address.list = [address.province.label, address.city.label, address.area.label]
			})
		},
		computed: {
			...mapGetters([
				'tabBerList',
				'midBtn'
			])
		},
		methods: {
			// 进入打卡页面
			goCalendar() {
				uni.navigateTo({
				    url: '/pages/home/calendar',
					animationType: 'slide-in-bottom',
					animationDuration: 380
				})
			},
			// 进入搜索页面
			goSearch(){
				uni.navigateTo({
				    url: '/pages/search/index',
					animationType: 'slide-in-bottom',
					animationDuration: 380
				})
			},
			// 触发扫码
			handleScan() {
				uni.scanCode({
					success: function (res) {
						this.$refs.uToast.show({
							title: '扫码成功！'	
						})
					}
				})
			},
			// 渲染被选中年级
			setMode(i, j){
				let coordinate = this.userInfo.grade.coordinate
				if (i === coordinate[0] && j === coordinate[1]) {
					return 'dark'
				}
				return 'light'
			},
			// 切换选中年级
			onChangeCol(i, j) {
				let gradeList = this.gradeList[i]
				this.userInfo.grade.coordinate = [i, j]
				this.userInfo.grade.type = `${gradeList.type[0]}${gradeList.list[j][0]}`
				this.infoShow = false
			},
			// 截取地址
			handleAddress(){
				let str = this.userInfo.address.province.label
				if (str.length >= 5) {
					str = `${str.substring(0, 3)}...`
				}
				return str
			},
			// 地址重置
			onAderss(arr) {
				this.userInfo.address = arr
			},
			// 切换tabs
			tabsChange(){
				this.swiperCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx
				this.$refs.uTabs.setDx(dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// 滚动到底部加载更多
			onreachBottom(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-box{
		width: 100%;
		height: 100vh;
		background-color: #FEFEFE;
	}
	.navbar-left {
		position: relative;
	}
	.slot-wrap,
	.navbar-left,
	.navbar-right {
		display: flex;
		flex: 1;
		justify-content: center;
	}
	.search-wrap {
		display: flex;
		flex: 7;
	}
	.box-content{
		margin-top: 15rpx;
		.content-wrap {
			margin-top: 40rpx;
			margin-right: 2.5%;
				.warp-text {
					display: block;
					margin-bottom: 30rpx;
					font-size: 0.95em;
				}
		}
		.content-advert {
			width: calc(100% - 40px);
			height: 300rpx;
			margin: 20rpx 0rpx 20rpx 40rpx;
			border-radius: 10rpx;
			overflow: hidden;
			box-shadow: $yuiai-box-shadow;
			.content-advert-img{
				width: 100%;
				height: 100%;
			}
		}
		.content-swiper {
			margin: 10rpx 2.5%;
		}
		.backtop-box {
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
			border-radius: 50%;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.u-tabs-box {
		padding-left: 120rpx;
		position: relative;
		.tabs-box-set {
			position: absolute;
			left: 20rpx;
			top: 50%;
			transform: translateY(-50%);
			text-align: center;
			.tabs-box-text {
				font-weight: bold;
			}
		}
	}
	.popup-info-box {
		width: 560rpx;
		height: 720rpx;
		padding: 30rpx 40rpx;
		.info-box-header {
			text-align: center;
			position: relative;
			.info-box-text {
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}
			.info-box-icon {
				position: absolute;
				top: 10rpx;
				right: 10rpx;
			}
		}
	}
	.info-list {
		margin: 40rpx 0rpx 0rpx 0rpx;
		.list-header {
			font-weight: bold;
		}
		.list-items {
			margin: 20rpx 0rpx 0rpx 0rpx;
			.items-col {
				margin: 0rpx 0rpx 30rpx 0rpx;
			}
		}
	}
</style>
