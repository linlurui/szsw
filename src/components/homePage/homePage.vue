<template>
  <div class="homePage" id="homePage">
    <!-- 顶部通栏 -->
    <div class="top" @mouseover="showName = false">
      <div class="company">{{companyName}}</div>
      <div class="nav-logo">
        <i class="line"></i>
        <router-link class="logo-box" to="/blocPage"></router-link>
      </div>
      <div class="name" v-if="showName && $exe.installation">{{titleName}}</div>
      <div class="nav" v-else>
        <ul>
          <li>
            <router-link to="/homePage" class="active">首页</router-link>
          </li>
          <li>
            <router-link to="/companyGuanLi">公司管理</router-link>
          </li>
          <li v-if="userType==1">
            <router-link to="/projectGuanLi">项目管理</router-link>
          </li>
          <li>
            <router-link to="/talkback" v-if="$exe.installation">视频对讲</router-link>
            <router-link to="/talkback" target="_blank" v-else>视频对讲</router-link>
          </li>
          <li>
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
    <!-- 内容 -->
    <div class="main" @mouseover="showName = true">
      <!-- 地图 -->
      <div class="amap-page-container">
        <el-amap
          ref="map"
          vid="amapDemo"
          :amap-manager="amapManager"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          class="amap-demo"
        >
          <div v-if="markerList.length != 0">
            <el-amap-marker
              v-for="(marker, index) in markerList"
              :key="index"
              :position="marker.position"
              :events="marker.events"
              :icon="marker.icon"
              animation="AMAP_ANIMATION_DROP"
            ></el-amap-marker>
            <el-amap-info-window
              v-for="window in markerList"
              :key="window.content"
              :position="window.position"
              :visible="window.visible"
              :content="window.content"
              :offset="window.offset"
            ></el-amap-info-window>
          </div>
        </el-amap>
      </div>
      <!-- 搜索框 -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="输入信息名称进行搜索"
          v-model="searchLeftValue"
          @keyup.enter="searchLeft(searchLeftValue)"
        />
        <a href="#" @click="searchLeft(searchLeftValue)">
          <i></i>
        </a>
      </div>
      <!-- 公司名称/地区 -->
      <div class="menu">
        <div class="company" @click="dropDownClck('district')">
          <span class="text">{{searchCompanyName}}</span>
          <!-- <i class="icon el-icon-arrow-down"></i> -->
        </div>
        <div class="district" @click="dropDownClck('district')">
          <span class="text">{{provinceActive}}</span>
          <i class="icon el-icon-arrow-down"></i>
        </div>
        <!-- <div class="company-box" v-show="companyShow">
          <div class="now">
            当前组织：{{searchCompanyName}}
          </div>
          <div class="search-box">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="输入组织名称后回车搜索" @keyup.enter="searchRight" ref="companyInput">
          </div>
        </div>-->
        <div class="district-box" v-show="districtShow">
          <div class="now">当前区域：{{provinceActive}}</div>
          <ul>
            <li>
              <a
                :class="provinceActive=='全国'?'active':''"
                @click="provinceActive='全国';region=0;searchRight()"
              >全国</a>
            </li>
            <li v-for="item in provinceList" :key="item.id">
              <a
                :class="provinceActive==item.title?'active':''"
                @click="provinceActive=item.title;region=item.id;searchRight()"
              >{{item.title}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="side-nav" :class="sidNavClass">
        <a href="javascript:void(0);" @click="sideNavState"></a>
        <div class="title">
          总共
          <span>{{projectSum}}</span>个智慧工地项目
          <!-- <a>最新项目</a> -->
        </div>
        <div class="data">
          <ul>
            <li>
              在场工人：
              <span>{{statisticsData.numW}}</span>
              人
            </li>
            <li>
              参建单位：
              <span>{{statisticsData.numC}}</span>
              家
            </li>
            <li>
              今日上工：
              <span style="color:#3ada76;">{{statisticsData.numWing}}</span>
              人
              (
              <span style="color:#3ada76;">{{getNum}}</span>%)
            </li>
            <li>
              投资金额：
              <span>{{Math.floor(statisticsData.totalMoney)}}</span>
              万
            </li>
          </ul>
        </div>
        <div class="main-list">
          <el-tree
            id="tree-top"
            :data="data"
            :props="defaultPropsTop"
            node-key="id"
            :default-expanded-keys="open"
            accordion
            @node-click="handleNodeClickTop"
          ></el-tree>
          <el-tree
            id="tree"
            v-show="treeShow"
            :data="companyList"
            :props="defaultProps"
            lazy
            accordion
            @node-expand="handleNodeClick"
            @node-click="getPrijectPosition"
            @node-contextmenu="getDblclick"
          ></el-tree>
        </div>
      </div>
    </div>
    <change-password :show="dialogShow" @close="dialogShow=false"></change-password>
  </div>
</template>

<script>
// const { ipcRenderer } = window.require('electron')
// import { amapManager } from 'vue-amap';
let amapManager = new VueAMap.AMapManager();
import router from "../../router/index";
import changePassword from "@/base/changePassword";
export default {
  data() {
    return {
      // 地图配置项
      // AMapManager,
      amapManager,
      marker1: "",
      marker2: "",
      marker3: "",
      marker4: "",
      marker5: "",
      zoom: 12,
      center: [114.083372, 22.544146],
      // 插入的搜索框
      plugin: [
        {
          pName: "ToolBar",
          direction: false,
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        }
      ],
      // 状态储存
      sideNavState: this.enter,
      sidNavClass: "enter",
      userType: 1, // 账号类型
      companyShow: false, // 公司下拉框状态
      districtShow: false, // 地区下拉框状态
      companyId: 0, // 公司id
      companyName: "", // 当前公司名
      searchCompanyName: "", // 搜索栏显示的公司名
      companyList: [], // 公司列表
      region: 0, // 区域id
      projectList: [], // 项目列表数据
      projectSum: "", // 项目总数
      provinceList: "", // 城市列表
      provinceActive: "全国", // 当前选中城市
      pageNum: 1, // 当前页
      pageSize: 5, // 没页显示条数
      statisticsData: "", // 统计数据
      projectListData: "", // 项目列表数据
      allItems: [], // 获取全部项目列表
      markerList: [], //经纬度坐标
      pid: "", // 公司id
      star: false,
      userName: "", // 用戶名
      window: "",
      defaultProps: {
        children: "children",
        label: "companyName",
        isLeaf: "leaf"
      }, // 默认显示的数据名称
      dblclick: 0, // 双击
      dblclickId: "", // 缓存第一次点击的id
      searchLeftValue: "", // 左侧搜索
      data: [
        {
          // 根目录
          label: "",
          children: [{}],
          id: 0
        }
      ],
      defaultPropsTop: {
        // 根目录显示
        label: "label",
        children: "children"
      },
      treeShow: true, // 列表是否显示
      open: [0], // 默认打开项
      loading: true, // 加载动画
      dialogShow: false, // 修改密码弹窗
      showName: true, // 显示名称
      titleName: '', // 显示的名称
    };
  },
  components: {
    changePassword
  },
  created() {
    this.header()
    this.getUserType();
    this.getComoanyId();
    this.getCompanyList();
    this.getComoanyName();
    this.getProvinceList();
    this.selectProjectArea();
    // this.selectAreaProjectList()
    this.getAllItems();
    this.getName();
    this.getTitle()
  },
  mounted() {},
  updated() {
    let time;
    let treeMouse = document.getElementById("tree");
    let spanClass = treeMouse.getElementsByClassName("el-tree-node__label");
    for (let i = 0; i < spanClass.length; i++) {
      spanClass[i].onmouseover = function() {
        clearInterval(time);
        time = setInterval(() => {
          spanClass[i].scrollLeft += 1;
        }, 20);
      };
      spanClass[i].onmouseout = function() {
        clearInterval(time);
        for (let j = 0; j < spanClass.length; j++) {
          spanClass[j].scrollLeft = 0;
        }
      };
    }
  },
  methods: {
    enter() {
      this.sidNavClass = "come";
      $(".side-nav").animate(
        {
          right: "-4.56rem"
        },
        1000
      );
      $(".menu").animate(
        {
          right: ".24rem"
        },
        1000
      );
      this.sideNavState = this.come;
    },
    come() {
      this.sidNavClass = "enter";
      $(".side-nav").animate(
        {
          right: "0"
        },
        1000
      );
      $(".menu").animate(
        {
          right: "4.8rem"
        },
        1000
      );
      this.sideNavState = this.enter;
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    // 切换header
    header() {
      localStorage.setItem('home', false)
      localStorage.setItem('system', false)
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

    // 退出&修改密码
    handleCommand(command) {
      if (command == "login") {
        this.$router.push("login");
        sessionStorage.setItem("islogin", "false");
      } else if (command == "edit") {
        this.dialogShow = true;
      }
    },

    // 下拉框点击事件
    dropDownClck(val) {
      if (val == "company") {
        this.districtShow = false;
        this.companyShow = !this.companyShow;
        // setTimeout(() => {
        //   this.$refs.companyInput.focus()
        // }, 300)
      } else {
        this.companyShow = false;
        this.districtShow = !this.districtShow;
      }
    },

    // 获取公司id
    getComoanyId() {
      this.companyId = sessionStorage.getItem(`cid`);
    },

    // 获取当前公司名
    getComoanyName() {
      this.$axios
        .post(
          `/api/pcCompanyLibrary/selectHjCompanyLibrary?id=${this.companyId}`
        )
        .then(res => {
          this.companyName = res.data.data.companyName;
          this.data[0].label = this.companyName;
          this.searchCompanyName = this.companyName;
        });
    },

    // 获取公司列表
    getCompanyList() {
      this.$axios
        .post(
          `/api/pcCompanyLibrary/companyLibraryList?companyId=${this.companyId}`
        )
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.total > 0) {
              this.companyList = res.data.data.rows;
            }
            this.$axios
              .post(
                `/api/project/selectAreaProjectList?companyId=${this.companyId}&region=0`
              )
              .then(res => {
                for (let i = 0; i < res.data.data.length; i++) {
                  // 控件prop，显示名称和是否含有下拉三角
                  res.data.data[i].companyName = res.data.data[i].projectName;
                  res.data.data[i].leaf = true;
                  this.companyList.push(res.data.data[i]);
                }
              });
          }
        });
    },

    // 点击树形控件
    handleNodeClick(val) {
      this.loading = true;
      this.projectSum = 0;
      this.searchLeftValue = "";
      this.region = 0;
      this.provinceActive = "全国";
      // 获取汇总数据
      this.companyId = val.id;
      // 判断点击项是否为项目
      if (!val.projectName) {
        this.selectProjectArea();
        this.$axios
          .post(`/api/pcCompanyLibrary/companyLibraryList?companyId=${val.id}`)
          .then(res => {
            this.searchCompanyName = val.companyName;
            // 判断公司下时候还有子公司，没有的话就请求项目数据
            if (res.data.code == 0 && res.data.data.total == 0) {
              this.getPriject(val);
            } else if (res.data.code == 0 && res.data.data.rows.length > 0) {
              // 含有子公司，将子公司添加到列表里
              // 如果没有子数据在渲染，否则会多次叠加
              this.markerList = [];
              if (!val.children) {
                this.$set(val, "children", res.data.data.rows);
              }
              let num = res.data.data.rows.length;
              this.$axios
                .post(
                  `/api/project/selectAreaProjectList?companyId=${val.id}&region=0`
                )
                .then(res => {
                  // 判断是否有项目
                  if (res.data.code == 0 && res.data.data.length == 0) {
                    this.loading = false;
                  } else if (res.data.code == 0) {
                    for (let i = 0; i < res.data.data.length; i++) {
                      // 控件prop，显示名称和是否含有下拉三角
                      res.data.data[i].companyName =
                        res.data.data[i].projectName;
                      res.data.data[i].leaf = true;
                    }
                    // 如果没有子数据在渲染，否则会多次叠加
                    if (val.children.length == num) {
                      for (let i = 0; i < res.data.data.length; i++) {
                        val.children.push(res.data.data[i]);
                      }
                    }
                    // 渲染公司下的项目
                    this.mapMarkersList(res.data.data);
                  }
                });
              this.loading = false;
            }
          });
      }
    },

    //项目在地图上定位
    getPrijectPosition(val) {
      if (val.projectName) {
        // 点击项目在地图上定位
        this.projectSum = 0;
        this.$axios
          .post(`/api/project/selectHjProject?id=${val.id}`)
          .then(res => {
            this.statisticsData = res.data;
          });
        if (val.longitude || val.latitude) {
          this.markerList = [
            {
              position: [val.longitude * 1, val.latitude * 1],
              content: `<div class="prompt">${val.projectName}</div>`,
              visible: true,
              offset: [2, -15]
            }
          ];
          this.center = [val.longitude * 1, val.latitude * 1];
        } else {
          this.$message({
            type: "warning",
            message: "该项目没有设置经纬度"
          });
          this.markerList = [];
        }
        this.loading = false;
      }
    },

    // 获取项目
    getPriject(data) {
      this.$axios
        .post(
          `/api/project/selectAreaProjectList?companyId=${data.id}&region=0`
        )
        .then(res => {
          // 判断是否有项目
          if (res.data.code == 0 && res.data.data.length == 0) {
            this.$message({
              type: "warning",
              message: "该公司下没有项目"
            });
            this.markerList = [];
            this.loading = false;
          } else if (res.data.code == 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              // 控件prop，显示名称和是否含有下拉三角
              res.data.data[i].companyName = res.data.data[i].projectName;
              res.data.data[i].leaf = true;
            }
            // 如果没有子数据在渲染，否则会多次叠加
            if (!data.children) {
              this.$set(data, "children", res.data.data);
            }
            // 渲染公司下的项目
            this.mapMarkersList(res.data.data);
          }
        });
    },

    // 树形控件的右击
    getDblclick(e, val) {
      if (val.projectName) {
        sessionStorage.setItem("pid", val.id);
        // 打包时打开并且注释下边的
        if (this.$exe.installation) {
          this.$router.push("/home");
        } else {
          var url = this.$router.resolve({ path: "/home" });
          window.open(url.href, "_blank");
        }
      }
    },

    // 获取省份列表
    getProvinceList() {
      this.$axios.post(`/api/area/getArea?parentId=0`).then(res => {
        this.provinceList = res.data.data;
      });
    },

    // 项目看板跳转
    projectClick(id) {
      sessionStorage.setItem("pid", id);
      this.$router.push({ path: "/spectaculars" });
    },

    // 获取统计数据
    selectProjectArea() {
      this.$axios
        .post(
          `/api/project/selectProjectAreS?companyId=${this.companyId}&region=0`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.statisticsData = res.data;
          } else {
            this.statisticsData = {
              numW: 0,
              numC: 0,
              totalMoney: 0,
              numWing: 0
            };
          }
        });
    },

    // 获取全部项目列表
    getAllItems() {
      this.loading = true;
      this.provinceActive = "全国";
      this.searchCompanyName = this.companyName;
      this.region = 0;
      this.getComoanyId();
      this.$axios
        .post(`/api/project/selectProjects?cid=${this.companyId}&projectName=`)
        .then(res => {
          if (res.data.code == 0) {
            this.allItems = res.data.data;
            this.mapMarkersList(this.allItems);
          } else {
            this.markerList = [];
            this.loading = false;
          }
        });
    },

    // 渲染地图上的点
    mapMarkersList(data) {
      this.projectSum = data.length;
      this.markerList = [];
      let self = this;
      for (let i = 0; i < data.length; i++) {
        if (!data[i].longitude || !data[i].latitude) {
          continue;
        }
        this.center = [data[i].longitude * 1, data[i].latitude * 1];
        let marker = {
          position: [data[i].longitude * 1, data[i].latitude * 1],
          content: `<div class="prompt">${data[i].projectName}</div>`,
          visible: false,
          offset: [2, -15],
          events: {
            // click() {
            //   self.center = [data[i].longitude * 1, data[i].latitude * 1];
            //   self.markerList.forEach(item => {
            //     if (
            //       item.position[0] == self.center[0] &&
            //       item.position[1] == self.center[1]
            //     ) {
            //       item.visible = true;
            //     } else {
            //       item.visible = false;
            //     }
            //   });
            // }
            mouseover() {
              self.center = [data[i].longitude * 1, data[i].latitude * 1];
              self.markerList.forEach(item => {
                if (
                  item.position[0] == self.center[0] &&
                  item.position[1] == self.center[1]
                ) {
                  item.visible = true;
                } else {
                  item.visible = false;
                }
              });
            },
            // mouseout() {
            //   self.center = [data[i].longitude * 1, data[i].latitude * 1];
            //   self.markerList.forEach(item => {
            //     item.visible = false;
            //   });
            // }
          }
        };
        this.markerList.push(marker);
      }
      this.loading = false;
    },

    // 翻页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.pageNum = val
      // this.selectAreaProjectList()
    },

    // 跳转看板
    toHome(item) {
      this.pid = item.id;
      sessionStorage.setItem("pid", this.pid);
      // this.$router.push('/home')
      // console.log(localStorage.getItem('pid'))
      var url = this.$router.resolve({ path: "/home" });
      window.open(url.href, "_blank");
    },

    // 獲取用戶名
    getName() {
      this.userName = sessionStorage.getItem("userName");
    },

    // 左侧搜索
    searchLeft(data = "") {
      this.provinceActive = "全国";
      this.searchCompanyName = this.companyName;
      this.region = 0;
      this.getComoanyId();
      this.$axios
        .post(
          `/api/project/selectProjects?cid=${this.companyId}&projectName=${data}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.allItems = res.data.data;
            this.mapMarkersList(this.allItems);
            let dialog = this.allItems.every(item => {
              return item.longitude == null && item.latitude == null;
            });
            if (dialog) {
              this.$message({
                type: "warning",
                message: "项目未设置经纬度"
              });
              this.markerList = [];
            } else if (data) {
              this.$message({
                type: "success",
                message: "查询成功"
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "未查询到项目"
            });
            this.markerList = [];
            this.loading = false;
          }
        });
    },

    // 右侧搜索
    searchRight() {
      this.getComoanyId();
      let value =
        this.searchCompanyName == this.companyName
          ? ""
          : this.searchCompanyName;
      this.$axios
        .post(
          `/api/project/selectProjectRegion?cid=${this.companyId}&constructionName=${value}&projectRegion=${this.region}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.companyShow = false;
            this.districtShow = false;
            this.mapMarkersList(res.data.data);
            let dialog = res.data.data.every(item => {
              return item.longitude == null && item.latitude == null;
            });
            if (dialog) {
              this.$message({
                type: "warning",
                message: "项目未设置经纬度"
              });
              this.markerList = [];
            } else {
              this.$message({
                type: "success",
                message: "查询成功"
              });
            }
          } else if (res.data.code == 1) {
            this.markerList = [];
            this.$message({
              type: "warning",
              message: "该区域下没有项目"
            });
          }
        });
    },

    // 根目录点击事件
    handleNodeClickTop() {
      this.treeShow = !this.treeShow;
      if (this.treeShow) {
        this.selectProjectArea();
        this.getAllItems();
      }
      if (this.open.length) {
        this.open.pop();
      } else {
        this.open.push(0);
      }
    },

    // 点击调用本地exe
    plane() {
      // 打包的时候打开
      ipcRenderer.send("plane");
    }
  },
  computed: {
    getNum() {
      let num = Math.floor(
        (this.statisticsData.numWing / this.statisticsData.numW) * 100
      );
      if (isNaN(num)) {
        return 0;
      } else {
        return num;
      }
    }
  }
};
</script>

