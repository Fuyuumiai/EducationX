// 需要注意的是，在page.json中的tabBer的pagePath是不要以'/'开头的
const stuList = [
	// 首页
	{
		// 未点击图标
		iconPath: "home",
		// 点击后图标
		selectedIconPath: "home-fill",
		// 显示文字
		text: '首页',
		// 是否显示红点
		isDot: true,
		// 是否使用自定义图标
		customIcon: false,
		// 页面路径
		pagePath: "/pages/home/index"
	},
	// 信息页面
	{
		iconPath: "chat",
		selectedIconPath: "chat-fill",
		text: '消息',
		customIcon: false,
		// 红色角标显示的数字，如果需要移除角标，配置此参数为0即可
		count: 2,
		// 页面路径
		pagePath: "/pages/chat/index"
	},
	// 课程页面
	{
		iconPath: "/static/images/tabBer/course.png",
		selectedIconPath: "/static/images/tabBer/course_select.png",
		text: '课程',
		customIcon: false,
		pagePath: "/pages/course/index"
	},
	// 购物车
	{
		iconPath: "shopping-cart",
		selectedIconPath: "shopping-cart-fill",
		text: '购物车',
		customIcon: false,
		pagePath: "/pages/cart/index"
	},
	// 我的
	{
		iconPath: "account",
		selectedIconPath: "account-fill",
		text: '我的',
		count: 0,
		isDot: false,
		customIcon: false,
		pagePath: "/pages/self/index"
	}
]

const tchList = [
	// 首页
	{
		// 未点击图标
		iconPath: "home",
		// 点击后图标
		selectedIconPath: "home-fill",
		// 显示文字
		text: '首页',
		// 是否显示红点
		isDot: true,
		// 是否使用自定义图标
		customIcon: false,
		// 页面路径
		pagePath: "/pages/home/index"
	},
	// 信息页面
	{
		iconPath: "chat",
		selectedIconPath: "chat-fill",
		text: '消息',
		customIcon: false,
		// 红色角标显示的数字，如果需要移除角标，配置此参数为0即可
		count: 2,
		// 页面路径
		pagePath: "/pages/chat/index"
	},
	// 发布页面
	{
		iconPath: "/static/images/tabBer/min_button.png",
		selectedIconPath: "/static/images/tabBer/min_button_select.png",
		text: '发布',
		midButton: true,
		customIcon: false,
		pagePath: "/pages/publish/index"
	},
	// 课程管理页面
	{
		iconPath: "grid",
		selectedIconPath: "grid-fill",
		text: '课程',
		customIcon: false,
		pagePath: "/pages/course/index"
	},
	// 我的
	{
		iconPath: "account",
		selectedIconPath: "account-fill",
		text: '我的',
		count: 0,
		isDot: false,
		customIcon: false,
		pagePath: "/pages/self/index"
	}
]

export default {
	stuList,
	tchList
}