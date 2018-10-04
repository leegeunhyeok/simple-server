<template>
  <header>
    <p>{{ title }}</p>
    <div id="header-menu-button" @click="headerMenu">
      <transition name="fade" mode="out-in">
        <fa-icon v-if="open" key="close" icon="times"/>
        <fa-icon v-else key="open" icon="bars"/>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  props: ['title', 'open'],
  methods: {
    headerMenu () {
      this.$emit('menu')
    }
  }
}
</script>

<style lang="scss">
@import "@/common.scss";

$height: 60px;

header {
  position: relative;
  width: 100%;
  height: $height;
  background-color: #2b579a;
  color: #fff;
  line-height: $height;
  font-size: 20px;
  padding-left: 15px;

  #header-menu-button {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 0;
    width: $height;
    height: $height;
    text-align: center;
    transition: $transition-duration;

    &:hover {
      background-color: #22457b;
    }
  }
}


</style>
