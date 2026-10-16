<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houselist" :key="item.data.houseId">
        <house-item-v9 @click="itemClick(item.data)" v-if="item.discoveryContentType === 9" :item-data="item.data"/>
        <house-item-v3 @click="itemClick(item.data)" v-else-if="item.discoveryContentType === 3" :item-data="item.data"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
homeStore.fetchHouselistData()
const { houselist } = storeToRefs(homeStore)

const router = useRouter()
// 跳转到详情页
const itemClick = (itemData) => {
  router.push('/detail/' + itemData.houseId)
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>