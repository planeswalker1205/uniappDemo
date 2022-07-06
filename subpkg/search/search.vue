<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" :placeholder="'请输入搜索内容'"></uni-search-bar>
		</view>
		<view class="sugg-list" v-if="searchResult.length!==0">
			<view class="sugg-item" v-for="(item,i) in searchResult" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="20"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="clearSearchHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag v-for="(item,i) in histories" :key="i" :text="item" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:0,
				kw:'',
				searchResult:[],
				searchHistory:['a','app','apple']
			};
		},
		methods:{
			//input输入函数的处理
			input(e){
				//防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
				this.kw = e
				this.getSearchList()	
					
				},500)
					
	
				

			},
			async getSearchList(){
				if(this.kw.length === 0){
					this.searchResult = []
					return 
				}
				let {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(res.meta.status!==200) return uni.$showMsg()
				this.searchResult = res.message
				this.saveSearchHistory()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
				})
			},
			saveSearchHistory(){
				
				
				let arrSet = new Set(this.searchHistory)
				arrSet.delete(this.kw)
				arrSet.add(this.kw)
				this.searchHistory = Array.from(arrSet)
				uni.setStorageSync('kw',JSON.stringify(this.searchHistory))
			},
			//清空搜索历史
			clearSearchHistory(){
				uni.clearStorageSync('kw',[])
				this.searchHistory = []
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?query="+item
				})
			}
		},
		onLoad() {
			this.searchHistory = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		computed:{
			histories(){
				return [...this.searchHistory].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top:0;
	z-index: 999;
}
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		font-size: 12px;
		padding: 13px 0;
		border-bottom:1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box{
	.history-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height:40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
		padding:0 5px;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;

		padding:0 5px;
		uni-tag{
			margin-top:5px;
			margin-right:5px;
			
			
		}
	}
}
</style>
