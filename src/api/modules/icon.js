import axios from 'axios'
// 获取所有图标
let getIcon=(data)=>axios.get('/api/admin/icon/list',{params:data});
//设置子菜单图标
let icon = (data) => axios.put('/api/menu/icon', data);
export default{
	getIcon,icon
}