<template>
  <div class="aidiscern">
    <box class="left-wrap">
      <!-- 标题栏 -->
      <div class="title">
        <div class="title-left">
          <i class="el-icon-d-arrow-left"></i>
          危区检测一号摄像头
        </div>
        <div class="title-right">
          <div class="bg" :class="bgc==1?'active':''" @click="getHazardous">
            <p>危区</p>
          </div>
          <div class="bg" :class="bgc==2?'active':''" @click="getHelmet">
            <p>安全帽</p>
          </div>
          <div class="bg" :class="bgc==3?'active':''" @click="getReflective">
            <p>反光衣</p>
          </div>
        </div>
      </div>
      <!-- 视频区域 -->
      <div class="video-wrap">
        <video src="" autoplay="autoplay"></video>
        <span class="nav-list" @click="dialog">
          <i class="el-icon-circle-plus-outline" v-if="navListShow"></i>
          <i class="el-icon-remove-outline" v-else></i>
        </span>
        <div class="video-box" :style="navListShow?'width:0;height:0':''">
          <ul>
            <li v-for="item in navList" :key="item.id">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </box>
    <box class="right-wrap">
      <div class="title">
        AI报警列表
      </div>
      <div class="img-box" id="scrollWrap">
        <div class="img-item" v-for="item in imgList" :key="item.id" @click="imgClick(item)">
          <img src="" alt="">
          <span class="alarm">
            <i class="alarm_img"></i>
            {{item.value}}
          </span>
        </div>
      </div>
    </box>
    <div class="img-wrap" v-show="imgShow">
      <div class="center">
        <i class="el-icon-circle-close" @click="imgShow = !imgShow;getScroll()"></i>
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.aidiscern {
  width: 100%;
  min-width: 16rem;
  height: 10.32rem;
  padding: .55rem .4rem .4rem;
  display: flex;
  position: relative;
  justify-content: space-between;
}
.left-wrap {
  flex: 3;
  height: 100%;
  box-sizing: border-box;
  .title {
    width: 100%;
    height: 1.1rem;
    position: relative;
    .title-left {
      position: absolute;
      top: 50%;
      left: 0.1rem;
      transform: translateY(-50%);
      display: inline-block;
      color: #3375fe;
      font-weight: 600;
      font-size: .25rem;
      cursor: pointer;
    }
    .title-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) skew(-30deg);
      right: 0.35rem;
      width: 2.7rem;
      height: .45rem;
      border: 1px solid #3375fe;
      box-sizing: border-box;
      display: flex;
      cursor: pointer;
      .bg {
        flex: 1;
        height: 100%;
        text-align: center;
        p {
          font-size: .16rem;
          font-weight: 600;
          color: #3375fe;
          transform: skew(30deg);
          line-height: .45rem;
        }
      }
      .active {
        background: linear-gradient(60deg, #0164ff, #00abfe);
        p {
          color: #fff !important;
        }
      }
    }
  }
  .video-wrap {
    position: relative;
    width: 100%;
    height: calc( 100% - 1.1rem);
    box-sizing: border-box;
    padding: 0rem .35rem .35rem .35rem;
    video {
      width: 100%;
      height: 100%;
      // object-fit: fill;
    }
    .nav-list {
      position: absolute;
      left: 0.55rem;
      top: 0.2rem;
      z-index: 100;
      font-size: .45rem;
      color: #3375fe;
      cursor: pointer;
    }
    .video-box {
      position: absolute;
      left: 0.85rem;
      top: 0.75rem;
      z-index: 100;
      width: 1.5rem;
      padding: 0 .2rem;
      background: rgba(51, 117, 254, 0.5);
      border-radius: 15px;
      overflow: hidden;
      li {
        color: rgb(255, 255, 255);
        list-style: none;
        text-align: center;
        line-height: .5rem;
        font-size: .18rem;
        border-bottom: 1px solid #fff;
        border-image: linear-gradient(to right,rgba(255,255,255,0.1),rgba(255,255,255,0.5),rgba(255,255,255,0.1)) 1;
        cursor: pointer;
      }
      li:last-child {
        border: none;
      }
    }
  }
}
.right-wrap {
  flex: 1;
  margin-left: 0.4rem;
  padding: .3rem;
  box-sizing: border-box;
  .title {
    color: #3375fe;
    height: .45rem;
    font-weight: 600;
    font-size: 0.25rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #3375fe;
    box-sizing: border-box;
  }
  .img-box {
    height: calc( 100% - .45rem);
    box-sizing: border-box;
    padding: .2rem .2rem 0;
    overflow: hidden;
    .img-item {
      width: 100%;
      height: 2rem;
      margin-bottom: .2rem;
      border: 1px solid #3375fe;
      position: relative;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      .alarm {
        z-index: 100;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 1.9rem;
        height: .5rem;
        box-sizing: border-box;
        border: 1px solid #ff0;
        text-align: center;
        background: rgba(249, 176, 13, .6);
        line-height: .5rem;
        font-size: .2rem;
        font-weight: 600;
        color: #ff0;
        border-radius: 7px;
        box-shadow: 0px 0px 8px 0px #ff0;
        i {
          display: inline-block;
          background: url('../../../static/images/alarm_img.png');
          width: .25rem;
          height:.25rem;
          vertical-align: text-top;
        }
      }
    }
  }
}
.img-wrap {
  z-index: 10000000;
  position: absolute;
  top: -48px;
  left: 0;
  bottom: 0;
  right:0;
  background: rgba(0, 0, 0, 0.432);
  .center {
    width: 8rem;
    height: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid #0080ff8f;
    box-shadow: inset 0px 0px 3px 3px #0080ff8f;
    border-radius: 7px;
    i {
      position: absolute;
      top:.1rem;
      right: .1rem;
      font-size: .3rem;
      cursor: pointer;
    }
    i:hover {
      color: #ff0000a1;
    }
    img {
      width: 100%;
      right: 100%;
    }
  }
}
</style>

