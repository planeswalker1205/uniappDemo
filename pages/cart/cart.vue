<template>
	<view v-if="cart.length" class="cart-container">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 标题区域 -->
		<view class="cart-list">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
		<block v-for="(goods,i) in cart" :key="i">
			<uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
			<my-goods :item = "goods" :showRadio="true" :showNum="true" @radioChange="radioChangeHandler" @numChange="numChangeHandler"></my-goods>
			</uni-swipe-action-item>
		</block>
		</uni-swipe-action>
		<!-- 自定义结算组件 -->
		<my-settle ></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" mode=""></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from "@/mixins/tabbar_badge.js"
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				options:[
					{
						text:"删除",
						style:{
							backgroundColor:'#C00000'
						}
					}
				]
					
			};
		},
		computed:{
			...mapState("moduleCart",['cart'])
		},
		mixins:[badgeMix],
		methods:{
			...mapMutations("moduleCart",["updateGoodsState","updateGoodsNum","removeGoodsById"]),
			radioChangeHandler(e){
				this.updateGoodsState(e)
				
			},
			numChangeHandler(e){
				this.updateGoodsNum(e)
			},
			swiperItemClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}


	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
.cart-list{
	display: flex;
	height:40px;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		margin-left:10px;
	}
}
.empty-cart{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 150px;
	image{
		width: 90px;
		height:90px;
	}
	.tip-text{
		font-size: 12px;
		color:gray;
		margin-top:15px
	}
}
</style>
