<template>
  <transition name="fade">
    <div v-if="isVisible" class="service-card">
      <h2>{{ service.name }}</h2>
      <p>{{ service.description }}</p>
      <p>Price: ${{ service.price }}</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { Service } from '@/types/types'
import { useCartStore } from '@/stores/cartStore'

export default defineComponent({
  name: 'ServiceCard',
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore()
    const isVisible = ref(false)

    // Make the service card visible after the component is mounted
    onMounted(() => {
      isVisible.value = true
    })

    // Add the service to the cart and store it in localStorage
    const addToCart = () => {
      cartStore.addToCart(props.service)
      console.log('Service added to cart:', cartStore.cartItems)

      // Persist the cart in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartStore.cartItems))
    }

    return { addToCart, isVisible }
  },
})
</script>
