<template>
  <div id="wrapper">
    Main!
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'

export default {
  name: 'main-page',
  components: { SystemInformation },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>

#wrapper {
  width: 100%;
  height: 100%;
}

</style>
