<template>
  <loading></loading>
  <router-view></router-view>
  <tab-bar></tab-bar>
  <!-- <tab-bar v-if="!route.meta.hidden"></tab-bar> -->
  
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue';
import loading from './components/loading/loading.vue';
</script>

<style lang="less" scoped>
</style>