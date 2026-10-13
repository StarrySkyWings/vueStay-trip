<template>
  <div class="city top-page">
    <!-- 搜索框 -->
    <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round"
      @cancel="cancelClick"></van-search>

    <!-- tab的切换 -->
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <van-tab title="国内·港澳台"></van-tab>
      <van-tab title="海外"></van-tab>
    </van-tabs>

    
  </div>
</template>

<script setup>
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
</script>

<style lang="less" scoped></style>