<template>
  <div class="detail top-page">
    <detailNavBar />
    <div class="main" v-if="mainPart">
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detailInfos :top-infos="mainPart.topModule" />
      <detailFacility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detailLandlord :landlord="mainPart.dynamicModule.landlordModule" />
      <detailComment :comment="mainPart.dynamicModule.commentModule" />
      <detailNotice :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <detailMap :position="mainPart.dynamicModule.positionModule"/>
    </div>
  </div>
</template>

<script setup>
import detailNavBar from './cpns/detail-nav-bar.vue';
import detailSwipe from './cpns/detail-swipe.vue';
import detailInfos from './cpns/detail-infos.vue';
import detailFacility from './cpns/detail-facility.vue';
import detailLandlord from './cpns/detail-landlord.vue';
import detailComment from './cpns/detail-comment.vue';
import detailNotice from './cpns/detail-notice.vue';
import detailMap from './cpns/detail-map.vue';
import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import DetailIntro from './cpns/detail-Intro.vue';

const route = useRoute()
const houseId = route.params.id
// 请求详情页数据
const detailStore = useDetailStore()
detailStore.fetchHouseDetailData(houseId)
const { mainPart } = storeToRefs(detailStore)
</script>

<style lang="less" scoped></style>