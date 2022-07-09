
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
import store from "@/store/store.js"
uni.$http = $http
//配置请求根路径
$http.baseUrl = "https://www.uinav.com"
//请求拦截器
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
  	title:"数据加载中..."
  })
  //判断当前请求的是否是有权限的接口（请求的地址是否包含my）
  if(options.url.indexOf('/my/')!==-1){
	  options.header = {
		  Authorization:store.state.moduleUser.token
	  }
  }
}
//响应拦截器
$http.afterRequest = function () {
  // do something...
  uni.hideLoading()
}

//封装弹框方法
uni.$showMsg = function(title="数据请求失败!",duration=1500){
	return uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif