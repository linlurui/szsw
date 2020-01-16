<template>
  <div id="l_rail">
    <div class="content-box">
      <div class="nav">
        <el-collapse @change="handleChange" accordion>
          <el-collapse-item
            v-for="(item,index) in workAreaList"
            :title="item.projectName"
            :name="item.projectId"
            :key="index"
          >
            <div v-for="item2 in item.areaList" :key="item2.areaId">
              <a style="color:#fff" @click="setElectronicFence(item2)">{{item2.areaName}}</a>
            </div>
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
        <a v-show="gid != ''" class="button" @click="importShow = true">编辑围栏</a>
        <!-- <el-button type="number" @click="open3" class="button">编辑围栏</el-button> -->
        <div class="import-box" v-show="importShow">
          <p>请输入电子围栏半径（单位：米）</p>
          <input v-model="radius" type="number" />
          <div class="button-box">
            <a class="save" :plain="true" @click="setRail">保存</a>
            <a class="cancel" @click="cancelClick">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#l_rail {
  .content-box {
    width: 15rem;
    height: 9.39rem;
    padding: 0.07rem 0.07rem 0.07rem 0.28rem;
    background-image: url("../../../static/images/location-bigBorder.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    .nav {
      width: 2.55rem;
      .el-collapse {
        border: 0;
        transform: translateY(0.12rem);
        .el-collapse-item__header {
          border: 0;
          color: #3375fe;
          font-size: 0.17rem;
          background-color: #030625;
          height: 0.5rem;
          line-height: 0.3rem;
        }
        .el-collapse-item__wrap {
          background-color: #030625;
          padding-left: 0.2rem;
          border: 0;
          a {
            display: block;
            width: 100%;
            height: 100%;
            padding: 0.05rem 0;
            font-size: 0.15rem;
            color: #3375fe;
          }
        }
      }
    }
    .map {
      flex: 1;
      position: relative;
      .button {
        color: #fff;
        width: 0.95rem;
        height: 0.39rem;
        position: absolute;
        border-radius: 0.05rem;
        background-color: #12b2fe;
        z-index: 100;
        font-size: 0.18rem;
        text-align: center;
        line-height: 0.39rem;
        &:nth-child(2) {
          top: 0.2rem;
          left: 0.2rem;
        }
        &:nth-child(3) {
          top: 0.2rem;
          left: 1.23rem;
        }
        &:nth-child(4) {
          top: 0.2rem;
          left: 2.26rem;
        }
      }
      .import-box {
        padding-top: 0.3rem;
        color: #fff;
        text-align: center;
        width: 4rem;
        height: 2rem;
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translate(-50%);
        border: 0.01rem solid #0f1f53;
        border-radius: 0.03rem;
        background-color: rgba(2, 5, 33, 0.9);
        box-shadow: 0px 0px 50px #0f1f53 inset;
        input {
          margin-top: 0.25rem;
          outline: none;
          border: none;
          border-radius: 0.03rem;
          overflow: hidden;
        }
        .button-box {
          margin: 0 auto;
          margin-top: 0.25rem;
          display: flex;
          justify-content: space-between;
          width: 2rem;
          .save {
            color: #fff;
            display: inline-block;
            width: 0.4rem;
            height: 0.25rem;
            background-color: #0164ff;
            border-radius: 0.03rem;
            overflow: hidden;
          }
          .cancel {
            color: #000;
            display: inline-block;
            width: 0.4rem;
            height: 0.25rem;
            background-color: #fff;
            border-radius: 0.03rem;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>

<script>
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      circle: "", // 电子围栏位置信息
      gid: "", // 工区id
      radius: "", // 电子围栏半径
      projectId: "", //项目id
      workAreaList: "", // 工区列表
      importShow: false,
      polygon: "",
      text: "",
      marker: "",
      amapManager,
      zoom: 12,
      center: [114.003378, 22.571492],
      events: {
        init: o => {
          // this.marker = new AMap.Marker({
          //     position: [114.003378,22.571492]
          // });
          // this.marker.setMap(o);
          // console.log(o.getCenter())
          // console.log(this.$refs.map.$$getInstance())
          // o.getCity(result => {
          //     console.log(result)
          // })
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
          this.polygon.setMap(o);
          this.polygon.hide();

          // 电子围栏渲染
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
          position: "RT",
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        }
      ],
      clickProjectId: ''
    };
  },
  created() {
    this.getPid();
    this.getMonitoringData();
  },
  methods: {
    //导航栏点击事件
    handleChange(val) {
      // console.log(val)
      // this.center = [114.003378,22.571492]
      // this.zoom = 15
      // this.polygon.show()
      // this.marker.hide()
      // let temp = []
      // for (let i = 0; i < this.monitoringData.areaList.length; i++) {
      //     // console.log(this.monitoringData.areaList[i].name)
      //     if (val == this.monitoringData.areaList[i].name) {
      //         temp.push(this.monitoringData.areaList[i].xloc)
      //         temp.push(this.monitoringData.areaList[i].yloc)
      //         this.circle.setCenter(temp)
      //         this.circle.setRadius(this.monitoringData.areaList[i].radius)
      //         this.center = temp
      //         this.zoom = 14
      //     }
      // }
      this.clickProjectId = val
    },

    // 渲染选中工区的电子围栏
    setElectronicFence(areaList) {
      // console.log(areaList)
      let temp = [];
      temp.push(areaList.areaXloc);
      temp.push(areaList.areaYloc);
      // 设置电子围栏圆心
      this.circle.setCenter(temp);
      // 设置电子围栏半径
      this.circle.setRadius(areaList.areaRadius);
      // 设置地图中心点
      this.center = temp;
      // 设置地图缩放等级
      this.zoom = 14;
      // 保存当前选择工区的工区id
      // this.
      this.gid = areaList.areaId;
      // 保存当前选择工区的半径
      this.radius = areaList.areaRadius;
    },

    // 编辑电子围栏信息
    setRailRadius() {},

    // 取消点击事件
    cancelClick() {
      this.importShow = false;
    },

    // 保存点击事件
    saveClick() {
      // 隐藏对话框
      this.importShow = false;
      // 发送请求更改电子围栏半径
      this.$axios
        .get(`/lz/area/edit?id=${this.gid}&radius=${this.radius}`)
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "更改失败，请重试",
              type: "warning"
            });
          }
          // 重新获取数据
          this.getMonitoringData();
          setTimeout(() => {
            // 重新渲染电子围栏
            for (let i = 0; i < this.monitoringData.areaList.length; i++) {
              // console.log(this.monitoringData.areaList[i])
              if (this.monitoringData.areaList[i].id == this.gid) {
                // console.log(`123`)
                this.setElectronicFence(this.monitoringData.areaList[i]);
              }
            }
          }, 30);
        });
    },

    // 获取项目id
    getPid() {
      this.projectId = sessionStorage.getItem("pid");
    },

    // 获取工区列表
    getMonitoringData() {
      this.$axios
        .post(`/api/hireApi/getHirePeople?projectId=${this.projectId}`)
        .then(res => {
          this.workAreaList = res.data.data;
        });
    },

    // 设置电子围栏半径
    setRail() {
      this.importShow = false;
      this.$axios
        .post(`/api/hireApi/edit?id=${this.gid}&radius=${this.radius}`)
        .then(res => {
          if (res.data.data == 1) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getMonitoringData();
            setTimeout(() => {
              // 重新渲染电子围栏
              let that = this
              for (let j = 0; j < that.workAreaList.length; j++) {
                if (that.workAreaList[j].projectId == that.clickProjectId) {

                  for (let i = 0; i < that.workAreaList[0].areaList.length; i++) {
                    if (that.workAreaList[j].areaList[i].areaId == that.gid) {
                      that.setElectronicFence(that.workAreaList[j].areaList[i]);
                    }
                  }

                }
              }
            }, 1000);
          } else {
            this.$message({
              message: "修改失败，请重试",
              type: "warning"
            });
          }
        });
    }
  }
};
</script>