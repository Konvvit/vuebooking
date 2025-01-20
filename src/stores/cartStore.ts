import { defineStore } from 'pinia'
import type { Service } from '@/types/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as Service[],
  }),
  getters: {
    totalPrice: (state) => state.cartItems.reduce((sum, service) => sum + service.price, 0),
  },
  actions: {
    addToCart(service: Service) {
      this.cartItems.push(service)
      this.saveToLocalStorage()
    },
    removeFromCart(serviceId: number) {
      this.cartItems = this.cartItems.filter((item) => item.id !== serviceId)
      this.saveToLocalStorage()
    },
    clearCart() {
      this.cartItems = []
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
  },
})
