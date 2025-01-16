<template>
  <div class="service-card">
    <h2>{{ service.name }}</h2>
    <p>{{ service.description }}</p>
    <p>Price: ${{ service.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Service } from '@/types/types';

export default defineComponent({
  name: 'ServiceCard',
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
      validator: (value: Service) => {
        return (
          typeof value.id === 'number' &&
          typeof value.name === 'string' &&
          value.name.trim() !== '' &&
          typeof value.description === 'string' &&
          typeof value.price === 'number' &&
          value.price >= 0
        );
      },
    },
  },
  methods: {
    addToCart() {
      this.$emit('add', this.service);
    },
  },
});
</script>

<style src="@/styles/service-card.css" scoped></style>

