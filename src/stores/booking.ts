import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    services: [] as Array<{ id: number; name: string; price: number }>,
    contact: { name: '', email: '', phone: '' },
    date: '',
    time: '',
  }),
  getters: {
    totalPrice: (state) => state.services.reduce((total, service) => total + service.price, 0),
  },
  actions: {
    addService(service: { id: number; name: string; price: number }) {
      if (!this.services.find((s) => s.id === service.id)) {
        this.services.push(service)
      }
    },
    updateContact(contact: { name: string; email: string; phone: string }) {
      this.contact = contact
    },
    setDateTime(date: string, time: string) {
      this.date = date
      this.time = time
    },
    reset() {
      this.services = []
      this.contact = { name: '', email: '', phone: '' }
      this.date = ''
      this.time = ''
    },
  },
})
