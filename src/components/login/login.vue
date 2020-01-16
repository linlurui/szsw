<template>
  <!-- 登录页面主体区域 -->
  <div class="main" id="main">
    <!-- 导航栏 -->
    <div class="nav">
      <div class="nav-logo">
        <div class="logo"></div>
        <div class="logo-img"></div>
        <!-- <div class="logo-URL">
          <p>监控系统云平台</p>
          <span>gd.hj-tec.com</span>
        </div>
        <span>智慧监控第一品牌</span> -->
      </div>
      <ul>
        <li>
          <a>企业邮箱</a>
        </li>
        <li>
          <a>VIP邮箱</a>
        </li>
        <li>
          <a>国外用户登录</a>
        </li>
        <li>
          <a>手机版</a>
        </li>
        <li>
          <a>电脑版</a>
        </li>
        <li>
          <a>帮助</a>
        </li>
        <li>
          <a>常见问题</a>
        </li>
        <li>
          <a>私人助理</a>
        </li>
        <li>
          <a>登录反馈</a>
        </li>
      </ul>
    </div>
    <!-- 主体内容 -->
    <div class="content">
      <!-- 登录框 -->
      <div class="login">
        <div class="login-title">用户登录</div>
        <div class="from">
          <i class="user"></i>
          <input type="text" placeholder="请输入账号" v-model="user_name" @keyup.enter="login">
          <i class="password"></i>
          <input type="password" placeholder="请输入密码" v-model="pwd" @keyup.enter="login" ref="passWord">
          <el-tooltip effect="dark" content="记住密码" placement="right">
            <el-checkbox v-model="save"></el-checkbox>
          </el-tooltip>
          <a @click="login"></a>
        </div>
        <div class="logo"></div>
        <!-- <div class="copyright">虎匠公司版权所有©1997-2019</div> -->
        <div class="light"></div>
      </div>
    </div>
    <!-- 底部通栏 -->
    <div class="bottom">
      <ul>
        <li>
            <img src="../../../static/images/login1.png" alt="">
            <p class="title">
                集成管理
            </p>
            <p class="text">
                实现智慧监控统一部署、统一维护、统一运行监控、统一集成展现
            </p>
        </li>
        <li>
            <img src="../../../static/images/login2.png" alt="">
            <p class="title">
                集成管理
            </p>
            <p class="text">
                实现智慧监控统一部署、统一维护、统一运行监控、统一集成展现
            </p>
        </li>
        <li>
            <img src="../../../static/images/login3.png" alt="">
            <p class="title">
                集成管理
            </p>
            <p class="text">
                实现智慧监控统一部署、统一维护、统一运行监控、统一集成展现
            </p>
        </li>
        <li>
            <img src="../../../static/images/login4.png" alt="">
            <p class="title">
                集成管理
            </p>
            <p class="text">
                实现智慧监控统一部署、统一维护、统一运行监控、统一集成展现
            </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      pwd: "",
      save: false
    };
  },
  methods: {
    // 1.0登录
    logined() {
      this.$axios
        .post("/lz/wisdom/wisdomLogin", {
          account: this.user_name,
          password: this.$md5(this.pwd)
        })
        .then(res => {
          if (res.data.msg != "账户或密码错误") {
            localStorage.setItem("islogin", "true");
            localStorage.setItem("pid", res.data.pid);
            this.$router.push({ path: "/homePage" });
          } else {
            alert("账号或密码错误！请重新输入");
            // this.user_name = "";
            this.pwd = "";
          }
        });
    },

    // 2.0登录
    login() {
      if (this.user_name==''||this.pwd=='') {
        this.$message({
          type: 'warning',
          message: '账号或密码不得为空'
        })
      } else {
        this.$axios.post(`/api/system/computer/login?userAccount=${this.user_name}&userPassword=${this.$md5(this.pwd)}&entry=1`).then(res => {
          if (res.data.code == -1) {
            this.$message({
            type: 'warning',
            message: '账号或密码错误！请重新输入'
          })
            this.pwd = ""
            this.$refs.passWord.focus()
          } else {
            if (this.save) {
              localStorage.setItem("userAccount", this.user_name)
              localStorage.setItem("userPassword", this.pwd)
            }
            sessionStorage.setItem("islogin", "true")
            sessionStorage.setItem("pid", res.data.data.projectId)
            sessionStorage.setItem("cid", res.data.data.companyId)
            sessionStorage.setItem("userType", res.data.data.userType)
            sessionStorage.setItem("userId", res.data.data.id)
            sessionStorage.setItem("userAccount",res.data.data.userAccount)
            sessionStorage.setItem('userName',res.data.data.userName)
            localStorage.setItem("pid", 2977)
            localStorage.setItem("islogin", "true")
            if (res.data.data.userType == 2) {
              this.$router.push({ path: "/systemHome" })
              // this.$router.push({ path: "/systemLiangZhi" })
            } else {
              this.$router.push({ path: "/homePage" })
            }
          }
        })
      }
    },

    // 是否保存了密码
    hasPassWord() {
      let userName = localStorage.getItem("userAccount")
      let passWord = localStorage.getItem("userPassword")
      if (userName && passWord) {
        this.user_name = userName
        this.pwd = passWord
      }
    },

    // 切换header
    header() {
      // this.$store.commit('changeSystemHeader', false)
      // this.$store.commit('changeHeader', false)
    },
  },
  mounted() {
    localStorage.setItem('home', false)
    localStorage.setItem('system', false)
    this.hasPassWord()
    this.header()
  }
}
</script>

