<template>
  <div class="landing-page">
    <h1>Welcome to the Booking System</h1>
    <div class="buttons">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/services" class="button">Services</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LandingPage',
})
</script>

<style src="@/styles/landing-page.css" scoped></style>
