<template>
  <header>
    <transition name="fade" mode="out-in">
      <!-- 상단에도 fade 효과를 주기 위해 2개 요소로 나눔 -->
      <p key="1" v-if="titleToggle">{{ title }}</p>
      <p key="2" v-else>{{ title }}</p>
    </transition>
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
  data () {
    return {
      titleToggle: false
    }
  },
  watch: {
    title (newVal, oldVal) {
      this.titleToggle = !this.titleToggle
    }
  },
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
  background-color: $main;
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
      background-color: $main;
    }

    * {
      cursor: pointer;
    }
  }
}


</style>
