<template>
  <div class="service-card">
    <h2>{{ service.name }}</h2>
    <p>{{ service.description }}</p>
    <p>Price: ${{ service.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

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
      validator: (value: Service) => {
        // Validate the structure of the service object
        return (
          typeof value.id === 'number' &&
          typeof value.name === 'string' &&
          value.name.trim() !== '' &&
          typeof value.description === 'string' &&
          typeof value.price === 'number' &&
          value.price >= 0
        )
      },
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
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.service-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #0056b3;
}
</style>
