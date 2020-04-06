<template>
  <div>
    <div class="content">
      <div class="header">
        <p class="company-name">{{companyName}}</p>
        <div class="wing left">
          <p>最省心的智慧工地平台</p>
          <span @click="$router.go(-1)">返回</span>
        </div>
        <div class="wing right">
          <p>{{citySpace}}</p>
          <p v-show="weather">
            <i :class="weatherClass"></i>
            {{temperature}}℃
          </p>
          <p>{{time}}</p>
        </div>
      </div>
      <div class="body">
        <div class="left">
          <!-- 打卡情况 -->
          <div class="click-card">
            <div class="title">
              <i class="click-card-img"></i>
              <p>打卡情况</p>
              <span>
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div class="circle">
              <!-- 管理打卡 -->
              <div class="management">
                <img src="~images/company-circle.png" alt />
                <div class="people">
                  <p>管理人员</p>
                  <p>
                    <span>{{managementClick}}</span>人
                  </p>
                </div>
              </div>
              <!-- 工人打卡 -->
              <div class="worker">
                <img src="~images/company-circle.png" alt />
                <div class="people">
                  <p>建筑工人</p>
                  <p>
                    <span>{{workerClick}}</span>人
                  </p>
                </div>
              </div>
              <!-- 在岗人数 -->
              <div class="onGuard">
                <img src="~images/company-circle.png" alt />
                <div class="people">
                  <p>在岗人数</p>
                  <p>
                    <span>{{onGuard}}</span>人
                  </p>
                </div>
              </div>
            </div>
            <div id="click-card">
            </div>
            <el-date-picker
              class="date-picker"
              v-model="clickTime"
              type="week"
              format="yyyy 第 WW 周"
              :clearable="false"
              prefix-icon="none"
              @change="confirmTime('clickTime')"
              :picker-options="{
                firstDayOfWeek: 1
              }"
            >
            </el-date-picker>
          </div>
          <!-- 塔吊检测 -->
          <div class="margin">
            <div class="title">
              <i class="tower-img"></i>
              <p>塔吊监测</p>
              <span>
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div class="status-crosswise">
              <div>
                <i class="quantity"></i>
                <p>设备数量：{{marginOnOff.total}}</p>
              </div>
              <div>
                <i class="on-line"></i>
                <p>在线：{{marginOnOff.onLine}}</p>
              </div>
              <div>
                <i class="off-line"></i>
                <p>离线：{{marginOnOff.offLine}}</p>
              </div>
            </div>
            <div class="margin-animation">
              <div class="margin-animationing">
                <div></div>
                <img src="~images/margin-animation-two.png" alt />
              </div>
              <div class="margin-list">
                <p>塔吊报警统计</p>
                <div class="list" v-for="(value, name) in marginAlarmObject" :key="name">
                  <div :style="{background: value.color}"></div>
                  <p>{{value.value}}</p>
                  <span :style="{color: value.color}">{{value.num}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <div id="map">
            <div class="company-project">
              <div v-for="(value, name) in projectList" :key="name" class="project">
                <i
                  :class="name == 'normal' ? 'normal' : name == 'abnormal' ? 'abnormal' : name == 'complete' ? 'complete' : ''"
                ></i>
                <p>{{value.value}}</p>
                <span>{{value.num}}</span>
              </div>
              <div class="allProject">
                <p>累计工程数量</p>
                <div class="border">
                  <span v-for="item in 5" :key="item">
                    <p>{{allProject[item-1]}}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- 电箱识别 -->
          <div class="electricity-box">
            <div class="title">
              <i class="electricity-box-img"></i>
              <p>电箱识别</p>
              <span>
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div class="status-crosswise">
              <div>
                <i class="quantity"></i>
                <p>设备数量：{{electricityBoxOnOff.total}}</p>
              </div>
              <div>
                <i class="on-line"></i>
                <p>在线：{{electricityBoxOnOff.onLine}}</p>
              </div>
              <div>
                <i class="off-line"></i>
                <p>离线：{{electricityBoxOnOff.offLine}}</p>
              </div>
            </div>
            <div class="electricity-box-bg"></div>
          </div>
          <!-- 车牌识别 -->
          <div class="plate-number">
            <div class="title">
              <i class="plate-number-img"></i>
              <p>车牌识别</p>
            </div>
            <span class="different">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </span>
            <div class="status-vertical">
              <div>
                <i class="quantity"></i>
                <p>设备数量：{{plateNumberOnOff.total}}</p>
              </div>
              <div>
                <i class="on-line"></i>
                <p>在线：{{plateNumberOnOff.onLine ? plateNumberOnOff.onLine : 0}}</p>
              </div>
              <div>
                <i class="off-line"></i>
                <p>离线：{{plateNumberOnOff.offLine ? plateNumberOnOff.offLine : 0}}</p>
              </div>
            </div>
            <div id="plate-number"></div>
            <el-date-picker
              class="date-picker"
              v-model="plateTime"
              type="week"
              format="yyyy 第 WW 周"
              :clearable="false"
              prefix-icon="none"
              @change="confirmTime('plateTime')"
              :picker-options="{
                firstDayOfWeek: 1
              }"
            >
            </el-date-picker>
            <div class="plate-number-bg"></div>
          </div>
        </div>
        <div class="right">
          <!-- 累计 -->
          <div class="add-up">
            <div class="money">
              <span>累计投资金额</span>
              <div class="border">
                <span v-for="item in 8" :key="item">
                  <p>{{allMoney[item-1]}}</p>
                </span>
              </div>
              <span>万</span>
            </div>
            <div class="unit">
              <span>累计参建单位</span>
              <div class="border">
                <span v-for="item in 8" :key="item">
                  <p>{{allUnit[item-1]}}</p>
                </span>
              </div>
              <span>家</span>
            </div>
          </div>
          <!-- 环境检测 -->
          <div class="environment">
            <div class="title">
              <i class="environment-img"></i>
              <p>环境检测</p>
              <span>
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div class="status-crosswise">
              <div>
                <i class="quantity"></i>
                <p>设备数量：{{environmentOnOff.total}}</p>
              </div>
              <div>
                <i class="on-line"></i>
                <p>在线：{{environmentOnOff.onLine}}</p>
              </div>
              <div>
                <i class="off-line"></i>
                <p>离线：{{environmentOnOff.offLine}}</p>
              </div>
            </div>
            <div id="environment"></div>
            <div class="environment-bg"></div>
          </div>
          <!-- 升降机检测 -->
          <div class="lifter">
            <div class="title">
              <i class="lifter-img"></i>
              <p>升降机检测</p>
              <span>
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div class="status-vertical">
              <div>
                <i class="quantity"></i>
                <p>设备数量：{{lifterOnOff.total}}</p>
              </div>
              <div>
                <i class="on-line"></i>
                <p>在线：{{lifterOnOff.onLine}}</p>
              </div>
              <div>
                <i class="off-line"></i>
                <p>离线：{{lifterOnOff.offLine}}</p>
              </div>
            </div>
            <div class="lifter-list-wrap">
              <div class="lifter-list" v-for="item in lifterAlarmObject" :key="item.value.value">
                <div :style="{background: item.color}"></div>
                <p>{{item.value}}</p>
                <span :style="{color: item.color}">{{item.num}}</span>
              </div>
            </div>
            <div class="lifter-bg"></div>
          </div>
        </div>
      </div>
      <p class="footer">虎匠科技技术支持</p>
    </div>
  </div>
