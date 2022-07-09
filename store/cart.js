export default {
	namespaced:true,
	state:()=>({
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
	mutations:{
		addToCart(state,goods){
			console.log(state.cart);
			const findResult = state.cart.find(item=>item.goods_id===goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('moduleCart/saveToStorage')
		},
		//将购物车的数据持久化存储
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		//更新商品勾选状态
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
			}
			this.commit('moduleCart/saveToStorage')
		},
		//全选操作
		allGoodsChecked(state,checkState){
			state.cart.forEach(item=>item.goods_state=checkState)
			this.commit('moduleCart/saveToStorage')
		},
		//更新商品数量
		updateGoodsNum(state,goods){
			const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
			}
			this.commit('moduleCart/saveToStorage')
		},
		//删除商品
		removeGoodsById(state,goods_id){
			state.cart = state.cart.filter(x=>x.goods_id!==goods_id)
			this.commit('moduleCart/saveToStorage')
		},
		//已支付成功的商品
		successPayGoods(state){
			state.cart = state.cart.filter(x=>!x.goods_state)
			this.commit('moduleCart/saveToStorage')
		}
		
	},
	getters:{
		totalNum(state){
		return state.cart.length==0?0:state.cart.reduce((curr,item)=>{
				return curr+item.goods_count
			},0)
		},
		//選中數量
		checkedCount(state){
			return state.cart.filter(x=>x.goods_state).reduce((curr,item)=>curr+=item.goods_count,0)
		},
		//判断全选状态
		isAllChecked(state){
			return state.cart.length && state.cart.every(item=>item.goods_state)
		},
		//总价格
		totalPrice(state){
			return state.cart.length==0?0:state.cart.reduce((curr,item)=>{
					return curr+(item.goods_price*item.goods_count)
				},0).toFixed(2)
		}
	}
}