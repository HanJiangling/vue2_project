<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <FootGuide v-if="$route.meta.isshowfooter" />
  </div>
</template>

<script>
import FootGuide from "./components/FooterGuide/FootGuide";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  components: {
    FootGuide,
  },
  mounted() {
    this.$store.dispatch("getshops");
    this.$store.dispatch("getcookie");
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus"></style>
