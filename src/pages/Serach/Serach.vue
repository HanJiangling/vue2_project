<template>
  <div>
    <section class="search">
      <!-- <header class="header">
        <a class="header_title">
          <span class="header_title_text">搜索</span>
        </a>
      </header> -->
      <HeaderTop :title="title">
        <span class="header_search" slot="left">
          <i
            class="iconfont icon-jiantou2"
            @click="$router.back()"
            style="color: #fff"
          ></i>
        </span>
      </HeaderTop>
      <div class="search_form">
        <input
          type="search"
          name="search"
          placeholder="请输入商家或美食关键字"
          class="search_input"
          v-model="keyword"
        />
        <input
          type="submit"
          name="submit"
          class="search_submit"
          @click="searchinfo"
        />
      </div>
      <div class="msite_shop_list">
        <div class="shop_container">
          <ul class="shop_list">
            <li
              class="shop_li border-1px"
              v-for="(item, index) in searchresults"
              :key="index"
            >
              <router-link :to="`/shop/goods/` + item.id">
                <div class="shop_left">
                  <img
                    class="shop_img"
                    v-lazy="
                      `https://guishiyuan.oss-cn-beijing.aliyuncs.com/` +
                      item.logo
                    "
                  />
                </div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title ellipsis">{{ item.shopname }}</h4>
                    <ul class="shop_detail_ul">
                      <li class="supports">保</li>
                      <li class="supports">准</li>
                      <li class="supports">票</li>
                    </ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <div class="star star-24">
                        <span class="star-item on"></span>
                        <span class="star-item on"></span>
                        <span class="star-item on"></span>
                        <span class="star-item half"></span>
                        <span class="star-item off"></span>
                      </div>
                      <div class="rating_section">3.6</div>
                      <div class="order_section">月售106单</div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_right"
                        >起点专送</span
                      >
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg">
                      <span>¥{{ item.fee }}起送</span>
                      <span class="segmentation">/</span>
                      <span>配送费约¥{{ item.fee }}</span>
                    </p>
                  </section>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { getsearchshop, getsearchfood, shopone } from "../../api/index";
import { mapState } from "vuex";
import { Toast } from "mint-ui";

