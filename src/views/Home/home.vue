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
import useScroll from '@/hooks/useScroll.js';
import { watch } from 'vue'
const homeStore = useHomeStore()

const { isReachBottom } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
</style>