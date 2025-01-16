import 'vue-router'

declare module 'vue-router' {
  interface RouteLocationNormalized {
    state?: {
      services: Array<{
        id: number
        name: string
        description?: string
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
