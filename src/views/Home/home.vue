<template>
  <div class="home" ref="homeRef">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <home-content></home-content>
    <div class="home-top" v-if="isShowSearchBar">
      <search-bar :search-icon="true"></search-bar>
    </div>
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
import { computed, onActivated, ref, watch } from 'vue'

defineOptions({
  name: 'home'
})
const homeStore = useHomeStore()

// 监听滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
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

// 跳转回home时,保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;

  .home-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 16px 16px 10px 16px;
    background-color: white;
    z-index: 100;
  }
}
</style>