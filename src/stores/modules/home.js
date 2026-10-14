import { getHomeCategories, getHomeHotSuggests, getHomeHouseList } from "@/services";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houselist:[]
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
      const res = getHomeHouseList(1)
      this.houselist = res.data
    }
  },
});

export default useHomeStore;
