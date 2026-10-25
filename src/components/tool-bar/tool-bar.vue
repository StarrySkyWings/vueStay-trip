<template>
  <div class="tool-bar">
    <img class="avatar" :src="changeImageUrl(toolData.logoUrl)" alt="">
    <div class="collection">
      <img class="heart-img" src="@/assets/img/search/tj-mob-ui_unit-item_collected-new.png" alt="">
      <span v-if="toolData.favoriteCount">{{ toolData.favoriteCount }}</span>
    </div>
    <div class="message">
      <img class="msg-img" src="@/assets/img/search/tj-mob-ui_unit-item_comment-new.png" alt="">
      <span>{{ toolData.totalCount }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  toolData: {
    type: Object,
    default: () => ({})
  }
})
const changeImageUrl = (string) => {
  if(string === "https://pic.tujia.comnull"){
    return 'https://ts1.tc.mm.bing.net/th/id/OIP-C.4xXedxOLL2lVc2ARHKTAOQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  }
  return string
}

</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 5px;
  }

  .message,
  .collection {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    .msg-img,
    .heart-img {
      width: 30px;
      height: 30px;
    }

    span {
      color: white;
    }
  }
}
</style>