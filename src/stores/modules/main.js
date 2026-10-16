import { defineStore } from "pinia";

const nowDate = new Date();
const newDate = new Date();
newDate.setDate(nowDate.getDate() + 1);

const useMainStore = defineStore("main", {
  state: () => ({
    nowDate,
    newDate,
    isLoading: false,
  }),
});

export default useMainStore;
