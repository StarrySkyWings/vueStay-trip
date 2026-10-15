import { onMounted, onUnmounted, ref } from "vue";

// 监听window窗口的滚动
export default function useScroll() {
  const isReachBottom = ref(false)

  const scrollListenerHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 滚动到底部
      isReachBottom.value = true
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  });

  return {
    isReachBottom,
  };
}
