<template>
  <div id="systemLocation_home">
    <div class="content-box">
      <div class="nav">
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item,index) in workAreaList"
            :title="item.projectName"
            name="1"
            :key="index"
          >
            <el-collapse @change="handleChange" accordion>
              <!-- <el-collapse-item v-for="(item,index) in monitoringData.areaList" :key="index" :title="item.name" :name="`${item.name}`">
                <div v-for="(item2,index2) in item.hireList" :key="index2">
                  <a style="color:#fff" @click="$router.push({ path: '/location/l_search', query: { orderId: item2.hname } })">
                  {{item2.hname}}
                  <span class="online" v-show="item2.xloc">在线</span>
                  <span class="offline" v-show="!item2.xloc">不在线</span>
                  </a>
                </div>
              </el-collapse-item>-->
              <el-collapse-item
                :title="item2.areaName"
                :name="item2.areaId"
                v-for="item2 in item.areaList"
                :key="item2.areaId"
              >
                <div v-for="item3 in item2.userList" :key="item3.yuserId">
                  <a
                    style="color:#4a4a4a"
                    @click="$router.push({ path: '/systemLocation_search',query: { orderId: item3.userName}})"
                  >
                    {{item3.userName}}
                    <span
                      :class="item3.userStatus?'online':'offline'"
                    >{{item3.userStatus?'在线':'不在线'}}</span>
                    <!-- <span class="offline">不在线</span> -->
                  </a>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="map">
        <el-amap
          ref="map"
          vid="amapDemo"
          :amap-manager="amapManager"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          :events="events"
          class="amap-demo"
        ></el-amap>
        <div class="alarm" @click="dialog">
          <i class="spectacularsAlarm"></i>
        </div>
        <div class="alarmList" v-show="alarmClick">
          <div class="corner"></div>
          <ul ref="scroll">
            <li v-for="(value, name, index) in alarmList" :key="index" @click="examine(name)">
              <i
                :class="name=='countSos'?'spectacularsSOS'
                :name=='countFall'?'spectacularsTumble'
                :name=='countMove'?'spectacularsStand'
                :'spectacularsElectricity'"
              ></i>
              {{getWarningName(name, value)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#systemLocation_home {
  width: 100%;
  .content-box {
    display: flex;
    height: 9.45rem;
    border-radius: 0.04rem;
    background-color: #fff;
    padding: 0.3rem 0.3rem 0.3rem 0.2rem;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    .nav {
      width: 3.17rem;
      .el-collapse {
        border: 0;
        // transform: translateY(.12rem);
        .el-collapse {
          .el-collapse-item__header {
            font-size: 0.16rem;
            background-color: #fff;
          }
        }
        .el-collapse-item__header {
          border: 0;
          color: #4a4a4a;
          font-size: 0.18rem;
          line-height: 0.2rem;
          padding-left: 0.14rem;
          background-color: #c5e8ff;
        }
        .el-collapse-item__wrap {
          padding-left: 0.18rem;
          border: 0;
          overflow: visible;
          .el-collapse-item__content {
            padding-bottom: 0;
            padding-left: 0.16rem;
            a {
              display: block;
              width: 100%;
              height: 100%;
              font-size: 0.14rem;
              position: relative;
              .online {
                color: #24e974;
                position: absolute;
                right: 0.5rem;
                // top: 0;
              }
              .offline {
                color: #fb497c;
                position: absolute;
                right: 0.5rem;
              }
            }
          }
        }
      }
    }
    .map {
      flex: 1;
    }
    .alarm {
      position: absolute;
      top: 1rem;
      right: 1rem;
      // background: red;
      cursor: pointer;
      .spectacularsAlarm {
        display: inline-block;
        width: .6rem;
        height: .6rem;
        background-image: url('../../../../../static/images/spectacularsAlarm.png');
        background-position: 100% 100%;
        background-size: 100%;
      }
    }
    .alarmList {
      position: absolute;
      top: 1.6rem;
      right: 1rem;
      width: 2rem;
      height: 2.2rem;
      background: rgba(255, 255, 255, .85);
      color: #3375fe;
      font-size: .2rem;
      line-height: .48rem;
      padding: 0 .1rem;
      .corner {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, .95);
        transform: rotate(45deg);
        position: absolute;
        top: -0.1rem;
        right: .2rem;
      }
      ul {
        width: 100%;
        // height: 3.2rem;
        overflow-y: auto;
        position: relative;
        li {
          // border-bottom: 1px solid #949197;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          i {
            display: inline-block;
            width: .18rem;
            height: .24rem;
            background-size: 100% 100%;
            vertical-align: sub;
            margin-right: .1rem;
          }
          .spectacularsSOS {
            background-image: url('../../../../../static/images/spectacularsSOS.png')
          }
          .spectacularsTumble {
            background-image: url('../../../../../static/images/systemSpectacularsTumble.png')
          }
          .spectacularsStand {
            background-image: url('../../../../../static/images/systemSpectacularsStand.png')
          }
          .spectacularsElectricity {
            background-image: url('../../../../../static/images/systemSpectacularsElectricity.png')
          }
        }
      }
      ul::-webkit-scrollbar {
        display: none
      }
    }
  }
}
</style>

