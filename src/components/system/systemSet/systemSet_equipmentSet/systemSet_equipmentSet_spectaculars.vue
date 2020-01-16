<template>
  <div>
    <div class="content-box">
      <!-- <p @click="back">返回</p> -->
      <div class="title">看板设置</div>
      <!-- 中心区域 -->
      <div class="body">
        <!-- 按钮 -->
        <div class="nav-wrap">
          <div class="left">
            <p>切换模块:</p>
            <el-select v-model="switchModule" placeholder="请选择">
              <el-option
                v-for="item in switchModuleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="right">
            <div class="button" @click="imgAdd=!imgAdd">
              <i class="el-icon-picture-outline"></i>
              添加图纸
            </div>
            <div class="button" @click="addLocation">
              <i class="el-icon-circle-plus-outline"></i>
              新增位置
            </div>
            <div class="button" @click="del=!del">
              <i class="el-icon-remove-outline"></i>
              {{del?'取消删除':'删除位置'}}
            </div>
          </div>
        </div>
        <!-- 图片显示位置 -->
        <div class="img" id="img" @dragover="dragover" @drop="dragover">
          <div class="add-warp" v-if="!imgUrl" @click="imgAdd=!imgAdd">
            <i class="add"></i>
            <p class="fs-20">点击添加</p>
            <p>jpg、png格式</p>
          </div>
          <img :src="imgUrl" style="max-width: 100%" v-else>
          <!-- 循环显示的点标记 -->
          <marks class="marks" :markType="item.type" :style="{top: item.x +'px',left: item.y + 'px'}" :itemId="item.id" v-for="(item,index) in markList" :key="index" :del="del" @remove="remove"></marks>
          <!-- 添加设备的点标记 -->
          <marks class="marks" style="top:45%;left:48.5%" :markType="markType" @dragend.native="dragend" @dragstart.native="dragstart" id="marks" draggable="true" v-show="markShow"></marks>
        </div>
      </div>
      <!-- 添加图纸弹窗 -->
      <dialog-box :show="!imgAdd" :title="'添加图纸'" :button="'保 存'" :image=true @imgUrl="uploadPicture" @close="imgAdd=!imgAdd"></dialog-box>
      <!-- 新增位置弹窗 -->
      <!-- <dialog-box :show="true" :width="'30%'" :title="'添加位置'" :button="'保 存'">
        123
      </dialog-box> -->
    </div>
  </div>
</template>

<script>
import dialogBox from '@/base/dialog'
import marks from '@/base/mark'
export default {
  data() {
    return {
      switchModule: 1, // 切换模块选项
      switchModuleList: [ // 切换模块
        {
          label: '设备管理',
          value: 1
        },
        {
          label: '深基坑',
          value: 2
        },
        {
          label: '高支模',
          value: 3
        }
      ],
      imgAdd: true, // 添加图片
      imgUrl: '', // 获取的图片
      markList: [
        {
          type: 'markAir',
          x: 200,
          y: 400,
          id: 1
        },{
          type: 'markCar',
          x: 320,
          y: 200,
          id: 2
        },{
          type: 'markDump',
          x: 400,
          y: 40,
          id: 3
        },{
          type: 'markElectricity',
          x: 120,
          y: 140,
          id: 4
        },{
          type: 'markElectricityBox',
          x: 200,
          y: 240,
          id: 5
        }
      ], // 点标记列表
      markType: 'markAir', // 新增点标记类型
      del: false, // 是否删除
      markLeft: 0, // X轴距离
      markTop: 0, // Y轴距离
      markShow: false, // 添加位置的mark
    }
  },
  components: {
    dialogBox,
    marks
  },
  mounted() {
    //TODO: 进入页面要调用查看图片接口
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },

    // 获取传出的imgUrl
    uploadPicture(val) {
      // TODO: 这里要先判断删除，删除之后再上传图片
      // TODO: 上传成功之后调用查看接口，渲染在页面上
      this.imgAdd=!this.imgAdd
      console.log(val)
    },

    // 拖拽结束
    dragend(e) {
      let marks = document.getElementById('marks')
      let img = document.getElementById('img')
      // 父元素到body的距离
      let divParentTop  = img.offsetTop
      let divParentLeft  = img.offsetLeft
      // 鼠标到marks的距离
      let divTop  = e.pageY - divParentTop - 80 - this.markTop
      let divLeft = e.pageX - divParentLeft - this.markLeft
      if (divTop<0) {
        divTop = 0
      } else if (divTop>651) {
        divTop = 651
      }
      if (divLeft<0) {
        divLeft = 0
      } else if (divLeft>1329) {
        divLeft = 1329
      }
      marks.style.top  = divTop + 'px'
      marks.style.left = divLeft + 'px'
    },

    // 拖拽开始
    dragstart(e) {
      let marks = document.getElementById('marks')
      let img = document.getElementById('img')
      // 父元素到body的距离
      let divParentTop  = img.offsetTop
      let divParentLeft = img.offsetLeft
      let marksTop  = marks.offsetTop
      let marksLeft = marks.offsetLeft
      this.markTop  = e.pageY - (marks.offsetTop + img.offsetTop + 80)
      this.markLeft = e.pageX - (marks.offsetLeft + img.offsetLeft)
      // e.dataTransfer.dropEffect = "move";
    },

    // 父元素拖拽
    dragover(e) {
      // 留着这个才可以切换样式
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },

    // 新增位置
    addLocation() {
      this.markShow = !this.markShow
    },

    // 删除位置
    remove(val) {
      // 这里要调用接口删除，之后调用查询接口
      console.log(val)
    }
  }
}
</script>

<style scoped lang="less">
.content-box {
  border-radius: 0.04rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem -0.3rem #666;
  padding:0 0.3rem 0.3rem;
  height: 9rem;
  overflow-y: auto;
  .title {
    height: 1.06rem;
    border-bottom: .35rem solid #c5e8ff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.7rem;
  }
  .body {
    height: calc(100% - 1.06rem);
    padding: .2rem 0;
    .nav-wrap {
      font-size: .16rem;
      .left {
        float: left;
        p {
          display: inline-block;
          margin-right: .1rem;
        }
        /deep/input {
          border: 1px solid #c0c0c0;
          border-radius: 5px;
          color: #c0c0c0;
        }
      }
      .right {
        float: right;
        .button {
          display: inline-block;
          border: 1px solid #0090ff;
          color: #0090ff;
          border-radius: 5px;
          padding: 5px 10px;
          margin-left: .1rem;
          cursor: pointer;
          transition: .5s all;
          i {
            display: inline-block;
            width: 21px;
            height: 21px;
            font-size: .18rem;
            vertical-align: middle;
          }
        }
        .button:hover {
          color: #fff;
          background: #0090ff;
        }
      }
    }
    .nav-wrap:after {
      display: block;
      content: '';
      clear: both;
    }
    .img {
      width: 1371px;
      height: 702px;
      margin: auto;
      margin-top: 20px;
      border:1px solid #c5e8ff;
      position: relative;
      .marks {
        position: absolute;
        z-index: 10;
      }
      .add-warp{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        text-align: center;
        .fs-20 {
          margin-top: .1rem;
          font-size: .2rem;
          font-weight: 600;
        }
      }
      .add {
        display: inline-block;
        width: .81rem;
        height: .81rem;
        background-image: url('../../../../../static/images/boardAddIcon.png');
      }
    }
  }
}
</style>