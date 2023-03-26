//负责响应组件分发的动作
//注意:actions模块不能够直接更新状态数据
import { GETSHOPS, GETUSERNAME, GETCOOKIE, LOGOUTS, UPDATEFOODCOUNTADD, UPDATEFOODCOUNTJIAN, CLEARCARTS } from './mutation-types'
import { getShoplists, getcookieuser, userlogout } from '../api/index'
export default {
    //响应添加的动作
    //commit=》提交
    async getshops({ commit }) {
        // console.log('这是actions模块响应的方法')
        // console.log(o)
        //调用后端获取商家列表的数据的方法
        let shoplists = await getShoplists()
        // console.log(shoplists)
        //把动作提交给mutations模块
        //提交参数必须是对象格式
        commit(GETSHOPS, { shoplists })
    },
    getusername({ commit }, name) {
        commit(GETUSERNAME, { name })
    },
    async getcookie({ commit }) {
        let username = await getcookieuser();
        let usernames = username.msg;
        commit(GETCOOKIE, { usernames })
    },
    async logouts({ commit }) {
        let res = await userlogout();
        if (res.msg === 0) {
            commit(LOGOUTS)
        }
    },
    updateFoodCount({ commit }, { isadd, food }) {
        if (isadd) {
            commit(UPDATEFOODCOUNTADD, { food })
        } else {
            commit(UPDATEFOODCOUNTJIAN, { food })
        }
    },
    clearcarts({ commit }) {
        commit(CLEARCARTS)
    }
}