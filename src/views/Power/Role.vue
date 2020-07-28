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
							<el-button type="primary" plain icon="el-icon-setting" @click='isShowDialog=true'></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>	
		</el-card>
		<div class="boxright">
			<el-card>
				
			</el-card>
			
		</div>
		
	</div>
</template>

<script>
	import { Power } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
				isShowDialog: false,
			}
		},
		created() {
			this.loadList();
		},
		methods: {
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

<style>
	.box{
		display: flex;
		
	}
	.boxright{
		margin-left:20px;
		width: calc(100% - 620px);
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
