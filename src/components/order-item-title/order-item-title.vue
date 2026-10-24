<template>
  <div class="order-item-title">
    <div class="name ellipsis-text-1">
      {{ removeString(titleData.unitName)}}
    </div>
    <div class="status-name" :style="{color:titleData.orderStatusDescColor }">
      {{ titleData.orderStatusDesc }}
      <div class="sub-name">{{ titleData.cancelReasonDesc }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titleData: {
    type: Object,
    default: () => ({})
  }
})

const removeString = (stringText) => {
  return stringText.replaceAll('3', '').replaceAll('｛', '').replaceAll('｝','').replaceAll('①','')
}
</script>

<style lang="less" scoped>
.order-item-title {
  padding: 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .name {
    max-width: 204px;
    font-size: 12px;
    color: #333;
    line-height: 12px;
  }

  .status-name {
    font-size: 18px;
    color: #ff9645;
    letter-spacing: 0;
  }

  .sub-name {
    position: relative;
    left: -5px;
    font-size: 12px;
    color: #b2b2b2;
  }
}
</style>