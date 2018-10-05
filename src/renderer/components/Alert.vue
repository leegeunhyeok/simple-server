<template>
  <transition name="alert" mode="out-in">
    <div id="alert">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  name: 'app-alert',
  props: ['message']
}
</script>

<style lang="scss">

@import "@/common.scss";

#alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  color: $main;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  line-height: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  z-index: 9999;
}

.alert-enter-active, .alert-leave-active {
  transition: .3s;
}

.alert-enter, .alert-leave-to {
  transform: translateY(-90px);
}

</style>
