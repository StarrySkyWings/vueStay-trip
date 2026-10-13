<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round"
        @cancel="cancelClick"></van-search>

      <!-- tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :name="key" :title="value.title"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value,key,index) in allCities" :key="index">
        <cityGroup v-show="tabActive === key" :group-data="value"></cityGroup>
      </template>
    </div>
  </div>
</template>

<script setup>
import cityGroup from './cpns/city-group.vue';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const cancelClick = () => {
  router.back()
}

// tab的切换
const tabActive = ref('')

// 从Store中获取city数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
// const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>