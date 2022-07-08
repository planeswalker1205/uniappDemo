<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key = "i">
				<view class="swiper-item">
					<image :src="item.pics_big" mode="" @click="preview(i)"></image>
				</view>
			</swiper-item>
			
		</swiper>
		
		<view class="goods-info-box">
			<view class="goods-price">
				￥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-ope">
				<view class="good-info">
					<text>{{goods_info.goods_name}}</text>
					
				</view>
				<view class="good-ope">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods-transport">
				快递:免运费
			</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods_nav">
			<uni-goods-nav :fill = "true" :options = "options" @click="onClick" @buttonClick="buttonClick">
				
			</uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex"
	export default {
		data() {
			return {
				goods_info:{},
				options: [ {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor:'#007aff',
					infoColor:"red"
				}, {
					icon: 'cart',
					text: '购物车',
					info:0
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}]
			};
		},
		onLoad(options){
			
			this.getGoodsDetail(options.goods_id)

		},
		computed:{
			...mapGetters("moduleCart",["totalNum"])
		},
		watch:{
			totalNum:{
			    immediate: true,
				handler(newVal){
					let findResult = this.options.find(item=>item.text==='购物车')
					findResult.info = newVal
				}
			}
		},
		methods: {
			async getGoodsDetail(goods_id) {
				let {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status!=200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ').replace(/webp/g,'jpg')
				this.goods_info = res.message
				
			},
			preview(idx){
				uni.previewImage({
					current:idx,
					urls:this.goods_info.pics.map(x=>x.pics_big)
				})
			},
			onClick (e) {
			if(e.content.text === "购物车"){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		  },
		  buttonClick (e) {
			console.log(e);
			if(e.content.text === "加入购物车"){
				//构建一个参数传递
				const goods = {
					goods_id:this.goods_info.goods_id,
					goods_name:this.goods_info.goods_name,
					goods_price:this.goods_info.goods_price,
					goods_count:1,
					goods_small_logo:this.goods_info.goods_small_logo,
					goods_state:true
				}
				//仓库购物车数量+1
				this.$store.commit("moduleCart/addToCart",goods)

			}
		  }
		},
	}
</script>

<style lang="scss">
swiper{
	height:750rpx;
	swiper-item{
		.swiper-item{
			image{
				width: 100%;
				height: 750rpx;
			}
		}
	}

}
.goods-info-box{
	display: flex;
	flex-direction: column;
	height:120px;
	justify-content: space-around;
	padding: 10px;
	padding-right:0;
	.goods-price{
		color:#C00000;
		font-weight: bolder;
	}
	.goods-info-ope{
		display: flex;
		justify-content: space-between;

		.good-info{
			font-size: 13px;
			margin-right: 10px;
		}
		.good-ope{
			font-size: 11px;
			display: flex;
			border-left: 1px solid #efefef;
			width: 120px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color:gray;
		}
	}
	.goods-transport{
		font-size: 12px;
		color:gray;
	}
	
}
.goods_nav{
	position: fixed;
	bottom:0;
	left:0;
	width: 100%;

}
.goods-detail-container{
	padding-bottom: 50px;
}
</style>
