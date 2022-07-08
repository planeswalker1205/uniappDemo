export default {
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}')
	}),
	mutations:{
		//修改地址信息
		updateAddress(state,address){
			state.address = address
			this.commit('moduleUser/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters:{
		fullAddress(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}