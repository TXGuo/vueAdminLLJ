<template>
  <div id="app">
    <layout v-if="this.$route.path!='/login'"></layout>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from "@/views/layout/Layout";
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    Layout
  }
};
</script>
<style lang="less" scoped>
  // #app{
  //   height:auto;
  //   overflow:visible;
  //   padding-bottom:100px;
  // }
</style>
