<template>
  <div v-if="sideData.length" class="side-bar">
    <div class="side-menu">
      <!-- <van-sidebar v-model="currentSideActive" @change="onSideMenuChange"> -->
      <van-sidebar v-model="currentSideActive" >
        <template v-for="(item, index) in sideData" :key="index">
          <van-sidebar-item :title="item.label" />
        </template>
      </van-sidebar>
    </div>
    <div class="content">
      <slot name="content" :items="sideData[currentSideActive].items"
        :subGroups="sideData[currentSideActive].subGroups">
        <template v-if="sideData[currentSideActive].items" v-for="(item, index) in sideData[currentSideActive].items"
          :key="index">
          <div :class="['list-item', item.isSelect ? 'active' : '']" @click="handleItemClick(currentSideActive, index)">
            <div class="name ellipsis-text-1">{{ item.label }}</div>
            <span class="desp" v-if="item.percentageUser">{{ item.percentageUser }}</span>
          </div>
        </template>
        <!-- 二级列表 -->
        <template v-if="getSubSide.length">
          <div class="sub-side-panel">
            <div class="sub-side-bar">
              <!-- <van-sidebar v-model="currentSubSideActive" @change="onSubSideMenuChange"> -->
              <van-sidebar v-model="currentSubSideActive">
                <template v-for="(group, indey) in sideData[currentSideActive].subGroups" :key="indey">
                  <van-sidebar-item :title="group.label" />
                </template>
              </van-sidebar>
            </div>
            <div class="sub-content">
              <template v-for="(addr, indez) in getSubSideItems" :key="indez">
                <div :class="['list-item', addr.isSelect ? 'active' : '']" @click="handleSubItemClick(indez)">
                  <div class="name ellipsis-text-1">
                    {{ addr.label }}
                  </div>
                  <span class="desp" v-if="addr.percentageUser">
                    {{ addr.percentageUser }}
                  </span>
                </div>
              </template>
            </div>
          </div>

        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
})

const sideData = ref([])
watch(() => props.menuData, (newValue) => {
  sideData.value = newValue
}, { immediate: true })
const currentSideActive = ref(0)
const currentSubSideActive = ref(0)
const getSubSide = computed(() => {
  let subMenus = sideData.value[currentSideActive.value].subGroups || [];
  return subMenus;
});
const getSubSideItems = computed(() => {
  let subMenus = sideData.value[currentSideActive.value].subGroups || [];
  let result = [];
  if (subMenus.length) {
    result = subMenus[currentSubSideActive.value] || {};
  }
  result = result.items || [];
  return result;
});

const emit = defineEmits(['itemClick'])
const handleItemClick = (currentSideActives, index) => {
  if (sideData.value[currentSideActives]) {
    let addrInfos = sideData.value[currentSideActives].items || [];
    addrInfos.forEach((item, i) => {
      item.isSelect = i === index;
    });
    emit("itemClick", {
      sideDatas: sideData.value,
      currentSideActives,
      index,
    });
  }
};
const handleSubItemClick = (index) => {
  if (sideData.value[currentSideActive.value]) {
    let subGroup = sideData.value[currentSideActive.value].subGroups || [];
    let addrInfos = subGroup[currentSubSideActive.value].items || [];
    addrInfos.forEach((item, i) => {
      item.isSelect = i === index;
    });
    emit("itemClick", {
      sideDatas: sideData.value,
      currentSideActive,
      currentSubSideActive,
      index,
    });
  }
};
// const onSideMenuChange = () => { }
// const onSubSideMenuChange = () => { }
</script>

<style lang="less" scoped>
// @popupHeight: 500px;

.side-bar :deep(.van-sidebar) {
  height: calc(500px - 60px);
}

.side-bar {
  display: flex;
  flex-direction: row;

  .content {
    flex: 1;
    overflow-y: auto;
    height: calc(500px - 60px);
    background-color: white;

    .list-item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 55px;

      padding: 0 20px 0 10px;
      margin-right: 20px;
      margin-left: 12px;

      font-size: 14px;

      .name {
        // max-width: 200px;
        padding-bottom: 6px;
      }

      .desp {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.active {
  background-color: #fffcf5;

  .name {
    color: var(--primary-color);
  }
}

.sub-side-panel {
  display: flex;
  flex-direction: row;

  .sub-side-bar {
    border-right: 1px solid #f8f8f8;
  }

  .sub-side-bar :deep(.van-sidebar) {
    .van-sidebar-item {
      background-color: white !important;
    }
  }

  .sub-content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(500px - 60px);
  }
}
</style>