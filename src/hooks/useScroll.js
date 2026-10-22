import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

// 监听window窗口的滚动
export default function useScroll(elRef) {
  let el = window;

  const isReachBottom = ref(false);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const clientHeight = ref(0);

  // 节流
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
      clientHeight.value = document.documentElement.clientHeight;
    } else {
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
      clientHeight.value = el.clientHeight;
    }
    if (scrollTop.value + clientHeight.value >= scrollHeight.value - 2) {
      // console.log('滚动到底部')
      // 滚动到底部
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    if (elRef) {
      el = elRef.value;
    }
    el.addEventListener("scroll", scrollListenerHandler);
  });


  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });


  return {
    isReachBottom,
    scrollTop,
  };
}
