<template>
  <transition name="menu" mode="out-in">
    <div id="header-menu">
      <div class="menu-item" @click="$emit('menuClick', 'home')">홈</div>
      <div class="menu-item" @click="$emit('menuClick', 'log')">
        로그
        <span class="log-count">{{ $store.state.log.length }}</span>
      </div>
      <div class="menu-item" @click="$emit('menuClick', 'info')">정보</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'app-header-menu'
}
</script>

<style lang="scss">

@import "@/common.scss";

#header-menu {
  position: fixed;
  background-color: #fff;
  width: 200px;
  height: 100%;
  right: 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
  box-sizing: border-box;
  z-index: 9998;

  .menu-item {
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    transition: $transition-duration;
    margin-bottom: 10px;

    &:hover {
      background-color: #eee;
    }

    .log-count {
      position: absolute;
      padding: 5px;
      background-color: $main;
      border-radius: 8px;
      color: #fff;
      float: right;
      top: 5px;
      right: 5px;
    }
  }
}

.menu-enter-active, .menu-leave-active {
  transition: .3s;
}

.menu-enter, .menu-leave-to {
  transform: translateX(200px);
}

</style>
