import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // If using Vue Router

const app = createApp(App)

// Create and use the Pinia instance
const pinia = createPinia()
app.use(pinia)

// Use Vue Router (if applicable)
app.use(router)

app.mount('#app')
