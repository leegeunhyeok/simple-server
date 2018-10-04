import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    started: false,
    ip: ''
  },
  mutations: {
    SET_LOCAL_IP (state, ip) {
      state.ip = ip
    },
    START_SERVER (state, server) {
      state.started = true
    },
    CLOSE_SERVER (state) {
      state.started = false
    }
  },
  actions: { }
})
