<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="visible"
      width="6rem"
      :close-on-click-modal = false
      center>
      <div class="center-wrap">
        <div class="item">
          <p class="text">请输入原密码：<span class="dot">*</span></p>
          <el-input v-model="originalPassword" show-password placeholder="请输入原密码"></el-input>
        </div>
        <div class="item">
          <p class="text">请输入新密码：<span class="dot">*</span></p>
          <el-input v-model="passWord" show-password placeholder="请输入新密码"></el-input>
        </div>
        <div class="item">
          <p class="text">请再次输入新密码：<span class="dot">*</span></p>
          <el-input v-model="repeatPassWord" show-password placeholder="请再次输入新密码"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="visible = false">取 消</el-button> -->
        <el-button type="primary" @click="edit">确 定</el-button>
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
    }
  },
  data() {
    return {
      passWord: null,
      repeatPassWord: null,
      originalPassword: null,
      userId: null
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.show
      },
      set: function () {
        this.clear()
        this.$emit('close')
      }
    }
  },
  mounted() {},
  methods: {
    edit() {
      this.userId = sessionStorage.getItem('userId')
      if (this.passWord == null || this.repeatPassWord == null || this.originalPassword == null) {
        this.$message({
          type: 'warning',
          message: '请输入新密码'
        })
      } else if (this.passWord !== this.repeatPassWord) {
        this.$message({
          type: 'warning',
          message: '两次输入的密码不一致'
        })
      } else if (this.passWord.length < 6) {
        this.$message({
          type: 'warning',
          message: '密码最小为6位'
        })
      } else {
        this.$axios
          .post(`/api/system/application/updateUserPassword?id=${this.userId}&userPassword=${this.$md5(this.originalPassword)}&newPassword=${this.$md5(this.passWord)}&confirmPassword=${this.$md5(this.repeatPassWord)}`)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              localStorage.removeItem("userPassword")
              this.clear()
              this.$emit('close')
            } else if(res.data.code == -1) {
              this.$message({
                type: 'warning',
                message: '原密码错误'
              })
            }
          })
      }
    },

    // 清理数据
    clear() {
      this.passWord = null
      this.repeatPassWord = null
      this.originalPassword = null
      this.userId = null
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
/deep/.el-dialog__body {
  padding: .25rem;
}
.el-button {
  width: 1.63rem;
  transition: all .5s;
  border-radius: .02rem;
  background-color: #ffd14f;
  border: .01rem solid #d9b759;
  font-size: .2rem;
  text-align: center;
  color: #fff;
}
.el-button:hover {
  background-color: #d9b759;
}
.el-button--primary:focus, .el-button--primary:hover {
  background-color: #d9b759;
}
.item {
  width: 100%;
  display: flex;
  margin: .25rem 0;
  justify-content: flex-end;
  line-height: .4rem;
  font-size: .16rem;
  .dot {
    color: red;
    vertical-align: sub;
  }
  p {
    margin-right: .05rem;
  }
  .el-input {
    width: 70%;
  }
  /deep/.el-input .el-input--suffix {
    display: inline-block;
  }
  /deep/.el-input--suffix .el-input__inner {
    border: 1px solid #c0c4cc;
    border-radius: 5px;
  }
}
/deep/.el-dialog__header button:hover {
  i:before {
    color: #fff;
  }
  i:hover {
    color: #fff;
  }
}
</style>