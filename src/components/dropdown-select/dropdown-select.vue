<template>
  <div class="dropdown-select">
    <van-dropdown-menu>
      <template v-for="(item, index) in selectData" :key="index">
        <van-dropdown-item v-if="item.gType === 2" title="位置" :ref="dropdownItemRefs">
          <div class="dropdown-bar-panel-content">
            <sideBar :menu-data="item.subGroups" />
            <viewHouseBtns @clear="handleClearClick('位置')" @view-click="handleViewClick('位置')" />
          </div>
        </van-dropdown-item>
        <van-dropdown-item v-if="item.gType === 4" title="欢迎度排序" :options="options" v-model="value"/>
        <van-dropdown-item v-if="item.gType === 1" title="筛选" :ref="dropdownItemRefs">
          <div class="dropdown-bar-panel-content">
            <sideBar :menu-data="item.subGroups">
              <template #content>
                <p class="list-content">正在开发中....</p>
              </template>
            </sideBar>
            <viewHouseBtns @clear="handleClearClick('筛选')" @view-click="handleViewClick('筛选')" />
          </div>
        </van-dropdown-item>
      </template>
    </van-dropdown-menu>
  </div>
</template>

<script setup>
import { computed, ref} from 'vue';
import sideBar from '../side-bar/side-bar.vue';
import viewHouseBtns from '../view-house-btns/view-house-btns.vue';
const props = defineProps({
  selectData: {
    type: Array,
    default: () => []
  }
})
const value = ref(0);
const options = computed(() => {
  return ((props.selectData.filter(item => item.gType === 4))[0].items).map((item,index) => {
    return { 'text': item.label, 'value': index }
  })
})
const dropdownRefs = {};
const dropdownItemRefs = (el) => {
  if (el) {
    dropdownRefs[el.title] = el;
  }
};
const handleClearClick = (title) => {
  dropdownRefs[title]?.toggle();
};
const handleViewClick = (title) => {
  dropdownRefs[title]?.toggle();
};
// const handleSideSubItemClick = (item) => {
//   // console.log(item)
// }
</script>

<style lang="less" scoped>
// 重写Vant样式
:global(.van-dropdown-menu .van-popup .van-sidebar-item) {
  padding-left: 20px;
  padding-top: 14px;
  padding-bottom: 14px;
}

:global(.van-dropdown-menu .van-popup .van-sidebar-item::before) {
  border-radius: 50%;
  left: 8px;
}

:global(.van-dropdown-menu .van-dropdown-item__content) {
  overflow-y: hidden;
  max-height: 100%;
}

.dropdown-bar-panel-content {
  position: relative;
  height: 500px;
  overflow: hidden;
  background-color: var(--van-sidebar-background-color);

}
</style>