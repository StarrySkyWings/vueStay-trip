import { getOrderList } from "@/services";
import { defineStore } from "pinia";

const useOrderStore = defineStore("order", {
  state: () => ({
    orderList: [],
  }),
  actions: {
    async fetchOrderListData(type = 'all') {
      const res = await getOrderList(type)
      this.orderList = res.data.data.orders
    }
  },
});

export default useOrderStore;
