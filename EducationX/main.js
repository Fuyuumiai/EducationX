import Vue from 'vue'
import App from './App'
import store from './store/index'
// 引入 uView
import uView from 'components/uview-ui'
// 引入 apis
import apis from 'apis/index'

// 配置开发环境
Vue.config.productionTip = false

// 配置api文件
Vue.prototype.$apis = apis



// 引用uView
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
