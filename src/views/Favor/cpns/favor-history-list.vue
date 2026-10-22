<template>
  <div class="historylist">
    <div class="content">
      <template v-for="(item, index) in historyList" :key="index">
        <searchListItem :item-data="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import searchListItem from '@/components/search-list-item/search-list-item.vue';
import usefavorStore from '@/stores/modules/favor';
import { storeToRefs } from 'pinia';

const favorStore = usefavorStore()
favorStore.fetchHistoryListData()
const { historyList } = storeToRefs(favorStore)
</script>

<style lang="less" scoped></style>