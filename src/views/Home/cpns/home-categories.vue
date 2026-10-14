<template>
  <div class="categories">
    <template v-for="(item) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchCategoriesData()
const { categories } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    width: 70px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>