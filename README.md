# 栖宿山海 | vueStay-trip

一个基于 **Vue 3 + Vite** 构建的民宿预订移动端 H5 应用（仿 Airbnb / 木鸟民宿 类产品形态）。
项目完整实现了「首页浏览 → 城市选择 → 搜索筛选 → 房源详情 → 收藏 / 订单」的核心预订闭环，
采用 Vant 4 作为 UI 组件库，通过 `vw` 方案做移动端适配。

> 生产接口地址：`https://tripapi.devstream.de5.net/api`（公开演示接口，无需鉴权）

---

## 目录

- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [目录结构](#目录结构)
- [架构设计](#架构设计)
  - [分层模型](#分层模型)
  - [路由设计](#路由设计)
  - [网络请求层](#网络请求层)
  - [状态管理](#状态管理)
  - [自定义 Hooks](#自定义-hooks)
  - [样式与适配](#样式与适配)
- [接口一览](#接口一览)
- [组件清单](#组件清单)
- [开发约定](#开发约定)
- [已知问题与待办](#已知问题与待办)

---

## 功能特性

| 模块 | 已实现能力 |
| --- | --- |
| **首页 Home** | 顶部导航（开屏动画）、轮播 Banner、热门搜索词、日期选择（Vant Calendar，默认今天 → 明天）、城市定位入口、分类入口、房源瀑布流 + **触底加载更多**、滚动 360px 后浮出搜索栏、切回首页**保留滚动位置** |
| **城市选择 City** | 城市按拼音分组、右侧字母索引快速定位、点击城市写入 Store 并返回上一页 |
| **搜索 Search** | 顶部位置 / 日期 / 关键词展示、条件筛选面板（位置 `gType=2` 双列联动、排序 `gType=4`、筛选 `gType=1` 占位）、房源结果列表 |
| **房源详情 Detail** | 图片轮播、价格与标签、评分评价、设施信息、房东信息、评论、预订须知、百度地图位置周边、底部操作栏 |
| **收藏 Favor** | 「房屋 / 房东」双 Tab、房屋列表（复用搜索列表卡片组件）、房东 Tab 空态引导回首页、滚动位置保持 |
| **订单 Order** | 订单状态 Tab 切换（全部 / 待支付等），切换时按 `type` 重新拉取列表 |
| **消息 Message** | 消息分类入口页 |
| **全局体验** | 统一 Loading 遮罩（基于请求拦截器自动开关）、TabBar 高亮跟随路由、`keep-alive` 页面缓存 |

> 说明：登录、支付、下单等能力不在本仓库范围内，接口仅提供读取型数据。

---

## 技术栈

**运行时依赖**

| 依赖 | 版本 | 用途 |
| --- | --- | --- |
| vue | ^3.5.42 | 框架，全量使用 `<script setup>` 组合式 API |
| vue-router | ^5.4.0 | 路由，Hash 模式 + 路由懒加载 |
| pinia | ^4.0.3 | 状态管理，按业务域拆分 module |
| axios | ^1.20.0 | HTTP 请求，二次封装 + 拦截器 |
| vant | ^4.10.2 | 移动端 UI 组件库 |
| dayjs | ^1.11.23 | 日期格式化与天数计算 |
| underscore | ^1.13.8 | 工具库（本项目主要用 `throttle`） |
| normalize.css | ^8.0.1 | 浏览器样式归一化 |

**开发依赖**

| 依赖 | 用途 |
| --- | --- |
| vite ^8.2.2 + @vitejs/plugin-vue | 构建与开发服务器 |
| less | 样式预处理器 |
| postcss-px-to-viewport | px → vw 移动端适配（设计稿宽度 375） |
| unplugin-auto-import + unplugin-vue-components + @vant/auto-import-resolver | Vant 组件 / API **按需自动导入**，模板中直接写 `<van-button>` 即可 |
| vite-plugin-vue-devtools | 开发期调试面板 |

---

## 快速开始

### 环境要求

Node.js 需满足 `package.json` 中的 `engines` 约束：

- `^22.18.0` 或 `>=24.12.0`

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建，产物输出到 dist/
npm run build

# 本地预览生产构建结果
npm run preview
```

> 推荐 IDE：[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)，并关闭 Vetur。
> 建议安装 [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 以便查看 Pinia 状态。

### 部署说明

路由使用 **Hash 模式**（`createWebHashHistory`），部署到任意静态服务器 / CDN 时**无需**额外配置 history fallback，
`dist/` 目录直接上传即可。若后续改为 History 模式，需在服务端补充 `try_files ... /index.html` 规则。

---

## 目录结构

```
vueStay-trip/
├── index.html                  # 入口 HTML（移动端 viewport、标题、百度地图脚本占位）
├── vite.config.js              # Vite 配置：@ 别名、Vant 自动导入
├── postcss.config.js           # px-to-viewport 适配（viewportWidth: 375）
├── jsconfig.json               # 编辑器路径提示（@/* → src/*）
└── src/
    ├── main.js                 # 应用入口：注册 router、pinia、全局样式
    ├── App.vue                 # 根组件：<router-view> + keep-alive + TabBar + 全局 Loading
    │
    ├── router/index.js         # 路由表（全部懒加载）
    │
    ├── views/                  # 页面级组件，按业务目录划分
    │   ├── Home/
    │   │   ├── home.vue        # 页面壳：触底加载、搜索栏浮出、滚动恢复
    │   │   └── cpns/           # 页面私有子组件（nav-bar / banner / search-box / categories / content）
    │   ├── City/               # city.vue + cpns/city-group.vue
    │   ├── Search/             # search.vue + cpns/search-nav-bar.vue、search-tabs.vue
    │   ├── Detail/             # detail.vue + cpns/ 下 11 个分区组件
    │   ├── Favor/              # favor.vue + cpns/（nav-bar / tabs / history-list）
    │   ├── Order/              # order.vue + cpns/（nav-bar / tabs / content / item）
    │   └── Message/            # message.vue
    │
    ├── components/             # 跨页面复用组件
    │   ├── tab-bar/            # 底部导航（路由联动高亮）
    │   ├── loading/            # 全局 Loading 遮罩
    │   ├── search-bar/         # 首页吸顶搜索栏（展示日期 + 城市）
    │   ├── house-item-v3/v9/   # 首页房源卡片（两种版式）
    │   ├── search-list-item/   # 搜索/收藏通用房源卡片
    │   │   ├── search-list-item-title/
    │   │   └── search-list-item-info/   + tool-bar/、msg-tip/
    │   ├── order-item-*/       # 订单卡片三段式（title / info / btn）
    │   ├── dropdown-select/    # 搜索页下拉筛选（含 side-bar 联动）
    │   ├── tab-select/         # 标签型筛选面板（含 tab-select-item）
    │   ├── side-bar/           # 侧边分类导航
    │   ├── view-house-btns/    # 筛选面板底部「清空 / 查看房源」
    │   ├── detail-section/     # 详情页通用分区容器（标题 + 更多）
    │   └── tab-control/        # 详情页吸顶 Tab，支持双向联动
    │
    ├── stores/                 # Pinia
    │   ├── index.js            # createPinia()
    │   └── modules/
    │       ├── main.js         # 全局：入住/离店日期、isLoading
    │       ├── home.js         # 热门词、分类、房源列表、分页游标
    │       ├── city.js         # 全部城市、当前城市
    │       ├── search.js       # 筛选条件、搜索结果
    │       ├── detail.js       # 房源详情（含 mainPart / currentHouse getter）
    │       ├── favor.js        # 收藏列表、浏览历史
    │       └── order.js        # 订单列表
    │
    ├── services/               # 接口层
    │   ├── index.js            # 统一出口（export * from modules/*）
    │   ├── request/
    │   │   ├── config.js       # BASE_URL、TIMEOUT
    │   │   └── index.js        # axios 封装类（拦截器 + get/post）
    │   └── modules/            # 按业务域拆分的接口函数
    │       ├── home.js  city.js  search.js  detail.js  favor.js  order.js
    │
    ├── hooks/
    │   ├── useScroll.js        # 滚动监听（节流）→ scrollTop / isReachBottom
    │   └── smoothScrollTo.js   # easeOutCubic 平滑滚动（替代原生 scrollTo 以保证跨端一致）
    │
    ├── utils/
    │   ├── bmap.js             # 百度地图 JS SDK 按需加载器（单例 Promise）
    │   ├── format_date.js      # dayjs 封装：格式化、相差天数
    │   └── load_assets.js      # 动态资源 URL 解析（TabBar 图标）
    │
    └── assets/
        ├── css/                # index.css（入口，聚合 reset + common）
        │   ├── reset.css       # 基础重置
        │   └── common.css      # CSS 变量（主题色）、Vant 变量覆盖、通用工具类
        ├── data/tabbar.js      # TabBar 配置（文案 / 图标 / 路径）
        └── img/                # 按页面分目录的静态图片（home/detail/search/order/favor/message/tabbar）
```

---

## 架构设计

### 分层模型

项目严格遵循「视图只消费、Store 管数据、Service 管请求」的单向数据流：

```
views / components          stores/modules/*.js          services/modules/*.js        services/request
  （渲染 & 交互）  ──调用──▶  （state + async action） ──调用──▶ （纯接口函数）        ──▶ axios 实例
        ▲                          │                              │                        │
        └──── storeToRefs 订阅 ────┘                              └── 统一 data 解包 ──────┘
```

关键约定：

- **组件内不直接调用 `services`**，一律经由 Store 的 `fetchXxxData()` action，保证同一份数据只有一处来源。
- `services/request/index.js` 的 `request()` 已 `resolve(res.data)`，因此 Store 里拿到的是**业务响应体**；
  不同接口的嵌套层级并不统一（如收藏是 `res.data.data.items`、详情是 `res.data.mainPart`），使用时以「接口一览」为准。
- 请求拦截器在**发起时**置 `isLoading = true`、**响应/异常时**置 `false`，`<loading>` 组件全站只挂载一次即可实现统一加载态。

### 路由设计

| path | 组件 | keep-alive | 说明 |
| --- | --- | --- | --- |
| `/` | — | — | 重定向到 `/home` |
| `/home` | `views/Home/home.vue` | ✅ | 首页，`defineOptions({ name: 'home' })` |
| `/favor` | `views/Favor/favor.vue` | ✅ | 收藏，name `favor` |
| `/order` | `views/Order/order.vue` | ✅ | 订单，name `order` |
| `/message` | `views/Message/message.vue` | ❌ | 消息 |
| `/city` | `views/City/city.vue` | ❌ | 城市选择 |
| `/search` | `views/Search/search.vue` | ✅ | 搜索结果，name `search` |
| `/detail/:id` | `views/Detail/detail.vue` | ❌ | 房源详情，`id` 为 `houseId` |

> `App.vue` 中 `keep-alive include="home,favor,order,search"` 依赖组件的 **`name`** 命中，
> 因此这 4 个页面必须保留 `defineOptions({ name })`，否则缓存失效、滚动位置恢复也会失效。

### 网络请求层

`services/request/index.js` 用一个 `myRequest` 类封装 axios：

```js
const mainStore = useMainStore()          // 拦截器中读写全局 Loading

class myRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({ baseURL, timeout })
    // request 拦截器：isLoading = true
    // response 拦截器：isLoading = false（成功与失败分支都要关）
  }
  request(config) { /* 返回 Promise，直接 resolve(res.data) */ }
  get(config)  { /* ...method: 'get'  */ }
  post(config) { /* ...method: 'post' */ }
}

export default new myRequest(BASE_URL, TIMEOUT)   // 导出单例
```

- 增删接口只需在 `services/modules/<domain>.js` 新增函数，并在 `services/index.js` 的 `export *` 中被自动导出。
- 超时时间 10s，统一在 `config.js` 调整；切换后端只需改 `BASE_URL`。

### 状态管理

Pinia 采用「单文件一域」的 Options Store 写法：

| Store | 关键 state | 关键 action / getter |
| --- | --- | --- |
| `main` | `nowDate`、`newDate`（默认今天/明天）、`isLoading` | — |
| `home` | `hotSuggests`、`categories`、`houselist`、`currentPage` | `fetchHouselistData()` 用 `push(...res.data)` 累加并自增页码，实现无限滚动 |
| `city` | `allCities`、`currentCity`（默认「广州」） | `fetchAllCitiesData()` |
| `search` | `searchConditions`、`searchHouse` | `fetchSearchConditionData()`、`fetchSearchHouseData()` |
| `detail` | `detailInfos` | getter `mainPart`、`currentHouse` |
| `favor` | `favorList`、`historyList` | `fetchFavorListData()`、`fetchHistoryListData()` |
| `order` | `orderList` | `fetchOrderListData(type = 'all')`，Tab 切换时重新请求 |

组件中读取时统一使用 `storeToRefs()` 解构，避免丢失响应式。

### 自定义 Hooks

**`useScroll(elRef?)`** — 滚动监听

```js
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)   // 不传则监听 window
```

- 内部用 `underscore.throttle(…, 100)` 节流；
- `isReachBottom` 在「距底部 2px 内」置 `true`，消费方拉完数据后需手动复位 `false`；
- `onUnmounted` 自动解绑，避免内存泄漏。

**`smoothScrollTo(container, targetTop, duration = 300)`** — 缓动滚动

详情页 Tab 跳转用它替代原生 `scrollTo({ behavior: 'smooth' })`，以 `easeOutCubic` + `requestAnimationFrame`
获得跨端一致的滚动时长与手感。

**`utils/bmap.js`** — 百度地图按需加载

原本写死在 `index.html` 的同步 `<script>` 会阻塞首屏，现改为 `loadBaiduMap()` 单例 Promise，
仅在进入详情页地图区域时加载，且加载失败不会拖垮页面（`catch` 后直接降级）。

### 样式与适配

- **适配方案**：`postcss-px-to-viewport`，`viewportWidth: 375`。**样式里直接写设计稿 px 值**，构建后自动转 `vw`，无需手动换算。
- **主题**：`assets/css/common.css` 用 CSS 变量集中管理，并覆盖 Vant 变量，改主题只改一处：

  ```css
  :root {
    --primary-color: #ff9854;                     /* 品牌橙 */
    --line-color: #faf8f9;
    --theme-linear-gradient: linear-gradient(90deg, #fa8c1d, #fcaf3f);
    --van-primary-color: var(--primary-color);    /* Vant 跟随主题 */
    /* 另覆盖 dropdown-menu / sidebar 尺寸与配色 */
  }
  ```

- **通用类**：`.top-page`（整屏滚动容器，`height:100vh + overflow-y:auto`）、`.bottom-gray-line`、
  `.ellipsis-text-1/2`（单/多行省略）、`.icon_check`、`.detail_icon_chat/order`（雪碧图式图标）。
- 组件样式统一使用 `<style lang="less" scoped>`；需要穿透 Vant 内部结构时用 `:deep()` 或 `:global()`。
- Vant 组件与 API 由 `unplugin-vue-components` + `VantResolver` 自动按需引入，**无需手动 import**。

---

## 接口一览

Base URL：`https://tripapi.devstream.de5.net/api`

| 接口 | 方法 | 路径 | 参数 | 使用位置 | Store 取值路径 |
| --- | --- | --- | --- | --- | --- |
| 热门搜索词 | GET | `/home/hotSuggests` | — | 首页搜索框 | `res.data` |
| 首页分类 | GET | `/home/categories` | — | 首页分类宫格 | `res.data` |
| 房源列表 | GET | `/home/houselist` | `page` | 首页 / 无限滚动 | `res.data`（追加） |
| 全部城市 | GET | `/city/all` | — | 城市选择页 | `res.data` |
| 筛选条件 | GET | `/search/top` | — | 搜索页顶部面板 | `res.data.data.allConditions` |
| 搜索结果 | GET | `/search/result` | — | 搜索页列表 | `res.data.data` |
| 房源详情 | GET | `/detail/infos` | `houseId` | 详情页 | `res.data`（`mainPart` / `currentHouse`） |
| 收藏列表 | GET | `/favor/list` | — | 收藏页 | `res.data.data.items` |
| 浏览历史 | GET | `/favor/history` | — | 收藏页「历史」 | `res.data.data.items` |
| 订单列表 | GET | `/order/list` | `type` | 订单页 Tab 切换 | `res.data.data.orders` |

筛选条件中 `gType` 的含义（`components/dropdown-select` 依据它渲染不同面板）：

| `gType` | 含义 | 渲染组件 |
| --- | --- | --- |
| `1` | 筛选（当前为占位「正在开发中」） | `side-bar` + `view-house-btns` |
| `2` | 位置（两级联动） | `side-bar` + `view-house-btns` |
| `4` | 欢迎度排序 | `van-dropdown-item` + `options` |

---

## 组件清单

**跨页面复用（`src/components/`）**

| 组件 | 职责 |
| --- | --- |
| `tab-bar` | 底部导航，`van-tabbar` + `route` 模式，`watch(route)` 反查索引高亮，图标走 `getAssetURL` |
| `loading` | 全屏 Loading 遮罩，由 `mainStore.isLoading` 驱动，点击可手动关闭兜底 |
| `search-bar` | 吸顶搜索栏，展示「入住/离店日期 + 当前城市」，点击携带 query 跳 `/search` |
| `house-item-v3` / `house-item-v9` | 首页房源卡片两种版式，由 `discoveryContentType` 决定：`9 → v9`、`3 → v3`（`v9` 额外把 `commentScore` 转为数值） |
| `search-list-item` | 搜索/收藏通用房源卡，内部拆 title / info / tool-bar / msg-tip 子组件，用 `computed` 做字段兼容（`preloadHouse` 有无分支） |
| `order-item-title/info/btn` | 订单卡三段式，由 `views/Order/cpns/order-item.vue` 组合 |
| `dropdown-select` | 下拉筛选容器，通过回调 ref 收集各 `van-dropdown-item` 实例，实现 `toggle()` 控制 |
| `tab-select` / `tab-select-item` | 标签型筛选面板，维护一级/二级选中态（`isSelect`） |
| `side-bar` | 侧边分类导航，支持 `#content` 插槽替换右侧内容 |
| `view-house-btns` | 筛选面板底部「清空 / 查看房源」，向父级 emit `clear` / `view-click` |
| `detail-section` | 详情页分区容器（标题 + 「查看更多」文案） |
| `tab-control` | 详情页吸顶 Tab，暴露 `setCurrentIndex()`，与滚动位置双向联动 |

**详情页分区（`src/views/Detail/cpns/`）**

`detail-nav-bar`、`detail-swipe`（图片轮播）、`detail-infos`（价格/标签）、`detail-facility`（设施）、
`detail-landlord`（房东）、`detail-comment`（评论）、`detail-notice`（须知）、`detail-map`（百度地图）、
`detail-Intro`（描述）、`detail-footer`、`detail-action-bar`（底部操作栏）。

各分区通过 `getSectionRef` 把 DOM 以 `name` 属性（描述/设施/房东/评论/须知/周边）注册进 `sectionEls`，
`tabClick(index)` 据此取 `offsetTop` 滚动，`watch(scrollTop)` 反向计算当前应高亮的 index。

---

## 开发约定

1. **Alias**：跨目录引用统一使用 `@/`，禁止 `../../..` 式深路径。
2. **命名**：文件/目录 kebab-case；页面私有组件放同级 `cpns/` 目录，跨页面复用的才提升到 `src/components`。
3. **页面缓存**：需要 `keep-alive` 的页面必须写 `defineOptions({ name: '<与 include 一致>' })`；
   返回时用 `onActivated` + `scrollTo({ top: scrollTop.value })` 恢复位置。
4. **滚动容器**：整屏滚动页面给根节点加 `.top-page` 类，并把 `ref` 传给 `useScroll`，否则触底加载/吸顶会失效。
5. **新增接口**三步走：`services/modules/<domain>.js` 写函数 → 确认 `services/index.js` 已 `export *` →
   在对应 Store 增加 `fetchXxxData()` action。
6. **样式单位**：直接写 375 设计稿的 px，不要手写 vw/rem。
7. **主题色**：只用 `var(--primary-color)`，不要硬编码 `#ff9854`。

---

## 已知问题与待办

以下是代码走查中发现的、建议后续处理的问题（不影响主要流程演示）：

| 位置 | 问题 | 建议 |
| --- | --- | --- |
| `views/Detail/cpns/detail-map.vue` | `catch` 分支里给未声明的 `loadFailed` 赋值（`loadFailed.value = true`），会抛 `ReferenceError` | 补 `const loadFailed = ref(false)` 并渲染降级占位图 |
| `views/Home/cpns/home-search-box.vue` | `positionClick` 直接 `new BMap.Geolocation()`，但 `index.html` 中的地图脚本已注释，未先进入详情页时 `BMap` 未定义 | 改为 `await loadBaiduMap()` 后再用，与 `detail-map` 保持一致 |
| `App.vue` | `<tab-bar/>` 无条件渲染，详情页/城市页/消息页也会出现底部导航 | 改用 `route.meta.hidden` 或 `v-if` 按路由控制（文件内已有注释掉的示例） |
| `services/request/index.js` | 拦截器统一 `isLoading` 开关，并发请求时会提前关闭遮罩 | 改为计数器（`pending++ / pending--`） |
| `stores/modules/favor.js` | 文件内导出名 `usefavorStore` 大小写不规范 | 统一为 `useFavorStore` |
| `views/City/city.vue` | `searchValue`、`tabActive` 定义了但未接入筛选逻辑 | 补城市搜索过滤 |
| `components/dropdown-select` | 「筛选」`gType=1` 面板仍是「正在开发中」占位 | 接入真实筛选条件 |
| 工程化 | 缺少 ESLint / Prettier / 单元测试 / TypeScript | 建议引入 ESLint + Prettier，关键 hooks 补 Vitest |

---

## License

本项目仅用于学习与演示，图片与数据版权归原服务方所有。
