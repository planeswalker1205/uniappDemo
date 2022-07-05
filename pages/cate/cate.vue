<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<view  v-for="(item,i) in cateList" :class="['left-scroll-view-item',i===active?'active':'']" :key="i" @click = "activeChange(i)">
					{{item.cat_name}}
				</view>
	

			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cateLevel2" v-for="(cat,i) in cateListLevel2" :key ="i">
					<view class="cate-lv2-title">
						/{{cat.cat_name}}/
					</view>
					<view class="cateLevel3">
						<view class="cateLevel3-item" v-for="(c3,index) in cat.children" :key="index" @click="gotoGoodsList(c3)">
							<view class="cate-lv3-icon" >
								<image :src="c3.cat_icon" mode=""></image>
							</view>
							<text class="cate-lv3-title">
								{{c3.cat_name}}
							
							</text>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前设备可用高度
				wh:0,
				cateList:[],
				//当前激活列表项的索引
				active:0,
				cateListLevel2:[],
				scrollTop:0
			};
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods:{
			async getCateList(){
				let {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status!==200) return uni.$showMst()
				this.cateList = res.message
				this.cateListLevel2 = res.message[0].children
			},
			activeChange(idx){
				this.active = idx
				this.cateListLevel2 = this.cateList[idx].children
				//scrollTop前后赋值不能一致，否则后赋值不生效
				this.scrollTop = this.scrollTop==0?1:0
			},
			//跳转到商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active{
				background-color: #FFFFFF;
				position: relative;
				&::before{
					content:'';
					display: block;
					width: 3px;
					height:30px;
					background-color: #C00000;
					position: absolute;
					top:50%;
					left:0;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cateLevel2{
		display: flex;
		flex-direction: column;
		.cate-lv2-title{
			font-weight: bolder;
			text-align: center;
			padding: 15px 0;
		}
		.cateLevel3{
			display: flex;
			flex-wrap: wrap;

			.cateLevel3-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 33.3%;
				margin-bottom: 10px;
				image{
					width: 60px;
					height:60px;
					
				}
				.cate-lv3-title{
					font-size: 12px;
				}
			}
		}
	}
}
</style>
