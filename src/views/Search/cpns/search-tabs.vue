<template>
  <div class="search-tabs">
    <!-- 位置 - 欢迎度排序 - 筛选 -->
    <dropdownSelect :select-data="searchConditions"/>
    <!-- 优惠 - 多人入驻 -->
    <div class="tab-wrapper">
      <tabSelect :tab-data="searchHouse.hotFilters"/>
    </div>
  </div>
</template>

<script setup>
import dropdownSelect from '@/components/dropdown-select/dropdown-select.vue';
import tabSelect from '@/components/tab-select/tab-select.vue';
import useSearchStore from '@/stores/modules/search';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore()
const { searchConditions, searchHouse } = storeToRefs(searchStore)
</script>

<style lang="less" scoped>
.tab-wrapper {
  padding: 12px 0 10px 20px;
  background-color: #f7f8fb;
}
</style>