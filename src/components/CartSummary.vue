<template>
  <div class="cart-summary" v-if="services.length > 0">
    <h2>Cart</h2>
    <ul>
      <li v-for="service in services" :key="service.id">
        {{ service.name }} - ${{ service.price }}
      </li>
    </ul>
    <p>Total: ${{ total }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { Service } from '@/types/types'

export default defineComponent({
  name: 'CartSummary',
  props: {
    services: {
      type: Array as () => Service[],
      required: true,
    },
  },
  setup(props) {
    // Compute total price
    const total = computed(() => props.services.reduce((sum, service) => sum + service.price, 0))

    return { total }
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
}

.cart-summary p {
  font-weight: bold;
}
</style>
