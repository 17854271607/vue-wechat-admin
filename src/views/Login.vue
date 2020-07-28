<template>
	<div class="login">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>
			<div class="text item">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
					<el-form-item label="账户" prop="username">
						<el-input v-model="ruleForm.username" placeholder="请输入账户名" prefix-icon="el-icon-user"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input show-password v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-key"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
					</el-form-item>
					<p>
						<router-link to="/register">
							<el-link type="info" :underline="false">注册账户</el-link>
						</router-link>
						<router-link to='/register'>
							<el-link type="info" :underline="false">忘记密码</el-link>
						</router-link>
					</p>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { User } from '@/api/index';

	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',

				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
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
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 12,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],


				}
			};
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					
					let { status, msg, data } = await User.login({...this.ruleForm});
					if (status) {
						
						// 登录成功后,储存token、uid、role
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						this.$message.success(msg);
						//是否有redirect参数
						let { redirect } = this.$route.query;
						if (redirect) {
							this.$router.replace(redirect);
						} else {
							//默认跳转路由
							this.$router.replace('/Goods/List'); //跳转到商品列表页
						}

					} else {
						this.$message.error(msg);
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},

	}
</script>

<style scoped>
	.login {
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

	.login .box-card {
		width: 400px;
	}

	i {
		margin: 0;
	}

	.login p {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.login .box-card {
		position: absolute;
		top: 50%;
		left: 70%;
		transform: translateY(-50%);
	}
</style>

