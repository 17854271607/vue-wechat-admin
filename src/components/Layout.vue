<template>
	<el-container>
		<el-header style='padding: 0;'>
			<NavBar @change='handleMenu($event)'></NavBar>
		</el-header>
		<el-container>
			<el-aside style='width: auto;'>
				<!-- 左侧侧边栏菜单 -->
				<LeftMenu :isCollapse='show'></LeftMenu>
			</el-aside>
			<el-main>
				<!-- 主体内容 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import NavBar from '@/components/NavBar';
	import LeftMenu from '@/components/LeftMenu';
	export default{
		data(){
			return {
				show:false
			}
		},
		components:{
			NavBar,
			LeftMenu
		},
		methods:{
			handleMenu(res){
				this.show=res;
			}
		}
	}
</script>

<style>
</style>
