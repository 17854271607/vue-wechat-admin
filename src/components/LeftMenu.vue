<template>
	<div class="left-menu">
		<el-menu :collapse="isCollapse" class="left" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-goods"></i>
					<span>商品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/goods/category">商品分类</el-menu-item>
					<!-- <router-link to="/article/list" active-text-color="#ffd04b"> -->
					<el-menu-item index="/goods/release">发布商品</el-menu-item>
					<!-- </router-link> -->
					<el-menu-item index="/goods/list">商品列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- <router-link to="/category/category"> -->
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-files"></i>
					<span>订单管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/order/list">订单列表</el-menu-item>
					<!-- <router-link to="/article/list" active-text-color="#ffd04b"> -->	
				</el-menu-item-group>
			</el-submenu>
			<!-- </router-link> -->

			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>账户设置</span>
				</template>
				<el-menu-item-group>
					<!-- <router-link to="/user/list" active-text-color="#ffd04b"> -->
					<el-menu-item index="/UserSet/SetInfo">账户信息</el-menu-item>
					<!-- </router-link> -->
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-user"></i>
					<span>用户管理</span>
				</template>
				<el-menu-item-group >
					<!-- <router-link to="/admin/list" active-text-color="#ffd04b"> -->
					<el-menu-item index='/user/list'>用户列表</el-menu-item>
					<!-- </router-link> -->
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-set-up"></i>
					<span>权限设置</span>
				</template>
				<el-menu-item-group>
					<!-- <router-link to="/power/role" active-text-color="#ffd04b"> -->
					<el-menu-item index='/power/role'>用户角色</el-menu-item>
					<!-- </router-link> -->
					<el-menu-item index='/power/menu'>菜单权限</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>



<script>
	export default {
		computed:{
			isCollapse(){
				return this.$store.state.isCollapse;
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>
	.left-menu {
		height:100%;
	}

	.left {
		height:calc(100vh - 60px) ;
	}
</style>
