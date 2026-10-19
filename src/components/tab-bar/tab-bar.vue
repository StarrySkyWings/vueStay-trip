<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabBarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span :class="{ text: currentIndex !== index }">{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabBarData from '@/assets/data/tabbar';
import { getAssetURL } from '@/utils/load_assets';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentIndex = ref(0)
// 监听路由改变时, 找到对应的索引, 设置currentIndex
watch(route, (newRoute) => {
  const index = tabBarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {

  .text {
    color: #323233
  }

  img {
    height: 26px;
  }
}
</style>