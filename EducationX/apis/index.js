function $request(url, data, method, ...config) {
	// 默认路由
	
	return new Promise((reslove, reject) => {
		uni.request({
		    url: `http://localhost:3000/${url}`,
		    data,
			method,
			timeout: 10000,
		    header: {
		        'Content-Type': 'application/json;charset=UTF-8'
		    },
			// 额外配置
			...config,
		    success: (res) => {
		        reslove(res)
		    },
			fail: (err) => {
				reject(err)
			}
		})
	})
}

// 导出接口
export default {
	// 获取验证码
	getCode(data) {
		return $request('user/sendCode', data, 'post')
	},
	// 注册
	register(data){
		return $request('user/addUser', data, 'post')
	},
	// 登录
	login(data){
		return $request('user/login', data, 'post')
	}
}