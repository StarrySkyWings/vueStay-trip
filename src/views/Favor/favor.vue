<template>
  <div class="favor" ref="favorRef">
    <favorNavBar ref="favorNavBars" @change="value => active = value" />
    <!-- 我的收藏 -->
    <div v-if="active === 0">
      <favorTabs />
    </div>
    <!-- 浏览历史 -->
    <div v-else>
      <favorHistoryList />
    </div>
  </div>
</template>

<script setup>
import favorNavBar from './cpns/favor-nav-bar.vue';
import favorTabs from './cpns/favor-tabs.vue';
import favorHistoryList from './cpns/favor-history-list.vue';
import { onActivated, ref } from 'vue';
import useScroll from '@/hooks/useScroll.js';

defineOptions({
  name: 'favor'
})

const active = ref(0)
const favorRef = ref()
const { scrollTop } = useScroll(favorRef)
onActivated(() => {
  favorRef.value?.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.favor {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>