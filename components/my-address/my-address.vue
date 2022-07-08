<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnChooseAdderss" @click="btnChooseAdderssHandler">请选择收货地址+</button>
		</view>
		<!-- 收货信息 -->
		<view class="address-info-box" v-else @click="btnChooseAdderssHandler">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：<text>{{address.userName}}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="num">
						电话：<text>{{address.telNumber}}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
			
					<view class="address-left">
						收货地址：
					</view>
					<view class="address-right">
						{{fullAddress}}
					</view>
			
			</view>
		</view>
		<image src="/static/cart_border@2x.png" class="adderss-border" mode=""></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from "vuex"
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations("moduleUser",["updateAddress"]),
			async btnChooseAdderssHandler(){
				
				const [err,succ] = await uni.chooseAddress().catch(err=>err)
				if(err === null&& succ.errMsg==="chooseAddress:ok"){
					this.updateAddress(succ)
				}
				
			}
		},
		computed:{
			...mapState("moduleUser",["address"]),
			...mapGetters("moduleUser",["fullAddress"])
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height:90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.adderss-border{
	display: block;
	width: 100%;
	height: 5px;
}

.address-info-box{
	height:90px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	justify-content: center;
	padding:0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.row1-right{
			display: flex;
			justify-content: space-between;
			align-items: center;
			
		}
	}
	.row2{
		display: flex;
		align-items: center;
		margin-top:10px;
		.address-left{
			white-space: nowrap;
		}
		
	}
}
</style>