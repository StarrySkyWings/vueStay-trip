<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">你的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共一晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" color="#ff9854" type="range" :round="false" :show-confirm="false" @confirm="onConfirm" />
  </div>
</template>

<script setup>
import router from '@/router'
import useCityStore from '@/stores/modules/city'
import { formatMonthDay } from '@/utils/format_date'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 跳转到city页面
const cityClick = () => {
  router.push('/city')
}

// 位置/城市
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('获取成功', res)
  }, err => {
    console.log('获取失败')
  })
}

// 当前城市位置 
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

const nowDate = new Date()
const startDate = ref(formatMonthDay(nowDate))
const newDate = nowDate.setDate(nowDate.getDate() + 1)
const endDate = ref(formatMonthDay(newDate))

const showCalendar = ref(false)
const onConfirm = (value) => {
  // 设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]

  startDate.value = formatMonthDay(selectStartDate)
  endDate.value = formatMonthDay(selectEndDate)

  // 隐藏日历
  showCalendar.value = false
}
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    font-size: 15px;
  }

  .position {
    width: 74px;
    display: flex;
    color: #333;
    align-items: center;

    .text {
      position: relative;
      font-size: 12px;
      top: 2px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
</style>