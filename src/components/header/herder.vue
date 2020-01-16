<template>
  <div class="indexBody">
    <div class="header">
      <div class="header-main container clearfix">
        <span class="backTo" v-if="$exe.installation">
          <a style="color:#fff" @click="back">返回</a>
        </span>
        <ul class="nav">
          <!-- 项目总况 -->
          <li>
            <div class="Lactive-box" :class="getPath('项目总况')">
              <router-link to="/home">项目总况</router-link>
            </div>
          </li>
          <!-- 人员管理 -->
          <li>
            <div class="Lactive-box" :class="getPath('人员管理')">
              <span>人员管理</span>
              <ul class="left">
                <li>
                  <router-link to="/labour" active-class="li-active">两制管理</router-link>
                </li>
                <li>
                  <router-link to="/location" active-class="li-active">人员定位</router-link>
                </li>
                <!-- <li>
                  <router-link to="/workerHome">产业工人</router-link>
                </li> -->
                <!-- <li>
                  <a @click="unopenClick">危区检测</a>
                </li> -->
              </ul>
            </div>
          </li>
          <!-- 设备管理 -->
          <li>
            <div class="Lactive-box" :class="getPath('设备管理')">
              <router-link to="/safety">设备管理</router-link>
            </div>
          </li>
          <!-- 视频监控 -->
          <li id="last-left">
            <div class="Lactive-box" :class="getPath('视频监控')">
              <span>视频监控</span>
              <ul class="left">
                <li>
                  <router-link to="/monitoring" active-class="li-active">视频监控</router-link>
                </li>
                <li>
                  <router-link to="/aiDiscern" active-class="li-active">AI识别</router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- 安全管理 -->
          <li>
            <div class="Lactive-box" :class="getPath('安全管理')">
              <span>安全管理</span>
              <ul class="right">
                <li>
                  <router-link to="/gaoZhiMo" active-class="li-active">高支模检测</router-link>
                </li>
                <li>
                  <router-link to="/shenJiKeng" @click="unopenClick" active-class="li-active">基坑监测</router-link>
                </li>
                <!-- <li>
                  <a @click="unopenClick">施工周边监测</a>
                </li>
                <li>
                  <a @click="unopenClick">智能安全教育</a>
                </li> -->
              </ul>
            </div>
          </li>
          <!-- 绿色施工 -->
          <li>
            <div class="Lactive-box" :class="getPath('绿色施工')">
              <!-- <span>绿色施工</span> -->
              <router-link to="/green" active-class="li-active">TSP检测</router-link>
              <!-- <ul class="right">
                <li>
                  <router-link to="/green" active-class="li-active">TSP检测</router-link>
                </li>
                <li>
                  <a @click="unopenClick">废弃物监管</a>
                </li>
                <li>
                  <a @click="unopenClick">雨水回收</a>
                </li>
                <li>
                  <a @click="unopenClick">喷淋系统</a>
                </li>
              </ul> -->
            </div>
          </li>
          <!-- 资料管理 -->
          <li>
            <div class="Lactive-box" :class="getPath('资料管理')">
              <router-link to="/information">资料管理</router-link>
            </div>
          </li>
          <!-- 智能应用 -->
          <li>
            <div class="Lactive-box" :class="getPath('智能应用')">
              <!-- <span>智能应用</span> -->
              <a @click="plane" v-if="$exe.installation">无人巡检</a>
              <!-- <ul class="right">
                <li>
                  <a @click="unopenClick" v-if="!$exe.installation">无人机应用</a>
                  <a @click="plane" v-else>无人机应用</a>
                </li>
                <li>
                  <a @click="unopenClick">BIM技术应用</a>
                </li>
                <li>
                  <a @click="unopenClick">VR应用</a>
                </li>
                <li>
                  <a @click="unopenClick">视频会议</a>
                </li>
                <li>
                  <a @click="unopenClick">3D打印应用</a>
                </li>
              </ul> -->
            </div>
          </li>
        </ul>
        <span>
          <h2 class="head-title">{{projectName}}</h2>
        </span>
        <div class="date-time">
          <span class="d-time">{{time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const { ipcRenderer } = window.require('electron')
import moment from "moment";
export default {
  props: {
    path: String
  },
  data() {
    return {
      pid: "", // 项目id
      time: "",
      projectName: "" // 项目名称
    };
  },
  created() {
    this.setTime();
    this.getProjectId();
    this.selectIndex();
  },
  mounted() {},
  methods: {
    // 获取时间
    setTime() {
      setInterval(() => {
        this.time = moment().format("h:mm:ss");
      }, 1000);
    },

    // 功能未开发
    unopenClick() {
      this.$message({
        message: "该功能暂未开放",
        type: "warning"
      });
    },

    // 获取项目id
    getProjectId() {
      this.pid = sessionStorage.getItem("pid");
    },

    // 获取项目名称
    selectIndex() {
      this.$axios
        .post(`/api/pcLzIndex/selectIndex?pid=${this.pid}`)
        .then(res => {
          if (res.data.code == 0) {
            this.projectName = res.data.data.projectName;
          }
        });
    },

    // 返回上一頁
    back() {
      if (sessionStorage.getItem("userType") == 2) {
        this.$router.push("/systemHome");
      } else {
        this.$router.push("/homePage");
      }
    },

    // 点击调用本地exe
    plane() {
      // 打包的时候打开
      ipcRenderer.send("plane");
    },

    // 改变菜单样式
    getPath(name) {
      switch (name) {
        case "项目总况":
          switch (this.path) {
            case "/home":
              return "left-img";
          }
          break;
        case "人员管理":
          switch (this.path) {
            case "/labour":
              return "left-img";
            case "/location":
              return "left-img";
          }
          break;
        case "设备管理":
          switch (this.path) {
            case "/safety":
              return "left-img";
          }
          break;
        case "视频监控":
          switch (this.path) {
            case "/monitoring":
              return "left-img";
            case "/aiDiscern":
              return "left-img";
          }
          break;
        case "安全管理":
          switch (this.path) {
            case "/gaoZhiMo":
              return "right-img";
            case "/shenJiKeng":
              return "right-img";
          }
          break;
        case "绿色施工":
          switch (this.path) {
            case "/green":
              return "right-img";
          }
          break;
        case "资料管理":
          switch (this.path) {
            case "/information":
              return "right-img";
          }
          break;
        case "智能应用":
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.indexBody {
  position: relative;
  top: 0;
  z-index: 1000;
}
.header {
  height: 0.48rem;
  line-height: 0.48rem;
}
.header-main {
  position: relative;
}
.header .city {
  float: left;
  font-size: 0.14rem;
  color: #3375fe;
}
.header .city span {
  font-size: 0.14rem;
  color: #3375fe;
  padding-left: 0.1rem;
}
.header .city img {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.2rem;
  margin-top: -0.05rem;
}
.header .backTo {
  color: #fff;
  display: inline-block;
  border: 1px solid #fff;
  border-radius: 0.05rem;
  height: 0.3rem;
  width: 0.5rem;
  text-align: center;
  line-height: 0.3rem;
  cursor: pointer;
  transition: 0.5s all;
}
.header .backTo:hover {
  background: #0f1f53;
  color: #3375fe;
  border: 1px solid #3375fe;
}
.header .nav {
  position: absolute;
  width: 14.78rem;
  height: 0.56rem;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-image: url("../../../static/images/title-bg.png");
  background-size: contain;
}
.header .head-title {
  position: absolute;
  display: _none;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 60%;
  background-size: cover;
  width: 4.4rem;
  text-align: center;
  height: 0.56rem;
  line-height: 0.4rem;
  font-size: 0.2rem;
  color: #ffffff;
  font-weight: bold;
}
.header .date-time {
  float: right;
  font-size: 0.14rem;
  color: #3375fe;
  font-weight: bold;
}
.header .d-date {
  padding-right: 0.3rem;
}
.header .nav {
  background-size: 100% 100%;
  padding-top: 0.02rem;
  > li {
    float: left;
    height: 0.44rem;
    width: 1.32rem;
    text-align: center;
    .Lactive-box {
      position: relative;
      width: 1.51rem;
      height: 100%;
      a,
      span {
        display: block;
        line-height: 0.44rem;
        font-size: 0.16rem;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
      }
      ul {
        width: 1.28rem;
        position: relative;
        background-color: #020521;
        border-radius: 0 0 0.05rem 0.05rem;
        overflow: hidden;
        height: 0;
        opacity: 0;
        transition: 0.5s all;
        li {
          &:hover {
            background-image: linear-gradient(to right, #0164ff, #00abfe);
          }
          &:last-child {
            border-bottom: none;
          }
        }
        .li-active {
          background-image: linear-gradient(to right, #0164ff, #00abfe);
        }
      }
      .left {
        left: .24rem;
      }
      .right {
        // right: .24rem;
      }
    }
    .Lactive-box:hover ul {
      opacity: 1;
      height: auto;
      border: 0.01rem solid #0f1f53;
      li {
        border-bottom: 0.01rem solid #0f1f53;
      }
    }
    .left-img {
      background-image: url("../../../static/images/Lactive.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .right-img {
      background-image: url("../../../static/images/Ractive.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  #last-left {
    margin-right: 4.02rem;
  }
}
.indexBody {
  .header {
    .header-main {
      .nav {
        li {
          .drop-down1 {
            position: absolute;
            right: -0.19rem;
            top: 0.48rem;
            height: 0;
            overflow: hidden;
            ul {
              width: 1.28rem;
              overflow: hidden;
              border: 0.01rem solid #0f1f53;
              background-color: #020521;
              li {
                a {
                  color: #fff;
                  width: 1.28rem;
                  height: 0.48rem;
                  margin: 0;
                  padding: 0;
                  border-bottom: 0.01rem solid #0f1f53;
                }
              }
            }
          }
          .drop-down2 {
            position: absolute;
            right: 0.01rem;
            top: 0.48rem;
            height: 0;
            overflow: hidden;
            ul {
              width: 1.28rem;
              height: 2.4rem;
              overflow: hidden;
              border: 0.01rem solid #0f1f53;
              background-color: #020521;
              li {
                a {
                  color: #fff;
                  width: 1.28rem;
                  height: 0.48rem;
                  margin: 0;
                  padding: 0;
                  border-bottom: 0.01rem solid #0f1f53;
                }
              }
            }
          }
          .drop-down3 {
            position: absolute;
            right: 0.01rem;
            top: 0.48rem;
            height: 0;
            overflow: hidden;
            ul {
              width: 1.28rem;
              height: 2.4rem;
              overflow: hidden;
              border: 0.01rem solid #0f1f53;
              background-color: #020521;
              li {
                a {
                  color: #fff;
                  width: 1.28rem;
                  height: 0.48rem;
                  margin: 0;
                  padding: 0;
                  border-bottom: 0.01rem solid #0f1f53;
                }
              }
            }
          }
          .drop-down4 {
            position: absolute;
            right: 0.01rem;
            top: 0.48rem;
            height: 0;
            overflow: hidden;
            ul {
              width: 1.28rem;
              height: 1.92rem;
              overflow: hidden;
              border: 0.01rem solid #0f1f53;
              background-color: #020521;
              li {
                a {
                  color: #fff;
                  width: 1.28rem;
                  height: 0.48rem;
                  margin: 0;
                  padding: 0;
                  border-bottom: 0.01rem solid #0f1f53;
                }
              }
            }
          }
          .drop-down5 {
            position: absolute;
            left: 0.19rem;
            top: 0.48rem;
            height: 0;
            overflow: hidden;
            ul {
              width: 1.28rem;
              height: 0.96rem;
              overflow: hidden;
              border: 0.01rem solid #0f1f53;
              background-color: #020521;
              li {
                a {
                  color: #fff;
                  width: 1.28rem;
                  height: 0.48rem;
                  margin: 0;
                  padding: 0;
                  border-bottom: 0.01rem solid #0f1f53;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
