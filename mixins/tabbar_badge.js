import {mapGetters} from "vuex"
export default {
	computed:{
		...mapGetters('moduleCart',['totalNum'])
	},
	onShow() {
		this.setBadge()
	},
	watch:{
		"totalNum":function(nval){
			this.setBadge()
		}
	},
	methods:{
		setBadge(){
			if(this.totalNum==0){
				uni.removeTabBarBadge({
					index:2
				})
				return
			}

			uni.setTabBarBadge({
				index:2,
				text:this.totalNum+''
			})
		}
	}
}