<template>
  <div class="services-page">
    <h1>Choose Services & Provide Contact Information</h1>
    <div class="content-container">
      <!-- Services List -->
      <div class="services-list" v-if="services.length > 0">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
          @add="addService"
        />
      </div>
      <div v-else>
        <p>No services available. Please try again later.</p>
      </div>
      <!-- Cart Summary -->
      <div class="cart-summary" v-if="selectedServices.length > 0">
        <h2>Cart</h2>
        <ul>
          <li v-for="service in selectedServices" :key="service.id">
            {{ service.name }} - ${{ service.price }}
          </li>
        </ul>
        <p>Total: ${{ cartTotal }}</p>
      </div>
    </div>
    <!-- Contact Form -->
    <ContactForm :contact="contact" @update="updateContact" />
    <button @click="goToDateTimePage">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import ContactForm from '../components/ContactForm.vue'

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
  name: 'ServicesPage',
  components: { ServiceCard, ContactForm },
  setup() {
    const router = useRouter()

    const services = ref<Service[]>([])
    const selectedServices = ref<Service[]>([])
    const contact = ref<Contact>({ name: '', email: '', phone: '' })

    // Fetch services from the backend
    const fetchServices = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:5002/api/services')
        if (!response.ok) throw new Error('Failed to fetch services')
        const data = await response.json()
        services.value = data
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    // Compute the total price of selected services
    const cartTotal = computed(() =>
      selectedServices.value.reduce((total, service) => total + service.price, 0),
    )

    // Add service to the cart
    const addService = (service: Service) => {
      if (!selectedServices.value.find((s) => s.id === service.id)) {
        selectedServices.value.push(service)
      }
    }

    // Update contact information
    const updateContact = (updatedContact: Contact) => {
      contact.value = updatedContact
    }

    // Navigate to the date and time selection page
    const goToDateTimePage = () => {
      if (!contact.value.name || !contact.value.email || !contact.value.phone) {
        alert('Please fill out all contact information before proceeding.')
        return
      }

      localStorage.setItem(
        'bookingData',
        JSON.stringify({
          services: selectedServices.value,
          contact: contact.value,
        }),
      )

      router.push({
        path: '/datetime',
      })
    }

    // Fetch services when the component is mounted
    onMounted(() => {
      fetchServices()
    })

    return {
      services,
      selectedServices,
      contact,
      addService,
      updateContact,
      goToDateTimePage,
      cartTotal,
    }
  },
})
</script>

<style scoped>
.services-page {
  padding: 20px;
}

.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex: 2;
}

.cart-summary {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.cart-summary h2 {
  margin: 0 0 10px;
}

.cart-summary ul {
  list-style: none;
  padding: 0;
}

.cart-summary li {
  margin-bottom: 5px;
}

.cart-summary p {
  font-weight: bold;
}

button {
  margin-top: 20px;
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
