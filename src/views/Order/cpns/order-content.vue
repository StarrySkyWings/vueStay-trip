<template>
  <div class="content">
    <div class="content-inner" v-if="orderList.length">
      <template v-for="(item,index) in orderList" :key="index">
       <orderItem :item-data="item"/>
      </template>
    </div>
    <div class="tips" v-else>
      <img src="@/assets/img/order/icon-order.png" alt="" />
      <div class="title">近期暂无订单</div>
    </div>
  </div>
</template>

<script setup>
import orderItem from './order-item.vue';
import useOrderStore from '@/stores/modules/order';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const props = defineProps({
  activeIndex:{
    type:String,
    default:'all'
  }
})

const orderStore = useOrderStore()
orderStore.fetchOrderListData()
const { orderList } = storeToRefs(orderStore)
watch(() => props.activeIndex,(newValue) => {
  orderStore.fetchOrderListData(newValue)
})
</script>

<style lang="less" scoped>
.content {
  height: calc(100% - 86px);
  overflow: scroll;
  background-color: var(--line-color);

  .tips {
    text-align: center;
    margin-top: 80px;
    

    img {
      width: 88%;
    }

    .title {
      margin-top: 20px;
      color: #000;
      font-size: 18px;
    }
  }
}
</style>