export default {
  name: "Serach",
  data() {
    return {
      title: "外卖搜索页面",
      keyword: "",
      searchresults: [],
    };
  },
  components: {
    HeaderTop,
  },
  methods: {
    // 获取搜索的数据
    searchinfo: async function () {
      if (!this.keyword) {
        Toast(`输入内容不能为空`);
        return;
      } else {
        // 调用接口
        let shopinfo = await getsearchshop(this.keyword);
        let foodinfo = await getsearchfood(this.keyword);
        // console.log(shopinfo,foodinfo)
        if (shopinfo.msg === "error") {
          shopinfo = [];
          if (foodinfo.msg === "error") {
            Toast(`搜索内容不存在`);
            return;
          } else {
            let shopid = [];
            foodinfo.forEach((ele) => {
              shopid.push(ele.shoplist_id);
            });
            // console.log(shopid)
            for (const ele of shopid) {
              console.log(ele)
              let res = await shopone(ele);
              shopinfo.push(res);

            }
            // 对象当中所有属性值相同去重
            // 将数组中的所有对象数据转换成JSON字符串格式
            const strItemArr = shopinfo.map((v) => {
              return JSON.stringify(v);
            });
            // 利用ES6的set方法数组去重
            const sortArr = Array.from(new Set(strItemArr));
            // 将JSON字符串转换成对象形式
            const finalArr = sortArr.map((v) => {
              return JSON.parse(v);
            });
            this.searchresults = finalArr;
            return;
          }
        } else {
          let foodinfo = await getsearchfood(this.keyword);
          let shopid = [];
          foodinfo.forEach((ele) => {
            shopid.push(ele.shoplist_id);
          });

          for (const ele of shopid) {
            let a = await shopone(ele);
            shopinfo.push(a);
          }
          // 对象当中所有属性值相同去重
          // 将数组中的所有对象数据转换成JSON字符串格式
          const strItemArr = shopinfo.map((v) => {
            return JSON.stringify(v);
          });
          // 利用ES6的set方法数组去重
          const sortArr = Array.from(new Set(strItemArr));
          // 将JSON字符串转换成对象形式
          const finalArr = sortArr.map((v) => {
            return JSON.parse(v);
          });
          this.searchresults = finalArr;
        }
      }
      // console.log(this.searchresults );
    },
   
  },
  computed: {
    ...mapState(["shoplists"]),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.search { // 搜索
  width: 100%;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }
}

.shop_container { // 商家列表
  margin-bottom: 50px;

  .shop_list {
    padding-bottom: 50px;

    .shop_li {
      bottom-border-1px(#f1f1f1);
      width: 100%;

      >a {
        clearFix();
        display: block;
        box-sizing: border-box;
        padding: 15px 8px;
        width: 100%;

        .shop_left {
          float: left;
          box-sizing: border-box;
          width: 23%;
          height: 75px;
          padding-right: 10px;

          .shop_img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .shop_right {
          float: right;
          width: 77%;

          .shop_detail_header {
            clearFix();
            width: 100%;

            .shop_title {
              float: left;
              width: 200px;
              color: #333;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;

              &::before {
                content: '品牌';
                display: inline-block;
                font-size: 11px;
                line-height: 11px;
                color: #333;
                background-color: #ffd930;
                padding: 2px 2px;
                border-radius: 2px;
                margin-right: 5px;
              }
            }

            .shop_detail_ul {
              float: right;
              margin-top: 3px;

              .supports {
                float: left;
                font-size: 10px;
                color: #999;
                border: 1px solid #f1f1f1;
                padding: 0 2px;
                border-radius: 2px;
              }
            }
          }

          .shop_rating_order {
            clearFix();
            width: 100%;
            margin-top: 18px;
            margin-bottom: 8px;

            .shop_rating_order_left {
              float: left;
              color: #ff9a0d;

              .star { // 2x图 3x图
                float: left;
                font-size: 0;

                .star-item {
                  display: inline-block;
                  background-repeat: no-repeat;
                }

                &.star-48 {
                  .star-item {
                    width: 20px;
                    height: 20px;
                    margin-right: 22px;
                    background-size: 20px 20px;

                    &:last-child {
                      margin-right: 0;
                    }

                    &.on {
                      bg-image('./images/stars/star48_on');
                    }

                    &.half {
                      bg-image('./images/stars/star48_half');
                    }

                    &.off {
                      bg-image('./images/stars/star48_off');
                    }
                  }
                }

                &.star-36 {
                  .star-item {
                    width: 15px;
                    height: 15px;
                    margin-right: 6px;
                    background-size: 15px 15px;

                    &:last-child {
                      margin-right: 0;
                    }

                    &.on {
                      bg-image('./images/stars/star36_on');
                    }

                    &.half {
                      bg-image('./images/stars/star36_half');
                    }

                    &.off {
                      bg-image('./images/stars/star36_off');
                    }
                  }
                }

                &.star-24 {
                  .star-item {
                    width: 10px;
                    height: 10px;
                    margin-right: 3px;
                    background-size: 10px 10px;

                    &:last-child {
                      margin-right: 0;
                    }

                    &.on {
                      bg-image('./images/stars/star24_on');
                    }

                    &.half {
                      bg-image('./images/stars/star24_half');
                    }

                    &.off {
                      bg-image('./images/stars/star24_off');
                    }
                  }
                }
              }

              .rating_section {
                float: left;
                font-size: 10px;
                color: #ff6000;
                margin-left: 4px;
              }

              .order_section {
                float: left;
                font-size: 10px;
                color: #666;
                transform: scale(0.8);
              }
            }

            .shop_rating_order_right {
              float: right;
              font-size: 0;

              .delivery_style {
                transform-origin: 35px 0;
                transform: scale(0.7);
                display: inline-block;
                font-size: 12px;
                padding: 1px;
                border-radius: 2px;
              }

              .delivery_left {
                color: #fff;
                margin-right: -10px;
                background-color: #02a774;
                border: 1px solid #02a774;
              }

              .delivery_right {
                color: #02a774;
                border: 1px solid #02a774;
              }
            }
          }

          .shop_distance {
            clearFix();
            width: 100%;
            font-size: 12px;

            .shop_delivery_msg {
              float: left;
              transform-origin: 0;
              transform: scale(0.9);
              color: #666;
            }

            .segmentation {
              color: #ccc;
            }
          }
        }
      }
    }
  }
}
</style>