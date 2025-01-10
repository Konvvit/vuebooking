<template>
  <div class="contact-form">
    <h3>Contact Information</h3>
    <input v-model="localContact.name" placeholder="Name" @input="updateContact" />
    <input v-model="localContact.email" placeholder="Email" @input="updateContact" />
    <input v-model="localContact.phone" placeholder="Phone" @input="updateContact" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

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
      // Create a local copy of the contact object
      localContact: { ...this.contact },
    }
  },
  methods: {
    updateContact() {
      // Emit the updated contact object back to the parent component
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

h3 {
  margin-bottom: 10px;
}
</style>
