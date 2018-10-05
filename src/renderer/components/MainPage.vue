<template>
  <div id="wrapper">
    <div class="card">
      <b>서버 정보</b>
      <div class="right-area">
        <div id="control" :class="start ? 'toggle checked' : 'toggle'"></div>
        <label for="control" @click="toggle"></label>
      </div>
      <div class="content">
        서버 상태
        <div class="right-area" :class="start ? 'on' : 'off'">
          {{ start ? '실행 중' : '종료 됨' }}
          <fa-icon icon="circle"/>
        </div>
      </div>
      <div class="content">
        서버 URL
        <div class="right-area">
          <transition name="fade" mode="out-in">
            <fa-icon icon="caret-down" v-if="start"/>
            <fa-icon icon="times" v-else/>
          </transition>
        </div>
        <div class="hidden-content" v-show="port && start">
          <div class="ip-area" v-if="port">
            <div class="right-area" @click="open">http://localhost{{ port === 80 ? '' : ':' + port }}</div>
          </div>
          <div class="ip-area" v-if="port">
            <div class="right-area" @click="open">http://127.0.0.1{{ port === 80 ? '' : ':' + port }}</div>
          </div>
          <div class="ip-area" v-if="$store.state.ip !== '127.0.0.1' && port">
            <div class="right-area" @click="open">http://{{ port === 80 ? $store.state.ip : $store.state.ip + ':' + port }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-button">
    </div>
    <div class="card">
      <b>기본 설정</b>
      <div class="content">
        <button class="button default" @click="chooseDirectory" :disabled="start">서버 경로 선택</button>
      </div>
      <div class="content" style="font-size: 14px; margin-bottom: 25px;">
        <div>{{ dir ? dir : '-' }}</div>
      </div>
      <div class="content">
        <input class="input" type="number" min="1" max="65535" placeholder="포트" v-model.number="$store.state.port" :disabled="start">
        <div class="right-area">{{ port ? port : '-' }}</div>
      </div>
    </div>
    <div class="card">
      <b>고급 설정</b>
      <div class="content">준비 중..</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'main-page',
  props: ['status'],
  computed: {
    start () {
      return this.$store.state.start
    },
    port () {
      return this.$store.state.port
    },
    dir () {
      return this.$store.state.dir
    }
  },
  methods: {
    toggle () {
      if (!this.$store.state.start) {
        if (!this.$store.state.dir) {
          this.$emit('alert', '서버 디렉토리를 선택해주세요')
          return
        }
        if (!this.$store.state.port) {
          this.$emit('alert', '포트를 입력해주세요')
          return
        }
        this.$emit('serverToggle')
      } else {
        this.$emit('serverToggle')
      }
    },
    chooseDirectory () {
      const dir = this.$electron.remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: '서버 디렉토리 선택'
      })
      if (dir) {
        this.$store.commit('SET_DIRECTORY', dir[0])
      } else {
        this.$emit('alert', '디렉토리 오류')
      }
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss">

@import "@/common.scss";

#wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.on {
  color: $green;
  transition: $transition-duration;
}

.off {
  color: $red;
  transition: $transition-duration;
}

</style>
