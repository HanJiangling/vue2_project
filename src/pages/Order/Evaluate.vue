<template>
  <div>
    <div class="collapse" id="collapseExample">
      <div v-show="switchNum">
        <div class="well">
          <textarea
            v-model="evaluatione"
            rows="10"
            style="width: 100%"
          ></textarea>
          <div class="modal-footer">
            <button
              class="btn btn-danger"
              data-toggle="collapse"
              data-target="#collapseExample"
            >
              取消
            </button>
            <button class="btn btn-success" @click="comments">发布</button>
          </div>
        </div>
      </div>
      <div v-show="!switchNum">
        <div class="well">
          <button class="btn btn-danger" @click="delcomment">删除</button>
          <button class="btn btn-success" @click="skipshop">查看</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//导入订单详情获取的方法
import {
  getorderinfo,
  getsearchfoods,
  getuserpic,
  insertusercomment,
  getshopcomment,
  delusercomment,
} from "../../api/index";
import { mapState } from "vuex";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      orderinfos: [],
      evaluatione: "",
      strDate: "",
      switchNum: "",
    };
  },
  methods: {
    // 跳转到评价页
    skipshop: async function () {
      ///通过获取订单信息获取商品信息在获取商家id
      let res = await getorderinfo(this.$route.params.orders_id);
      let [res1] = await getsearchfoods(res[0].foodname);
      let shop_id = res1.shoplist_id;
      this.$router.push("/shop/ratings/" + shop_id); //跳转到对应的商家评论页
    },
    // 添加评论
    comments: async function () {
      //获取订单信息
      let res = await getorderinfo(this.$route.params.orders_id);
      // 获取商家id
      let [res1] = await getsearchfoods(res[0].foodname);
      // 获取用户图片
      let [userpic] = await getuserpic(this.userInfo);
      let shoplist = res1.shoplist_id; //商家id
      let username = this.userInfo; //用户名
      let content = this.evaluatione;
      if (!content) {
        Toast(`请输入评价内容`);
        return;
      }
      //   获取当前时间
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      console.log("month", month);
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate =
        year +
        "-" +
        dateArr[0] +
        "-" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      let time = strDate;
      let pic = userpic.pic;
      let res3 = await insertusercomment(
        username,
        content,
        shoplist,
        time,
        pic
      );
      this.$router.go(0);
      Toast(`添加成功`);
    },
    // 删除评论
    delcomment: async function () {
      let res = await getorderinfo(this.$route.params.orders_id);
      let [res1] = await getsearchfoods(res[0].foodname);
      let shop_id = res1.shoplist_id; //获取的商家id
      console.log(this.userInfo, shop_id);
      let res2 = await delusercomment(this.userInfo, shop_id);
      console.log(res2);
      this.$router.go(0);
      Toast(`删除成功`);

    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async mounted() {
    ///通过获取订单信息获取商品信息在获取商家id
    let res = await getorderinfo(this.$route.params.orders_id);
    let [res1] = await getsearchfoods(res[0].foodname);
    let shop_id = res1.shoplist_id; //获取的商家id
    let res2 = await getshopcomment(this.userInfo, shop_id); //获取订单是否存在
    this.switchNum = res2.msg;
  },
  //侦听器watch 监听下orders_id
  watch: {
    //$route 要监听的变化的数据
    //val 是变化后的数据
    $route: async function (val) {
      let res = await getorderinfo(val.params.orders_id);
      let [res1] = await getsearchfoods(res[0].foodname);
      let shop_id = res1.shoplist_id;
      let res2 = await getshopcomment(this.userInfo, shop_id);
      this.switchNum = res2.msg;
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  bottom-border-1px(rgba(7, 17, 27, 0.1));

  &:last-child {
    border-none();
    margin-bottom: 0;
  }

  .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .content {
    flex: 1;

    .name {
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .desc, .extra {
      line-height: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }

    .desc {
      line-height: 12px;
      margin-bottom: 8px;
    }

    .extra {
      .count {
        margin-right: 12px;
      }
    }

    .price {
      font-weight: 700;
      line-height: 24px;

      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }

      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 12px;
    }
  }
}
</style>