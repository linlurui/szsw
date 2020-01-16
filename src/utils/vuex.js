import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
  // 仓库
  Store: {
    systemHeader: false,
    header: false
  },

  // 方法 使用store.commit()调用
  mutations: {
    changeSystemHeader(state, boolean) {
      state.systemHeader = boolean
    },
    changeHeader(state, boolean) {
      state.header = boolean
    }
  }

})