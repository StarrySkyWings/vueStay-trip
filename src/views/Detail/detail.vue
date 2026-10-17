<template>
 <div class="detail top-page">
   <van-nav-bar title="房屋详情" left-arrow left-text="栖宿" @click-left="onClickLeft" />
 </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped>
</style>