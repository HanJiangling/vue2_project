<template>
  <section class="order">
    <HeaderTop :title="title" />
    <section class="order_no_login" v-if="!userInfo">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button @click="login">立即登陆</button>
    </section>
    <div v-else>
      <div style="width: 100%; height: 50px"></div>
      <h4>您当前的订单为:</h4>
      <div class="container">
        <table class="table table-hover">
          <tr>
            <th>订单号</th>
            <th>总价格</th>
            <th>购买人</th>
            <th>订单详情</th>
            <th>评价内容</th>
          </tr>
          <h2 v-show="false">{{ orders }}</h2>
          <!-- <h2 v-show="false">{{ comments }}</h2> -->
          <tr v-for="(item, index) in orderss" :key="index">
            <td>{{ item.order_num }}</td>
            <td>{{ item.food_totalprice }}</td>
            <td>{{ item.username }}</td>
            <td >
              <router-link
                :to="`/orderinfo/` + item.id"
                class="btn btn-danger"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                查看
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/evaluate/` + item.id"
                class="btn btn-info"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                评价
              </router-link>
            </td>
          </tr>
        </table>
        <!-- 显示订单详情 -->
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
//导入获取会员全部订单信息的方法 getuserorder
import { getuserorder } from "../../api/index";

export default {
  data() {
    return {
      title: "订单页",
      orderss: [], //会员订单信息
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    //计算属性获取订单信息
    orders: async function () {
      let res = await getuserorder(this.userInfo);
      this.orderss = res;
    },
  },
  components: {
    HeaderTop,
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>