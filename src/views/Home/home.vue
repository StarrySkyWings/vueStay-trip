<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <home-content></home-content>
    <search-bar v-if="isShowSearchBar"></search-bar>
  </div>
</template>

<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
import homeBanner from './cpns/home-banner.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';
import useHomeStore from '@/stores/modules/home.js';
import useScroll from '@/hooks/useScroll.js';
import { computed, watch } from 'vue'
const homeStore = useHomeStore()

// 监听滚动到底部
const { isReachBottom,scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
</style>