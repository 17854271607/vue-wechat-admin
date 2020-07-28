import axios from 'axios'
//发布商品
let insert=(data)=>axios.post('/api/admin/goods',data);
export default{
	insert
}