<style lang="less">
#homePage {
  .green-color {
    color: #5be4a5;
  }
  .yellow-color {
    color: #f5c98d;
  }
  .red-color {
    color: #f00;
  }
  .top {
    // width: 19.2rem;
    height: 0.8rem;
    padding-top: 0.24rem;
    background-size: cover;
    background: linear-gradient(to right, #6cc4ff, #489cff);
    position: relative;
  }
  .top > div {
    float: left;
  }
  .top .nav-logo {
    height: 0.24rem;
  }
  .top .logo-box {
    display: inline-block;
    height: 0.3rem;
    width: 1.75rem;
    background-image: url("../../../static/images/szsw-long.png");
    background-size: 100% 100%;
    margin-left: 0.15rem;
    vertical-align: top;
  }
  .top .nav-logo .line {
    display: inline-block;
    width: 0.01rem;
    height: 0.18rem;
    margin-left: 0.16rem;
    margin-bottom: 0.03rem;
    background-color: #fff;
    vertical-align: text-top;
  }
  .top .nav-logo .name {
    display: inline-block;
    margin-left: 0.16rem;
    font-size: 0.18rem;
    color: #fff;
    line-height: 0.24rem;
    vertical-align: text-top;
    text-shadow: 0.02rem 0.02rem 0.02rem #666;
  }
  .top .company {
    margin-left: 0.16rem;
    width: 1.3rem;
    height: .24rem;
    font-size: 0.18rem;
    color: #fff;
    line-height: 0.24rem;
    vertical-align: text-top;
    text-shadow: 0.02rem 0.02rem 0.02rem #666;
  }
  .top .name {
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
  .top .nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
  .top .nav ul li {
    float: left;
  }
  .top .nav li a {
    display: block;
    font-size: 0.2rem;
    color: #fff;
    padding-left: 0.16rem;
    padding-right: 0.16rem;
    height: 0.56rem;
    margin-left: 0.17rem;
  }
  .top .nav li a.active {
    border-bottom: 0.04rem solid #fff;
  }
  .top .user {
    float: right;
    margin-right: 0.36rem;
  }
  .top .user a {
    font-size: 0.2rem;
    color: #fff;
  }
  /* 主体区域样式 */
  .main {
    position: relative;
    height: 10rem;
    overflow: hidden;
    .info-box {
      width: 2.3rem;
      height: 0.66rem;
      border-radius: 0.04rem;
      background-color: #fff;
      position: absolute;
      padding: 0.12rem;
      overflow: hidden;
      // top: 500px;
      // left: 1000px;
      .top-box {
        display: flex;
        justify-content: space-between;
        span {
          color: #4a4a4a;
          font-size: 0.14rem;
          height: 0.16rem;
          line-height: 0.16rem;
        }
        .state {
          font-size: 0.12rem;
          text-align: right;
        }
      }
      .bottom-box {
        display: flex;
        margin-top: 0.12rem;
        justify-content: space-between;
        > div {
          height: 0.14rem;
          line-height: 0.14rem;
          span {
            font-size: 0.12rem;
          }
          .type {
            color: #a5a5a5;
          }
        }
      }
    }
  }
  .amap-demo {
    height: 10rem;
  }
  .main .search-bar {
    position: absolute;
    width: 3.66rem;
    height: 0.46rem;
    background-image: url("../../../static/images/homePage-inputBg.png");
    background-size: contain;
    top: 0.15rem;
    left: 0.7rem;
    padding-left: 0.17rem;
  }
  .main .search-bar input {
    font-size: 0.14rem;
    height: 0.4rem;
    width: 3rem;
    padding: 0;
    transform: translateY(0.01rem);
  }
  .main .search-bar a {
    width: 0.45rem;
    height: 0.4rem;
    display: inline-block;
    transform: translateY(-0.09rem);
  }
  .main .search-bar a i {
    width: 0.49rem;
    height: 0.17rem;
    display: inline-block;
    background-image: url("../../../static/images/homePage-search.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    transform: translateY(0.11rem);
  }
  .main .menu {
    position: absolute;
    width: 3.66rem;
    height: 0.46rem;
    background-image: url("../../../static/images/homePage-inputBg.png");
    background-size: contain;
    top: 0.15rem;
    right: 4.8rem;
    padding-top: 0.06rem;
    > div {
      display: inline-block;
      position: relative;
      cursor: pointer;
      .icon {
        position: absolute;
        right: 0.08rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .company {
      width: 2.47rem;
      height: 0.3rem;
      line-height: 0.3rem;
      border-right: 0.02rem solid #f2f2f2;
      // padding: 0 .26rem 0 .16rem;
      padding: 0 0 0 0.16rem;
      overflow: hidden;
    }
    .district {
      float: right;
      width: 1.13rem;
      height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.1rem;
      .icon {
        position: absolute;
        right: 0.15rem;
      }
    }
    .company-box,
    .district-box {
      // height: 1rem;
      width: 3.6rem;
      position: absolute;
      left: 0.04rem;
      top: 0.4rem;
      background-color: #fff;
      .now {
        color: #4a4a4a;
        font-size: 0.12rem;
        background-color: #f8f8f8;
        height: 0.34rem;
        line-height: 0.34rem;
        padding-left: 0.18rem;
        font-weight: border;
      }
    }
    .company-box {
      padding-bottom: 0.2rem;
      .search-box {
        height: 0.47rem;
        border-bottom: 0.01rem solid #f8f8f8;
        padding-left: 0.18rem;
        line-height: 0.46rem;
        font-size: 0.12rem;
        input {
          padding-left: 0.1rem;
          width: calc(100% - 20px);
        }
      }
      .collapse-box {
        padding: 0 0.18rem;
        .el-collapse {
          border: none;
          position: relative;
          .el-collapse-item__header {
            font-size: 0.12rem;
            color: #878787;
            // background-color: #54a4d7;
            border-bottom: 0;
            height: 0.25rem;
            padding: 0;
            line-height: 0.25rem;
            // padding-left: .35rem;
            // border-bottom: .01rem solid #f2f8fc;
          }
          .el-collapse-item__content {
            padding: 0;
            > div {
              // background-color: #54a4d7;
              a {
                display: block;
                color: #878787;
                font-size: 0.12rem;
                line-height: 0.3rem;
              }
            }
          }
          .el-collapse-item__wrap {
            // background-color: #54a4d7;
            padding-left: 0.2rem;
            border: none;
            overflow: visible;
            // height: auto;
          }
        }
      }
    }
    .district-box {
      ul {
        padding: 0.04rem 0.18rem 0.08rem 0.18rem;
        display: flex;
        flex-wrap: wrap;
        li {
          height: 0.3rem;
          line-height: 0.3rem;
          margin-right: 0.21rem;
          a {
            font-size: 0.12rem;
            color: #7a7a7a;
            &.active {
              color: #5e9fde;
            }
          }
        }
      }
    }
  }
  .main .side-nav {
    position: absolute;
    // width: 4.83rem;
    width: 6.07rem;
    height: 10.2rem;
    padding-left: 0.28rem;
    transform: translateX(1.24rem);
    padding-right: 1.24rem;
    background-position: right center;
    background-repeat: no-repeat;
    background-size: contain;
    top: 0;
    right: 0;
    z-index: 2000;
    > .data {
      height: 0.75rem;
      background-color: #ededed;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0.3rem;
        padding-top: 0.1rem;
        li {
          width: 50%;
          font-size: 0.12rem;
          span {
            color: #048fe8;
            font-size: 0.16rem;
          }
        }
      }
    }
    // >.main-list {
    //   >li {
    //     height: 1.52rem;
    //     border-bottom: .01rem solid #e8e8e8;
    //     padding-left: .3rem;
    //     padding-top: .2rem;
    //     a {
    //       display: flex;
    //       .img-box {
    //         width: 1.11rem;
    //         height: 1.11rem;
    //         margin-right: .14rem;
    //         img {
    //           width: 1.11rem;
    //           height: 1.11rem;
    //         }
    //       }
    //       .text-box {
    //         div {
    //           color: #4a4a4a;
    //           font-size: .12rem;
    //         }
    //         .title {
    //           height: .16rem;
    //           font-size: .14rem;
    //           font-weight: bolder;
    //           position: relative;
    //           line-height: .16rem;
    //           overflow: hidden;
    //           .year {
    //             font-size: .12rem;
    //             width: .4rem;
    //             height: .16rem;
    //             color: #fff;
    //             // position: absolute;
    //             display: inline-block;
    //             border-radius: .04rem;
    //             background-color: #009cff;
    //             text-align: center;
    //             line-height: .16rem;
    //             // right: -0.1rem;
    //             // top: 0;
    //           }
    //         }
    //         .middle {
    //           .type {
    //             color: #a5a5a5;
    //           }
    //         }
    //         .bottom {
    //           display: flex;
    //           >div {
    //             .type {
    //               color: #a5a5a5;
    //             }
    //           }
    //           .left-box {
    //             margin-right: .24rem;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    > .main-list {
      overflow: auto;
      height: calc(100% - 1.26rem);
      > li {
        cursor: pointer;
        height: 1rem;
        border-bottom: 0.01rem solid #e8e8e8;
        padding-left: 0.3rem;
        padding-top: 0.1rem;
        line-height: 0.29rem;
        .projectName {
          height: 0.29rem;
          overflow: hidden;
          span {
            font-weight: 600;
          }
        }
        .address {
          height: 0.29rem;
          overflow: hidden;
        }
      }
    }
  }
  .enter {
    background-image: url("../../../static/images/homePage-come.png");
  }

  .come {
    background-image: url("../../../static/images/homePage-enter.png");
  }
  .main .side-nav > a {
    width: 0.2rem;
    height: 0.5rem;
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .main .side-nav > .title {
    // width: 5.93rem;
    height: 0.51rem;
    background-color: #f8f8f8;
    border-bottom: 0.01rem solid #d4d4d4;
    font-size: 0.14rem;
    line-height: 0.5rem;
    padding-left: 0.3rem;
    // transform: translate(-0.04rem);
    position: relative;
    a {
      color: #009cff;
      font-size: 0.14rem;
      position: absolute;
      right: 0.37rem;
    }
  }
  .main .side-nav > .title span {
    color: #3278b6;
    font-size: 0.2rem;
  }
  .el-submenu {
    height: 1rem;
    .el-submenu__title {
      height: 100%;
      border-bottom: 0.01rem solid #d4d4d4;
      .el-submenu__icon-arrow {
        color: #6cbbff;
        font-weight: bolder;
        font-size: 0.18rem;
        transform: rotate(-90deg);
      }
      a {
        display: block;
        width: 100%;
        height: 1rem;
        position: relative;
        padding-top: 0.11rem;
        // padding-left: 0.8rem;
        .img {
          display: inline-block;
          width: 0.6rem;
          height: 0.6rem;
          background-image: url("../../../static/images/homePage-temp.jpg");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          // transform: translateY(-0.3rem);
          .subImg {
            position: absolute;
            width: 0.29rem;
            height: 0.29rem;
            left: 0;
            top: 0;
            background-image: url("../../../static/images/homePage-emphasis.png");
            background-size: contain;
            z-index: 10;
          }
        }
        .datum {
          display: inline-block;
          padding-left: 0.2rem;
          // transform: translateY(-0.3rem);
          line-height: 0.25rem;
        }
        .state {
          top: 50%;
          right: 0.32rem;
          font-size: 0.12rem;
          position: absolute;
          transform: translateY(-50%);
        }
      }
    }
  }
  .project {
    .el-submenu__icon-arrow {
      display: none;
    }
  }
  .is-opened {
    > .el-submenu__title {
      .el-submenu__icon-arrow {
        transform: rotate(0deg) !important;
      }
    }
  }
  .main .side-nav li a .datum .title {
    color: #4a4a4a;
    font-size: 0.14rem;
    font-weight: bolder;
  }
  .main .side-nav li a .datum p {
    font-size: 0.12rem;
    color: #a5a5a5;
  }
  /* 占位符样式 */
  ::-webkit-input-placeholder {
    color: #a5a5a5;
  }
  ::-moz-placeholder {
    color: #a5a5a5;
  } /* firefox 19+ */
  :-ms-input-placeholder {
    color: #a5a5a5;
  } /* Internet Explorer 10+ */
  :-moz-placeholder {
    color: #a5a5a5;
  } /* firefox 14-18 */
  #tree {
    padding-left: 18px;
  }
  #tree-top {
    .el-tree-node__children {
      display: none;
    }
  }
  .el-loading-spinner i {
    color: #fff;
    font-size: 36px;
  }
  .el-loading-spinner .el-loading-text {
    color: #fff;
    margin: 3px 0;
    font-size: 16px;
  }
  .el-tree-node__content {
    height: .26rem;
    line-height: .26rem;
  }
  .el-tree-node__expand-icon {
    font-size: .12rem;
  }
  .el-tree-node__label {
    white-space: nowrap;
    overflow: auto;
    font-size: .14rem;
  }
  .el-tree-node__label::-webkit-scrollbar {
    display: none;
  }
}
</style>
