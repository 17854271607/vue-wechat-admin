<template>
	<div class="register">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册账户</span>
			</div>
			<div class="text item">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
					<el-form-item label="账户" prop="username">
						<el-input v-model="ruleForm.username" placeholder="请输入账户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password" >
						<el-input show-password v-model="ruleForm.password" autocomplete="off" placeholder='请输入密码'></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input show-password v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="fullname">
						<el-input v-model="ruleForm.fullname" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-radio-group v-model="ruleForm.sex">
							<el-radio label="男">男</el-radio>
							<el-radio label="女">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="ruleForm.email" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="手机" prop="tel">
						<el-input v-model="ruleForm.tel" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item prop="checked">
						<el-checkbox v-model="ruleForm.checked">同意本站用户协议</el-checkbox>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">注册</el-button>
					</el-form-item>
					<p>
						<router-link to="/login"><el-link type="info" :underline="false">登录账户</el-link></router-link>
						<router-link to='/login'><el-link type="info" :underline="false">忘记密码</el-link></router-link>
					</p>
					 
				</el-form>
			</div>
		</el-card>
	</div>

</template>

<script>
	import {User} from '@/api/index';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: '',
					checkPass: '',
					fullname: '',
					sex: '',
					tel: '',
					email:'',
					checked:''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
							type:'string'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						type:'string',
						validator: validatePass,
						trigger: 'blur'
					},
					{
						pattern:/ *\d{6,}$/,
						message: '至少6位数字',
						trigger: 'blur'
					}
					],
					checkPass: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请填写手机号',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请填写邮箱',
						trigger: 'blur'
					}],
					checked:[{
						required: true,
						message: '请选择',
						trigger: 'change'
					}]

				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid)=>{
					if(!valid){
						return false;
					}else{
						let {status,msg,data}=await User.register({...this.ruleForm});
						if(status){
							this.$message.success(msg);
							//储存token、uid、role
							sessionStorage.token=data.token;
							sessionStorage.uid=data.id;
							sessionStorage.role=data.role;
							this.$router.push({path:'/admin/login'})
						}else{
							this.$message.success(msg);
						}
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style scoped>
	.register {
		width: 100vw;
		height: 100vh;
		background: url(../assets/img/login-bg.jpg) no-repeat center center;
		background-size: cover;
		position: relative;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 400px;
	}

	i {
		margin: 0;
	}

	p {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.box-card {
		position: absolute;
		top: 50%;
		left: 70%;
		transform: translateY(-50%);
	}
	
</style>
