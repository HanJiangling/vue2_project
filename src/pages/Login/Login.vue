<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">起点外卖</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: !loginway }"
              @click="loginway = false"
              >登录</a
            >
            <a
              href="javascript:;"
              :class="{ on: loginway }"
              @click="loginway = true"
              >注册</a
            >
          </div>
        </div>
        <div class="login_content">
          <!-- 登陆开始 -->
          <form @submit.prevent="login">
            <div :class="{ on: !loginway }">
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="请输入登录的用户名"
                    v-model="loginname"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="text"
                    maxlength="20"
                    placeholder="请输入登录的密码"
                    v-if="showpwd"
                    v-model="loginpass"
                  />
                  <input
                    type="password"
                    maxlength="20"
                    placeholder="请输入登录的密码"
                    v-else
                    v-model="loginpass"
                  />
                  <div
                    class="switch_button"
                    :class="showpwd ? 'on' : 'off'"
                    @click="showpwd = !showpwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showpwd }"
                    ></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
              </section>
              <button class="login_submit">登录</button>
            </div>
          </form>
          <!-- 登陆结束 -->

          <!--注册的开始  -->
          <form @submit.prevent="register">
            <div :class="{ on: loginway }">
              <section class="login_message">
                <input
                  type="text"
                  v-model="registername"
                  maxlength="11"
                  placeholder="请输入注册的用户名"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  v-model="registerpass"
                  maxlength="20"
                  placeholder="请输入注册的密码"
                />
              </section>
              <button class="login_submit">注册</button>
            </div>
          </form>
          <!-- 注册结束 -->
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip
        v-show="showalert"
        :alertText="showtext"
        @closeTips="closeTips"
      />
    </section>
  </div>
</template>

<script>
import { doregister, dologin } from "../../api/index";
import AlertTip from "../../components/AlertTip/AlertTip";
export default {
  data() {
    return {
      loginway: false,
      showpwd: false,
      registername: "",
      registerpass: "",
      showalert: false,
      showtext: "",
      loginname: "",
      loginpass: "",
    };
  },
  methods: {
    register: async function () {
      let name = this.registername;
      let pass = this.registerpass;
      if (!/^\w{3,8}$/.test(name)) {
        this.showalert = true;
        this.showtext = "用户名必须是3-8位任意数字字母和下划线";
        return;
      }

      // if (!/^\w{8,18}$/.test(pass)) {
      //   this.showalert = true;
      //   this.showtext = "密码必须是8-18位任意数字字母和下划线";

      //   return;
      // }

      if (!/^\d{3,17}$/.test(pass)) {
        this.showalert = true;
        this.showtext = "密码必须是3-8位任意数字";

        return;
      }

      let res = await doregister(name, pass);
      if (res.msg === "ok") {
        this.$store.dispatch("getusername", name);
        this.$router.push("/profile");
      }
    },

    login: async function () {
      let name = this.loginname;
      let pass = this.loginpass;

      let res = await dologin(name, pass);
      console.log(res);
      if (res.msg === "usernameiserror") {
        this.showalert = true;
        this.showtext = "用户名有误";
        return;
      }
      if (res.msg === "userpassiserror") {
        this.showalert = true;
        this.showtext = "密码有误";
        return;
      }

      if (res.msg === "ok") {
        this.$store.dispatch("getusername", name);
        this.$router.push("/profile");
      }
    },

    closeTips: function () {
      this.showalert = false;
    },
  },

  components: {
    AlertTip,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
