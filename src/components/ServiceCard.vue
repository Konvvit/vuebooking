<template>
  <div class="service-card">
    <h2>{{ service.name }}</h2>
    <p>{{ service.description }}</p>
    <p>Price: ${{ service.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Service {
  id: number
  name: string
  description: string
  price: number
}

export default defineComponent({
  name: 'ServiceCard',
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit('add', this.service)
    },
  },
})
</script>

<style scoped>
.service-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
