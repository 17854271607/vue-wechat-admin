<template>
	<el-card class="box-card edit">
		<div slot="header" class="clearfix">
			<p>商品编辑</p>
		</div>
		<div class="text item">
			<el-form :model='insertForm' label-width="90px" label-position='left' ref='insertForm' :rules="rules">
				<el-form-item label="商品分类">
					<el-select v-model="insertForm.cate_1st">
						<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="insertForm.cate_2nd">
						<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="insertForm.cate_3rd">
						<el-option v-for="item in options_3rd" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model='insertForm.name'></el-input>
					<p class="message">商品标题名称长度至少3个字符，最长200个汉字</p>
				</el-form-item>
				<el-form-item label="商品卖点" prop="hotPoint">
					<el-input type="textarea" :rows="2" v-model="insertForm.hotPoint">
					</el-input>
					<p class="message">商品卖点不能超过140个汉字</p>
				</el-form-item>
				<el-form-item label="商品价格" prop="price">
					<el-input class="small" v-model='insertForm.price'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的数字，且不能高于市场价</p>
					<p class=' message'>此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</p>
				</el-form-item>
				<el-form-item label="市场价" prop="price">
					<el-input class="small" v-model='insertForm.marketPrice'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</p>
				</el-form-item>
				<el-form-item label="成本价" prop="cost">
					<el-input class="small" v-model='insertForm.cost'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</p>
				</el-form-item>
				<el-form-item label="折扣" prop="discount">
					<el-input class="small" v-model='insertForm.discount'>
						<template slot="append">折</template>
					</el-input>
					<p class="message">根据销售价与市场价比例自动生成不需要编辑</p>
				</el-form-item>
				<el-form-item label="商品库存" prop="inventory">
					<el-input class="small" v-model='insertForm.inventory'>
						<template slot="append">件</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的整数</p>
					<p class="message">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</p>
				</el-form-item>
				<el-form-item label="商品货号" prop="articleNo">
					<el-input class="small" v-model='insertForm.articleNo'></el-input>
					<p class="message">商品货号是商家管理商品的编号，买家不可见</p>
					<p class="message">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</p>
				</el-form-item>
				<el-form-item label="商品主图" prop="img_md">
					<SingleUpload :url='insertForm.img_md' :action='action' @success='handleUploadSuccess($event)' @remove='insertForm.img_md=""'></SingleUpload>
					<p class="message">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
						800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</p>
				</el-form-item>
				<el-form-item label="商品轮播图" prop="slider">
					<el-upload action="/api/upload/slider" :headers="headers" :file-list="photo" list-type="picture-card" :on-success="sliderSuccess">
						<!-- :on-preview="handlePictureCardPreview" :on-success="sliderSuccess"
									 :on-remove="handleRemove" -->
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="insertForm.slider" alt="">
					</el-dialog>
					<p class="message">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
						800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</p>
				</el-form-item>
				<div class="gray">
					商品详情描述
				</div>
				<el-form-item label="商品品牌" prop="brand">
					<el-input v-model='insertForm.brand'></el-input>
				</el-form-item>
				<el-form-item label="商品描述">
					<div ref="editor"></div>
				</el-form-item>
				<div class="gray">商品物流信息</div>
				<el-form-item label="所在地">
					<el-select v-model="insertForm.province_id" placeholder="请选择">
						<el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="insertForm.province_id" placeholder="请选择">
						<el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="insertForm.province_id" placeholder="请选择">
						<el-option v-for="item in county" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运费" prop="freight">
					<el-input value="0" class="small" v-model='insertForm.freight'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">运费设为0，前台商品将显示免运费</p>
				</el-form-item>
				<el-button type="success" @click='submit("insertForm")'>提交</el-button>
			</el-form>
		</div>
	</el-card>
</template>


