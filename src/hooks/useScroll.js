import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

// 监听window窗口的滚动
export default function useScroll() {
  const isReachBottom = ref(false);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const clientHeight = ref(0);

  // 节流
  const scrollListenerHandler = throttle(() => {
    scrollTop.value = document.documentElement.scrollTop;
    scrollHeight.value = document.documentElement.scrollHeight;
    clientHeight.value = document.documentElement.clientHeight;
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      // 滚动到底部
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  });

  return {
    isReachBottom,
    scrollTop,
  };
}
