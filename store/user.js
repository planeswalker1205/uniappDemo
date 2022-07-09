export default {
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token:uni.getStorageSync("token")||"",
		userinfo:JSON.parse(uni.getStorageSync("userinfo")||"{}"),
		//重定向的object对象(openType,from)
		redirectInfo:null
	}),
	mutations:{
		//修改地址信息
		updateAddress(state,address){
			state.address = address
			this.commit('moduleUser/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		//更新用户的基本信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			this.commit("moduleUser/saveUserInfoToStorage")
		},
		//userinfo信息持久化存储到本地
		saveUserInfoToStorage(state){
			uni.setStorageSync("userinfo",JSON.stringify(state.userinfo))
		},
		//更新token字符串
		updateToken(state,token){
			state.token = token
			this.commit('moduleUser/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		//更新重定向的信息对象
		updateRedirectInfo(state,info){
			state.redirectInfo = info
		}
	},
	getters:{
		fullAddress(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}