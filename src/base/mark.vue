<template>
  <div>
    <div class="mark" :class="markType" :style="{animationPlayState: del?'running':'paused'}">
      <i class="el-icon-circle-close" v-show="del" @click="remove(itemId)"></i>
    </div>
    <div class="animation-wrap" v-if="red">
      <div class="animation animation1"></div>
      <div class="animation animation2"></div>
      <div class="animation animation3"></div>
    </div>
    <div class="animation-wrap" v-if="green">
      <div class="animation animation4"></div>
      <div class="animation animation5"></div>
      <div class="animation animation6"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    markType: String,
    del: {
      type: Boolean,
      default: false
    },
    green: {
      type: Boolean,
      default: false
    },
    red: {
      type: Boolean,
      default: false
    },
    itemId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  methods: {
    remove(id) {
      this.$emit('remove', id)
    }
  }
}
</script>

<style lang="less" scoped>
  .mark {
    width: 41px;
    height: 49px;
    position: relative;
    animation: del infinite .2s;
    z-index: 10;
    i {
      font-size: 18px;
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;
      color: red;
    }
  }
  .animation-wrap {
    .animation {
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -30%);
      z-index: 5;
    }
    .animation1 {
      animation: radius1 infinite 1.3s;
      animation-timing-function: ease-in-out;
    }
    .animation2 {
      animation: radius1 infinite 1.3s;
      animation-timing-function: ease-in-out;
      animation-delay: 0.3s
    }
    .animation3 {
      animation: radius1 infinite 1.3s;
      animation-timing-function: ease-in-out;
      animation-delay: 0.6s
    }
    .animation4 {
      animation: radius2 infinite 1.3s;
      animation-timing-function: ease-in-out;
    }
    .animation5 {
      animation: radius2 infinite 1.3s;
      animation-timing-function: ease-in-out;
      animation-delay: 0.3s
    }
    .animation6 {
      animation: radius2 infinite 1.3s;
      animation-timing-function: ease-in-out;
      animation-delay: 0.6s
    }
  }
  .markAir {
    background-image: url('../../static/images/markAir.png')
  }
  .markCar {
    background-image: url('../../static/images/markCar.png')
  }
  .markDump {
    background-image: url('../../static/images/markDump.png')
  }
  .markElectricity {
    background-image: url('../../static/images/markElectricity.png')
  }
  .markElectricityBox {
    background-image: url('../../static/images/markElectricityBox.png')
  }
  .markElevator {
    background-image: url('../../static/images/markElevator.png')
  }
  .markWater {
    background-image: url('../../static/images/markWater.png')
  }
  @keyframes del {
    0%   {transform: rotate(0deg) translate(0)}
    25%  {transform: rotate(-2deg) translate(-1px)}
    50%  {transform: rotate(0deg) translate(0)}
    75%  {transform: rotate(2deg) translate(1px)}
    100% {transform: rotate(0deg) translate(0)}
  }

  @keyframes radius1 {
    0% {
      width: 0;
      height: 0;
      background-color: #c23864;
      opacity: 1;
    }
    6.25% {
      width: 6.25px;
      height: 6.25px;
      background-color: #c23864;
      opacity: 0.9375;
    }
    12.5% {
      width: 12.5px;
      height: 12.5px;
      background-color: #c23864;
      opacity: 0.875;
    }
    18.75% {
      width: 18.75px;
      height: 18.75px;
      background-color: #c23864;
      opacity: 0.8125;
    }
    25% {
      width: 25px;
      height: 25px;
      background-color: #c23864;
      opacity: 0.75;
    }
    31.25% {
      width: 31.25px;
      height: 31.25px;
      background-color: #c23864;
      opacity: 0.6875;
    }
    37.5% {
      width: 37.5px;
      height: 37.5px;
      background-color: #c23864;
      opacity: 0.625;
    }
    43.75% {
      width: 43.75px;
      height: 43.75px;
      background-color: #c23864;
      opacity: 0.5625;
    }
    50% {
      width: 50px;
      height: 50px;
      background-color: #c23864;
      opacity: 0.5;
    }
    56.25% {
      width: 56.25px;
      height: 56.25px;
      background-color: #c23864;
      opacity: 0.4375;
    }
    62.5% {
      width: 62.5px;
      height: 62.5px;
      background-color: #c23864;
      opacity: 0.375;
    }
    68.75% {
      width: 68.75px;
      height: 68.75px;
      background-color: #c23864;
      opacity: 0.3125;
    }
    75% {
      width: 75px;
      height: 75px;
      background-color: #c23864;
      opacity: 0.25;
    }
    81.25% {
      width: 81.25px;
      height: 81.25px;
      background-color: #c23864;
      opacity: 0.1875;
    }
    87.5% {
      width: 87.5px;
      height: 87.5px;
      background-color: #c23864;
      opacity: 0.125;
    }
    93.75% {
      width: 93.75px;
      height: 93.75px;
      background-color: #c23864;
      opacity: 0.0625;
    }
    100% {
      width: 100px;
      height: 100px;
      background-color: #c23864;
      opacity: 0;
    }
  }

  @keyframes radius2 {
    0% {
      width: 0;
      height: 0;
      background-color: #fff;
      opacity: 1;
    }
    6.25% {
      width: 6.25px;
      height: 6.25px;
      background-color: #fff;
      opacity: 0.9375;
    }
    12.5% {
      width: 12.5px;
      height: 12.5px;
      background-color: #fff;
      opacity: 0.875;
    }
    18.75% {
      width: 18.75px;
      height: 18.75px;
      background-color: #fff;
      opacity: 0.8125;
    }
    25% {
      width: 25px;
      height: 25px;
      background-color: #fff;
      opacity: 0.75;
    }
    31.25% {
      width: 31.25px;
      height: 31.25px;
      background-color: #fff;
      opacity: 0.6875;
    }
    37.5% {
      width: 37.5px;
      height: 37.5px;
      background-color: #fff;
      opacity: 0.625;
    }
    43.75% {
      width: 43.75px;
      height: 43.75px;
      background-color: #fff;
      opacity: 0.5625;
    }
    50% {
      width: 50px;
      height: 50px;
      background-color: #fff;
      opacity: 0.5;
    }
    56.25% {
      width: 56.25px;
      height: 56.25px;
      background-color: #fff;
      opacity: 0.4375;
    }
    62.5% {
      width: 62.5px;
      height: 62.5px;
      background-color: #fff;
      opacity: 0.375;
    }
    68.75% {
      width: 68.75px;
      height: 68.75px;
      background-color: #fff;
      opacity: 0.3125;
    }
    75% {
      width: 75px;
      height: 75px;
      background-color: #fff;
      opacity: 0.25;
    }
    81.25% {
      width: 81.25px;
      height: 81.25px;
      background-color: #fff;
      opacity: 0.1875;
    }
    87.5% {
      width: 87.5px;
      height: 87.5px;
      background-color: #fff;
      opacity: 0.125;
    }
    93.75% {
      width: 93.75px;
      height: 93.75px;
      background-color: #fff;
      opacity: 0.0625;
    }
    100% {
      width: 100px;
      height: 100px;
      background-color: #fff;
      opacity: 0;
    }
  }
</style>