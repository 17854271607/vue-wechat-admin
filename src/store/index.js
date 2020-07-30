import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {User} from '@/api/index';
export default new Vuex.Store({
  state: {
	  isCollapse:false,
	  profile:{}
  },
  mutations: {
	  handleCollapse(state){
		  state.isCollapse=!state.isCollapse;
	  },
	  setProfile(state,data){
		  state.profile=data;
	  }
  },
  actions: {
	  async loadInfo(context){
		  let{id}=sessionStorage;
		  let{status,data}=await User.info({id});
		  if(status){
			  context.commit('setProfile',data);
		  }
		  
	  }
  },
  modules: {
  }
})
