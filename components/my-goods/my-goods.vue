<template>
	<view>
			<view class="good-item">
				<view class="good-logo">
					<image :src="item.goods_small_logo||defaulPic" mode=""></image>
				</view>
				<view class="good-info">
					<text class="good-describe">{{item.goods_name||''}}</text>
					<text class="good-price">￥{{item.goods_price | tofixed}}</text>
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
			}
		}
	}
</script>

<style lang="scss" scoped>

.good-item{
	display: flex;
	margin:10px 0;
	border-bottom: 1px solid #efefef;
	padding: 10px 5px;
	.good-logo{
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
		.good-describe{
			font-size: 14px;
		}
		.good-price{
			color:#ff0000;
			font-size: 15px;
			font-weight: bold;
		}
	}
}
</style>