</template>

<script>
import mixin from "@/utils/mixin";
moment.locale("zh-cn");
import moment from "moment";
export default {
  mixins: [mixin],
  data() {
    return {
      cid: '', // 工地ID
      companyName: '', // 公司名称
      citySpace: '', //集团所在城市
      temperature: '', // 温度
      weather: 0, // 天气
      map: "", // 挂载的地图
      infoWindow: '', //地图的弹窗
      interval: "", // 循环获取时间
      time: "", // 现在的时间
      nowTime: '', // 现在的时间（不会刷新）
      managementClick: 0, //管理打卡人数
      workerClick: 0, //工人打卡人数
      onGuard: 0, // 在岗人数
      allMoneys: 0, // 累计投资金额
      allUnits: 0, // 累计参建单位
      allProjects: 0, //所有项目数量
      marginAlarmObject: {
        limit: {
          color: "#41ccd3",
          value: "限位报警",
          num: 0
        },
        incline: {
          color: "#2498e3",
          value: "倾斜报警",
          num: 0
        },
        hoisting: {
          color: "#2268d4",
          value: "吊重报警",
          num: 0
        },
        windSpeed: {
          color: "#d6c76e",
          value: "风速报警",
          num: 0
        },
        barrier: {
          color: "#d39255",
          value: "障碍物报警",
          num: 0
        },
        towerCrane: {
          color: "#35c87a",
          value: "塔吊碰撞",
          num: 0
        },
        sensor: {
          color: "#44ae2e",
          value: "传感器故障",
          num: 0
        },
        noGo: {
          color: "#7d5dcc",
          value: "进入禁行区",
          num: 0
        }
      }, // 塔吊报警数据
      lifterAlarmObject: {
        load: {
          color: "#00ffff",
          value: "载重报警",
          num: 0
        },
        people: {
          color: "#0068ff",
          value: "人数报警",
          num: 0
        },
        incline: {
          color: "#7d5dcc",
          value: "倾斜报警",
          num: 0
        },
        header: {
          color: "#d6c76e",
          value: "冲顶报警",
          num: 0
        }
      }, // 升降机报警数据
      projectList: {
        normal: {
          value: "正常",
          num: 0
        },
        abnormal: {
          value: "异常",
          num: 0
        },
        complete: {
          value: "完工",
          num: 0
        }
      }, // 项目数据
      rem: '', // 现在的rem
      clickTime: '', // 获打卡时间段
      oldClickTime: '', // 变化之前的打卡时间段
      plateTime: '', // 车牌识别时间段
      oldPlateTime: '', // 变换前车牌识别时间段
      marginOnOff: {
        total: 0,
        onLine: 0,
        offLine: 0
      }, // 塔吊检测设备数据
      electricityBoxOnOff: {
        total: 0,
        onLine: 0,
        offLine: 0
      }, // 电箱识别设备数据
      plateNumberOnOff: {
        total: 0,
        onLine: 0,
        offLine: 0
      }, // 车牌识别设备数据
      environmentOnOff: {
        total: 0,
        onLine: 0,
        offLine: 0
      }, // 环境监测设备数据
      lifterOnOff: {
        total: 0,
        onLine: 0,
        offLine: 0
      }, // 升降机检测设备数据
    };
  },
  computed: {
    // 累计投资金额
    allMoney: function() {
      if (Number(this.allMoneys) >= 100000000) {
        return '99999999'
      } else {
        return this.allMoneys ? this.allMoneys.toString().padStart(8, "0") : '00000000'
      }
    },

    // 累计参见单位
    allUnit: function() {
      if (Number(this.allUnits) >= 100000000) {
        return '99999999'
      } else {
        return this.allUnits ? this.allUnits.toString().padStart(8, "0") : '00000000'
      }
    },

    // 项目数量
    allProject: function() {
      if (Number(this.allProjects) >= 100000) {
        return '99999'
      } else {
        return this.allProjects ? this.allProjects.toString().padStart(5, "0") : '00000'
      }
    },

    // 天气返回对应的class
    weatherClass: function() {
      switch (Number(this.weather)) {
        case 100:
          return 'el-icon-sunny';
        case 101:
        case 104:
          return 'el-icon-cloudy';
        case 102:
          return 'el-icon-partly-cloudy';
        case 103:
          return 'el-icon-cloudy-and-sunny';
        case 200:
        case 201:
        case 202:
        case 203:
        case 204:
        case 205:
        case 206:
        case 207:
        case 208:
        case 209:
        case 210:
        case 211:
        case 212:
        case 213:
          return 'el-icon-wind-power';
        case 300:
        case 301:
        case 304:
        case 305:
        case 306:
        case 307:
        case 308:
        case 309:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 315:
        case 316:
        case 317:
        case 318:
        case 399:
          return 'el-icon-heavy-rain';
        case 302:
        case 303:
          return 'el-icon-lightning';
        case 400:
        case 401:
        case 402:
        case 403:
        case 404:
        case 405:
        case 406:
        case 407:
        case 408:
        case 409:
        case 410:
          return 'el-icon-light-rain';
        default:
          return '';
      }
    }
  },
  created() {},
  mounted() {
    this.cid = sessionStorage.getItem('cid');
    this.getTime();
    this.initMap();
    this.getRem();
    this.getCarEcharts();
    this.getEnvironmentEcharts({});
    this.getClickCardEacharts();
    this.getCompanyName();
    this.getTotal();
    this.getProjectList();
    this.getOnGuard();
    this.getEnvironmentList();
    this.getOnOff();
    this.getMarginAlarm();
    this.getLifterAlarm();
  },
  methods: {
    // 获取时间
    getTime() {
      const now = new Date();
      const week = now.getDay() === 0 ? 7 : now.getDay()
      const day = 24 * 60 * 60 * 1000
      const tuesday = new Date(now.getTime() - day * (week - 2))
      console.log(tuesday);
      this.clickTime = this.oldClickTime = this.plateTime = this.oldPlateTime = new Date(`${this.getDate(tuesday)}`);
      this.nowTime = this.getDate(now);
      this.confirmTime('clickTime')
      this.confirmTime('plateTime')
      this.interval = setInterval(() => {
        this.time = moment().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
    },

    // 计算天数
    getDate(time) {
      const y = time.getFullYear();
      const M = time.getMonth() + 1;
      const d = time.getDate();
      return `${y}-${M}-${d}`
    },

    // 挂载地图
    initMap() {
      this.map = new AMap.Map("map", {
        zoom: 12, //级别
        mapStyle: "amap://styles/fresh"
      });
    },

    // 动态获取rem，用于在echarts中修改字体大小
    getRem() {
      window.outerWidth = document.body.clientWidth
      var StandardWidth = 1920;
      var StandardFontSize = 100;
      var nowWidth = document.documentElement.offsetWidth;
      var nowFontSize = nowWidth / StandardWidth * StandardFontSize;
      this.rem = nowFontSize
    },

    // 车辆echarts
    getCarEcharts(time=Array(7).fill('无数据'), carIn=Array(7).fill(0), carOut=Array(7).fill(0)) {
      let carEcharts = this.$echarts.init(document.getElementById("plate-number"));
      carEcharts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ["车辆进场", "车辆出厂"],
          top: "0px",
          width: "40%",
          itemGap: 30,
          textStyle: {
            color: "#fff",
            fontSize: (0.12 * this.rem).toString()
          }
        },
        grid: {
          left: "10%",
          top: "15%",
          bottom: "15%",
          right: "5%"
        },
        calculable: true,
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            fontSize: (0.12 * this.rem)
          },
          type: "category",
          data: time
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            fontSize: (0.12 * this.rem)
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#0c3962"
            }
          }
        },
        series: [
          {
            name: "车辆进场",
            type: "bar",
            data: carIn,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0,
                  [
                    {
                      offset: 0,
                      color: "#41ccd399" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#41ccd3" // 100% 处的颜色
                    }
                  ], false),
                barBorderRadius: [5, 5]
              }
            }
          },
          {
            name: "车辆出厂",
            type: "bar",
            data: carOut,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#2498e399" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#2498e3" // 100% 处的颜色
                    }
                  ], false),
                barBorderRadius: [5, 5]
              }
            }
          }
        ]
      });
    },

    // 环境检测echarts
    getEnvironmentEcharts({excellent=0, favorable=0, ordinary=0, slight=0, severity=0}) {
      let environmentEcharts = this.$echarts.init(document.getElementById('environment'))
      environmentEcharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          width: '50%',
          bottom: 0,
          data: ['优秀', '良好', '轻度', '中度', '重度'],
          textStyle: {
            color: "#fff",
            fontSize: (0.12 * this.rem).toString(),
            padding: [0, 0, 0, (0.3 * this.rem)],
            lineHeight:(0.18 * this.rem).toString(),
          }
        },
        series: [
          {
            center: ['50%','30%'],
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: (0.2 * this.rem).toString(),
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: excellent, name: '优秀', itemStyle: {color:'#abd9ff'}},
              {value: favorable, name: '良好', itemStyle: {color:'#3993ff'}},
              {value: ordinary, name: '轻度', itemStyle: {color:'#0068ff'}},
              {value: slight, name: '中度', itemStyle: {color:'#002a6c'}},
              {value: severity, name: '重度', itemStyle: {color:'#002053'}}
            ]
          }
        ]
      })
    },

    // 打卡情况echarts
    getClickCardEacharts(time=Array(7).fill('无数据'), worker=Array(7).fill(0), Management=Array(7).fill(0)) {
      let click = this.$echarts.init(document.getElementById('click-card'));
      click.setOption({
        title: {
          text: '一周打卡趋势',
          textStyle: {
            color: '#fff',
            fontWeight: 500,
            fontSize: 0.12 * this.rem,
          },
          top: '5%',
          left: '3%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['工人', '管理'],
          top: '5%',
          textStyle: {
            color: "#fff",
            fontSize: (0.12 * this.rem).toString()
          }
        },
        grid: {
          left: '7%',
          right: '7%',
          bottom: '3%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: time,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#012b6b'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#012b6b"
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: (0.12 * this.rem)
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#012b6b'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#012b6b"
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: (0.12 * this.rem)
          }
        },
        series: [
          {
            name: '工人',
            type: 'line',
            color: '#00e4f5',
            areaStyle: {
              normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00e2ef'
            }, {
              offset: 1,
              color: '#00e2ef3b'
            }])
          }
            },
            data: worker
          },
          {
            name: '管理',
            type: 'line',
            color: '#0043a7',
            areaStyle: {
              normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#0068ff'
            }, {
              offset: 1,
              color: '#0068ff52'
            }])
          }
            },
            data: Management
          }
        ]
      })
    },

    // 确定车牌数据的时间
    confirmTime(card) {
      let time = card == 'plateTime' ? this.plateTime : this.clickTime
      let day = 24 * 60 * 60 * 1000
      let now = time.getTime()
      let week = time.getDay()
      let start = now - (week - 1) * day
      let end = now + (7 - week) * day
      if (start > new Date().getTime()) {
        this.messageBox('开始时间不可大于当前时间', 0);
        card == 'plateTime' ? this.plateTime = this.oldPlateTime : this.clickTime = this.oldClickTime
      } else {
        switch (card) {
          case 'plateTime':
            // 调用车牌的接口，获取车牌的数据，传的参是时间戳
            this.getPlate(start, end)
            break;
          case 'clickTime':
            // 调用打卡接口， 获取打卡的数据，传的参是时间戳
            this.getClickCard(start, end);
            break;
        }
      }
    },

    // 获取公司名称
    getCompanyName() {
      this.$axios
        .post(`/api/company?cid=${this.cid}`)
        .then(res => {
          if (res.data.code == 0) {
            this.companyName = res.data.data.name
            this.citySpace = res.data.data.city
            if (this.citySpace) {
              this.getWeather()
            }
          }
        })
    },

    // 获取实时天气
    getWeather() {
      this.$axios
        .post(`https://free-api.heweather.net/s6/weather/now?location=${this.citySpace}&key=22ceb3c739604944b8e868d08a6e2ff2`)
        .then(res => {
          this.temperature = res.data.HeWeather6[0].now.tmp
          this.weather = res.data.HeWeather6[0].now.cond_code
        })
    },

    // 获取累计数据
    getTotal() {
      this.$axios
        .post(`/api/totalList?cid=${this.cid}`)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.code == 0) {
              this.allMoneys = res.data.data.allMoney
              this.allUnits = res.data.data.allUnit
            }
          }
        })
    },

    // 获取项目信息
    getProjectList() {
      this.$axios
        .post(`/api/projectList?cid=${this.cid}`)
        .then(res => {
          if (res.data.code == 0) {
            this.projectList.normal.num = res.data.data.normal
            this.projectList.abnormal.num = res.data.data.abnormal
            this.projectList.complete.num = res.data.data.complete
            this.allProjects = res.data.data.allProject
            let projectList = res.data.data.projectList
            let goodList = projectList.filter(a => a.longitude != (null || '') && a.latitude != (null || ''))
            if (projectList.length && goodList.length) {
              this.getMark(goodList)
            }
          }
        })
    },

    // 挂载mark点标记
    getMark(list) {
      let markList = new Array()
      list.forEach(item => {
        let mark = new AMap.Marker({
          position: new AMap.LngLat(Number(item.longitude), Number(item.latitude)),
          title: item.name,
          animation: 'AMAP_ANIMATION_DROP'
        })
        mark.on('mouseover', () => this.getWindow(item));
        markList.push(mark)
      })
      this.map.add(markList)
      this.map.setCenter([Number(list[0].longitude), Number(list[0].latitude)])
    },

    // 渲染弹窗
    getWindow(item) {
      this.infoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center',
        content: item.name,
        offset: new AMap.Pixel(2, -25)
      });
      this.infoWindow.open(this.map,[Number(item.longitude), Number(item.latitude)])
    },

    // 获取在岗人数
    getOnGuard() {
      this.$axios
        .post(`/api/count?cid=${this.cid}`)
        .then(res => {
          this.onGuard = res.data.data.onGuard
        })
    },

    // 获取打卡数据
    getClickCard(start, end) {
      this.$axios
        .post(`/api/clickCard?cid=${this.cid}&start=${start}&end=${end}`)
        .then(res => {
          if (res.data.code == 0) {
            let x = new Array();
            let administrator = new Array();
            let worker = new Array();
            res.data.data.forEach(a => {
              if (a.date === new Date(this.nowTime).getTime()) {
                this.managementClick = a.administrator == '' || null ? 0 : a.administrator
                this.workerClick = a.worker == '' || null ? 0 : a.worker
              }
              let time = new Date(a.date - 24 * 60 * 60 * 1000)
              let M = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
              let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
              x.push(`${M} - ${d}`)
              administrator.push(a.administrator == '' || null ? 0 : a.administrator)
              worker.push(a.worker == '' || null ? 0 : a.worker)
            })
            this.getClickCardEacharts(x, worker, administrator)
          }
        })
    },

    // 获取车牌图表数据
    getPlate(start, end) {
      this.$axios
        .post(`/api/plateList?cid=${this.cid}&start=${start}&end=${end}`)
        .then(res => {
          if (res.data.code == 0) {
            let x = new Array();
            let carIn = new Array();
            let carOut = new Array();
            res.data.data.forEach(a => {
              let time = new Date(a.date - 24 * 60 * 60 * 1000)
              let M = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
              let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
              x.push(`${M} - ${d}`)
              carIn.push(a.carIn == '' || null ? 0 : a.carIn)
              carOut.push(a.carOut == '' || null ? 0 : a.carOut)
            })
            this.getCarEcharts(x, carOut, carIn)
          }
        })
    },

    // 获取环境检测数据
    getEnvironmentList() {
      this.$axios
        .post(`/api/environmentList?cid=${this.cid}`)
        .then(res => {
          if (res.data.code == 0) {
            let data = res.data.data
            this.getEnvironmentEcharts({
              excellent: data.excellent,
              favorable: data.favorable,
              ordinary: data.ordinary,
              slight: data.slight,
              severity: data.severity
            })
          }
        })
    },

    // 获取设备在线数据
    getOnOff() {
      this.$axios
        .post(`/api/equipment?cid=${this.cid}`)
        .then(res => {
          this.marginOnOff = res.data.data.margin
          this.electricityBoxOnOff = res.data.data.electricityBox
          // 车辆这里拿不到在线和离线的数量，只有总共的，其他的默认是0
          this.plateNumberOnOff = res.data.data.plateNumber
          this.environmentOnOff = res.data.data.environment
          this.lifterOnOff = res.data.data.lifter
        })
    },

    // 获取塔吊设备报警数据
    getMarginAlarm() {
      this.$axios
        .post(`/api/marginAlarm?cid=${this.cid}`)
        .then(res => {
        let data = res.data.data
          this.marginAlarmObject.limit.num = data.limit;
          this.marginAlarmObject.incline.num = data.incline;
          this.marginAlarmObject.hoisting.num = data.hoisting;
          this.marginAlarmObject.windSpeed.num = data.windSpeed;
          this.marginAlarmObject.barrier.num = data.barrier;
          this.marginAlarmObject.towerCrane.num = data.towerCrane;
          this.marginAlarmObject.sensor.num = data.sensor;
          this.marginAlarmObject.noGo.num = data.noGo;
        })
    },

    // 获取升降机检测报警数据
    getLifterAlarm() {
      this.$axios
        .post(`/api/lifterAlarm?cid=${this.cid}`)
        .then(res => {
          this.lifterAlarmObject.load.num = res.data.data.load
          this.lifterAlarmObject.people.num = res.data.data.people
          this.lifterAlarmObject.incline.num = res.data.data.incline
          this.lifterAlarmObject.header.num = res.data.data.header
        })
    }
  },
  watch: {
    clickTime: function (news, old) {
      this.oldClickTime = old
    },

    plateTime: function(news, old) {
      this.oldPlateTime = old
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="less">
.content {
  // width: 19.2rem;
  height: 10.8rem;
  position: relative;
  background: url("~images/company-background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .header {
    height: 0.5rem;
    margin: 0 0.35rem;
    position: relative;
    .company-name {
      color: #fff;
      font-size: 0.3rem;
      font-weight: 600;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) skewX(-10deg);
      text-shadow: 0 0 6px #fff;
    }
    .wing {
      height: 0.3rem;
      width: 6.22rem;
      position: absolute;
    }
    .left {
      bottom: 0;
      left: 0.35rem;
      background: url("~images/company-wing-left.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      p {
        color: #0061ef;
        font-size: 0.16rem;
        font-weight: 600;
        padding-left: 1.1rem;
        position: relative;
        top: -0.1rem;
      }
      span {
        color: #0061ef;
        border: 1px solid #0061ef;
        border-radius: .03rem;
        padding: .01rem .05rem;
        cursor: pointer;
        position: absolute;
        top: -0.1rem;
        left: 0.5rem;
        transition: .5s all;
        &:hover {
          background-color: #0061ef;
          color: #fff;
        }
      }
    }
    .right {
      bottom: 0;
      right: 0.35rem;
      text-align: right;
      background: url("~images/company-wing-right.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      p {
        display: inline-block;
        color: #fff;
        font-size: 0.16rem;
        font-weight: 600;
        padding-right: 0.3rem;
        position: relative;
        top: -0.1rem;
      }
    }
  }
  .body {
    height: calc(100% - 0.9rem);
    margin: 0.2rem;
    justify-content: space-between;
    flex-wrap: nowrap;
    display: flex;
    background: url("~images/company-background-group.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 0.4rem 0.35rem 0.3rem;
    .left {
      width: 3.8rem;
      .click-card {
        height: 4.6rem;
        padding: 0 0.2rem 0.2rem;
        position: relative;
        background-image: url("~images/company-left-one.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .click-card-img {
          background-image: url("~images/click-card-img.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .circle {
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: nowrap;
          > div {
            width: 1rem;
            height: 1rem;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              // animation: circle 1s;
              // animation-iteration-count: infinite;
              // animation-direction: reverse;
              // animation-timing-function: linear;
            }
            .people {
              width: 0.9rem;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 0.14rem;
              line-height: 0.3rem;
              color: #fff;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              span {
                font-size: 0.2rem;
                font-weight: 600;
              }
            }
          }
        }
        #click-card {
          width: 100%;
          height: 2.8rem;
          position: absolute;
          bottom: 1px;
          left: 0;
        }
        .date-picker {
          top: 1.9rem;
        }
      }
      .margin {
        height: 4.4rem;
        margin-top: 0.15rem;
        padding: 0 0.2rem 0.2rem;
        background-image: url("~images/company-left-one.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .tower-img {
          background-image: url("~images/tower-crane-monitoring.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .margin-animation {
          height: calc(100% - 0.95rem);
          background: url("~images/margin-animation-one.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          .margin-animationing {
            position: absolute;
            width: 0.12rem;
            height: 81%;
            right: 0.2rem;
            top: 19%;
            animation: line 3s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            > div {
              width: 0.02rem;
              height: calc(100% - 0.15rem);
              background: #666;
              position: absolute;
              left: 50%;
              margin-left: -0.01rem;
            }
            img {
              width: 0.12rem;
              height: 0.3rem;
              position: absolute;
              bottom: 0;
              z-index: 10;
            }
          }
          .margin-list {
            width: 1.4rem;
            color: #fff;
            position: absolute;
            top: 0.7rem;
            right: 0.5rem;
            > p {
              font-size: 0.18rem;
              color: #0068ff;
              text-align: center;
            }
            .list {
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              line-height: 0.27rem;
              > div {
                width: 0.2rem;
                height: 0.1rem;
                display: inline-block;
                margin-top: 0.085rem;
                margin-right: 0.1rem;
              }
              p {
                display: inline-block;
                vertical-align: top;
              }
              span {
                position: absolute;
                right: 0;
              }
            }
          }
        }
      }
    }
    .center {
      width: 10rem;
      #map {
        height: 5.8rem;
        position: relative;
        .company-project {
          width: 8rem;
          height: 0.5rem;
          background: #002a6c7d;
          position: absolute;
          bottom: 0.25rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.1rem 0.7rem;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          .project {
            width: 1.2rem;
            white-space: nowrap;
            overflow: hidden;
            i {
              display: inline-block;
              vertical-align: text-bottom;
              width: 0.17rem;
              height: 0.21rem;
            }
            .normal {
              background: url("~images/company-project-normal.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .abnormal {
              background: url("~images/company-project-abnormal.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .complete {
              background: url("~images/company-project-complete.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            p {
              display: inline-block;
              line-height: 0.3rem;
              font-size: 0.16rem;
              color: #fff;
              margin-left: 0.1rem;
            }
            span {
              display: inline-block;
              color: #fff;
              line-height: 0.3rem;
              font-size: 0.16rem;
              margin-left: 0.1rem;
            }
          }
          .allProject {
            width: 2.3rem;
            color: #fff;
            line-height: 0.3rem;
            font-size: 0.16rem;
            white-space: nowrap;
            overflow: hidden;
            p {
              display: inline-block;
            }
            .border {
              height: 0.3rem;
              width: 1.2rem;
              margin-left: 0.1rem;
              vertical-align: bottom;
              position: relative;
              display: inline-flex;
              justify-content: space-between;
              span {
                width: 0.2rem;
                height: 0.3rem;
                display: inline-block;
                box-sizing: border-box;
                border: 0.01rem solid #273c5f;
                box-shadow: inset 0 0 4px 2px #273c5f;
                position: relative;
                p {
                  font-family: YJZT;
                  line-height: 0.3rem;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }
        }
      }
      .electricity-box {
        height: 1rem;
        margin-top: 0.2rem;
        padding: 0 0.2rem 0.2rem;
        position: relative;
        background: url("~images/company-center-one.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .title {
          > i {
            top: 0.1rem;
          }
          > p {
            line-height: 0.5rem;
          }
        }
        .electricity-box-img {
          background-image: url("~images/company-electricity-box.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .status-crosswise {
          width: 4rem;
        }
        .electricity-box-bg {
          width: 0.6rem;
          height: 0.8rem;
          position: absolute;
          right: 1.3rem;
          top: 50%;
          transform: translateY(-50%);
          background: url("~images/electricity-box-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .plate-number {
        height: 2rem;
        margin-top: 0.15rem;
        padding: 0 0.2rem 0.2rem;
        background-image: url("~images/company-center-two.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        .plate-number-img {
          background-image: url("~images/company-plate-number.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .different {
          position: absolute;
          bottom: 0.2rem;
          right: 0.2rem;
          font-size: 0.12rem;
          color: #fff;
          cursor: pointer;
          > i {
            color: #0060ee;
          }
        }
        #plate-number {
          width: 5.5rem;
          height: 1.7rem;
          position: absolute;
          top: 0.15rem;
          left: 1.9rem;
        }
        .date-picker {
          top: .15rem;
          right: .2rem;
        }
        .plate-number-bg {
          width: 2rem;
          height: 0.75rem;
          position: absolute;
          right: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          background-image: url("~images/plate-number-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .right {
      width: 3.8rem;
      .add-up {
        height: 1.2rem;
        padding: 0.25rem;
        color: #fff;
        font-size: 0.18rem;
        line-height: 0.35rem;
        background-image: url("~images/company-right-one.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        > div {
          white-space: nowrap;
          overflow: hidden;
        }
        > span {
          display: inline-block;
        }
        .border {
          height: 0.35rem;
          width: 2rem;
          padding: 0 0.05rem;
          vertical-align: bottom;
          position: relative;
          display: inline-flex;
          justify-content: space-between;
          span {
            width: 0.2rem;
            height: 0.3rem;
            display: inline-block;
            margin-top: 0.025rem;
            box-sizing: border-box;
            border: 0.01rem solid #273c5f;
            box-shadow: inset 0 0 4px 2px #273c5f;
            position: relative;
            p {
              font-family: YJZT;
              line-height: 0.3rem;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .environment {
        height: 5.6rem;
        margin-top: 0.2rem;
        padding: 0 0.2rem 0.2rem;
        background-image: url("~images/company-right-two.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        .environment-img {
          background-image: url("~images/company-environment.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        #environment {
          width: 2.4rem;
          height: 3.5rem;
          position: absolute;
          right: 0;
          bottom: .6rem;
        }
        .environment-bg {
          width: 1.2rem;
          height: 3.3rem;
          position: absolute;
          bottom: 0.65rem;
          left: 0.2rem;
          background-image: url("~images/environment-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .lifter {
        height: 2rem;
        margin-top: 0.15rem;
        padding: 0 0.2rem 0.2rem;
        position: relative;
        background-image: url("~images/company-right-three.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .lifter-img {
          background-image: url("~images/company-lifter.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .lifter-list-wrap {
          width: 1.1rem;
          height: 1.05rem;
          display: inline-block;
          padding-left: 0.15rem;
          vertical-align: top;
          .lifter-list {
            position: relative;
            font-size: 0.14rem;
            height: 0.25rem;
            line-height: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            div {
              width: 0.03rem;
              height: 0.03rem;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
            p {
              color: #fff;
              display: inline-block;
              margin-left: 0.1rem;
            }
            span {
              position: absolute;
              right: 0;
            }
          }
        }
        .lifter-bg {
          width: 0.75rem;
          height: 1.35rem;
          position: absolute;
          right: 0.25rem;
          bottom: 0.1rem;
          background-image: url("~images/lifter-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .title {
      width: 100%;
      position: relative;
      > i {
        width: 0.35rem;
        height: 0.3rem;
        display: inline-block;
        position: absolute;
        top: 0.15rem;
        left: 0;
      }
      > p {
        display: inline-block;
        margin-left: 0.7rem;
        font-size: 0.2rem;
        line-height: 0.6rem;
        color: #fff;
        font-weight: 500;
      }
      > span {
        font-size: 0.12rem;
        color: #fff;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        cursor: pointer;
        > i {
          color: #0060ee;
        }
      }
    }
    .status-crosswise {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding-left: 0.05rem;
      background: url("~images/company-left-two-gradual.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      > div {
        white-space: nowrap;
        overflow: hidden;
      }
      p {
        display: inline-block;
        color: #fff;
        line-height: 0.35rem;
        font-size: 0.14rem;
        padding-left: 0.05rem;
      }
      i {
        display: inline-block;
        width: 0.15rem;
        height: 0.15rem;
        vertical-align: middle;
        position: relative;
        top: -0.02rem;
      }
      .quantity {
        background: url("~images/company-quantity.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .on-line {
        background: url("~images/company-on-line.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .off-line {
        background: url("~images/company-off-line.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .status-vertical {
      width: 1.6rem;
      height: 1.05rem;
      display: inline-block;
      background-image: url("~images/company-vertical-gradual.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-left: 0.3rem;
      margin-left: -0.2rem;
      overflow: hidden;
      > div {
        white-space: nowrap;
        overflow: hidden;
        padding-top: 0.1rem;
      }
      p {
        display: inline-block;
        color: #fff;
        font-size: 0.14rem;
        padding-left: 0.05rem;
      }
      i {
        display: inline-block;
        width: 0.15rem;
        height: 0.15rem;
        vertical-align: middle;
        position: relative;
        top: -0.02rem;
      }
      .quantity {
        background: url("~images/company-quantity.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .on-line {
        background: url("~images/company-on-line.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .off-line {
        background: url("~images/company-off-line.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .date-picker {
      position: absolute;
      right: 0;
      width: 1rem;
      font-size: .14rem;
      /deep/.el-input__inner {
        padding: 0 0 0 .04rem;
        border: 1px solid #0068ff;
        color: #0068ff;
        background: #00173d;
        height: .24rem;
        line-height: .24rem;
        cursor: pointer;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 0.16rem;
    font-weight: 540;
    line-height: 0.4rem;
  }
  .none {
    display: none;
  }
}

@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes line {
  from {
    height: 10%;
  }
  to {
    height: 81%;
  }
}
</style>


