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
import { loginAPI } from '@/utils/api'
import type { APIError } from '@/types/types'

const isAxiosError = (error: unknown): error is APIError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as APIError).isAxiosError === true &&
    (error as APIError).response?.data !== undefined &&
    typeof (error as APIError).response?.data === 'object' &&
    'error' in ((error as APIError).response?.data ?? {})
  )
}

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

        // Call the login API
        const response = await loginAPI(email.value, password.value)

        // Handle success
        const token = response.token
        console.log('Token received:', token)

        // Store the token in localStorage
        localStorage.setItem('authToken', token)
        console.log('Token saved to localStorage.')

        // Navigate to the admin page
        await router.push('/admin')
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          // Safely handle Axios errors
          errorMessage.value = error.response?.data?.error || 'Invalid email or password.'
        } else {
          // Handle unexpected errors
          errorMessage.value = 'An unexpected error occurred. Please try again.'
        }

        console.error('Login error:', error)
      }
    }

    return { email, password, errorMessage, handleLogin }
  },
})
</script>

<style src="@/styles/login-page.css" scoped></style>
