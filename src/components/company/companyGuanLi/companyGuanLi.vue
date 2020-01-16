<template>
  <div id="companyGuanLi">
    <!-- 顶部通栏 -->
    <div class="top" @mouseover="showName = false">
      <div class="company">{{companyName}}</div>
      <div class="nav-logo">
        <i class="line"></i>
        <a class="logo-box"></a>
      </div>
      <div class="name" v-if="showName && $exe.installation">{{titleName}}</div>
      <div class="nav" v-else>
        <ul>
          <li>
            <router-link to="/homePage">首页</router-link>
          </li>
          <li>
            <router-link to="/companyGuanLi" class="active">公司管理</router-link>
          </li>
          <li v-if="userType == 1">
            <router-link to="/projectGuanLi">项目管理</router-link>
          </li>
          <li>
            <router-link to="/talkback" v-if="$exe.installation">视频对讲</router-link>
            <router-link to="/talkback" target="_blank" v-else>视频对讲</router-link>
          </li>
          <li v-if="$exe.installation">
            <a @click="plane">无人巡检</a>
          </li>
        </ul>
      </div>
      <div class="user">
        <el-dropdown @command="handleCommand">
          <a class="el-dropdown-link">
            <!-- 用户名 -->
            <!-- {{userName}} -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit">修改密码</el-dropdown-item>
            <el-dropdown-item command="login">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 页面主体 -->
    <div class="main" @mouseover="showName = true">
      <!-- 侧导航栏 -->
      <div class="side-nav">
        <ul>
          <li class="button"></li>
          <li @click="isActiveShow('/companyGuanLi_set')">
            <router-link
              to="/companyGuanLi_set"
              :class="activeShow=='/companyGuanLi_set'||activeShow=='/companyGuanLi'?'active':''"
            >
              <div class="icon home"></div>
              <span>公司设置</span>
            </router-link>
          </li>
          <li @click="isActiveShow('/companyGuanLi_user')">
            <router-link
              to="/companyGuanLi_user"
              :class="activeShow=='/companyGuanLi_user'?'active':''"
            >
              <div class="icon"></div>
              <span>公司用户</span>
            </router-link>
          </li>
          <!-- <li @click="isActiveShow('/companyGuanLi_role')">
                        <router-link to="/companyGuanLi_role" :class="activeShow=='/companyGuanLi_role'?'active':''">
                            <div class="icon"></div>
                            <span>公司角色</span>
                        </router-link>
          </li>-->
        </ul>
      </div>
      <!-- 内容 -->
      <router-view class="router-box"></router-view>
    </div>
    <change-password :show="dialogShow" @close="dialogShow=false"></change-password>
  </div>
</template>

