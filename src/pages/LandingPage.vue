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

<style scoped>
.landing-page {
  text-align: center;
  padding: 50px;
}

.buttons {
  margin-top: 20px;
}

.button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
}

.button:hover {
  background-color: #0056b3;
}
</style>
