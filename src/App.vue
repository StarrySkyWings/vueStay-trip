<template>
  <router-view v-slot="props">
    <keep-alive include="home">
      <component :is='props.Component'></component>
    </keep-alive>
  </router-view>
  <tab-bar/>
  <loading/>
  <!-- <tab-bar v-if="!route.meta.hidden"></tab-bar> -->
  
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue';
import loading from './components/loading/loading.vue';
</script>

<style lang="less" scoped>
</style>