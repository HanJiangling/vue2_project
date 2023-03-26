<template>
  <div>
    <header>
      <a href="javascript:void(0)" class="back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <p>个人详情</p>
    </header>
    <div class="content">
      <div class="detail">
        <img
          v-if="message.pic"
          :src="`https://hanadmin.oss-cn-beijing.aliyuncs.com/${message.pic}`"
          alt=""
        />
        <img v-else :src="imgStr" alt="" />
        <ul class="block">
          <li>昵称：{{ message.realname ? message.realname : "暂无昵称" }}</li>
          <li>电话：{{ message.phone ? message.phone : "暂无电话" }}</li>
          <li>邮箱：{{ message.email ? message.email : "暂无邮箱" }}</li>
        </ul>
      </div>
      <!-- 判断下其他详情信息有没有更新完毕  如果更新完毕 出现更换头像按钮  否则不出现 -->
      <div v-if="message.realname !== ''">
        <div class="form-group">
          <div class="col-sm-2 col-xs-offset-4">
            <label for="file" class="btn btn-default">更换头像</label>

            <input
              id="file"
              type="file"
              style="display: none"
              @change="onchangeImgFun"
            />
          </div>
        </div>
      </div>

      <div class="edit">
        <mt-button
          type="primary"
          style="width: 100%"
          data-toggle="modal"
          data-target="#myModal"
          >编辑</mt-button
        >
      </div>
      <form @submit.prevent="updateuser" method="post">
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title">编辑个人详情</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>昵称</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加昵称"
                    v-if="!message.realname"
                    v-model="realname"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改昵称"
                    v-else
                    v-model="realname1"
                  />
                </div>
                <div class="form-group">
                  <label>电话</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加电话"
                    v-if="!message.phone"
                    v-model="phone"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改电话"
                    v-else
                    v-model="phone1"
                  />
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加邮箱"
                    v-if="!message.email"
                    v-model="email"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改邮箱"
                    v-else
                    v-model="email1"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-danger"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  取消
                </button>
                <button class="btn btn-success">编辑</button>
              </div>
              <AlertTip
                v-show="showalert"
                :alertText="showtext"
                @closeTips="closeTips"
              />
            </div>
          </div>
        </div>
      </form>

      <div class="login-out">
        <mt-button
          type="danger"
          style="width: 100%"
          v-if="userInfo"
          @click="logout"
          >退出</mt-button
        >
      </div>
      <footer></footer>
    </div>
  </div>
</template>
<script>
//导入弹出式提示框
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
//导入获取会员详情信息的方法 getusermessage
//导入插入会员详情的方法 insertusermessage
//导入更新会员详情的方法 updateusermessage
import {
  getusermessage,
  insertusermessage,
  updateusermessage,
  updateuserpic,
} from "../../api/index";
import AlertTip from "../../components/AlertTip/AlertTip";
import OSS from "ali-oss";
//配置阿里oss参数
const client = new OSS({
  accessKeyId: "", // 查看你自己的阿里云KEY
  accessKeySecret: "", // 查看自己的阿里云KEYSECRET
  bucket: "hanadmin", // 你的 OSS bucket 名称
  region: "oss-cn-beijing", // bucket 所在地址，我的是 华北2 北京
  // cname: true // 开启自定义域名上传
  // endpoint:"file.xxxx.live" // 自己的域名
});

