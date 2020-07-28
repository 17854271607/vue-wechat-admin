<template>
	<el-card class="box-card release">
		<div slot="header" class="clearfix">
			<p>商品发布</p>
		</div>
		<div class="text item">
			<el-form :model="insertForm" label-width="90px" label-position='left' ref='insertForm' :rules="rules">
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
					<el-input class="small" v-model.number='insertForm.price'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的数字，且不能高于市场价</p>
					<p class=' message'>此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</p>
				</el-form-item>
				<el-form-item label="市场价" prop="price">
					<el-input class="small" v-model.number='insertForm.marketPrice'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</p>
				</el-form-item>
				<el-form-item label="成本价" prop="cost">
					<el-input class="small" v-model.number='insertForm.cost'>
						<template slot="append">元</template>
					</el-input>
					<p class="message">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</p>
				</el-form-item>
				<el-form-item label="折扣" prop="discount">
					<el-input class="small" v-model.number='insertForm.discount'>
						<template slot="append">折</template>
					</el-input>
					<p class="message">根据销售价与市场价比例自动生成不需要编辑</p>
				</el-form-item>
				<el-form-item label="商品库存" prop="inventory">
					<el-input class="small" v-model.number='insertForm.inventory'>
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
				<!-- <el-form-item label="商品轮播图" prop="slider">
					<el-upload action="/api/upload/slider" :headers:'headers' :file-list='photo' list-type="picture-card" :on-success="sliderSuccess"
					 :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="insertForm.slider" alt="">
					</el-dialog>
					<div class="sub-title">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
						800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
				</el-form-item> -->
				<el-form-item label="商品轮播图" prop="slider">
					<el-upload action="/api/upload/slider" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview"
					 :on-success="sliderSuccess" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="insertForm.slider" alt="">
					</el-dialog>
				</el-form-item>
				<div class="gray">
					商品详情描述
				</div>
				<el-form-item label="商品品牌" prop="slider">
					<el-input v-model='insertForm.slider'></el-input>
				</el-form-item>
				<el-form-item label="商品描述">
					<div ref="editor"></div>
				</el-form-item>
				<div class="gray">商品物流信息</div>
				<el-form-item label="所在地">
					<el-select v-model="insertForm.province_id" placeholder="请选择">
						<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id"></el-option>
					</el-select>
					<el-select v-model="insertForm.city_id" placeholder="请选择">
						<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id"></el-option>
					</el-select>
					<el-select v-model="insertForm.county_id" placeholder="请选择">
						<el-option v-for="item in county" :key="item.county_id" :label="item.name" :value="item.county_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运费" prop="freight">
					<el-input value="0" class="small" v-model.number='insertForm.freight'>
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
	import { Province } from '@/api/index'
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				dialogVisible: false, //轮播图
				photo: [], //轮播图图片
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
				}, //发布新商品
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
					// inventory: [
					// 	{ required: true, message: '库存不能为空' },
					// 	{  message: '库存必须为数字值' }
					// ],
					articleNo: [
						{ required: true, message: '请输入商品货号', trigger: 'blur' },
						{ min: 1, max: 1000, message: '长度在 1到 20 个字符', trigger: 'blur' }
					],
					slider: [
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
		async created() {
			//获取一级分类
			let options = await this.loadList(1);
			this.options_1st = options;
			//默认第一项
			this.insertForm.cate_1st = options[0].id;



			//省市区
			let provinceList = await Province.provinceList();
			this.province = provinceList.data;
			//市级
			let cityList = await Province.city({ id: this.insertForm.province_id });
			this.city = cityList.data;
			//县区
			let countyList = await Province.county({ id: this.insertForm.city_id });
			this.county = countyList.data;

		},
		watch: {
			'insertForm.cate_1st': async function(val) {
				//获取二级分类
				let options = await this.loadList(val);
				this.options_2nd = options;
				//默认第一项
				this.insertForm.cate_2nd = options[0].id;
			},
			'insertForm.cate_2nd': async function(val) {
				//获取二级分类
				let options = await this.loadList(val);
				this.options_3rd = options;
				//默认第一项
				this.insertForm.cate_3rd = options[0].id;
			},
			//省市区三级
			'insertForm.province_id': async function(val) { /* 就是Province的id*/
				//获取市分类
				let { data, status } = await Province.city({ id: val });
				//给二级分类数组赋值
				if (status) {
					this.city = data;
					//根据一级分类的id自动选中二级分类的第一个值,默认选择第一项
					// this.insertForm.city_id = data[0].id;
				}
			},
			'insertForm.city_id': async function(val) {
				//获取县分类
				let { status, data } = await Province.county({ id: val });
				//给三级分类数组赋值
				this.county = data;
				if (status) {
					this.county = data;
					//根据一级分类的id自动选中二级分类的第一个值,默认选择第一项
					// this.insertForm.county_id = data[0].id;
				}
			},
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//获取商品分类列表
			async loadList(id) {
				let pId = id;
				let { status, data } = await Goods.subcate({ pId });
				if (status) {
					return data;
				}
			},
			//图片上传成功
			handleUploadSuccess(res) {
				// console.log(res);
				this.insertForm.img_md = res.mdImg;
			},
			sliderSuccess(res) {
				console.log(res);
				this.insertForm.slider = res.src;
			},
			//商品轮播图
			handleRemove(file, fileList) {
				let src = '';
				fileList.forEach((item) => {
					src += (item.url + ',');
				})
				this.insertForm.slider = src;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			async created() {
				let id = this.id;
				let res = await goods.detail({ id });
				this.insertForm = res.data;
				this.insertForm.slider = this.insertForm.slider.split(',');
				this.insertForm.slider.forEach((item, idx) => {
					if (item !== '') {
						this.photo[idx] = {
							url: item
						}
						this.$set(this.photo, idx)
					}
				})
			},
			//轮播图上传
			sliderSuccess(res, file) {
				let { status, src, msg } = res;
				this.insertForm.slider += (src + ',');
			},

			//发布提交
			async submit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Goods.release(this.insertForm);
						if (status) {
							this.$message.success('发布成功!');
							//跳转页面
							this.$router.push({ path: '/goods/list' });
						}
					} else {
						this.$message.info('发布失败!');
						return false;
					}
				});
			}

		},
		mounted() {
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.insertForm.slider = html;
			}
			editor.create()
		},
	}
</script>

<style>
	.release .text {
		font-size: 14px;
	}

	.release .item {
		margin-bottom: 18px;
	}

	.release .message {
		font-size: 12px;
		color: gray;
	}

	.release .small {
		width: 200px;
	}

	.release .gray {
		height: 50px;
		background-color: #f0f0f0;
		line-height: 50px;
		font-size: 16px;
		padding-left: 10px;

	}

	.release .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.release .avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.release .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.release .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
