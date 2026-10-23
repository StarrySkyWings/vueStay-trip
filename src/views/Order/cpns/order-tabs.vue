<template>
  <div class="tabs">
    <van-tabs v-model:active="activeName" :line-height="2" title-active-color="#ff9854">
      <van-tab name="all" title="全部订单"></van-tab>
      <van-tab name="recent" title="近期订单"></van-tab>
      <van-tab name="pend" title="待支付"></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const activeName = ref('all')
const emit = defineEmits(['change'])
watch(activeName, (newValue) => emit('change', newValue))
</script>

<style lang="less" scoped>
.tabs {
  --van-tabs-line-height: 40px;
}
</style>