export default {
  name: "Userinfo",
  data() {
    return {
      message: "", //存储个人详情信息的数据
      realname: "", //添加的昵称
      phone: "", //添加的电话
      email: "", //添加的邮箱
      realname1: "", //修改的昵称
      phone1: "", //修改的电话
      email1: "", //修改的邮箱
      imgStr: require("./mysterious.jpg"), //存放头像数据
      showalert: false,
      showtext: "",
    };
  },
  components: {
    AlertTip,
  },
  //计算属性
  computed: {
    ...mapState(["userInfo"]),
  },
  //方法
  methods: {
    //更新用户的详情信息
    async updateuser() {
      if (this.message.realname !== "") {
        //修改个人详情信息
        console.log("修改");
        let username = this.realname1;
        let phone = this.phone1;
        let email = this.email1;
        let userinfo_name = this.$route.params.username;

        if (!/^(?:[\u4e00-\u9fa5·]{2,})$/.test(username)) {
          this.showalert = true;
          this.showtext = "用户名不符合规范";
          return;
        }
        if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)) {
          this.showalert = true;
          this.showtext = "所输入号码不符合规范";
          return;
        }
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
          this.showalert = true;
          this.showtext = "所输入邮箱号不符合规范";
          return;
        }
        //调用接口
        let res = await updateusermessage(
          username,
          phone,
          email,
          userinfo_name
        );
        if (res.msg === "ok") {
          //修改成功
          //直接跳转到本界面
          this.$router.go(0);
        }
      } else if (this.message.realname === "") {
        //添加
        console.log("添加");
        let username = this.realname;
        let phone = this.phone;
        let email = this.email;
        let userinfo_name = this.$route.params.username;
        if (!/^(?:[\u4e00-\u9fa5·]{2,})$/.test(username)) {
          this.showalert = true;
          this.showtext = "用户名不符合规范";
          return;
        }
        if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)) {
          this.showalert = true;
          this.showtext = "所输入号码不符合规范";
          return;
        }
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
          this.showalert = true;
          this.showtext = "所输入邮箱号不符合规范";
          return;
        }
        let res = await insertusermessage(
          username,
          phone,
          email,
          userinfo_name
        );
        if (res.msg === "ok") {
          //跳转到本界面
          this.$router.go(0);
        }
      }
    },

    //更换头像
    async onchangeImgFun(e) {
      //file 是上传文件
      var file = e.target.files[0];
      //上传文件名字
      var fileNames = file.name;
      console.log(file);
      console.log(fileNames);
      // return;
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      // console.log(imgSize);
      var _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 5000 * 1024) {
        // 合格
        _this.errorStr = "";
        console.log("大小合适");
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0]);
        // console.log(window.URL.createObjectURL(e.target.files[0])); // 获取当前文件的信息
        // base64方法 2
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          console.log(dataURL);
          _this.imgStr = dataURL;
          // 下面逻辑处理
        };
        //阿里oss上传头像
        // 上传文件,这里是上传到OSS
        //put是上传头像的核心方法
        //fileNames  上传头像的名字
        //上传头像的文件
        await client.put(fileNames, file).then((res) => {
          if (res.res.statusCode === 200) {
            // options.onSuccess(res);
            console.log("上传成功");
          } else {
            options.onError("上传失败");
          }
        });
        //调用后端接口代码位置
        let res = await updateuserpic(fileNames, this.$route.params.username);
        if (res.msg === "ok") {
          this.$router.go(0);
        }
      } else {
        console.log("大小不合适");
        _this.errorStr = "图片大小超出范围";
      }
    },

    //退出方法
    logout: function () {
      MessageBox.confirm("确定退出吗?").then(
        (action) => {
          //清除cookie信息
          //分发动作
          this.$store.dispatch("logouts");
          //跳转到注册和登录界面
          // this.$router.push("/login");
        },
        (action) => {
          console.log("取消退出");
        }
      );
    },
    closeTips: function () {
      this.showalert = false;
    },
  },
  //mounted
  async mounted() {
    
    //获取登录的会员名字
    let name = this.$route.params.username;

    // if (!/^(?:[\u4e00-\u9fa5·]{2,})$/.test(name)) {
    //   this.showalert = true;
    //   this.showtext = "用户名错误";
    //   return;
    // }

    let res = await getusermessage(name);
    // res =>{realname:''} =>无详情信息
    if (res.realname === "") {
      //无详情信息
      this.message = res;
    } else {
      //有详情信息
      this.message = res;
      this.realname1 = res.realname;
      this.phone1 = res.phone;
      this.email1 = res.email;
    }
    console.log(this.message.realname);
  },
};
</script>
<style scoped>
@charset "utf-8";
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  font-family: 微软雅黑;
}

ul {
  list-style: none;
  margin: 0 0 0 7.5em;
  padding: 0;
}

header {
  width: 100%;
  height: 3em;
  background-color: #02a774;
  color: white;
}

header p {
  text-align: center;
  line-height: 3em;
}

.content {
  width: 100%;
  background-color: #ffffff;
}

.detail {
  background-color: #ffffff;
  height: auto;
  margin-top: 1em;
  padding: 10px;
  position: relative;
}

.edit {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 10em;
  clear: both;
}

.login-out {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 5em;
  margin-bottom: 0.5em;
}

.footer {
  width: 100%;
  height: 2em;
  background-color: rgb(75, 75, 75);
}

img {
  width: 100%;
  height: 100%;
  height: 7em;
  width: 7em;
  border: 1px solid grey;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}

a {
  text-decoration: none;
  display: inline-block;
  height: 2em;
  text-align: center;
  width: 100%;
  line-height: 2em;
  color: black;
}

.block {
  display: inline-block;
  height: auto;
  word-wrap: break-word;
  width: 50%;
}
.back {
  position: absolute;
  top: 5px;
  left: 0;
  text-align: left;
}
.icon-arrow_left {
  display: block;
  padding: 5px;
  font-size: 20px;
  color: #fff;
}
</style>