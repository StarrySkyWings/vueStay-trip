<template>
  <div class="search-list-item-title">
    <div class="info">
      <van-tag color="#3f4954" text-color="#fff">{{ titleData.address }}</van-tag>
      <span class="name">{{ titleData.unit }}</span>
      <span class="desp">{{ titleData.unitDesp }}</span>
    </div>
    <div class="title ellipsis-text-2">{{ titleData.unitName }}</div>
  </div>
</template>

<script setup>
defineProps({
  titleData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.info {
  display: flex;
  align-items: center;

  .name,
  .desp {
    font-size: 12px;
    white-space: nowrap;
    color: #666;
  }

  .name {
    position: relative;
    margin-left: 10px;
    margin-right: 10px;

    &::after {
      position: absolute;
      content: "";
      top: 45%;
      right: -25%;
      width: 2px;
      height: 2px;
      border-radius: 2px;
      background-color: #666;
    }
  }
}

.title {
  line-height: 22px;
  font-size: 18px;
  margin-top: 8px;
  font-weight: 500;
}
</style>