<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load='loadNode' lazy node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" @click.stop='openEditModle(node,data)' icon="el-icon-edit" :disabled="node.level==1" size="mini">
							编辑
						</el-button>
						<el-button type="text" @click.stop='openAddModle(node,data)' icon="el-icon-plus" size="mini">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click="remove(node, data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 编辑 -->
		<el-dialog title="编辑节点" :visible.sync="dialogFormVisibleEdit">
			<el-form :model="editForm">
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" :label-width="formLabelWidth">
					<SingleUpload :url='[editForm.img,"avatar"]' @success='handleUploadSuccess($event)' @remove='editForm.img=""'></SingleUpload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
				<el-button type="primary" @click="submitEdit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加 -->
		<el-dialog title="添加节点" :visible.sync="dialogFormVisibleAdd">
			<el-form :model="insertForm">
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" :label-width="formLabelWidth">
					<SingleUpload :url='[insertForm.img,"avatar"]' @success='handleUploadSuccessAdd($event)' @remove='insertForm.img=""'></SingleUpload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="submitAdd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Goods } from '@/api/index';
	import { Category } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId:'',
					img:'',
				},
				editForm: {
					id: '',
					name: '',
					img: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				dialogFormVisibleEdit: false,
				dialogFormVisibleAdd:false,
				formLabelWidth: '120px',
			}
		},

		methods: {
			append(data) {
				const newChild = { id: id++, label: 'testtest', children: [] };
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},
			//打开编辑
			openEditModle(node, data) {
				this.dialogFormVisibleEdit = true;
				this.editForm = { ...data };
				this.node = node;
			},
			//编辑上传图片成功
			handleUploadSuccessEdit(res) {
				this.editForm.img = res.src;
			},
			//编辑提交成功				
			async submitEdit() {
				let { status } = await Category.editNode({ ...this.editForm });
				if (status) {
					this.$message.success('编辑成功');
					this.dialogFormVisibleEdit = false;
					this.node.data = this.editForm;
				}
			},
			//打开添加
			openAddModle(node,data){
				this.dialogFormVisibleAdd=true;
				this.insertForm.pId=data.id;
				this.node=node;
				this.insertForm.img='';
				
			},
			//添加分类图片上传成功
			handleUploadSuccessAdd(res){
				this.insertForm.img=res.src;
			},
			//添加分类提交
			async submitAdd(){
				let {status,data}=await Category.Add({...this.insertForm});
				if(status){
					this.$message.success("添加成功！");
					this.$refs.tree.append({...data,...this.insertForm},this.node);
					this.dialogFormVisibleAdd=false;
				}
			},
			//删除分类
			remove(node, data) {
				let id=data.id;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let {status}=await Category.remove({id});
					if(status){
						this.$message.success('删除成功！');
						this.$refs.tree.remove({...data});
					}
					
					
				}).catch(() => {
					this.$message.info('取消删除')
				});

			},
			//获取tree
			async loadNode(node, resolve) {
				//节点对象node
				//返回节点数据resolve
				// console.log(node,resolve);

				if (node.level == 0) {
					let { satus, data } = await Goods.subcate({ pId: 0 });
					return resolve(data);

				}
				//父级节点id
				let pId = node.data.id;
				let { status, data } = await Goods.subcate({ pId });
				if (status) {
					return resolve(data);
				}
			},

		}
	}
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
