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
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations("moduleCart",["allGoodsChecked"]),
			allCheckedHandler(){
				this.allGoodsChecked(!this.isAllChecked)
			}
		},
		computed:{
			...mapGetters("moduleCart",["checkedCount","isAllChecked","totalPrice"])
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