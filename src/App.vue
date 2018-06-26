<template>
  <div id="app">
    <layout v-if="token"></layout>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from "@/views/layout/Layout";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["token"])
  },
  components: {
    Layout
  }
};
</script>
