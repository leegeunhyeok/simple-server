<template>
  <div id="wrapper">
    <div class="card">
      <b>서버 정보</b>
      <div class="right-area">
        <input type="checkbox" id="control" v-model="start" :disabled="starting">
        <label for="control" :class="starting ? 'loading' : ''"></label>
      </div>
      <div class="content">
        서버 상태
        <div class="right-area" :class="serverStatus ? 'on' : (starting ? 'starting' : 'off')">
          {{ serverStatus ? '작동 중' : (starting ? '시작 중' : '종료 됨') }}
          <fa-icon icon="circle"/>
        </div>
      </div>
      <div class="content">
        서버 URL
        <div class="right-area">
          {{ serverStatus ? '보기' : '-' }}
        </div>
        <div class="hidden-content" v-show="port && serverStatus">
          <div class="ip-area" v-if="port">
            <div class="right-area">http://localhost{{ port === 80 ? '' : ':' + port }}</div>
          </div>
          <div class="ip-area" v-if="port">
            <div class="right-area">http://127.0.0.1{{ port === 80 ? '' : ':' + port }}</div>
          </div>
          <div class="ip-area" v-if="$store.state.ip !== '127.0.0.1' && port">
            <div class="right-area">http://{{ port === 80 ? $store.state.ip : $store.state.ip + ':' + port }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-button">
    </div>
    <div class="card">
      <b>기본 설정</b>
      <div class="content">
        <button class="button default" @click="test = !test" :disabled="serverStatus">서버 경로 선택</button>
        <div class="right-area">-</div>
      </div>
      <div class="content">
        <input class="input" type="number" min="1" max="65535" placeholder="포트" v-model.number="port" :disabled="serverStatus">
        <div class="right-area">{{ port ? port : '-' }}</div>
      </div>
    </div>
    <div class="card">
      <b>고급 설정</b>
    </div>
  </div>
</template>

<script>

export default {
  name: 'main-page',
  data () {
    return {
      start: false,
      starting: false,
      port: undefined,
      test: false
    }
  },
  computed: {
    serverStatus () {
      return this.$store.state.started
    }
  },
  watch: {
    start (newVal, oldVal) {
      this.starting = newVal
      this.$emit('serverToggle', newVal)
    },
    serverStatus (newVal) {
      if (!newVal) {
        this.start = false
      }
      this.starting = false
    }
  },
  methods: {
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

.loading {
  cursor: not-allowed;
  background-color: #b0bec5 !important;
}

.starting {
  color: #ffb74d;
  transition: $transition-duration;
}

</style>
