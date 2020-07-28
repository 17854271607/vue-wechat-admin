import axios from 'axios'
//封装商品列表
let list=(data)=>axios.get('/api/admin/goods/list',{params:data});
//封装商品发布
let release=(data)=>axios.post('/api/admin/goods',data);
//封装删除商品
let remove=(id)=>axios.delete('/api/admin/goods/',{params:id});
//封装商品编辑
let edit =(data)=>axios.put('/api/admin/goods${id}');
//获取商品详情
let detail=(id)=>axios.get('/api/admin/goods',{params:id});
//获取树的分类
let subcate=(data)=>axios.get('/api/category/sub',{params:data});

export default{
	list,release,remove,edit,detail,subcate
}