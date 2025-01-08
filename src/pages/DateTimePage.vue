<template>
  <div class="datetime-page">
    <h1>Select Date & Time</h1>

    <input type="date" v-model="date" required />
    <input type="time" v-model="time" required />
    <button @click="confirmBooking">Confirm Booking</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface Service {
  name: string
  description: string
  price: number
}

interface Contact {
  name: string
  email: string
  phone: string
}

interface BookingData {
  services: Service[]
  contact: Contact
  date: string
  time: string
}

export default defineComponent({
  name: 'DateTimePage',
  setup() {
    const date = ref('')
    const time = ref('')
    const services = ref<Service[]>([])
    const contact = ref<Contact>({ name: '', email: '', phone: '' })

    const route = useRoute()
    const router = useRouter()

    // On mounted, get services and contact data from the route state
    onMounted(() => {
      // Access route state properties safely
      services.value = route.state?.services || []
      contact.value = route.state?.contact || { name: '', email: '', phone: '' }
    })

    const confirmBooking = async () => {
      const bookingData: BookingData = {
        services: services.value,
        contact: contact.value,
        date: date.value,
        time: time.value,
      }

      try {
        await axios.post('http://localhost:5001/bookings', bookingData)
        alert('Booking confirmed!')
        router.push('/') // Redirect to home page
      } catch (error) {
        console.error('Error confirming booking:', error)
        alert('There was an error confirming your booking.')
      }
    }

    return {
      date,
      time,
      services,
      contact,
      confirmBooking,
    }
  },
})
</script>

<style scoped>
.datetime-page {
  padding: 20px;
}

.datetime-page input {
  margin: 10px 0;
  padding: 8px;
  font-size: 1rem;
}

button {
  padding: 10px 20px;
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
