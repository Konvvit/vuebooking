<template>
  <div class="contact-form">
    <h3>Contact Information</h3>
    <input v-model="localContact.name" placeholder="Name" />
    <input v-model="localContact.email" placeholder="Email" />
    <input v-model="localContact.phone" placeholder="Phone" />
    <button @click="updateContact">Save</button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

// Define types for the contact prop
interface Contact {
  name: string
  email: string
  phone: string
}

export default defineComponent({
  name: 'ContactForm',
  props: {
    contact: {
      type: Object as PropType<Contact>,
      required: true,
    },
  },
  data() {
    return {
      localContact: { ...this.contact },
    }
  },
  methods: {
    updateContact() {
      // Emit the updated contact back to the parent
      this.$emit('update', this.localContact)
    },
  },
})
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
