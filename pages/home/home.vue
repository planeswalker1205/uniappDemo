<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key = "i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>

		</swiper>
		
		<view class="navlist">
			<view v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floorlist">
			<view class="flooritem" v-for="(item,i) in floorList" :key="i">
				<!-- 标题 -->

				<image class="titleImg" :src="item.floor_title.image_src" mode=""></image>

				<view class="floor_content">
					<navigator class="img_left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="img_right">
						<navigator v-for="(img,i) in item.product_list" v-if="i!==0" :key="i" :url="img.url">
							<image :src="img.image_src" :style="{width:img.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>

					</view>
				</view>
			</view>
		</view>
	</view>
	

	
	
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				//分类导航
				navList:[],
				//楼层的数据
				floorList:[]
			};
		},
	
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
		
				if(res.meta.status!==200){
					return uni.$showMsg()
					
				}
				this.swiperList = res.message
			},
			async getNavList(){
				const {data:res} =	await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200){
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			navClickHandler(item){
				console.log(item);
				if(item.name==="分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			//获取首页楼层数据
			async getFloorList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200) return uni.$showMsg()
				let tmpList = res.message
				tmpList.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url="/subpkg/goods_list/goods_list?"+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		},

	}
</script>

<style lang="scss">
*{
	margin:0;
	padding:0;
	border:0;
}
swiper{
	height:330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}

.navlist{
	display: flex;
	justify-content: space-around;
	margin:15rpx 0;
	view{
		image{	
			width: 128rpx;
			height: 140rpx;
		}
	}
}

.floorlist{
	
	.flooritem{
		
		.titleImg{
				height:60rpx;
				width: 100%;
				display: flex;
				
		}
		.floor_content{
			display: flex;
			
			.img_right{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				image{
					padding:5rpx 0;
				}
			}
		}

	}
}
</style>
