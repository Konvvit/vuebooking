<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')

    const handleLogin = () => {
      // Implement login logic here
      alert(`Logging in with Email: ${email.value}`)
    }

    return { email, password, handleLogin }
  },
})
</script>

<style scoped>
.login-page {
  text-align: center;
  padding: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 10px;
  padding: 10px;
  font-size: 1rem;
  width: 250px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
