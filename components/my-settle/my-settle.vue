<template>
	
	<view  class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#C00000" :checked="isAllChecked" @click="allCheckedHandler"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{totalPrice}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle" @click="settleAccounts">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				secondes:3,
				timer:null
			};
		},
		methods:{
			...mapMutations("moduleCart",["allGoodsChecked","successPayGoods"]),
			...mapMutations("moduleUser",["updateRedirectInfo"]),
			allCheckedHandler(){
				this.allGoodsChecked(!this.isAllChecked)
			},
			settleAccounts(){
	
				if(!this.checkedCount){
					return uni.$showMsg("请先选择商品")
				}
				if(!this.fullAddress){
					return uni.$showMsg("请选择收货地址")
				}
				if(!this.token){
					if(!this.token){
						return this.delayNavigate()
					}
				}
				this.payOrder()
				
			},
			async payOrder(){
				// const orderInfo = {
				// 	order_price:0.01,
				// 	consignee_addr:this.fullAddress,
				// 	goods:this.cart.filter(x=>x.goods_state).map(x=>({
				// 		goods_id:x.goods_id,
				// 		goods_number:x.goods_count,
				// 		goods_price:x.goods_price
				// 	}))
				// }
				// //发起请求
				// const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				// if(res.meta.status!==200) return uni.$showMsg("创建订单失败")
				// const orderNumber = res.message.order_number
				// //发起请求获取订单的支付信息
				// const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				
				// //预付订单生成失败
				// if(res2.meta.status!==200) return uni.$showError('预付订单生成失败!')
				// const payInfo = res2.message.pay
				
				// const [err,succ] =await uni.requestPayment(payInfo)
				// if(err) return uni.$showMsg("订单未支付")
				// const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
				// if(res3.meta.status!==200) return uni.$showMsg("订单未支付")
				
				uni.showToast({
					title:"订单支付完成!",
					icon:'success'
				})
				this.successPayGoods()

			},
			showTips(e){
				uni.showToast({
					icon:"none",
					title:"请先登录后再结算!"+e+"秒后自动跳转到登录页",
					mask:true,
					duration:1500
				})
			},
			delayNavigate(){
				this.showTips(this.secondes)
				this.timer = setInterval(()=>{
					this.secondes--
	
					if(this.secondes<=0){
						clearInterval(this.timer)
						
						uni.switchTab({
							url:"/pages/mine/mine",
							success:()=>{
								this.updateRedirectInfo({
									openType:'switchTab',
									from:"/pages/cart/cart"
								})
							}
						})
						//重置为3
						this.secondes = 3
						return
					}
					this.showTips(this.secondes)
				},1000)
			}
		},
		computed:{
			...mapGetters("moduleCart",["checkedCount","isAllChecked","totalPrice"]),
			...mapState("moduleUser",["token"]),
			...mapState("moduleCart",["cart"]),
			...mapGetters("moduleUser",["fullAddress"])
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	height: 50px;
	width: 100%;
	position: fixed;
	bottom:0;
	left:0;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left:10px;
	font-size: 14px;
	.radio{
		display: flex;
		align-items: center;
		
	}
	.amount-box{
		.amount{
			color:#C00000;
			font-weight: bold;;
		}
		
		
	}
	.btn-settle{
		
		text-align: center;
		line-height: 50px;
		background-color: #C00000;
		color:white;
		min-width: 100px;
	}
}
</style>