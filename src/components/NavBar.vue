<template>
	<div class="navbar">
		<div class="left">
			<img src="../assets/img/logo.png" alt="">
			<i class="el-icon-s-fold" @click="emits"></i>
		</div>
		<div class="right">
			<el-avatar class='avatar' size='small' :src="ruleForm.avatar"></el-avatar>
			<el-dropdown>
				<span class="el-dropdown-link">
					{{ruleForm.username}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>消息</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

	</div>
</template>

<script>
	import { User } from '@/api/index';

	export default {
		data() {
			return {
				isShow:false,
				ruleForm: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					role: '',
					avatar: '',
				},
			}
		},
		created(){
			this.loadDetail();
		},
		methods:{
			//获取用户详情
			async loadDetail(){
				let id=sessionStorage.uid;
				let{status,data}=await User.info({id});
				if(status){
					this.ruleForm=data;
				}
			},
			emits(){
				this.isShow=!this.isShow;
				this.$emit('change',this.isShow);
			}
		},
	}
</script>

<style scoped>
	.navbar {
		background-color: #000;
		color: white;
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
		padding-right: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.navbar .left {
		display: flex;
		align-items: center;
	}

	.navbar .right {
		display: flex;
		align-items: center;
	}

	.navbar img {
		height: 60px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: white;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.right img {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	.right>.avatar {
		margin-right: 10px;
	}
</style>
