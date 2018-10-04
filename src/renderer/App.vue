<template>
  <div id="app">
    <app-header :title="title" :open="menuOpen" @menu="menuToggle"/>
    <app-header-menu v-show="menuOpen" @menuClick="menuClick($event)"/>
    <router-view @serverToggle="serverToggle($event)"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Headermenu from '@/components/HeaderMenu.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-header-menu': Headermenu
  },
  data () {
    return {
      title: '홈',
      menuOpen: false,
      server: null
    }
  },
  created () {
    /* 로컬 IP 주소 조회 */
    require('dns').lookup(require('os').hostname(), (err, address, fam) => {
      if (err) {
        this.$store.commit('SET_LOCAL_IP', '127.0.0.1')
      } else {
        this.$store.commit('SET_LOCAL_IP', address)
      }
    })
  },
  methods: {
    menuToggle () {
      this.menuOpen = !this.menuOpen
    },
    menuClick (path) {
      if (path === 'home') {
        this.title = '홈'
      } else if (path === 'log') {
        this.title = '로그'
      } else if (path === 'info') {
        this.title = '정보'
      } else {
        this.title = 'App'
      }
      this.menuOpen = false
    },
    serverToggle (on) {
      if (on) {
        const express = require('express')
        const app = express()

        app.get('/', (req, res) => {
          res.send('Hello!!!')
        })

        // TODO: 포트 지정한 데이터로 설정
        this.server = app.listen(8080)

        this.$store.commit('START_SERVER')
        console.log('Listening')
      } else {
        // TODO: 서버 닫히지 않는 문제 확인
        this.server.close()
        this.$store.commit('CLOSE_SERVER')
        console.log('Server closed')
      }
    }
  }
}
</script>

<style lang="scss">

@import "@/common.scss";

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif';
  background-color: #eee;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  user-select: none;
  cursor: default;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity $transition-duration;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.card {
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  transition: $transition-duration;

  .content {
    margin-top: 10px;

    .right-area {
      margin-top: 5px;
    }

    &:hover .hidden-content {
      max-height: 500px;
      transition: max-height $transition-duration + 0.2 ease-in;
    }
  }

  .hidden-content {
    margin-top: 10px;
    max-height: 0;
    transition: max-height $transition-duration + 0.2 ease-out;
    overflow: hidden;

    .ip-area {
      display: inline-block;
      width: 100%;
      
      div {
        cursor: pointer;
        transition: $transition-duration;
      }

      div:hover {
        color: $main;

        &::before {
          content: "";
          color: #000;
          margin-right: 10px;
          border: 1px solid $main;
          transition: $transition-duration;
        }
      }
    }
  }
}

.card-button {
  text-align: center;
}

.right-area {
  float: right;
  height: 20px;
}

.button {
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 5px 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  transition: $transition-duration;

  &.default {
    background-color: #fff;

    &:hover {
      background-color: #eee;
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
  }

  &:disabled:hover {
    background-color: #eee;
  }
}

.input[type=text], input[type=number] {
  cursor: pointer;
  border: none;
  outline: none;
  padding: 5px 10px;
  width: 100px;
  border-bottom: 2px solid #ddd;
  transition: $transition-duration;

  &:hover {
    border-bottom: 2px solid $main;
  }

  &:focus {
    border-bottom: 2px solid $main;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
    border-bottom: 2px solid #ddd;
  }

  &:disabled:hover {
    background-color: #eee;
    border-bottom: 2px solid #ddd;
  }

  &:disabled:focus {
    background-color: #eee;
    border-bottom: 2px solid #ddd;
  }
}

input[type=checkbox] {
  position: fixed;
	height: 0;
	width: 0;
  visibility: hidden;
}

label {
	cursor: pointer;
	width: 40px;
	height: 20px;
	background: grey;
	display: block;
  border-radius: 10px;
  margin-top: 2px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 2px;
	left: 2px;
	width: 16px;
	height: 16px;
	background: #fff;
	border-radius: 50%;
	transition: 0.3s;
}

input:checked + label {
	background: #6a89b8;
}

input:checked + label:after {
	left: calc(100% - 2px);
	transform: translateX(-100%);
}

</style>
