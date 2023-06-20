// store/filters.ts
import { defineStore } from "pinia";
import { Investment } from "@/types/Investment";
const API_URL = "https://jsonplaceholder.typicode.com";
export const useInvestmentStore = defineStore({
  id: "investment",
  state: () => {
    return {
      investment: <Investment>{},
    };
  },
  actions: {
    async fetchInvestment(postId: number) {
      const { data } = await useFetch<Investment>(`${API_URL}/posts/${postId}`);
      Object.assign(this.investment, data.value);
    },
    async createInvestment(payload: Investment) {
      await useFetch(`${API_URL}/posts`, {
        method: "POST",
        body: payload,
      });
    },
  },
  getters: {
    getInvestment: (state) => state.investment,
  },
});
