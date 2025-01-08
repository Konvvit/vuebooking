// src/types/vue-router.d.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteLocationNormalized {
    state?: {
      services: Array<{
        name: string
        description: string
        price: number
      }>
      contact: {
        name: string
        email: string
        phone: string
      }
    }
  }
}
