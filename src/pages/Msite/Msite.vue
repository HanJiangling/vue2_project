<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="title">
        <span
          class="header_search"
          slot="left"
          @click="$router.push('/serach')"
        >
          <i class="iconfont icon-sousuo"></i>
        </span>
        <a
          class="header_login"
          slot="right"
          v-if="!userInfo"
          @click="$router.push('/login')"
        >
          <span class="header_login_text">登录|注册</span>
        </a>
        <a
          class="header_login"
          slot="right"
          v-else
          @click="$router.push(`/userinfo/${userInfo}`)"
        >
          <span class="header_login_text">{{ userInfo }}</span>
        </a>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container swiper-container-horizontal">
          <div
            class="swiper-wrapper"
            style="
              transform: translate3d(-659.2px, 0px, 0px);
              transition-duration: 0ms;
            "
          >
            <div
              class="
                swiper-slide
                swiper-slide-duplicate
                swiper-slide-duplicate-active
              "
              data-swiper-slide-index="1"
              style="width: 320px"
            >
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/9.jpg" />
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/10.jpg" />
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/11.jpg" />
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/12.jpg" />
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/13.jpg" />
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/14.jpg" />
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg" />
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg" />
                </div>
                <span>土豪推荐</span>
              </a>
            </div>
            <div
              class="swiper-slide swiper-slide-prev swiper-slide-duplicate-next"
              data-swiper-slide-index="0"
              style="width: 320px"
            >
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg" />
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg" />
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/3.jpg" />
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/4.jpg" />
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/5.jpg" />
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/6.jpg" />
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/7.jpg" />
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/8.jpg" />
                </div>
                <span>土豪推荐</span>
              </a>
            </div>
            <div
              class="swiper-slide swiper-slide-active"
              data-swiper-slide-index="1"
              style="width: 320px"
            >
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/9.jpg" />
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/10.jpg" />
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/11.jpg" />
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/12.jpg" />
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/13.jpg" />
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/14.jpg" />
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg" />
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg" />
                </div>
                <span>土豪推荐</span>
              </a>
            </div>
            <div
              class="
                swiper-slide
                swiper-slide-duplicate
                swiper-slide-next
                swiper-slide-duplicate-prev
              "
              data-swiper-slide-index="0"
              style="width: 320px"
            >
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg" />
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg" />
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/3.jpg" />
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/4.jpg" />
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/5.jpg" />
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/6.jpg" />
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/7.jpg" />
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/8.jpg" />
                </div>
                <span>土豪推荐</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination swiper-pagination-bullets">
            <span class="swiper-pagination-bullet"></span
            ><span
              class="swiper-pagination-bullet swiper-pagination-bullet-active"
            ></span>
          </div>
        </div>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <div class="shop_container">
          <ul class="shop_list">
            <li
              class="shop_li border-1px"
              v-for="(item, index) in shoplists"
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
/* 引入swiper插件 */
import "swiper/dist/js/swiper";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
// import { getShoplists } from "../../api/index";
import { mapState } from "vuex";
export default {
  name: "Mulite",
  components: {
    HeaderTop,
  },
  data() {
    return {
      title: "外卖首页",
      // shoplists: "",
    };
  },
  methods: {},
  async mounted() {
    // let res = await getShoplists();
    // this.shoplists = res;

    new Swiper(".swiper-container", {
      //direction: 'vertical', // 垂直切换选项
      //mousewheel: true, //滚轮
      autoplay: {
        //自动开始
        delay: 2000, //时间间隔
        disableOnInteraction: false, //*手动操作轮播图后不会暂停*
      },
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // 分页器可以点击
      },
    });
  },
  computed: {
    ...mapState(["shoplists"]),
    ...mapState(["userInfo"]),
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.header { // 头部
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;

  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .icon-sousuo {
      font-size: 25px;
      color: #fff;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;

    .header_title_text {
      font-size: 20px;
      color: #fff;
      display: block;
    }
  }

  .header_login {
    font-size: 14px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    .header_login_text {
      color: #fff;
    }
  }
}

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    // margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
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