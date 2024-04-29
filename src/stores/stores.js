// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLedStore = defineStore('led', {
  state: () => {
    return { cond : 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    toggle() {
      this.cond = !this.cond
    },
  },
})