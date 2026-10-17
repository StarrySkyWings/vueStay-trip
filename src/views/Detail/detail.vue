<template>
  <div class="detail top-page">
    <detailNavBar />
    <div class="main" v-if="mainPart">
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detailInfos :top-infos="mainPart.topModule"/>
    </div>
  </div>
</template>

<script setup>
import detailNavBar from './cpns/detail-nav-bar.vue';
import detailSwipe from './cpns/detail-swipe.vue';
import detailInfos from './cpns/detail-infos.vue';
import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute()
const houseId = route.params.id
// 请求详情页数据
const detailStore = useDetailStore()
detailStore.fetchHouseDetailData(houseId)
const { mainPart } = storeToRefs(detailStore)
</script>

<style lang="less" scoped></style>