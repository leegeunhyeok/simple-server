<template>
  <div id="log">
    <div class="card">
      <b>로그</b>
      <div class="content">
        모두 지우기
        <div class="right-area" style="margin-top: 0px">
          <button class="button red" @click="clear">
            <fa-icon icon="trash"/>
          </button>
        </div>
      </div>
      <br>
      <hr>
      <div class="content log-area" id="log-area">
        <div class="log" v-for="(log, i) in $store.state.log" :key="i">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-log',
  computed: {
    logLength () {
      return this.$store.state.log.length
    }
  },
  watch: {
    logLength () {
      this.scrollDown()
    }
  },
  mounted () {
    this.scrollDown()
  },
  methods: {
    clear () {
      this.$store.commit('CLEAR_LOG')
    },
    scrollDown () {
      const log = document.getElementById('log-area')
      log.scrollTop = log.scrollHeight - log.clientHeight
    }
  }
}
</script>

<style lang="scss">

@import "@/common.scss";

#log {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.log-area {
  height: 380px;
  overflow-y: auto;

  .log {
    color: #777;
  }
}

.red {
  background-color: $red;
  color: #fff;

  & svg {
    cursor: pointer;

    & * {
      cursor: pointer;
    }
  }

  &:hover {
    background-color: #c3352b;
  }
}

</style>
