<template>
  <div id="montoring">
    <!-- 监控选择模块 -->
    <div class="select">
      <div class="select-box">
        <!-- <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="一号楼监控" name="1" class="tower">
                        <el-collapse v-model="activeName">
                            <div class="stair2"></div>
                          <el-collapse-item title="一层监控" name="1-1" class="tier">
                              <div class="detail">

                                    <a href="#" class="active">一层西侧</a>
                              </div>
                              <div class="detail">
                                    <a href="#">一层东侧</a>
                              </div>
                          </el-collapse-item>
                        </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="二号楼监控" name="2" class="tower">
                        <el-collapse v-model="activeName">
                            <div class="stair2"></div>
                          <el-collapse-item title="一层监控" name="2-1" class="tier">
                              <div class="detail">
                                    <a href="#">一层西侧</a>
                              </div>
                              <div class="detail">
                                    <a href="#">一层东侧</a>
                              </div>
                          </el-collapse-item>
                        </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="三号楼监控" name="3" class="tower">
                        <el-collapse v-model="activeName">
                            <div class="stair2"></div>
                          <el-collapse-item title="一层监控" name="3-1" class="tier">
                              <div class="detail">
                                    <a href="#">一层西侧</a>
                              </div>
                              <div class="detail">
                                    <a href="#">一层东侧</a>
                              </div>
                          </el-collapse-item>
                        </el-collapse>
                  </el-collapse-item>
        </el-collapse>-->
        <ul v-if="videoList">
          <li v-for="(item,index) in videoList" :key="index">
            <a :class="item.id==areaId?'active':''" @click="selectClick(item.id);">{{item.areaName}}</a>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item,index) in videoAreaData" :key="index">
            <a :class="item.id==areaId?'active':''">{{item.areaName}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 监控显示模块 -->
    <!-- <div
      class="center-box"
      v-for="(item2,index2) in videoList"
      :key="index2"
      v-if="item2.id==areaId"
    > -->
      <div
        class="main"
        v-for="(item,index) in videoData"
        :key="index"
        v-if="videoData.length>1&&index==1"
      >
        <div class="main-box">
          <div class="no-data">
            <!-- <video id="player1" poster="" controls playsInline webkit-playsinline autoplay v-if="videoData[0].url">
                            <source :src="videoData[0].url" type="" />
                            <source :src="videoData[0].url" type="application/x-mpegURL" />
            </video>-->
            <video
              id="player1"
              poster
              controls
              playsinline
              webkit-playsinline
              autoplay
              v-if="videoData[0]"
            >
              <source :src="videoData[0].url" type />
              <source :src="videoData[0].url" type="application/x-mpegURL" />
            </video>
            <span v-else>无视频数据</span>
          </div>
        </div>
        <div class="main-box">
          <div class="no-data">
            <video
              id="player2"
              poster
              controls
              playsinline
              webkit-playsinline
              autoplay
              v-if="videoData[1]"
            >
              <source :src="videoData[1].url" type />
              <source :src="videoData[1].url" type="application/x-mpegURL" />
            </video>
            <span v-else>无视频数据</span>
          </div>
        </div>
        <div class="main-box" style="margin-top:.3rem">
          <div class="no-data">
            <video
              id="player3"
              poster
              controls
              playsinline
              webkit-playsinline
              autoplay
              v-if="videoData[2]"
            >
              <source :src="videoData[2].url" type />
              <source :src="videoData[2].url" type="application/x-mpegURL" />
            </video>
            <span v-else>无视频数据</span>
          </div>
        </div>
        <div class="main-box" style="margin-top:.3rem">
          <div class="no-data">
            <video
              id="player4"
              poster
              controls
              playsinline
              webkit-playsinline
              autoplay
              v-if="videoData[3]"
            >
              <source :src="videoData[3].url" type />
              <source :src="videoData[3].url" type="application/x-mpegURL" />
            </video>
            <span v-else>无视频数据</span>
          </div>
        </div>
        <!-- <div class="main-bottom">
                    <div class="left-button" @click="leftMove">
                    </div>
                    <div class="frames">
                        <ul>
                            <li>
                                <div class="temp1"></div>
                                <span>画面2</span>
                            </li>
                            <li>
                                <div class="temp2"></div>
                                <span>画面3</span>
                            </li>
                            <li>
                                <div class="temp3"></div>
                                <span>画面4</span>
                            </li>
                            <li>
                                <span>画面5</span>
                            </li>
                            <li>
                                <span>画面6</span>
                            </li>
                        </ul>
                    </div>
                    <div class="right-button" @click="rightMove">
                    </div>
        </div>-->
      </div>
      <!-- 监控显示模块单个 -->
      <div class="main" v-for="(item,index) in videoData" :key="index" v-if="videoData.length==1">
        <div class="main-one">
          <div class="no-data-one">
            <video
              id="player1"
              poster
              controls
              playsinline
              webkit-playsinline
              autoplay
              v-if="item.url"
            >
              <source :src="item.url" type />
              <source :src="item.url" type="application/x-mpegURL" />
            </video>
            <span v-else style="color: #3375fe">无视频数据</span>
          </div>
        </div>
      </div>
    <!-- </div> -->
    <!-- 监控功能模块 -->
    <!-- <div class="control">
            <div class="control-box">
                <div class="btn">
                    <div class="btn-box">
                    </div>
                </div>
                <div class="classify">
                    <ul>
                        <li>
                            <div class="icon"></div>
                            刷新显示
                        </li>
                        <li>
                            <div class="icon"></div>
                            全屏模式
                        </li>
                        <li>
                            <div class="icon"></div>
                            分屏模式
                        </li>
                        <li>
                            <div class="icon"></div>
                            开始录制
                        </li>
                        <li>
                            <div class="icon"></div>
                            录像回放
                        </li>
                        <li>
                            <div class="icon"></div>
                            截取图片
                        </li>
                        <li>
                            <div class="icon"></div>
                            常规设置
                        </li>
                    </ul>
                </div>
            </div>
    </div>-->
  </div>
</template>

<script>
// var player = new EZUIPlayer('myPlayer')
export default {
  data() {
    return {
      activeName: "0",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      rtmp_url0: "",
      http_url0: "",
      rtmp_url1: "",
      http_url1: "",
      rtmp_url2: "",
      http_url2: "",
      rtmp_url3: "",
      http_url3: "",
      message: "加载中...",
      projectId: "", // 项目id
      selectActive: 0, // 当前选择的区域
      videoList: "", // 视频区列表
      areaId: "", // 当前选中视频区id
      videoData: "", // 视频直播流
      videoAreaData: [], // 无数据显示
    };
  },
  mounted() {
    // this.GetLiveUrl()
  },
  created() {
    this.getPid();
    this.getProjectVideoArea();
  },
  methods: {
    leftMove() {
      let temp = $(".frames ul").position().left;
      temp = temp + 324;
      // console.log(temp)
      if (!(temp > 0)) {
        $(".frames ul").css("left", temp / 100 + "rem");
      }
    },
    rightMove() {
      let temp = $(".frames ul").position().left;
      let child = $(".frames ul li");
      let childQuantity = child.length - 3;
      let min = childQuantity * -324;
      temp = temp - 324;
      // console.log(min)
      if (!(temp < min)) {
        $(".frames ul").css("left", temp / 100 + "rem");
      }
    },
    GetLiveUrl() {
      setInterval(() => {
        this.http_url0 =
          "http://hls.open.ys7.com/openlive/f30dde0c01094f778e46314cf23cf297.m3u8";
        this.http_url1 =
          "http://hls.open.ys7.com/openlive/ef412798283f41b383cdde97074f7551.m3u8";
        this.http_url2 =
          "http://hls.open.ys7.com/openlive/8021849b1be64c92a9b719af50fed3e3.m3u8";
        this.http_url3 =
          "http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8";
      }, 100);
    },
    // 获取摄像头信息
    getProjectVideoAreaData() {
      this.$axios
        .get(`/lz/video/getProjectVideoArea?pid=${this.pid}`)
        .then(res => {
          // console.log(res.data)
          // for (let i = 0; i < res.data[0].url.length; i++) {
          //     this``
          // }
          this.videoData = res.data;
          // console.log(this.videoData)
        });
    },

    // 获取项目id
    getPid() {
      this.projectId = sessionStorage.getItem("pid");
    },

    // 获取视频区列表
    getProjectVideoArea() {
      this.$axios
        .post(
          `/api/ProjectVideoAreaApi/getProjectVideoArea?projectId=${this.projectId}`
        )
        .then(res => {
          // console.log(res.data)
          if (res.data.data) {
            // console.log('有视频区域')
            this.videoList = res.data.data;
            // console.log(this.videoList);
            this.areaId = res.data.data[0].id;
            this.getProjectVideo();
          } else {
            // console.log('无视频区域')
            this.videoAreaData = [
              {
                id: 0,
                projectid: 0,
                areaName: "无监控数据"
              }
            ];
            this.videoData = [{}]
            // this.$message({
            //   type: 'warning',
            //   message: '无可播放监控',
            //   showClose: true,
            //   duration: 4000
            // })
          }
        });
    },

    // 获取监控直播流
    getProjectVideo() {
      this.videoData = []
      this.$axios
        .post(`/api/ProjectVideo/getProjectVideo?areaId=${this.areaId}`)
        .then(res => {
          // console.log(res.data)
          this.videoData = res.data.data;
          // console.log(this.videoData)
        });
    },

    // 切换视频区列表列表
    selectClick(areaId) {
      this.areaId = areaId;
      // console.log(areaId)
      this.getProjectVideo();
      // this.$router.push("/monitoring");
    }
  },
  updated() {
    if (this.videoData != "") {
      //如果在mounted中声明，直播地址还未取到，导致视频不显示。所以放在了这里
      this.player1 = new EZUIPlayer("player1");
      this.player2 = new EZUIPlayer("player2");
      this.player3 = new EZUIPlayer("player3");
      this.player4 = new EZUIPlayer("player4");
    }
  }
};
</script>

<style>
#montoring {
  padding: 0.5rem 0.4rem 0 0.38rem;
  display: flex;
  overflow: hidden;
}
/* 选择模块样式 */
#montoring .select {
  width: 3rem;
  height: 9.41rem;
  background-image: url("../../../static/images/m_left-border.png");
  background-size: contain;
}
#montoring .select-box {
  padding: 0.02rem;
  width: 3rem;
  height: 9.41rem;
}
#montoring .select-box .tower,
#montoring .select-box .tier {
  position: relative;
}
#montoring .stair2 {
  height: 0.54rem;
  width: 0.64rem;
  position: absolute;
  background-image: url("../../../static/images/m_stair2.png");
  background-repeat: no-repeat;
  background-size: 0.19rem 0.15rem;
  background-position: center center;
  background-color: #020521;
  z-index: 10;
  left: 0;
  top: 0;
}
#montoring .el-collapse {
  position: relative;
}
#montoring .select .el-collapse-item__header {
  font-size: 0.16rem;
  color: #3375fe;
  background-color: #020521;
  border-bottom: 0;
  height: 0.56rem;
  line-height: 0.56rem;
  padding-left: 0.4rem;
  background-image: url("../../../static/images/m_select-border.png"),
    url("../../../static/images/m_stair1.png");
  background-size: contain, 0.17rem 0.17rem;
  background-position: center 0.54rem, 0.13rem 0.2rem;
}
#montoring .el-collapse-item__wrap .el-collapse-item__header {
  padding-left: 0.64rem;
}
#montoring .el-collapse-item__wrap {
  border-bottom: 0;
}
#montoring .el-collapse-item__content {
  padding: 0;
}
#montoring .el-collapse-item__content > .detail {
  background-color: #020521;
  border-bottom: 0;
  height: 0.56rem;
  line-height: 0.56rem;
  background-image: url("../../../static/images/m_select-border.png");
  background-size: contain;
  background-position: center 0.54rem;
}
#montoring .el-collapse-item__content > .detail a {
  padding-left: 0.64rem;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0.16rem;
  color: #3375fe;
}
#montoring .active {
  width: 2.94rem;
  height: 0.56rem;
  background-image: url("../../../static/images/location-active.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 2.94rem 0.56rem;
}
#montoring .el-collapse {
  border: 0;
}
#montoring .select .select-box > ul li {
  font-size: 0.2rem;
  background-color: #020521;
  border-bottom: 0;
  height: 0.56rem;
  line-height: 0.56rem;
  text-align: center;
  background-image: url("../../../static/images/m_select-border.png");
  background-size: contain;
  background-position: center 0.54rem;
}
#montoring .select .select-box > ul li a {
  display: block;
  width: 100%;
  height: 100%;
  /* color: #3375fe; */
  /* 打包的颜色 */
  color: #fff;
}
/* 显示模块样式 */
#montoring .main {
  flex: 1;
  /* width: 14rem; */
  height: 9.4rem;
  margin-left: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#montoring .main-one {
  width: 15rem;
  height: 9.4rem;
  background-image: url("../../../static/images/monitoring-bigBg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
#montoring .main-one video {
  width: 15rem;
  height: 9.4rem;
}
#montoring .main-box {
  /* margin: 0 auto; */
  width: 7.44rem;
  height: 4.55rem;
  /* background-image: url('../../../static/images/m_main.png');
        background-size: contain; */
}
#montoring .main-box .no-data {
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 4.55rem;
  font-size: 0.36rem;
  background-image: url("../../../static/images/monitoring-bg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
#montoring .main-box video {
  width: 100%;
  height: 100%;
  /* height: 5.72rem; */
}
#montoring .main-box div {
  color: #fff;
  text-align: center;
  line-height: 5.72rem;
  font-size: 0.36rem;
}
#montoring .main-bottom {
  margin-top: 0.16rem;
  height: 3.53rem;
  width: 100%;
  display: flex;
}
#montoring .main-bottom .left-button,
#montoring .main-bottom .right-button {
  height: 0.62rem;
  width: 0.62rem;
  line-height: 0.62rem;
  margin-top: 1.455rem;
}
#montoring .main-bottom .left-button {
  background-image: url("../../../static/images/m_left-button.png");
  background-size: 50% 50%;
  background-position: center center;
}
#montoring .main-bottom .right-button {
  background-image: url("../../../static/images/m_right-button.png");
  background-size: 50% 50%;
  background-position: center center;
}
#montoring .main-bottom .frames {
  width: 9.62rem;
  height: 100%;
  overflow: hidden;
  position: relative;
}
#montoring .main-bottom .frames ul {
  display: inline-block;
  width: 17rem;
  height: 100%;
  position: relative;
}
#montoring .main-bottom .frames li {
  float: left;
  height: 3.13rem;
  width: 3.14rem;
  position: relative;
  background-image: url("../../../static/images/m_small-border.png");
  background-size: contain;
}
#montoring .main-bottom .frames li:not(:first-child) {
  margin-left: 0.1rem;
}
#montoring .main-bottom .frames li span {
  font-size: 0.16rem;
  position: absolute;
  bottom: -0.36rem;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
}
/* 功能模块样式 */
#montoring .control {
  width: 4.43rem;
  height: 9.41rem;
  background-image: url("../../../static/images/m_right-border.png");
  background-repeat: no-repeat;
  background-size: contain;
}
#montoring .btn {
  height: 3.29rem;
  width: 4.39rem;
  background-image: url("../../../static/images/m_btn-border.png");
  background-size: contain;
  background-position: center 3.28rem;
}
#montoring .btn .btn-box {
  height: 2.58rem;
  width: 2.58rem;
  margin-top: 0.35rem;
  margin-left: 0.92rem;
  background-image: url("../../../static/images/m_btn-bg.png");
  background-size: contain;
}
#montoring .classify li {
  height: 0.78rem;
  font-size: 0.24rem;
  color: #3375fe;
  line-height: 0.76rem;
  text-align: center;
  background-image: url("../../../static/images/m_btn-border.png");
  background-size: contain;
  background-position: center 0.77rem;
}
#montoring .classify li .icon {
  display: inline-block;
}
#montoring .classify li:nth-child(1) .icon {
  background-image: url("../../../static/images/m_refresh.png");
  background-size: contain;
  margin-right: 0.3rem;
}
#montoring .classify li:nth-child(2) .icon {
  background-image: url("../../../static/images/m_full-screen.png");
  background-size: contain;
  margin-right: 0.3rem;
}
#montoring .classify li:nth-child(3) .icon {
  background-image: url("../../../static/images/m_split-screen.png");
  background-size: contain;
  margin-right: 0.3rem;
}
#montoring .classify li:nth-child(4) .icon {
  background-image: url("../../../static/images/m_transcribe.png");
  background-size: contain;
  margin-right: 0.3rem;
}
#montoring .classify li:nth-child(5) .icon {
  background-image: url("../../../static/images/m_playback.png");
  background-size: contain;
  margin-right: 0.3rem;
}
#montoring .classify li:nth-child(6) .icon {
  background-image: url("../../../static/images/m_screenshot .png");
  background-size: contain;
  margin-right: 0.3rem;
}
#montoring .classify li:nth-child(7) .icon {
  background-image: url("../../../static/images/m_set.png");
  background-size: contain;
  margin-right: 0.3rem;
}
/* .temp1 {
        width: 3.1rem;
        height: 3.09rem;
        margin-left: .02rem;
        margin-top: .02rem;
        background-image: url('../../../static/images/temp1.jpg');
        background-size: cover;
    }
    .temp2 {
        width: 3.1rem;
        height: 3.09rem;
        margin-left: .02rem;
        margin-top: .02rem;
        background-image: url('../../../static/images/temp2.jpg');
        background-size: cover;
    }
    .temp3 {
        width: 3.1rem;
        height: 3.09rem;
        margin-left: .02rem;
        margin-top: .02rem;
        background-image: url('../../../static/images/temp3.jpg');
        background-size: cover;
    } */
</style>
