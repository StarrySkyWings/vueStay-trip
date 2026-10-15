<template>
  <router-view></router-view>
  <tab-bar></tab-bar>
  <!-- <tab-bar v-if="!route.meta.hidden"></tab-bar> -->
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue';
</script>

<style lang="less" scoped>
</style>