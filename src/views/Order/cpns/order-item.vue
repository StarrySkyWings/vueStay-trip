<template>
  <div class="order-item">
    <orderItemTitle :title-data="itemData" />
    <orderItemInfo :info-data="itemData"/>
    <orderItemBtn :btn-data="itemData"/>
  </div>
</template>

<script setup>
import orderItemTitle from '@/components/order-item-title/order-item-title.vue';
import orderItemInfo from '@/components/order-item-info/order-item-info.vue';
import orderItemBtn from '@/components/order-item-btn/order-item-btn.vue';

defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.order-item {
  padding: 0 20px;
  margin-top: 10px;
  background-color: white;
  // padding-bottom: 50px;
}
</style>