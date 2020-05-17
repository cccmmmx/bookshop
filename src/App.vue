<template>
  <div id="app">
    <Header v-if="isShow" class="header" />
    <!-- <div class="wrapper" > -->
    <router-view :class="isShow ? 'view' : ''"></router-view>
    <!-- </div> -->

  </div>
</template>
<script>
import Header from "./components/header";

import sidebar from './components/sidebar'
export default {
  name: "app",
  data() {
    return {};
  },
  components: { Header,sidebar },
  created() {
    this.$store.dispatch('getCartList')
  },
  computed: {
    isShow() {
      if (!this.$route.meta.index) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 100px;
  position: relative;
  width: 100%;
    height: 100%;
    box-sizing: border-box;
}
  .view {
  width: 75%;
  margin: 0 auto;
  // margin-top: 20px;
  min-height: 500px;
// }
}


.header {
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  z-index: 1000;
}

// @media screen and (min-width:1200px) {
//   .view {
//     width: 1040px;
//   }
// }
// @media (max-width: 1920px) {
//   .view {
//     width: 1280px;
//   }
// }
</style>
