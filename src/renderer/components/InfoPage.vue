<template>
  <div id="info">
    <img src="@/assets/logo.png">
    <h2>Simple Server</h2>
    <b>Release v0.2.1</b>
    <div class="items">
      <div class="item">
        Vue.js: <b class="version">{{ vue }}</b>
      </div>
      <div class="item">
        Electron: <b class="version">{{ electron }}</b>
      </div>
      <div class="item">
        Node: <b class="version">{{ node }}</b>
      </div>
      <div class="item">
        Platform: <b class="version">{{ platform }}</b>
      </div>
    </div>
    <div id="developer">
      <fa-icon icon="question-circle"/><br>
      <b class="developer">Developer: Geunhyeok LEE</b>
    </div>
    <div id="github">
      <b>
        Github: <b class="dev" @click="open('https://github.com/leegeunhyeok')">Profile</b>, 
        <b class="dev" @click="open('https://github.com/leegeunhyeok/simple-server')">Source</b>
      </b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-info',
  data () {
    return {
      electron: process.versions.electron,
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version
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

#info {
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;

  img {
    width: 40%;
    margin-top: 20px;
  }

  h2 {
    color: $main;
  }

  b {
    color: #888;
  }
  
  .items {
    margin-top: 16px;
    width: 100%;

    .item {
      display: inline-block;
      width: 100%;
      text-align: center;
      color: #888;
      font-weight: bold;

      b.version {
        color: #35495e;
      }
    }
  }

  #developer {
    margin-top: 40px;
    width: 100%;
  }
}

.developer {
  animation: rainbow 2s alternate infinite;
}

.dev {
  cursor: pointer;
}

.dev:hover {
  animation: rainbow 1s alternate infinite;
}

@keyframes rainbow {
  0% {
    color: red;
  }

  25% {
    color: orange;
  }

  50% {
    color: green;
  }

  75% {
    color: dodgerblue;
  }

  100% {
    color: purple;
  }
}

@-webkit-keyframes rainbow {
  0% {
    color: red;
  }

  25% {
    color: gold;
  }

  50% {
    color: green;
  }

  75% {
    color: dodgerblue;
  }

  100% {
    color: purple;
  }
}
</style>
