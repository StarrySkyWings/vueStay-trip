<template>
  <div class="tabs">
    <van-tabs v-model:active="activeName">
      <van-tab title="房屋" name="house">
        <div class="content">
          <template v-for="(item, index) in favorList" :key="index">
            <searchListItem :item-data="item" />
          </template>
        </div>
      </van-tab>
      <van-tab title="房东" name="landlord">
        <div class="content">
          <!-- 内容 -->
          <div v-if="landlordlist.length" class="list"></div>

          <div v-else class="no-data">
            <img class="icon-no-data" src="@/assets/img/favor/empty_favorite.44731802.png" alt="" />
            <div class="name">暂无收藏</div>
            <div class="desp">
              点击
              <img src="@/assets/img/favor/favor.png" alt="" />
              即可收藏对应的房东
            </div>
            <button class="btn" @click="handleBtnClick">随便去逛逛</button>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import searchListItem from '@/components/search-list-item/search-list-item.vue';

import usefavorStore from '@/stores/modules/favor';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeName = ref('house')
const favorStore = usefavorStore()
favorStore.fetchFavorListData()
const { favorList } = storeToRefs(favorStore)

const landlordlist = ref([])
const router = useRouter()
const handleBtnClick = () => {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px 20px 55px 20px;

  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon-no-data {
      width: 100%;
    }

    .name {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
    }

    .desp {
      color: #666;
      line-height: 18px;
      font-size: 14px;
      margin: 7px auto 36px;

      img {
        position: relative;
        top: 4px;
        width: 12px;
      }
    }

    .btn {
      padding: 0 38px;
      height: 40px;
      line-height: 40px !important;
      font-size: 16px;
      color: #fff;
      background: var(--primary-color);
      border-radius: 20px;
      border: none;
      outline: none;
    }
  }
}
</style>