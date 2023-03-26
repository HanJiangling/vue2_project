//计算属性 getters
export default{
    //计算下总数量
    totalCount(state){
        //reduce 累计器  累计方法
        // cartFoods购物车的数据
        //preTotal 起始总数量
        //food 所购的食品
        //0 初始化的总数量
        //返回总数量
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
    },
    //计算总价格
    totalPrice(state){
         //reduce 累计器  累计方法
        // cartFoods购物车的数据
        //preTotal 起始总价格
        //food 所购的食品
        //0 初始化的总价格
        //返回最新的计算的总价格
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.price*food.count,0)
    }
}