import { getSearchConditions, getSearchHouse } from "@/services";
import { defineStore } from "pinia";

const useSearchStore = defineStore('search',{
  state:() => ({
    searchConditions:[],
    searchHouse:[]
  }),
  actions:{
    async fetchSearchConditionData() {
      const res = await getSearchConditions()
      this.searchConditions = res.data.data.allConditions
    },
    async fetchSearchHouseData() {
      const res = await getSearchHouse()
      this.searchHouse = res.data.data
    }
  }
})

export default useSearchStore