<script>
import mixin from '@/utils/mixin.js'
let amapManager = new VueAMap.AMapManager();
export default {
  mixins: [mixin],
  data() {
    return {
      polygon: "",
      text: "",
      amapManager,
      circle: "", // 电子围栏位置信息
      zoom: 12,
      center: [114.014129, 22.571492],
      events: {
        init: o => {
          this.text = new AMap.Text({
            position: [114.003378, 22.669854],
            text: "20人在场"
          });
          // this.text.setMap(o);
          // this.text.hide();

          this.polygon = new AMap.Polygon({
            path: [
              new AMap.LngLat(113.992992, 22.581439),
              new AMap.LngLat(114.01033, 22.582786),
              new AMap.LngLat(114.010287, 22.562853),
              new AMap.LngLat(113.996898, 22.563329)
            ],
            fillColor: "#fff", // 多边形填充颜色
            fillOpacity: 0, //填充颜色透明度
            borderWeight: 1, // 线条宽度
            strokeColor: "#137ed2" // 线条颜色}
          });
          // this.polygon.setMap(o)
          // this.polygon.hide()
          // 电子围栏位置信息
          this.circle = new AMap.Circle({
            center: [114.007675, 22.663599], // 圆心位置
            radius: 0, // 圆半径
            fillColor: "none", // 圆形填充颜色
            fillOpacity: 0, // 填充色透明度
            strokeColor: "#3979fe", // 描边颜色
            strokeWeight: 2 // 描边宽度
          });
          this.circle.setMap(o);
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          // alert('map clicked')
        }
      },
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
      projectId: 1, //项目id
      workAreaList: "", // 工区列表
      alarmClick: false, // 报警弹窗显示
      alarmList: {}, // 报警列表
      scrollPlace: 0, // 滚动的位置
      clearScroll: '', // 清除滚动
      warningTypeList: [
        {
          label: 'SOS报警',
          value: 0
        },
        {
          label: '摔跌报警',
          value: 1
        },
        {
          label: '久站不动报警',
          value: 2
        },
        {
          label: '低电量报警',
          value: 3
        }
      ], // 报警搜索列表
    };
  },
  created() {
    this.getPid();
    // this.getMonitoringData()
    this.getHirePeople();
    // this.getDay()
  },
  methods: {
    // 导航栏点击事件
    handleChange(val) {
      // console.log(val)
      // if (val == '1-1') {
      //     this.polygon.show()
      //     this.text.show()
      //     this.marker.hide()
      // }
      // this.circle.show()
      console.log(this.workAreaList);
      let temp = [];
      for (let i = 0; i < this.workAreaList[0].areaList.length; i++) {
        // console.log(this.monitoringData.areaList[i].name)
        if (val == this.workAreaList[0].areaList[i].areaId) {
          temp.push(this.workAreaList[0].areaList[i].areaXloc);
          temp.push(this.workAreaList[0].areaList[i].areaYloc);
          // 设置电子围栏圆心
          this.circle.setCenter(temp);
          // 设置电子围栏半径
          this.circle.setRadius(this.workAreaList[0].areaList[i].areaRadius);
          // 设置地图中心点
          this.center = temp;
          // 设置地图缩放等级
          this.zoom = 14;
        }
      }
    },

    // 获取项目id
    getPid() {
      this.projectId = sessionStorage.getItem("pid");
      //   console.log(this.projectId)
    },

    // 获取工区列表
    getHirePeople() {
      this.$axios
        .post(`/api/hireApi/getHirePeople?projectId=${this.projectId}`)
        .then(res => {
          // console.log(res.data.data[0])
          // for (let i = 0; i < res.data.data.length; i++) {
          //     if (this.projectId==res.data.data[i].projectId) {
          //         this.workAreaList.push(res.data.data[i])
          //     }
          // }
          this.workAreaList = res.data.data;
          // console.log(this.workAreaList)
        });
    },

    // 获取报警数据，并弹窗
    dialog() {
      this.alarmClick = !this.alarmClick
      if (this.alarmClick) {
        this.$axios
          .post(`/api/pcEquipmentWarning/warningCount?projectId=${this.projectId}`)
          .then(res => {
            if (res.data.code == 0) {
              this.alarmList = res.data.data
              // setTimeout(() => {
              //   this.startScroll()
              // }, 500);
            }
          })
      } else {
        // clearInterval(this.clearScroll)
        // this.$refs.scroll.scrollTop = 0
      }
    },

    // 滚动
    startScroll() {
      if (this.clearScroll) clearInterval(this.clearScroll)
      this.clearScroll = setInterval(() => {
        this.$refs.scroll.scrollTop += 1
        if (this.scrollPlace == this.$refs.scroll.scrollTop) {
          this.$refs.scroll.scrollTop = 0
        } else {
          this.scrollPlace = this.$refs.scroll.scrollTop
        }
      }, 50);
    },

    // 返回报警名称
    getWarningName(name, value) {
      if (name == 'countFall') {
        return '摔倒报警'+ value + '人'
      } else if (name == 'countBat') {
        return '低电量报警'+ value + '台'
      } else if (name == 'countSos') {
        return 'SOS报警'+ value + '人'
      } else {
        return '久站未动报警'+ value + '人'
      }
    },

    //查看详情
    examine(name) {
      this.$router.push({
        path: '/systemLocation_alarm',
        query: {
          warningType: name=='countSos' ? 0
                :name=='countFall' ? 1
                :name=='countMove' ? 2
                : 3
        }
      })
    }
  },
  beforeDestroy() {
    // if (this.clearScroll) clearInterval(this.clearScroll)
  }
}
</script>