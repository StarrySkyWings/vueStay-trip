<template>
  <div class="tabs">
    <div class="tab-control">
      <template v-for="(item, index) in titles" :key="index">
        <div class="tab-control-item" :class="{ active: index === currentIndex }" @click="itemClick(index)">
          <span>{{ item }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  titles: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['tabItemClick'])
const currentIndex = ref(0)
const itemClick = (index) => {
  currentIndex.value = index
  emits('tabItemClick', index)
}
const setCurrentIndex = (index) => {
  currentIndex.value = index
}
defineExpose({ setCurrentIndex })
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item.active {
  color: var(--primary-color);
  font-weight: 700;
}

.tab-control-item.active span {
  border-bottom: 3px solid var(--primary-color);
  padding: 8px;
}
</style>