<style lang="less">
#main {
  // height: 9.8rem;
  background-color: #fff;
  .nav {
    // height: 1.65rem;
    height: .9rem;
    padding: .2rem 0;
  }
  .bottom {
    height: 2.65rem;
    ul{
        margin-top: .3rem;
        background-color: #fff;
        width: 100%;
        height: 100%;
        padding: 0 2rem;
        display: flex;
        justify-content: space-around;
        li{
            width: 2.9rem;
            text-align: center;
            img{
                width: 1.02rem;
                height: 1.02rem;
            }
            .title{
                font-size: .2rem;
                color: #048fe8;
                margin-top: .13rem;
            }
            .text{
                font-size: .16rem;
                margin-top: .1rem;
                color: #848484;
            }
        }
    }
  }
  .content {
    // width: 19.2rem;
    height: 7.5rem;
    background-image: url("../../../static/images/login_bg.png");
    background-size: cover;
    position: relative;
    // margin-top: -0.8rem;
  }
  /* 登录框样式 */
  .content .login {
    width: 3.99rem;
    height: 4.17rem;
    background-image: url("../../../static/images/login_border.png");
    background-size: contain;
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
    padding-top: 0.38rem;
  }
  .content .login-title {
    color: #fff;
    font-size: 0.31rem;
    font-weight: bolder;
    line-height: 0.31rem;
    text-align: center;
  }
  .content .from {
    margin-top: 0.52rem;
    position: relative;
  }
  .content .from input {
    width: 2.92rem;
    height: 0.38rem;
    background-image: url("../../../static/images/login_input.png");
    background-size: contain;
    padding-left: 0.43rem;
    position: absolute;
    z-index: 10;
    left: 50%;
    transform: translate(-50%);
  }
  .content .from input:nth-child(4) {
    margin-top: 0.63rem;
  }
  .content .from a {
    width: 2.92rem;
    height: 0.38rem;
    background-image: url("../../../static/images/login_button.png");
    background-size: contain;
    position: absolute;
    z-index: 10;
    left: 50%;
    transform: translate(-50%);
    margin-top: 1.27rem;
  }
  .content .from i {
    position: absolute;
    width: 0.15rem;
    height: 0.15rem;
    background-size: contain;
  }
  .content .from .user {
    background-image: url("../../../static/images/login_user.png");
    left: 0.68rem;
    top: 0.11rem;
    z-index: 99;
  }
  .content .from .password {
    background-image: url("../../../static/images/login_password.png");
    left: 0.68rem;
    top: 0.77rem;
    z-index: 99;
  }
  .content .logo {
    width: 2.7rem;
    height: 0.4rem;
    bottom: .5rem;
    background-image: url("../../../static/images/szsw-long.png");
    // background-image: url("../../../static/images/lbrj_login.png");
    // background-image: url("../../../static/images/hj_login.png");
    background-size: 100% 100%;
    position: absolute;
    z-index: 10;
    left: 50%;
    transform: translate(-50%);
  }
  .content .copyright {
    font-size: 0.12rem;
    text-align: center;
    color: #d6d8de;
    line-height: 0.12rem;
    margin-top: 2.48rem;
    position: absolute;
    z-index: 10;
    left: 50%;
    transform: translate(-50%);
  }
  .content .light {
    // width: 19.2rem;
    height: 7.5rem;
    background-image: url("../../../static/images/login_light.png");
    background-size: contain;
    position: absolute;
    top: -1.44rem;
    right: -4.2rem;
    z-index: 1;
  }
  /* 导航栏样式 */
  .nav .nav-logo {
    float: left;
    height: 0.4rem;
    margin-left: 4rem;
  }
  .nav .nav-logo > div {
    float: left;
  }
  .nav .logo-img {
    width: 5.1rem;
    height: .4rem;
    background-image: url("../../../static/images/login_zh.png");
    background-size: contain;
  }
  .nav .logo {
    width: .55rem;
    height: .4rem;
    margin-right: .1rem;
    background-image: url("../../../static/images/szsw-logo.png");
    background-size: 100% 100%;
  }
  .nav .logo-URL {
    height: 0.4rem;
    padding-right: 0.16rem;
    border-right: 0.01rem solid #848484;
    margin-left: 0.05rem;
    margin-right: 0.17rem;
  }
  .nav .logo-URL p {
    font-size: 0.18rem;
    color: #848484;
    height: 0.2rem;
    font-weight: 500;
  }
  .nav .logo-URL span {
    font-size: 0.16rem;
    color: #848484;
  }
  .nav .nav-logo > span {
    font-size: 0.15rem;
    color: #848484;
    line-height: 0.4rem;
  }
  .nav ul {
    padding-top: 0.2rem;
    float: left;
    margin-left: 1.82rem;
  }
  .nav ul li {
    float: left;
    margin-left: 0.15rem;
  }
  .nav ul li a {
    color: #848484;
    font-size: 0.13rem;
  }
  /* 占位符样式 */
  ::-webkit-input-placeholder {
    color: #848484;
  }
  ::-moz-placeholder {
    color: #848484;
  } /* firefox 19+ */
  :-ms-input-placeholder {
    color: #848484;
  } /* Internet Explorer 10+ */
  :-moz-placeholder {
    color: #848484;
  } /* firefox 14-18 */
  .el-checkbox {
    position: absolute;
    top: .7rem;
    right: .7rem;
    z-index: 20;
    .el-checkbox__inner {
      border: 1px solid #333;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border: 1px solid #409eff;
    }
    input {
      width: auto !important;
      height: auto !important;
      cursor: pointer;
    }
  }
}
</style>
