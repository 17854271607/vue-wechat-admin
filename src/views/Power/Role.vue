<template>
	<div class="box">
		<el-card class="box-card role">
			<div slot="header" class="clearfix">
				<span>角色管理</span>
				<el-button style="float: right; padding: 5px 5px" type="primary" plain @click='openInsertModel' icon="el-icon-setting">添加角色</el-button>
			</div>
			<div class="text item">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column label="#" type="index" width="80">
					</el-table-column>
					<el-table-column label="分类">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="250">
						<template slot-scope="scope">
							<el-button @click="handleEdit(scope.row.id, scope.row.name,scope.$index)" type="primary" plain :disabled='scope.row.name==="超级管理员"'><i
								 class="el-icon-edit"></i></el-button>
							<el-button type="danger" @click="handleDelete(scope.row.id,scope.$index)" plain :disabled='scope.row.name==="超级管理员"'><i
								 class="el-icon-delete"></i></el-button>
							<el-button type="primary" plain icon="el-icon-setting" @click="handleSetting(scope.row.id,scope.$index)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<!-- 设置模态框 -->
		<div class="layout">
			<el-card class="box-card box-right" v-show="isShow===true" v-for="(item,index) in options_1st" :key="index">
				<div slot="header" class="clearfix">
					<span class="title-color"><i class='el-icon-collection-tag'></i>{{item.name}}</span>
					<el-switch v-model="item.checked" style="float: right;" @change="toggleAll(item.id,index)"></el-switch>
				</div>
				<ul>
					<li class="listStyle" v-for="(content,idx) in item.children">{{content.name}}
						<el-switch @change="checkedSingle(content.id,idx,index)" v-model="content.checked" style="float: right;"></el-switch>
					</li>
				</ul>
			</el-card>
		</div>

	</div>
</template>

<script>
	import { Power } from '@/api/index';
	export default {
		data() {
			return {
				isShow: false, //右边框框
				role_id: '', //角色id
				options_1st: [],

				tableData: [],
				isShowDialog: false,
				roleMenu: {
					menu_id: '',
					role_id: '',
				},
			}
		},
		created() {
			this.loadList();
		},
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadList(id);
			}
		},
		methods: {
			// 全选
			async toggleAll(menu_id, i) {
				if (this.options_1st[i].checked == false) {
					this.roleMenu.role_id = this.role_id;
					this.roleMenu.menu_id = menu_id;
					let { status, data } = await Power.removemenu(this.roleMenu);
					for (var j = 0; j < this.options_1st[i].children.length; j++) {
						this.options_1st[i].children[j].checked = false;
						var id = this.options_1st[i].children[j].id;
						this.roleMenu.menu_id = id;
						let { status, data } = await Power.removemenu(this.roleMenu);
					}
				} else {
					this.roleMenu.role_id = this.role_id;
					this.roleMenu.menu_id = menu_id;
					let { status, data } = await Power.addmenu(this.roleMenu);
					for (var j = 0; j < this.options_1st[i].children.length; j++) {
						this.options_1st[i].children[j].checked = true;
						var id = this.options_1st[i].children[j].id;
						this.roleMenu.menu_id = id;
						let { status, data } = await Power.addmenu(this.roleMenu);
					}
				}
			},
			async checkedSingle(menu_id, idx, i) {
				if (this.options_1st[idx].children[i].checked == false) {
					this.roleMenu.role_id = this.role_id;
					this.roleMenu.menu_id = menu_id;
					let { status, data } = await Power.removemenu(this.roleMenu);
					var num = 0
					for (var j = 0; j < this.options_1st[idx].children.length; j++) {
						if (this.options_1st[idx].children[j].checked == true) {
							num++;
						}
					}
					if (num >= 1) {
						this.options_1st[idx].checked = true;
						var ID = this.options_1st[idx].id;
						this.roleMenu.menu_id = ID;
						let { status, data } = await Power.addmenu(this.roleMenu);
					} else {
						this.options_1st[idx].checked = false;
						var ID = this.options_1st[idx].id;
						this.roleMenu.menu_id = ID;
						let { status, data } = await Power.removemenu(this.roleMenu);
					}
				} else {
					this.roleMenu.role_id = this.role_id;
					this.roleMenu.menu_id = menu_id;
					let { status, data } = await Power.addmenu(this.roleMenu);
					var num = 0;
					for (var j = 0; j < this.options_1st[idx].children.length; j++) {
						if (this.options_1st[idx].children[j].checked === true) {
							num++;
						}
					}
					if (num >= 1) {
						this.options_1st[idx].checked = true;
						var ID = this.options_1st[idx].id;
						this.roleMenu.menu_id = ID;
						let { status, data } = await Power.addmenu(this.roleMenu);
					} else {
						this.options_1st[idx].checked = false;
						var ID = this.options_1st[idx].id;
						this.roleMenu.menu_id = ID;
						let { status, data } = await Power.removemenu(this.roleMenu);
					}
				}
			},
			// 根据角色配置获取菜单信息
			async handleSetting(id, index) {
				this.isShow = true;
				this.role_id = id;
				let { status, data } = await Power.config({ id: id });
				if (status) {
					this.options_1st = data;
				}
			},
			//编辑
			handleEdit(id, name, index) {
				this.$prompt('请修改信息', '修改', {
					inputPattern: /\S/,
					inputErrorMessage: '请输入非空字符',
					inputValue: name,
				}).then(async ({ value }) => {
					let { status } = await Power.edit(id, value);
					if (status) {
						this.$message.success('修改成功！');
						//更新页面
						this.tableData[index].name = value;
					}
				}).catch(() => {
					this.$message.info('取消成功！');
				});
			},
			//删除
			handleDelete(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let { status } = await Power.remove({ id });
					if (status) {
						this.$message.success('删除成功');
						//更新dom页面
						this.tableData.splice(index, 1);
					}
				}).catch(() => {
					this.$message.info('取消成功')
				});
			},
			//点击添加按钮
			openInsertModel() {
				this.$prompt('请输入添加的角色名称', '添加角色', {
					inputPattern: /\S/,
					inputErrorMessage: '不能输入空白字符'
				}).then(async ({ value }) => {
					let { status, data } = await Power.insert({ name: value });
					if (status) {
						this.$message.success('添加成功');
						//更新dom页面
						this.tableData.push({ name: value, ...data }) //...data是把data用扩展运算符展开，data里面有id
					}

				}).catch(() => {
					console.log(this.$message)
					this.$message.info('取消成功');
				});
			},
			async loadList() {
				let { status, data } = await Power.list();
				if (status) {
					this.tableData = data;
				}
			}

		}
	}
</script>

<style scoped>
	.box {
		display: flex;
	}

	.box-right {
		margin-bottom: 10px;
	}

	.title-color {
		color: #409eff;
		font-size: 14px;
	}

	.layout {
		display: flex;
		flex-direction: column;
		width: calc(100% - 620px);
		margin-left: 20px;
	}

	.listStyle {
		padding: 5px 0;
		list-style: none;
		font-size: 14px;
	}

	.role .text {
		font-size: 14px;
	}

	.role {
		width: 600px;
	}

	.role .item {
		margin-bottom: 18px;
	}

	.role .clearfix:before,
	.role .clearfix:after {
		display: table;
		content: "";
	}

	.role .clearfix:after {
		clear: both
	}
</style>
