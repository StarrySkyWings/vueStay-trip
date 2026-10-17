<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item,index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
.swipe{
  .swipe-list{
    img {
      width: 100%;
    }
  }
}
</style>