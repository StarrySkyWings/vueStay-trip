import { getFavorList, getHistoryList } from "@/services";
import { defineStore } from "pinia";

const usefavorStore = defineStore("favor", {
  state: () => ({
    favorList:[],
    historyList:[]
  }),
  actions: {
    async fetchFavorListData() {
      const res = await getFavorList()
      this.favorList = res.data.data.items
    },
    async fetchHistoryListData() {
      const res = await getHistoryList()
      this.historyList = res.data.data.items
    }
  },
});

export default usefavorStore