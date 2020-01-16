<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal=false
      :width="width"
      center>
      <slot>
        <div class="add-wrap" v-if="!upLoading">
          <label for="input">
            <div class="add-warp">
              <i class="add"></i>
              <p class="fs-20">点击添加</p>
              <p>jpg、png格式</p>
            </div>
          </label>
          <input type="file" accept=".jpg, .jpeg, .png" id="input" style="display:none" @change="upLoadInput">
        </div>
        <div v-else>
          <div style="width: 910px; height: 480px; border: dashed #cacaca 1px; text-align: center;">
            <img :src="cropperImg" style="max-width: 100%" ref="img">
          </div>
        </div>
      </slot>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getPic" v-if="image">{{button}}</el-button>
        <el-button type="primary" @click="confirm" v-else>{{button}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提 示'
    },
    button: {
      type: String,
      default: '确 定'
    },
    image: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    }
  },
  data() {
    return {
      cropperImg: '', // 上传的图片
      cropper: '', // 截图api挂载在这里
      upLoading: false, // 文件上传
      formData: null,
    }
  },
  mounted() {
    // this.initCropper()
  },
  computed: {
    visible: {
      get: function() {
        return this.show
      },
      set: function(value) {
        this.upLoading = false
        this.$emit('close')
      }
    }
  },
  methods: {
    // 确定按钮
    confirm() {
      this.$emit('confirm')
    },

    // 点击上传
    upLoadInput(e) {
      let file = new FileReader()
      file.readAsDataURL(e.target.files[0])
      file.onload = (e) => {
        this.upLoading = !this.upLoading
        this.cropperImg = e.target.result
        this.$nextTick(() => {
          this.initCropper()
        })
      }
    },

    // 初始化截图工具
    initCropper () {
      let cropper = new Cropper(this.$refs.img, {
        viewMode: 1,
        aspectRatio: 16/9,
        dragMode: 'move'
      })
      this.cropper = cropper
    },

    // 点击确定按钮
    getPic() {
      let canvasDiv = this.$refs.img.cropper.getCroppedCanvas({
        width: 1920,
        height: 1080
      })
      canvasDiv.toBlob(e => {
        this.formData = new FormData()
        this.formData.append('files', e)
        this.upLoading = false
        this.$emit('imgUrl', this.formData)
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
  background-image: url('../../static/images/boardAddIcon.png');
}
.add-wrap {
  height: 4.8rem;
}
</style>