<style lang="less">
#companyGuanLi {
  .top {
    // width: 19.2rem;
    height: 0.8rem;
    padding-top: 0.24rem;
    background-size: cover;
    background: linear-gradient(to right, #6cc4ff, #489cff);
    position: relative;
    > div {
      float: left;
    }
    .nav-logo {
      height: 0.24rem;
      .line {
        display: inline-block;
        width: 0.01rem;
        height: 0.18rem;
        margin-left: 0.16rem;
        margin-bottom: 0.03rem;
        background-color: #fff;
        vertical-align: text-top;
      }
    }
    .logo-box {
      display: inline-block;
      height: 0.3rem;
      width: 1.75rem;
      background-image: url("../../../../static/images/szsw-long.png");
      background-size: 100% 100%;
      margin-left: 0.15rem;
      vertical-align: top;
    }
    .company {
      margin-left: 0.16rem;
      width: 1.3rem;
      height: .24rem;
      font-size: 0.18rem;
      color: #fff;
      line-height: 0.24rem;
      vertical-align: text-top;
      text-shadow: 0.02rem 0.02rem 0.02rem #666;
    }
    .name {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: .3rem;
      color: #fff;
      font-weight: 400;
      letter-spacing: .1rem;
      font-family: 'pmzd';
    }
    .nav {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      ul {
        li {
          float: left;
          a {
            display: block;
            font-size: 0.2rem;
            color: #fff;
            padding-left: 0.16rem;
            padding-right: 0.16rem;
            height: 0.56rem;
            margin-left: 0.17rem;
            &.active {
              border-bottom: 0.04rem solid #fff;
            }
          }
        }
      }
    }
    .user {
      float: right;
      margin-right: 0.36rem;
      a {
        font-size: 0.2rem;
        color: #fff;
      }
    }
  }
  .main {
    width: 100%;
    display: flex;
    position: relative;
    background-color: #f7f7f7;
    .side-nav {
      width: 1.75rem;
      height: 10rem;
      overflow: hidden;
      // display: inline-block;
      background-color: #54a4d7;
      ul {
        width: 1.75rem;
        li {
          height: 0.6rem;
          position: relative;
          a {
            width: 100%;
            height: 0.6rem;
            color: #fff;
            font-size: 0.2rem;
            line-height: 0.6rem;
            position: absolute;
            transition: all 0.5s;
            border-bottom: 0.01rem solid #98c8e7;
            .icon {
              opacity: 0.5;
              width: 0.6rem;
              height: 0.59rem;
              transition: all 0.5s;
              display: inline-block;
              background-repeat: no-repeat;
              background-position: center center;
            }
            span {
              width: 0.8rem;
              vertical-align: top;
              text-align: justify;
              text-align-last: justify;
              display: inline-block;
            }
            .home {
              background-image: url("../../../../static/images/system-home.png");
            }
          }
          a:hover {
            background-color: #2d83bb;
            .icon {
              opacity: 1;
            }
          }
          .active {
            z-index: 10;
            background-color: #378dc5;
            .icon {
              opacity: 1;
            }
          }
        }
        .button {
          height: 0.38rem;
          position: relative;
          border-bottom: 0.01rem solid #98c8e7;
        }
      }
    }
    .router-box {
      flex: 1;
      padding-top: 0.3rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }
  }
}
</style>

<script>
// const { ipcRenderer } = window.require('electron')
import changePassword from "@/base/changePassword";
export default {
  data() {
    return {
      activeShow: "/companyGuanLi_set", // 当前选中的模块
      userType: 1, // 账号状态
      userName: "", // 用戶名
      companyName: "", // 公司名称
      dialogShow: false, // 修改密码弹窗
      showName: true, // 显示名称
      titleName: '', // 显示的名称
    };
  },
  components: {
    changePassword
  },
  created() {
    this.getPath();
    this.getUserType();
    this.getName();
    this.getCompanyName();
    this.getTitle();
  },
  methods: {
    // 选择模块
    isActiveShow(i) {
      this.activeShow = i;
      $(".sanjiao").hide();
      $(".subnav").hide();
    },

    // 页面刷新时重新赋值
    getPath() {
      this.activeShow = this.$route.path;
    },

    // 获取账号类型
    getUserType() {
      this.userType = sessionStorage.getItem("userType");
    },

    // 获取页面标题
    getTitle() {
      let pid = sessionStorage.getItem("cid");
      this.$axios
        .post(`/api/groupTitleApi/getTitle?cid=${pid}`)
        .then(res => {
          if (res.data.code == 0) {
            this.titleName = res.data.data[0].ctitle
          }
        })
    },

    // 退出
    handleCommand(command) {
      if (command == "login") {
        this.$router.push("login");
        sessionStorage.setItem("islogin", "false");
      } else if (command == "edit") {
        this.dialogShow = true;
      }
    },

    // 獲取用戶名
    getName() {
      this.userName = sessionStorage.getItem("userName");
    },

    // 获取公司名称
    getCompanyName() {
      this.$axios
        .post(
          `/api/pcCompanyLibrary/selectHjCompanyLibrary?id=${sessionStorage.getItem(
            "cid"
          )}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.companyName = res.data.data.companyName;
          }
        });
    },

    // 点击调用本地exe
    plane() {
      // 打包的时候打开
      ipcRenderer.send("plane");
    }
  }
};
</script>