<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-arrow left-text="栖宿" @click-left="onClickLeft" />
    <div class="main" v-if="mainPart">
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    </div>
  </div>
</template>

<script setup>
import detailSwipe from './cpns/detail-swipe.vue';
import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const houseId = route.params.id
// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// 请求详情页数据
const detailStore = useDetailStore()
detailStore.fetchHouseDetailData(houseId)
const { detailInfos, mainPart } = storeToRefs(detailStore)
</script>

<style lang="less" scoped></style>