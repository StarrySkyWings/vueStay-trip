<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <home-content></home-content>
  </div>
</template>

<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
import homeBanner from './cpns/home-banner.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import useHomeStore from '@/stores/modules/home.js';

const homeStore = useHomeStore()

// 监听window窗口的滚动
window.addEventListener('scroll',() => {
  const scrollTop = document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  if(scrollTop + clientHeight >= scrollHeight){
    homeStore.fetchHouselistData()
  }
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
</style>