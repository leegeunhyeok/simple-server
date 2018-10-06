import Vue from 'vue'
import Vuex from 'vuex'

import Server from '@/server.js'
import Logger from '@/logger.js'

Vue.use(Vuex)

const logger = new Logger()

export default new Vuex.Store({
  state: {
    log: [],
    start: false,
    started: false,
    ip: '',
    port: 8080,
    dir: '',
    root: 'index.html',
    server: null
  },
  mutations: {
    WRITE_LOG (state, log) {
      state.log.push(`[${logger.currentTime()}] ${log}`)
    },
    CLEAR_LOG (state) {
      state.log = []
    },
    SET_LOCAL_IP (state, ip) {
      state.ip = ip
    },
    SET_DIRECTORY (state, dir) {
      state.dir = dir
    },
    SET_ROOT (state, root) {
      state.root = root
    },
    SET_START_BUTTON_STATE (state, on) {
      state.start = on
    },
    START_SERVER (state, server) {
      state.server = server
      state.started = true
    },
    CLOSE_SERVER (state) {
      state.server = null
      state.start = false
      state.started = false
    }
  },
  actions: {
    START ({ commit, state }) {
      commit('WRITE_LOG', 'Starting server..')
      return new Promise((resolve, reject) => {
        setImmediate(() => {
          const server = new Server().start(state.port, state.dir, state.root, () => {
            commit('START_SERVER', server)
            commit('WRITE_LOG', 'Server started')
          }, (method, url) => {
            commit('WRITE_LOG', `${method} ${url}`)
          })

          if (server['listening']) {
            resolve()
          } else {
            commit('WRITE_LOG', 'Cannot starting server')
            reject(new Error('Cannot starting server'))
          }
        })
      })
    },
    CLOSE ({ commit, state }) {
      commit('WRITE_LOG', 'Closing server..')
      setImmediate(() => {
        state.server.shutdown(() => {
          commit('WRITE_LOG', 'Server closed')
          commit('CLOSE_SERVER')
        })
      })
    }
  }
})
