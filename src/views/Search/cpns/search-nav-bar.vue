<template>
  <div class="search-nav-bar">
    <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="wap-nav" size="18" />
      </template>
      <template #title>
        <searchBar :title="route.query.currentCity" height="35px" keyword="搜索博尔塔拉的景点、地标、房源"/>
      </template>
    </van-nav-bar>
    <van-popup v-model:show="showRight" closeable position="right" :style="{ width: '50%', height: '100%' }">
      <div class="sidebar">
        <div class="sidebar-item" @click="itemClick">
          <van-icon color="#333" size="20" name="home-o" />
          <div class="text">首页</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import searchBar from '@/components/search-bar/search-bar.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
console.log(route.query.address)
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
const showRight = ref(false)
const onClickRight = () => {
  showRight.value = true
}
const itemClick = () => {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.search-nav-bar {
  .sidebar {
    margin-top: 60px;
    margin-left: 50px;

    .sidebar-item {
      display: flex;
      align-items: center;
      text-align: center;
      padding-bottom: 10px;
      width: 100px;
      border-bottom: 1px solid #f5f5f5;
      color: #333;

      .text {
        font-size: 14px;
        margin-left: 15px;
      }
    }
  }
}
</style>