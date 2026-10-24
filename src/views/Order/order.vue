<template>
  <div class="order" ref="orderRef">
    <!-- 导航栏 -->
    <orderNavBar />
    <!-- tabs -->
    <orderTabs @change="val => activeName = val" />
    <!-- 内容列表 -->
    <orderContent :activeIndex="activeName" />
  </div>
</template>

<script setup>
import orderNavBar from './cpns/order-nav-bar.vue';
import orderTabs from './cpns/order-tabs.vue';
import orderContent from './cpns/order-content.vue';
import { ref } from 'vue';
defineOptions({
  name: 'order'
})
const activeName = ref('all')
</script>

<style lang="less" scoped>
.order {
  height: 100vh;
  padding-bottom: 55px;
  box-sizing: border-box;
}
</style>