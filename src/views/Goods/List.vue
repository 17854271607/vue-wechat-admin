<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>商品列表</span>
		</div>
		<div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="商品名称" width='600px'>
					<template slot-scope='scope'>
						<div class="scope-box">
							<div>
								<el-image :src="scope.row.img_md" style="width: 80px;"></el-image>
							</div>
							<div class="goods-name">
								<span>{{scope.row.name}}</span>
								<!-- <br> -->
								<span>商品货号:{{scope.row.articleNo}}</span>
							</div>
						</div>
					</template>

				</el-table-column>
				<el-table-column prop="price" label="价格" sortable>
				</el-table-column>
				<el-table-column label="库存" prop="inventory" sortable>
				</el-table-column>
				<el-table-column label="发布时间" sortable prop="create_time">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link :href="`#/goods/edit/${scope.row.id}`" class="router-edit">
							<el-button size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
						</el-link>
						<el-button class="rgtbtn" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)" plain><i
							 class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>

			</el-table>
			<div class="page">
				<div class="block">
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="[4, 8, 16, 32]" :page-size="3" layout="->,prev, pager, next, sizes, total " :total="this.totle">
					</el-pagination>
				</div>
			</div>

		</div>
	</el-card>
</template>

<script>
	import { Goods } from '@/api/index'
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1,
				pagesize: 4,
				pageindex: 1,
				totle: 11
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			//加载数据
			async loadList() {
				let { status, goods } = await Goods.list();
				if (status) {
					this.tableData = goods;
				}
			},
			//每页数据变化
			async handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pagesize=val;
				let index=this.pageindex;
				let {status,goods,total}=await Goods.list({pageSize:val,pageIndex:index});
				if(status){
					this.tableData=goods;
					this.total=total;
				}
				
			},
			//改变当前页
			async handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pageindex=val;
				let size=this.pagesize;
				let {status,goods,total}=await Goods.list({pageSize:size,pageIndex:val});
				if(status){
					this.tableData=goods;
					this.total=total;
				}
			},
			//删除商品	
			handleDelete(index,id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let { status } = await Goods.remove({id});
					if (status) {
						this.$message.success('删除成功');
						//更新dom页面
						this.tableData.splice(index, 1);
					}
				}).catch(() => {
					this.$message.info('取消成功')
				});
			}
			//编辑商品
			
		}
	}
</script>

<style>
	.page {
		text-align: right;
		margin-top: 30px;
	}

	.scope-box {
		display: flex;
	}

	.goods-name {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		margin-top: 20px;
		font-size: 12px;
	}

	.rgtbtn {
		margin-left: 10px;
	}
</style>
