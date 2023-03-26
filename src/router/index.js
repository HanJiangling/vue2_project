import Vue from 'vue'
import Vuerouter from 'vue-router'
const Msite = () => import('../pages/Msite/Msite')
const Serach = () => import('../pages/Serach/Serach')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
const Userinfo = () => import('../pages/Profile/Userinfo')
const Login = () => import('../pages/Login/Login')
const Shop = () => import('../pages/Shop/Shop')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings')
const Account = () => import('../pages/Account/Account')
const OrderInfo = () => import('../pages/Order/OrderInfo')
const Evaluate = () => import('../pages/Order/Evaluate')

Vue.use(Vuerouter)

const router = new Vuerouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        title: '外卖首页',
        isshowfooter: true
      }
    },
    {
      path: '/shop',
      component: Shop,
      meta: {
        isshowfooter: false
      },
      children: [

        {
          path: '/shop/goods/:id',
          component: ShopGoods

        },

        {
          path: '/shop/ratings/:id',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        },

      ]

    },
    {
      path: '/account/:username',
      component: Account,
      meta: {
        isshowfooter: false,
        title: '结算页',
      }
    },

    {
      path: '/order',
      component: Order,
      meta: {
        title: '外卖订单页面',
        isshowfooter: true,

      },
      children: [
        {
          path: '/orderinfo/:orders_id',
          component: OrderInfo,
          meta: {
            title: '外卖订单页面',
            isshowfooter: true
          }
        },
        {
          path: '/evaluate/:orders_id',
          component: Evaluate,
          meta: {
            title: '外卖订单页面',
            isshowfooter: true
          }
        },
      ]
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        title: '外卖用户页面',
        isshowfooter: true
      }
    },
    {
      path: '/userinfo/:username',
      component: Userinfo,
      meta: {
        title: '外卖用户页面',
        isshowfooter: true
      }
    },
    {
      path: '/serach',
      component: Serach,
      meta: {
        title: '外卖搜索页面',
        isshowfooter: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '外卖登陆页面',
        isshowfooter: false
      }
    },

  ]
})


router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router