import {
  getHomeCategories,
  getHomeHotSuggests,
  getHomeHouseList,
} from "@/services";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houselist: [],
    currentPage: 1,
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests();
      this.hotSuggests = res.data;
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories();
      this.categories = res.data;
    },
    fetchHouselistData() {
      const res = getHomeHouseList(this.currentPage);
      this.houselist.push(...res.data);
      this.currentPage++
    },
  },
});

export default useHomeStore;
