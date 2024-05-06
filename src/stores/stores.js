import { defineStore } from 'pinia'

export const useLedStore = defineStore('led', {
  state: () => {
    return { cond : 0 }
  },
  actions: {
    toggle() {
      this.cond = !this.cond
    },
  },
})

export const usePotStore = defineStore('pot', {
  state: () => {
    return { value_percent : 0 }
  },
  getters: {
    value_round: (state) => Math.round(state.value_percent),
  }
})