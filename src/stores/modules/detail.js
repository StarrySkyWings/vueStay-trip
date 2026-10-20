import { getDetailInfos } from "@/services";
import { defineStore } from "pinia";

const useDetailStore = defineStore("detail", {
  state: () => ({
    detailInfos: {},
  }),
  actions: {
    async fetchHouseDetailData(houseId) {
      const res = await getDetailInfos(houseId);
      this.detailInfos = res.data;
    },
  },
  getters: {
    mainPart: (state) => state.detailInfos.mainPart,
    currentHouse: (state) => state.detailInfos.currentHouse,
  },
});

export default useDetailStore;
