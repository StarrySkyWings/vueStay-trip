<template>
  <div class="navbar">
    <van-nav-bar title="房屋详情" left-arrow left-text="栖宿" @click-left="onClickLeft" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped></style>