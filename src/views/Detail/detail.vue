<template>
  <div class="detail top-page" ref="detailRef">
    <tabControl v-if="showTabControl" :titles="names" @tab-item-click="tabClick" ref="tabControlRef" />
    <detailNavBar />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detailInfos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
      <detailFacility name="设施" :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <detailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <detailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <detailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <detailIntro :price-intro="mainPart.introductionModule" />
    </div>
    <detailFooter />
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
import detailIntro from './cpns/detail-Intro.vue';
import detailFooter from './cpns/detail-footer.vue';
import tabControl from '@/components/tab-control/tab-control.vue';

import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import useScroll from '@/hooks/useScroll.js';
import smoothScrollTo from '@/hooks/smoothScrollTo.js';

const route = useRoute()
const houseId = route.params.id
// 请求详情页数据
const detailStore = useDetailStore()
detailStore.fetchHouseDetailData(houseId)
const { mainPart } = storeToRefs(detailStore)

// tabControl相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute('name')
  sectionEls.value[name] = value.$el
}
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if (index !== 0) {
    instance = instance - 44
  }
  // detailRef.value.scrollTo({
  //   top: instance,
  //   behavior:'smooth'
  // })
  smoothScrollTo(detailRef.value, instance, 500)
}

// 页面滚动，滚动时匹配对应的tabControl的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  // 获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const offsetTops = els.map(el => el.offsetTop)

  // 根据newValue去匹配想要的索引
  let index = offsetTops.length - 1
  for (let i = 0; i < offsetTops.length; i++) {
    if (offsetTops[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  tabControlRef.value?.setCurrentIndex(index)
})


</script>

<style lang="less" scoped></style>