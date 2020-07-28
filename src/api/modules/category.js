import axios from 'axios'
//编辑分类节点
let editNode=(data)=>axios.put('/api/category',data);
//删除分类节点
let remove=(id)=>axios.delete('/api/category',{params:id})
//添加分类
let Add=(data)=>axios.post('/api/category',data)
export default{
	editNode,remove,Add
}