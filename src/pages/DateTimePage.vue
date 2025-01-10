<template>
  <div class="datetime-page">
    <h1>Select Date & Time</h1>

    <!-- Display Contact Information -->
    <div class="contact-info">
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> {{ contact.name }}</p>
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <p><strong>Phone:</strong> {{ contact.phone }}</p>
    </div>

    <!-- Display Selected Services -->
    <div class="services-list">
      <h2>Selected Services</h2>
      <ul>
        <li v-for="service in services" :key="service.id">
          {{ service.name }} - ${{ service.price }}
        </li>
      </ul>
      <p><strong>Total:</strong> ${{ totalPrice }}</p>
    </div>

    <!-- Date and Time Inputs -->
    <div class="datetime-inputs">
      <h2>Choose Date & Time</h2>
      <input type="date" v-model="date" required />
      <input type="time" v-model="time" required />
    </div>

    <button @click="confirmBooking">Confirm Booking</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface Service {
  id: number
  name: string
  description: string
  price: number
}

interface Contact {
  name: string
  email: string
  phone: string
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

    // Compute total price of selected services
    const totalPrice = computed(() =>
      services.value.reduce((total, service) => total + service.price, 0),
    )

    // On mounted, get services and contact data from the route state
    onMounted(() => {
      const storedBookingData = JSON.parse(localStorage.getItem('bookingData') || '{}')
      services.value = route.state?.services || storedBookingData.services || []
      contact.value = route.state?.contact ||
        storedBookingData.contact || { name: '', email: '', phone: '' }

      console.log('Services:', services.value)
      console.log('Contact:', contact.value)

      if (services.value.length === 0 || !contact.value.name) {
        console.warn('Redirecting due to missing data.')
        router.push('/services')
      }
    })

    const confirmBooking = async () => {
      const bookingData = {
        services: services.value.map((service) => service.id), // Send only service IDs
        booking_date: date.value, // Match backend's expected field
        booking_time: time.value, // Match backend's expected field
        customer_name: contact.value.name,
        customer_phone: contact.value.phone,
        customer_email: contact.value.email,
      }

      console.log('Booking Data to Send:', bookingData)

      try {
        const response = await axios.post('http://localhost:5002/api/bookings', bookingData)
        console.log('Booking Response:', response.data)
        alert('Booking confirmed!')
        router.push('/') // Redirect to home page
      } catch (error) {
        console.error('Error confirming booking:', error.response || error)
        alert('There was an error confirming your booking.')
      }
    }

    return {
      date,
      time,
      services,
      contact,
      totalPrice,
      confirmBooking,
    }
  },
})
</script>

<style scoped>
.datetime-page {
  padding: 20px;
}

.contact-info,
.services-list,
.datetime-inputs {
  margin-bottom: 20px;
}

.contact-info p,
.services-list ul {
  margin: 5px 0;
}

.services-list ul {
  list-style: none;
  padding: 0;
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
