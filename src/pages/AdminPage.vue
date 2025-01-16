<template>
  <div class="admin-page">
    <h1>All Bookings</h1>
    <button class="logout-button" @click="handleLogout">Logout</button>
    <div v-if="loading" class="loading">Loading bookings...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table class="bookings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Services</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in bookings" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ booking.customer_name }}</td>
            <td>{{ booking.customer_email }}</td>
            <td>{{ booking.customer_phone }}</td>
            <td>
              <ul>
                <li v-for="service in booking.services" :key="service.name">
                  {{ service.name }} - ${{ service.price }}
                </li>
              </ul>
            </td>
            <td>{{ booking.booking_date }}</td>
            <td>{{ booking.booking_time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchBookingsAPI } from '@/utils/api'
import type { Booking } from '@/types/types'

export default defineComponent({
  name: 'AdminPage',
  setup() {
    const bookings = ref<Booking[]>([])
    const loading = ref(true)
    const error = ref('')
    const router = useRouter()

    const fetchBookings = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) throw new Error('You are not authorized to view this page.')

        const data = await fetchBookingsAPI(token)
        bookings.value = data.bookings || []
      } catch (err: unknown) {
        if (err instanceof Error) {
          error.value = err.message
        } else {
          error.value = 'An unknown error occurred.'
        }
      } finally {
        loading.value = false
      }
    }

    const handleLogout = () => {
      localStorage.removeItem('authToken')
      router.push('/login')
    }

    onMounted(() => {
      fetchBookings()
    })

    return {
      bookings,
      loading,
      error,
      handleLogout,
    }
  },
})
</script>

<style src="@/styles/admin-page.css" scoped></style>
