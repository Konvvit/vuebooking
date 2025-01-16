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
import { confirmBookingAPI } from '@/utils/api'
import type { Service, Contact } from '@/types/types'

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

      // Safely access route.state
      services.value = route.state?.services || storedBookingData.services || []
      contact.value = route.state?.contact ||
        storedBookingData.contact || { name: '', email: '', phone: '' }

      console.log('Services:', services.value)
      console.log('Contact:', contact.value)

      // Redirect if no data is available
      if (!route.state?.services && !storedBookingData.services) {
        console.warn('Redirecting to /services due to missing data.')
        router.push('/services')
      }
    })

    const confirmBooking = async () => {
      const bookingData = {
        services: services.value.map((service) => service.id),
        booking_date: date.value,
        booking_time: time.value,
        customer_name: contact.value.name,
        customer_phone: contact.value.phone,
        customer_email: contact.value.email,
      }

      console.log('Booking Data to Send:', bookingData)

      try {
        const response = await confirmBookingAPI(bookingData)
        console.log('Booking Response:', response)
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
      totalPrice,
      confirmBooking,
    }
  },
})
</script>

<style src="@/styles/datetime-page.css" scoped></style>
