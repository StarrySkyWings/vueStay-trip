// 百度地图 JS API 按需加载器
// 原来脚本是写死在 index.html 里的同步 <script>，会阻塞首屏解析与 Vue 挂载；
// 改成谁用谁加载，首屏不再等它，且加载失败也不会拖垮页面。

const SDK_URL =
  "https://api.map.baidu.com/getscript?v=4.0&ak=hyScguTx9y2XgRGpUimEfoy8pGybLKCu";

let pending = null;

export function loadBaiduMap() {
  if (typeof window !== "undefined" && window.BMap) {
    return Promise.resolve(window.BMap);
  }

  if (pending) return pending;

  pending = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => {
      window.BMap ? resolve(window.BMap) : reject(new Error("BMap 未挂载"));
    };
    script.onerror = () => {
      pending = null;
      reject(new Error("百度地图脚本加载失败"));
    };
    document.head.appendChild(script);
  });

  return pending;
}
