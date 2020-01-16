<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="40%"
      center>
      <div class="top">上传附件</div>
      <div class="body">
        <div class="upLoadImg-wrap" style="width:100%" draggable="true" @drop="dropDown" @dragover="defaults" @dragenter="defaults">
        <div class="input-button imgWrap" v-for="(item, index) in imgList" :key="index" @mouseover="icon(index)" @mouseout="iconOut(index)">
          <img :src="item.url" alt="" style="width:100%;height:100%">
          <i class="el-icon-error" v-show="iconShow==index" @click="deleteImg(item.id)"></i>
        </div>
        <input type="file" accept=".png, .jpg, .jpeg" multiple @change="look" id="input" style="display:none">
        <label for="input" style="height:0" v-show="imgList.length<6"><div class="input-button addImage"></div></label>
        <i style="width: 1.92rem"></i>
        <i style="width: 1.92rem"></i>
        <i style="width: 1.92rem"></i>
        <i style="width: 1.92rem"></i>
      </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">{{button}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '上传图片'
    },
    button: {
      type: String,
      default: '确 定'
    }
  },
  data() {
    return {
      imgList: [], // 图片列表
      upLoadImgList: [], // 上传文件列表
      projectId: null, // 项目ID
      iconShow: null, // 叉叉显示
    }
  },
  mounted() {
    this.projectId = sessionStorage.getItem('pid')
    this.getImage()
  },
  computed: {
    visible: {
      get: function() {
        return this.show
      },
      set: function(value) {
        this.$emit('close')
      }
    }
  },
  methods: {
    // 确定按钮
    confirm() {
      this.$emit('close')
    },

    // 获取轮播图
    getImage() {
      this.$axios
        .post(`/api/projectImage/selectProjectImageList?projectId=${this.projectId}&module=2`)
        .then(res => {
          if (res.data.code == 0) {
            this.imgList = res.data.data
          }
        })
    },

    // 鼠标移入效果
    icon(index) {
      this.iconShow = index
    },

    // 鼠标移出
    iconOut(index) {
      this.iconShow = null
    },

    // 本地文件加载成功
    look(e) {
      // for (let i = 0; i < e.target.files.length; i++) {
      //   let locality = new FileReader()
      //   locality.readAsDataURL(e.target.files[i])
      //   locality.onload = () => {
      //     this.upLoadImgList.push({
      //       src: locality.result,
      //       name: e.target.files[i].name,
      //       size: e.target.files[i].size,
      //       id: this.upLoadImgList.length
      //     })
      //   }
      // }
      // console.log(this.upLoadImgList)
      if (e.target.files.length + this.imgList.length > 6) {
        this.$message({
          type: 'warning',
          message: '轮播图图片不可超过6张'
        })
        e.target.value = ''
        return
      }
      let header = {headers: {"Content-Type": "multipart/form-data"}}
      let file = e.target.files
      let formData = new FormData()
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i])
      }
      this.$axios
        .post(`/api/projectImage/insertProjectImage?projectId=${this.projectId}&type=1&module=2`, formData, header)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '上传成功'
            })
            this.getImage()
          } else {
            this.$message({
              type: 'warning',
              message: '上传失败'
            })
          }
          e.target.value = ''
        })
    },

    // 拖拽上传
    dropDown(e) {
      // e.preventDefault()
      // e.stopPropagation()
      // let list = e.dataTransfer.files
      // console.log(e.dataTransfer.files)
      // let reader = new FileReader()
      // reader.readAsText(list[0], 'utf-8')
      // reader.onload = (e) => {
      //   document.getElementById('asd').innerHTML = e.target.result
      // }
    },

    defaults(e) {
      // e.preventDefault()
			// e.stopPropagation()
    },

    // 删除图片
    deleteImg(id) {
      this.$axios
        .post(`/api/projectImage/removeProjectImage?id=${id}`)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getImage()
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}
/deep/.el-dialog__header {
  color: #fff;
  padding: 0;
  height: 0.6rem;
  font-size: 0.24rem;
  line-height: 0.6rem;
  text-align: center;
  position: relative;
  font-weight: bolder;
  background: linear-gradient(to right, #6cc4ff, #489cff);
}
/deep/.el-dialog {
  border-radius: .1rem;
  overflow: hidden;
}
/deep/.el-dialog__title {
  color: #fff;
  font-size: inherit
}
/deep/.el-dialog__headerbtn .el-dialog__close {
  color: #fff
}
/deep/.el-dialog__footer {
  height: .7rem;
  background-color: #f8f8f8;
  border-top: .01rem solid #dedede;
}
/deep/.el-dialog__footer {
  padding: .1rem;
}
.el-button {
  width: 1.63rem;
  height: .49rem;
  transition: all .5s;
  border-radius: .02rem;
  background-color: #ffd14f;
  border: .01rem solid #d9b759;
  font-size: .2rem;
  text-align: center;
  color: #fff;
}
.top {
  position: relative;
  width: 0.9rem;
  height: 0.33rem;
  border: 1px solid #7b7b7b;
  font-size: 0.16rem;
  color: #4a4a4a;
  line-height: 0.33rem;
  text-align: center;
  border-top-left-radius: 0.04rem;
  border-top-right-radius: 0.04rem;
  border-bottom-color: #fff;
  background-color: #fff;
}
.body {
  height: 3.5rem;
  margin-top: -0.01rem;
  border: 1px solid #7b7b7b;
  border-top-right-radius: 0.04rem;
  border-bottom-right-radius: 0.04rem;
  border-bottom-left-radius: 0.04rem;
  padding: 0.2rem;
  .upLoadImg-wrap {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .input-button {
    display: inline-block;
    width: 1.92rem;
    height: 1.08rem;
    border-radius: 5px;
    position: relative;
    margin-bottom: .25rem;
    border:1px solid #7b7b7b;
  }
  .el-icon-error {
    cursor: pointer;
    position: absolute;
    right: .05rem;
    top: .05rem;
  }
  .el-icon-error:hover {
    color: rgb(185, 0, 0);
  }
  .addImage {
    background-image: url(../../static/images/scheduleAddImage.png);
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: center;
    border:1px solid #7b7b7b;
  }
}
</style>
