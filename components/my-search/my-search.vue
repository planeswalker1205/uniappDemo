<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}"  @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			 <icon type="search" size="17"/>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>

	export default {

		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit("click")
			}
		},
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:18
			}
		}

	}
</script>

<style lang="scss">
	.my-search-container{
		height:50px;

		display: flex;
		align-items: center;
		padding: 0 10px;
		
		.my-search-box{
			width:100%;
			height: 36px;
			background-color: #FFFFFF;

			display: flex;
			justify-content: center;
			align-items: center;
			.placeholder{
				font-size: 15px;
				margin-left:5px;
			}
		}
	}
</style>