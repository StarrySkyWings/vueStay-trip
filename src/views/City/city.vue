<template>
  <div class="city top-page">
    <!-- 搜索框 -->
    <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round"
      @cancel="cancelClick"></van-search>

    <!-- tab的切换 -->
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <template v-for="(value,key,index) in allCities" :key="key">
        <van-tab :title="value.title"></van-tab>
      </template>
    </van-tabs>


  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const cancelClick = () => {
  router.back()
}

// tab的切换
const tabActive = ref(0)

// 从Store中获取city数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)


</script>

<style lang="less" scoped></style>