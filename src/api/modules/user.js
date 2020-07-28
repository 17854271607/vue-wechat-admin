import axios from 'axios'
//封装登录
let login=(data)=>axios.post('/api/admin/login',data);
//封装注册
let register=(data)=>axios.post('/api/admin/register',data);
//用户列表
let list=()=>axios.get('/api/admin/list');
//删除用户
let remove=(id)=>axios.delete('/api/admin',{params:id});
//用户详情
let info=(id)=>axios.get('/api/admin',{params:id});
//用户编辑
let edit=(data)=>axios.put('/api/admin',data)
export default{
	login,register,list,remove,info,edit
}