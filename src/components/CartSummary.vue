<template>
  <div class="cart-summary" v-if="cartServices.length > 0">
    <h2>Cart</h2>
    <transition-group name="list" tag="ul">
      <li v-for="service in cartServices" :key="service.id">
        {{ service.name }} - ${{ service.price }}
        <button @click="removeFromCart(service.id)">Remove</button>
      </li>
    </transition-group>
    <p>Total: ${{ total }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

export default defineComponent({
  name: 'CartSummary',
  setup() {
    const cartStore = useCartStore()

    // Access services from the store
    const cartServices = computed(() => cartStore.cartItems)

    // Compute total price
    const total = computed(() => cartStore.totalPrice)

    // Action to remove a service from the cart
    const removeFromCart = (serviceId: number) => {
      cartStore.removeFromCart(serviceId)
    }

    return { cartServices, total, removeFromCart }
  },
})
</script>

<style scoped>
.cart-summary {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.cart-summary h2 {
  margin: 0 0 10px;
}

.cart-summary ul {
  list-style: none;
  padding: 0;
}

.cart-summary li {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-summary p {
  font-weight: bold;
}

/* Button styles for the remove button */
button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff1a1a;
}

/* Transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
