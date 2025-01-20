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
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router' // Added useRoute
import { useCartStore } from '@/stores/cartStore' // Use Pinia store
import { confirmBookingAPI } from '@/utils/api'
import { Service, Contact } from '@/types/types' // Import types from types.ts

export default defineComponent({
  name: 'DateTimePage',
  setup() {
    const date = ref('')
    const time = ref('')

    // Initialize services as an array of Service objects
    const services = ref<Service[]>([]) // Correctly typed as an array of Service objects
    const contact = ref<Contact>({ name: '', email: '', phone: '' }) // Type contact as Contact

    const router = useRouter()
    const route = useRoute() // Get the route state

    // Compute total price of selected services
    const totalPrice = computed(() =>
      services.value.reduce((total, service) => total + service.price, 0),
    )

    // On mounted, get services and contact data from route.state or localStorage
    onMounted(() => {
      // First, check if the data is passed via route.state
      if (route.state?.services) {
        services.value = route.state.services
        contact.value = route.state.contact || { name: '', email: '', phone: '' }
      } else {
        // If no data from route.state, fallback to localStorage or Pinia store
        const storedBookingData = JSON.parse(localStorage.getItem('bookingData') || '{}')
        services.value = storedBookingData.services || []
        contact.value = storedBookingData.contact || { name: '', email: '', phone: '' }

        // If still empty, try using the cart store (Pinia)
        if (services.value.length === 0) {
          const cartStore = useCartStore()
          services.value = cartStore.cartItems
        }
      }

      // Debugging logs
      console.log('Services:', services.value)
      console.log('Contact:', contact.value)

      // Redirect if no services are found
      if (!services.value.length) {
        console.warn('Redirecting to /services due to missing data.')
        router.push('/services')
      }
    })

    // Confirm booking and send the data to the backend
    const confirmBooking = async () => {
      const bookingData = {
        services: services.value.map((service) => service.id), // Get service IDs
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
