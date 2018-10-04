<template>
  <transition name="menu" mode="out-in">
    <div id="header-menu">
      menu
    </div>
  </transition>
</template>

<script>
export default {
  name: 'app-header-menu'
}
</script>

<style>

#header-menu {
  position: fixed;
  background-color: #fff;
  width: 200px;
  height: 100%;
  right: 0px;
}


.menu-enter-active, .menu-leave-active {
  transition: .3s;
}

.menu-enter, .menu-leave-to {
  transform: translateX(200px);
}
</style>
