<template>
  <div id="app">
    <app-header :title="title" :open="menuOpen" @menu="menuToggle"/>
    <app-header-menu v-show="menuOpen"/>
    <router-view/>
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
      title: 'Header',
      menuOpen: false
    }
  },
  methods: {
    menuToggle () {
      this.menuOpen = !this.menuOpen
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
}

.fade-enter-active, .fade-leave-active {
  transition: opacity $transition-duration;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
