<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
  </div>
</template>

<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
import homeBanner from './cpns/home-banner.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeCategories from './cpns/home-categories.vue';
</script>

<style lang="less" scoped>

</style>