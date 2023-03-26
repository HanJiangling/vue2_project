import Vue from 'vue'
import Vuex from 'vuex'
//导入vuex中的核心模块
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
//在vue中使用vuex
Vue.use(Vuex);
//暴露创建好的 store对象
//Store 它是vuex中创建store对象的方法
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})