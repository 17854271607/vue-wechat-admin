import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

Vue.use(VueRouter)
// 引入页面级组件layout
import Layout from '@/components/Layout.vue';
const routes = [{
		path: '/login',
		//一进项目就进入登录页面
		alias: '/',
		name: 'Login',
		meta: { requiresAuth: false },
		component: () => import( /* webpackChunkName: "about" */ '@/views/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		meta: { requiresAuth: false },
		component: () => import( /* webpackChunkName: "about" */ '@/views/Register.vue')
	},
	{
		path: '/goods',
		name: 'Goods',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'GoodsList',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Goods/List.vue'),

			},
			{
				path: 'release',
				name: 'GoodsRelease',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Goods/Release.vue')
			},
			{
				path: 'category',
				name: 'GoodsCategory',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Goods/Category.vue'),

			},
			{
				path: 'edit/:id',
				name: 'GoodsEdit',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Goods/Edit.vue'),
				props: true
			},
		],
	},
	{
		path: '/user',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'UserList',
			component: () => import( /* webpackChunkName: "about" */ '@/views/User/List.vue')
		}]
	},
	{
		path: '/power',
		name: 'Power',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'role',
				name: 'Role',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Power/Role.vue')
			},
			{
				path: 'menu',
				name: 'Menu',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Power/Menu.vue')
			},
		]
	},
	{
		path: '/userset',
		name: 'UserSet',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'setinfo',
			name: 'SetInfo',
			component: () => import( /* webpackChunkName: "about" */ '@/views/UserSet/SetInfo.vue')
		}, ]
	},
	{
		path: '/order',
		name: 'Order',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'List',
			component: () => import( /* webpackChunkName: "about" */ '@/views/Order/List.vue')
		}]
	},
]

const router = new VueRouter({
	routes
});
router.beforeEach((to, from, next) => {
	// console.log(to);
	// console.log(from);
	console.log(to.matched);
	//根据meta元信息校验路由是否需要登录授权

	let isRequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	if (!isRequiresAuth) {
		next();
		return;
	}

	//校验token
	let token = sessionStorage.token;
	//有token 放行
	if (token) {
		next();
		return;
	}
	if (!token) {
		//无token，强制跳转登录		
		Message.error('无效的token，请重新登录');
		setTimeout(() => {
			next(`/login?redirect=${to.path}`);
		}, 2000)
	}

});

export default router