<script>
	//富文本编辑器
	import E from 'wangeditor';
	import { Release } from "@/api/index";
	import { Goods } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload'
	export default {
		props: ['id'],
		components: {
			SingleUpload
		},
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				dialogVisible: false, //轮播图
				dialogImageUrl: '',
				photo: [],
				options: [],
				options_1st: [],
				options_2nd: [],
				options_3rd: [],
				// 省市区数组
				province: [],
				city: [],
				county: [],

				value: '',
				imageUrl: '',
				textarea: '',
				action: '/api/upload/goods',
				insertForm: {
					id: '',
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: '',
					img_lg: '',
					img_md: '',
					slider: '',
					brand: '',
					detail: '',
					freight: '',

					province_id: '110000000000', //省级id
					city_id: '110100000000', //市级id
					county_id: '110101000000', //县级id
				},
				rules: {
					name: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
						{ min: 1, max: 100, message: '长度在 1到 100 个字符', trigger: 'blur' }
					],
					hotPoint: [
						{ required: true, message: '请输入商品卖点', trigger: 'blur' },
						{ min: 1, max: 1000, message: '长度在 1到 1000 个字符', trigger: 'blur' }
					],
					price: [
						{ required: true, message: '价格不能为空' },
						{ type: 'number', message: '价格必须为数字值' }
					],
					marketPrice: [
						{ required: true, message: '价格不能为空' },
						{ type: 'number', message: '价格必须为数字值' }
					],
					discount: [
						{ required: true, message: '折扣不能为空' },
						{ type: 'number', message: '折扣必须为数字值' }
					],
					cost: [
						{ required: true, message: '折扣不能为空' },
						{ type: 'number', message: '折扣必须为数字值' }
					],
					inventory: [
						{ required: true, message: '库存不能为空' },
						{ type: 'number', message: '库存必须为数字值' }
					],
					articleNo: [
						{ required: true, message: '请输入商品货号', trigger: 'blur' },
						{ min: 1, max: 1000, message: '长度在 1到 20 个字符', trigger: 'blur' }
					],
					brand: [
						{ required: true, message: '请输入商品品牌', trigger: 'blur' },
						{ min: 1, max: 100, message: '长度在 1到 100 个字符', trigger: 'blur' }
					],
					freight: [
						{ required: true, message: '价格不能为空' },
						{ type: 'number', message: '价格必须为数字值' }
					]
				}

			};
		},
		// async created() {
		// 	//获取一级分类
		// 	let options = await this.loadList(1);
		// 	this.options_1st = options;

		// },
		// watch: {
		// 	'insertForm.cate_1st': async function(val) {
		// 		//获取二级分类
		// 		let options = await this.loadList(val);
		// 		this.options_2nd = options;
		// 	},
		// 	'insertForm.cate_2nd': async function(val) {
		// 		//获取二级分类
		// 		let options = await this.loadList(val);
		// 		this.options_3rd = options;
		// 		// //默认第一项
		// 	}

		// },
		async created() {
			//获取一级分类
			let options = await this.loadSubcate(1);
			this.options_1st = options;
			//商品详情
			let id = this.id;
			let res = await Goods.detail({ id });
			this.form = res.data;
			this.form.slider = this.form.slider.split(',');
			this.form.slider.forEach((item, idx) => {
				if (item !== "") {
					this.photo[idx] = {
						url: item
					}
					this.$set(this.photo, idx, this.photo[idx]);
				}
			});

		},
		watch: {
			'insertForm.cate_1st': async function(val) {
				//获取二级分类
				let options = await this.loadSubcate(val);
				this.options_2nd = options;

			},
			'insertForm.cate_2nd': async function(val) {
				//获取二级分类
				let options = await this.loadSubcate(val);
				this.options_3rd = options;

			}

		},
		methods: {
			// 获取u节点
			async loadSubcate(id) {
				//父级节点pId
				let pId = id;
				//获取子级节点
				let { status, data } = await Goods.subcate({ pId });
				if (status) {
					return data;
				}
			},
			//获取信息
			async loadList(id) { /* 加载列表数据 */
				let { status, data } = await Goods.detail({ id });
				if (status) {
					this.insertForm = data;
					console.log(data);
					return data;
				}
			},
			//商品轮播图
			handleRemove(file, fileList) {
				let src = '';
				fileList.forEach((item) => {
					src += (item.url + ',');
				})
				this.form.slider = src;
			},

			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//轮播图上传
			sliderSuccess(res, file) {
				let { status, src, msg } = res;
				this.insertForm.slider += (src + ',');
			},
			async created() {
				let id = this.id;
				let res = await Goods.detail({ id });
				this.insertForm = res.data;
				this.insertForm.slider = this.insertForm.slider.split(',');
				this.insertForm.slider.forEach((item, idx) => {
					if (item !== '') {
						this.photo[idx] = {
							url: item
						}
						this.$set(this.photo, idx, this.photo[idx]);
					}
				})
			},
			//上传商品主图成功
			handleInsertSuccess(res) {
				this.insertForm.img_md = res.mdImg;
			},

			//编辑成功!
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Goods.edit(this.insertForm);
						if (status) {
							this.$message.success('编辑成功!');
							this.$router.push({ path: '/goods/list' });
						}
					} else {
						this.$message.info('编辑失败!');
						return false;
					}
				});
			},
		},
		async mounted() {
			//获取商品详情
			let goodsDetails = await this.loadList(this.id);
			this.insertForm = goodsDetails;
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.insertForm.slider = html
			}
			//配置图片上传
			editor.customConfig.uploadImgServer = '/api/upload/editor';
			//配置上传 fileName
			editor.customConfig.uploadFileName = 'file';

			editor.create();
			editor.txt.html(goodsDetails.detail);

		},
	}
</script>

<style>
	.edit .text {
		font-size: 14px;
	}

	.edit .item {
		margin-bottom: 18px;
	}

	.edit .message {
		font-size: 12px;
		color: gray;
	}

	.edit .small {
		width: 200px;
	}

	.edit .gray {
		height: 50px;
		background-color: #f0f0f0;
		line-height: 50px;
		font-size: 16px;
		padding-left: 10px;

	}

	.edit .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.edit .avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.edit .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.edit .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
