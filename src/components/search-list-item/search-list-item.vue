<template>
  <div class="search-list-item">
    <div class="swiper-wrapper">
      <!-- 展示图 -->
      <img class="banner" :src="itemData.defaultPicture" alt="">
      <!-- 推荐分数 -->
      <div class="bottom">
        <msgTip :brief="itemData.commentBriefForCD" />
      </div>
      <!-- 侧边栏 -->
      <div class="side-bar">
        <toolBar :tool-data="getToolbarData" />
      </div>
    </div>
    <div class="content">
      <searchListItemTitle :title-data="getTitleData" />
      <searchListItemInfo :info-data="getInfoData" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import msgTip from '../msg-tip/msg-tip.vue';
import toolBar from '../tool-bar/tool-bar.vue';
import searchListItemTitle from '../search-list-item-title/search-list-item-title.vue';
import searchListItemInfo from '../search-list-item-info/search-list-item-info.vue';
const prop = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const getToolbarData = computed(() => {
  let favoriteCount = 0;
  let totalCount = 0;
  if (prop.itemData.preloadHouse) {
    favoriteCount = prop.itemData.preloadHouse.favoriteCount;
    totalCount = prop.itemData.preloadHouse.totalCount;
  } else {
    totalCount = prop.itemData.commentBriefForCD.totalCount;
  }
  return {
    logoUrl: prop.itemData.logoUrl,
    favoriteCount,
    totalCount,
  }
})

const getTitleData = computed(() => {
  return {
    address: prop.itemData.address,
    unit: prop.itemData.unitSummeries[0]?.text,
    unitDesp: prop.itemData.unitSummeries[1]?.text,
    unitName: prop.itemData.unitName,
  };
})

const getInfoData = computed(() => {
  return {
    houseTags: prop.itemData.houseTags,
    promoContent: prop.itemData.promoContent,
    finalPrice: prop.itemData.finalPrice,
    productPrice: prop.itemData.productPrice,
    priceTipBadge: prop.itemData.priceTipBadge,
  }
})
</script>

<style lang="less" scoped>
.search-list-item {
  margin: 10px 0px;

  .swiper-wrapper {
    position: relative;

    .banner {
      width: 100%;
      border-radius: 6px;
      margin-bottom: 7px;
    }

    .bottom {
      position: absolute;
      bottom: 15px;
      left: 10px;
      right: 10px;
    }

    .side-bar {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>