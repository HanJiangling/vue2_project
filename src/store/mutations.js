import Vue from 'vue'
//直接更新状态数据的模块
import {
    GETSHOPS, GETUSERNAME, GETCOOKIE, LOGOUTS, UPDATEFOODCOUNTADD,
    UPDATEFOODCOUNTJIAN, CLEARCARTS
} from './mutation-types'
//注意mutations 模块接收动作一定是动作映射类型
export default {
    //直接添加数据
    //接收的参数是对象格式
    [GETSHOPS](state, { shoplists }) {
        // console.log("这是直接更新数据行为的mutations")
        // console.log(o)
        state.shoplists = shoplists
    },
    [GETUSERNAME](state, { name }) {
        // console.log("---mutations模块接收的name",name)
        state.userInfo = name;
    },
    [GETCOOKIE](state, { usernames }) {
        state.userInfo = usernames;
    },
    [LOGOUTS](state) {
        state.userInfo = ''
    }, [UPDATEFOODCOUNTADD](state, {
        food
    }) {
        if (!food.count) {
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [UPDATEFOODCOUNTJIAN](state, {
        food
    }) {
        if (food.count) {
            food.count--
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEARCARTS](state) {
        state.cartFoods.forEach(food => food.count = 0)
        state.cartFoods = []
    }
}