<script>
import box from '@/base/box'
export default {
  data() {
    return {
      bgc: 1, // 危区检测点击按钮
      navListShow: true, // 显示视频弹窗
      imgShow: false, // 图片点击事件
      clearScroll: '', // 清除滚动
      scrollTop: 0, // 滚动的高度
      navList: [
        {
          name: '塔吊检测',
          id: 1
        },{
          name: '智能电箱',
          id: 2
        },{
          name: '气体检测',
          id: 3
        },{
          name: '智能水表',
          id: 4
        },{
          name: '车牌识别',
          id: 5
        }
      ],
      imgList: [
        {
          id: 1,
          value: '区域人员闯入'
        },{
          id: 2,
          value: '未戴安全帽'
        },{
          id: 3,
          value: '未穿反光衣'
        },{
          id: 5,
          value: '区域人员闯入'
        },{
          id: 6,
          value: '区域人员闯入'
        },{
          id: 7,
          value: '未戴安全帽'
        },{
          id: 8,
          value: '未穿反光衣'
        },{
          id: 9,
          value: '区域人员闯入'
        }
      ]
    }
  },
  components: {
    box
  },
  mounted() {
    this.getScroll()
  },
  methods: {
    // 危区点击
    getHazardous() {
      this.bgc = 1
    },

    // 安全帽点击
    getHelmet() {
      this.bgc = 2
    },

    // 反光衣点击
    getReflective() {
      this.bgc = 3
    },

    // 弹窗点击事件
    dialog() {
      this.navListShow = !this.navListShow
    },

    // 图片点击事件
    imgClick(item) {
      clearInterval(this.clearScroll)
      this.imgShow = !this.imgShow
    },

    // 滚动事件
    getScroll() {
      if (this.imgList.length < 4) {
        return
      }
      var wrap = document.getElementById('scrollWrap')
      if (this.clearScroll) {
        clearInterval(this.clearScroll)
      }
      this.clearScroll = setInterval(() => {
        wrap.scrollTop += 2
        if (wrap.scrollTop == this.scrollTop && this.scrollTop != 0) {
          wrap.scrollTop = 0
        } else {
          this.scrollTop = wrap.scrollTop
        }
      }, 100)
    }
  },
  beforeDestroy() {
    clearInterval(this.clearScroll)
  }
}
</script>