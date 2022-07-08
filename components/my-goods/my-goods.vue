<template>
	<view>
			<view class="good-item">
				<view class="good-logo">
					
					<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
					
					<image :src="item.goods_small_logo||defaulPic" mode=""></image>
				</view>
				<view class="good-info">
					<text class="good-describe">{{item.goods_name||''}}</text>
					<view class="goods-info-box">
						<text class="good-price">￥{{item.goods_price | tofixed}}</text>
						<uni-number-box v-if="showNum" :value="item.goods_count" :min="1" @change="getNum"></uni-number-box>
					</view>
				</view>
			</view>

	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaulPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		props:{
			item:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				//默认不显示
				default:false
			},
			showNum:{
				type:Boolean,
				//默认不显示
				default:false
			}
		},
		methods:{
			radioClickHandler(){
				this.$emit("radioChange",{
					goods_id:this.item.goods_id,
					goods_state:!this.item.goods_state
				})
			},
			getNum(val){
				this.$emit("numChange",{
					goods_id:this.item.goods_id,
					goods_count:+val
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.good-item{
	display: flex;
	margin:10px 0;
	border-bottom: 1px solid #efefef;
	padding: 10px 10px;
	.good-logo{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 5px;
		image{
			width: 100px;
			height: 100px;
		}
	}
	.good-info{
		margin-left:5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
		.good-describe{
			font-size: 14px;
		}
		.good-price{
			color:#ff0000;
			font-size: 15px;
			font-weight: bold;
		}
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}
</style>