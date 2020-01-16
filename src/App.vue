<template>
  <div id="app">
    <!-- 看板导航栏 -->
    <baseHeader v-if="header==='header'" :path="path"></baseHeader>

    <!-- 后台管理系统导航栏 -->
    <systemHeader v-if="header==='system'"></systemHeader>

    <!-- 主题其他模块 -->
    <router-view></router-view>
  </div>
</template>

<script>
import baseHeader from "./components/header/herder.vue"
import systemHeader from "./components/system/systemHeader.vue"

export default {
  name: "app",
  components: {
    baseHeader,
    systemHeader
  },
  data() {
    return {
      path: '', // 路径
    };
  },
  methods: {
    // 获取path
    getPath() {
      this.path = this.$route.path
    }
  },
  created() {},
  mounted() {
    window.onresize = () => {
      return (() => {
        if(window.outerWidth<=1920) {
          window.outerWidth = document.body.clientWidth
          var StandardWidth = 1920;
          var StandardFontSize = 100;
          var nowWidth = document.documentElement.offsetWidth;
          var nowFontSize = nowWidth / StandardWidth * StandardFontSize;
          document.documentElement.style.fontSize = nowFontSize + 'px';
        }
      })()
    }
    // 分辨率自适应
    var StandardWidth = 1920;
    var StandardFontSize = 100;
    var nowWidth = document.documentElement.offsetWidth;
    var nowFontSize = nowWidth / StandardWidth * StandardFontSize;
    document.documentElement.style.fontSize = nowFontSize + 'px';
    // document.documentElement.style.fontSize = 100 + 'px';
  },
  updated() {
    this.getPath()
  },
  computed: {
    header: function() {
      let parentPath = this.$route.matched.length ? this.$route.matched[0].path : ''
      switch (parentPath) {
        case '/systemHome':
        case '/systemLiangZhi':
        case '/systemPersonnel':
        case '/systemSchedule':
        case '/systemZhiHui':
        case '/systemMonitoring':
        case '/systemQuality':
        case '/systemSafety':
        case '/systemGreen':
        case '/systemInformation':
        case '/systemSet':
          return 'system';
        case '/home':
        case '/labour':
        case '/location':
        case '/safety':
        case '/monitoring':
        case '/aiDiscern':
        case '/gaoZhiMo':
        case '/shenJiKeng':
        case '/green':
        case '/information':
          return 'header';
        default:
          return null;
      }
    }
  }
};
</script>

<style>
@import url("./common/base.css");
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
body {
  background-image: url("../static/images/index.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  /* min-width: 1600px; */
  /* min-height: 900px; */
  /* overflow-x: auto; */
  overflow-x: hidden;
  user-select:none;
}
.el-table-column--selection .cell {
  padding-right: 0!important;
}
.el-message {
  z-index: 3000 !important;
}
</style>
