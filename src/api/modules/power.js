import axios from 'axios';
// 角色列表
let list=(data)=>axios.get('/api/role/list',data);
//添加角色的
let insert=(name)=>axios.post('/api/role',name);
//删除角色
let remove=(id)=>axios.delete('/api/role',{params:id});
//编辑角色
let edit =(id,name)=>axios.put('/api/role',{id,name});
//获取菜单权限
let menuInfo=(data)=>axios.get('/api/menu/sub',{params:data});
//删除子菜单
let delMenu=(id)=>axios.delete('/api/menu',{params:id});
//编辑菜单
let editMenu=(data)=>axios.put("/api/menu",data);
//添加菜单
let insertMenu=(data)=>axios.post('/api/menu',data);
//根据角色配置获取菜单信息
let config=(id)=>axios.get('/api/role/config',{params:id});
//为指定角色添加菜单
let addmenu=(data)=>axios.post('/api/role/menu',data);
//为指定角色删除菜单
let removemenu=(data)=>axios.delete('/api/role/menu',data);
export default{
	list,insert,remove,edit,menuInfo,delMenu,editMenu,insertMenu,config,addmenu,removemenu
}