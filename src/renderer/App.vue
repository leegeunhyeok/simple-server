<template>
  <div id="app">
    <app-alert :message="message" v-if="alertOpen"/>
    <app-header :title="title" :open="menuOpen" @menu="menuToggle"/>
    <app-header-menu v-show="menuOpen" @menuClick="menuClick($event)"/>
    <router-view @serverToggle="serverToggle($event)" @alert="alert($event)"/>
  </div>
</template>

<script>

import Alert from '@/components/Alert.vue'
import Header from '@/components/Header.vue'
import Headermenu from '@/components/HeaderMenu.vue'

export default {
  name: 'app',
  components: {
    'app-alert': Alert,
    'app-header': Header,
    'app-header-menu': Headermenu
  },
  data () {
    return {
      title: '홈',
      message: '',
      alertOpen: false,
      menuOpen: false,
      watingAlert: undefined
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
        this.$router.push({ name: 'main' })
      } else if (path === 'log') {
        this.title = '로그'
        this.$router.push({ name: 'log' })
      } else if (path === 'info') {
        this.title = '정보'
        this.$router.push({ name: 'info' })
      } else {
        this.title = 'App'
      }
      this.menuOpen = false
    },
    serverToggle () {
      if (!this.$store.state.start) {
        this.$store.dispatch('START').then(() => {
          this.$store.commit('SET_START_BUTTON_STATE', true)
        }).catch(e => {
          this.$store.commit('SET_START_BUTTON_STATE', false)
          this.alert('서버를 시작할 수 없습니다')
        })
      } else {
        this.$store.dispatch('CLOSE')
      }
    },
    alert (message) {
      if (message) {
        if (this.alertOpen) {
          try {
            clearTimeout(this.watingAlert)
          } catch (e) { }
          this.alertOpen = false
          setTimeout(() => {
            this.message = message
            this.alertOpen = true
            this.watingAlert = setTimeout(() => {
              this.alertOpen = false
            }, 2500)
          }, 300)
        } else {
          this.alertOpen = true
          this.message = message
          this.watingAlert = setTimeout(() => {
            this.alertOpen = false
          }, 2500)
        }
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

body {
  width: 100vw;
  overflow-x: hidden;
}

body::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  background: rgba(170, 170, 170, 0.5);
  border-radius: 3px;
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

.collapse {
  transition: all .6s ease-in-out;
  height: auto;
  overflow: hidden;
  max-height: 500px;
  width: 100%;
  box-sizing: border-box;

  &.hidden {
    max-height: 0px;
  }
}

.custom {
  padding: 0 8px;
  box-sizing: border-box;
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
    margin: 10px 0;

    &:hover .hidden-content {
      max-height: 500px;
      transition: max-height $transition-duration + 0.2 ease-in;
    }
  }

  .hidden-content {
    max-height: 0;
    transition: max-height $transition-duration + 0.2 ease-out;
    overflow: hidden;

    .ip-area {
      display: inline-block;
      width: 100%;
      
      div {
        cursor: pointer;
      }

      div:hover {
        color: $main;
      }
    }
  }
}

.sub-content {
  margin: 10px 0;
  width: 100%;
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
    color: #000;
    background-color: #fff;

    &:hover {
      background-color: #eee;
    }
  }

  &.green {
    color: #fff;
    background-color: $green;

    &:hover {
      background-color: darken($green, 5%);
    }
  }

  &.red {
    background-color: $red;

    &:hover {
      background-color: darken($red, 5%);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
    color: #000;
  }

  &:disabled:hover {
    background-color: #eee;
    color: #000;
  }
}

.input[type=text], input[type=number] {
  cursor: text;
  border: none;
  outline: none;
  padding: 5px 10px;
  width: 100px;
  border-bottom: 2px solid #ddd;
  margin-bottom: 5px;
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

.toggle {
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

.toggle.checked + label {
	background: #6a89b8;
}

.toggle.checked + label:after {
	left: calc(100% - 2px);
	transform: translateX(-100%);
}

select {
  cursor: pointer;
  padding: 2px;
  border: 2px solid #ddd;
  border-radius: 3px;
  transition: $transition-duration;

  &:focus {
    border: 2px solid $main;
  }

  &:hover {
    border: 2px solid $main;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
    border: 2px solid #ddd;
  }

  &:disabled:hover {
    background-color: #eee;
    border: 2px solid #ddd;
  }

  &:disabled:focus {
    background-color: #eee;
    border: 2px solid #ddd;
  }
}

textarea {
  border: 2px solid #ddd;
  border-radius: 10px;
  resize: none;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 160px;
  margin-top: 10px;
}

</style>
