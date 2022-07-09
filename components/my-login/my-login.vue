<template>
	<view class="login-container">
		<!-- 提示登录 -->
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login"  @click="getUserProfile">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations("moduleUser",["updateUserInfo","updateToken","updateRedirectInfo"]),
			getUserProfile(e){
				uni.getUserProfile({
					desc:"登录",
					success:(res)=> {
						console.log("获取的用户信息：",res);
						this.updateUserInfo(res.userInfo)
						//获取登录成功后的token字符串
						this.getToken(res)
					},
					fail:(res)=>{
						console.log("res:",res);
						return uni.$showMsg("您取消了授权！")
					}
				})
			},
			async getToken(info){
				// //调用微信登录接口
				// const [err,res] = await uni.login().catch(err=>err)
				// //判断是否调用失败
				// if(err || res.errMsg!=="login:ok") return uni.$showMsg("登录失败!")
				// const query = {
				// 	code:res.code,
				// 	encryptedData:info.encryptedData,
				// 	iv:info.iv,
				// 	rawData:info.rawData,
				// 	signature:info.signature
				// }
				// const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// if(loginResult.meta.status!==200) return uni.$showMsg("登录失败")
				// uni.$showMsg("登录成功")
				
				
				//以上流程无后端权限实现。token使用假数据
			
			    this.navigateBack()
				
				this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
			},
			navigateBack(){
				if(this.redirectInfo&&this.redirectInfo.openType==="switchTab"){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:()=>{
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		},
		computed:{
			...mapState("moduleUser",["redirectInfo"])
		}
	}
</script>

<style lang="scss">
.login-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 750rpx;
	position: relative;
	overflow: hidden;
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom:0;
		left:0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 80%;
		border-radius: 30px;
		margin:15px 0;
		background-color: #C00000;
	
	}
	.tips-text{
		color:gray;
		font-size: 12px;
	}
	
}
</style>