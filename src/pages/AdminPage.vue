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

interface Service {
  name: string
  price: string
}

interface Booking {
  customer_name: string
  customer_email: string
  customer_phone: string
  booking_date: string
  booking_time: string
  services: Service[]
}

export default defineComponent({
  name: 'AdminPage',
  setup() {
    const bookings = ref<Booking[]>([])
    const loading = ref(true)
    const error = ref('')
    const router = useRouter()

    const fetchBookings = async (): Promise<void> => {
      console.log('Fetching bookings...')
      try {
        const token = localStorage.getItem('authToken')
        console.log('Token retrieved from localStorage:', token)
        if (!token) throw new Error('You are not authorized to view this page.')

        const response = await fetch('http://localhost:5002/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings. Status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Raw response:', data)

        bookings.value = data.bookings || []
        console.log('Parsed bookings:', bookings.value)
      } catch (err) {
        console.error('Error fetching bookings:', err)
        error.value = err.message || 'Failed to fetch bookings.'
      } finally {
        loading.value = false
        console.log('Fetching complete. Loading:', loading.value)
      }
    }

    const handleLogout = () => {
      // Clear the local storage
      localStorage.removeItem('authToken')
      console.log('User logged out, token removed.')

      // Redirect to the login page
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

<style scoped>
.admin-page {
  padding: 20px;
}

.logout-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #ff1a1a;
}

.loading {
  font-size: 1.2rem;
  color: #007bff;
}

.error {
  font-size: 1.2rem;
  color: red;
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.bookings-table th,
.bookings-table td {
  border: 1px solid #000000;
  padding: 8px;
  text-align: left;
}

.bookings-table th {
  background-color: #ffffff;
  font-weight: bold;
}

.bookings-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.bookings-table tr:hover {
  background-color: #f1f1f1;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
}
</style>
