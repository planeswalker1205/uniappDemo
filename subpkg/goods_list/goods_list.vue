<template>
	<view>
		<view class="goodslist">
			<view  v-for="(item,i) in goodsList" :key="i"  @click="gotoDetail(item)">
					<my-goods :item="item"></my-goods>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj:{
					//查询关键词
					query:'',
					//商品分类Id
					cid:'',
					pagenum:1,
					pagesize:10,
					//商品列表的数据
	
				},
				goodsList:[],
				//总数量
				total:0,
				isRequest:false
			};
		},
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total){
				
				return uni.$showMsg('已经到底啦！')
			}
			this.queryObj.pagenum = this.queryObj.pagenum+1 
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isRequest = false
			this.goodsList = []
			//重发请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb){
				if(this.isRequest) return
				this.isRequest = true
				try{
					const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
					if(res.meta.status!==200) return uni.$showMsg()
					this.goodsList = [...this.goodsList,...res.message.goods]
					this.total = res.message.total
					this.isRequest = false
					cb&&cb()
				}catch(e){
					//查询失败，数据回滚
					this.queryObj.pagenum = this.queryObj.pagenum==1?1:this.queryObj.pagenum-1
					this.isRequest = false
					cb&&cb()
				}
				
				
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},

		onLoad(options) {
			this.queryObj.query = options.query||''
			this.queryObj.cid = options.cid||''
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">

</style>
