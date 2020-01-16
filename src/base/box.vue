<template>
  <div class="box">
    <span class="lt"></span>
    <span class="rt"></span>
    <span class="lb"></span>
    <span class="rb"></span>
    <slot></slot>
  </div>
</template>

<style lang="less">
.box {
  background: #020422;
  border: 1px solid #0f1f53;
  box-shadow: inset 0 0 7px 2px #0f1f53;
  position: relative;
  .lt {
    position: absolute;
    display: block;
    width: 13px;
    height: 13px;
    top: -1px;
    left: -1px;
    border-top: 1px solid #3375fe;
    border-left: 1px solid #3375fe;
  }
  .rt {
    position: absolute;
    display: block;
    width: 13px;
    height: 13px;
    top: -1px;
    right: -1px;
    border-top: 1px solid #3375fe;
    border-right: 1px solid #3375fe;
  }
  .lb {
    position: absolute;
    display: block;
    width: 13px;
    height: 13px;
    bottom: -1px;
    left: -1px;
    border-bottom: 1px solid #3375fe;
    border-left: 1px solid #3375fe;
  }
  .rb {
    position: absolute;
    display: block;
    width: 13px;
    height: 13px;
    bottom: -1px;
    right: -1px;
    border-bottom: 1px solid #3375fe;
    border-right: 1px solid #3375fe;
  }
}
</style>

<script>
export default {
  
}
</script>