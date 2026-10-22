<template>
  <div class="message top-page">
    <van-nav-bar title="消息中心" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="wap-nav" size="18" />
      </template>
    </van-nav-bar>
    <div class="content">
      <img src="@/assets/img/message/icon_message.png" alt="">
      <div class="text">暂无聊天消息</div>
    </div>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
.message {

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

  :deep(.van-nav-bar__title) {
    color: var(--primary-color);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    img {
      width: 88%;
    }
  }
}
</style>