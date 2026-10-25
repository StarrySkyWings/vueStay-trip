<template>
  <div class="search top-page">
    <!-- 导航栏 -->
    <searchNavBar />
    <!-- tabs -->
    <searchTabs />
    <!-- list -->
    <div class="list">
      <template v-for="(item, index) in searchHouse.items" :key="index">
        <search-list-item :item-data="item"></search-list-item>
      </template>
    </div>
  </div>
</template>

<script setup>
import searchNavBar from './cpns/search-nav-bar.vue';
import searchTabs from './cpns/search-tabs.vue';
import searchListItem from '@/components/search-list-item/search-list-item.vue';
import useSearchStore from '@/stores/modules/search.js';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore()
searchStore.fetchSearchConditionData()
searchStore.fetchSearchHouseData()
const { searchHouse } = storeToRefs(searchStore)
</script>

<style lang="less" scoped>
.search {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f7f8fb;

  .list {
    padding: 0 20px 0 20px;
    z-index: -1;
    position: relative;
  }
}
</style>