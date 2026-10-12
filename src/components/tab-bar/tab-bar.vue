<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabBarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
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
import { ref } from 'vue';

const currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {

  img {
    height: 26px;
  }
}
</style>