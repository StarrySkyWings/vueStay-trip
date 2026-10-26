<template>
  <div class="nav-bar">
    <van-nav-bar title="订单列表" left-arrow left-text="栖宿" @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="wap-nav" size="18" />
      </template>
    </van-nav-bar>
    <van-popup v-model:show="showRight" closeable position="right" :style="{ width: '50%', height: '100%' }">
      <div class="sidebar">
        <div class="sidebar-item" @click="itemClick('/home')">
          <van-icon color="#333" size="20" name="home-o" />
          <div class="text">首页</div>
        </div>
        <div class="sidebar-item" @click="itemClick('/favor')">
          <van-icon color="#333" size="20" name="like-o" />
          <div class="text">收藏</div>
        </div>
        <div class="sidebar-item" @click="itemClick('/order')">
          <van-icon color="#333" size="20" name="orders-o" />
          <div class="text">订单</div>
        </div>
        <div class="sidebar-item" @click="itemClick('/message')">
          <van-icon color="#333" size="20" name="comment-o" />
          <div class="text">消息</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
// 监听返回按钮的点击
const onClickLeft = () => {
  router.replace('/home')
}
const showRight = ref(false)
const onClickRight = () => {
  showRight.value = true
}
const itemClick = (path) => {
  router.replace(path)
}

</script>

<style lang="less" scoped>
.nav-bar {

  :deep(.van-nav-bar__title) {
    color: var(--primary-color);
  }

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
      margin-top: 20px;

      .text {
        font-size: 14px;
        margin-left: 15px;
      }
    }
  }
}
</style>