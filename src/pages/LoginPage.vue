<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const handleLogin = async () => {
      try {
        // Clear any previous error messages
        errorMessage.value = ''

        const response = await axios.post('http://localhost:5002/api/login', {
          email: email.value,
          password: password.value,
        })

        // Handle success
        if (response.status === 200) {
          const token = response.data.token
          console.log('Token received:', token)

          // Store the token in localStorage
          localStorage.setItem('authToken', token)
          console.log('Token saved to localStorage.')

          // Navigate to the admin page
          await router.push('/admin')
        }
      } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error) {
            errorMessage.value = error.response.data.error
          } else {
            errorMessage.value = 'Invalid email or password.'
          }
        } else {
          errorMessage.value = 'An unexpected error occurred. Please try again.'
        }

        console.error('Login error:', error)
      }
    }

    return { email, password, errorMessage, handleLogin }
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

.error {
  color: red;
  margin-top: 10px;
}
</style>
