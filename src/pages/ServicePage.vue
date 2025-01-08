<template>
  <div class="services-page">
    <h1>Choose Services & Provide Contact Information</h1>
    <div class="content-container">
      <!-- Services List -->
      <div class="services-list">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
          @add="addService"
        />
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
//import axios from 'axios'
import { useRouter } from 'vue-router' // Import useRouter to get router instance
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
    const router = useRouter() // Initialize router instance

    // Reactive variables for services, selected services, and contact information
    const services = ref<Service[]>([])
    const selectedServices = ref<Service[]>([])
    const contact = ref<Contact>({ name: '', email: '', phone: '' })

    // Fetch services from the backend
    //const fetchServices = async () => {
    //try {
    //const response = await axios.get('http://localhost:5001/services')
    //services.value = response.data
    // } catch (error) {
    //console.error('Error fetching services:', error)
    // }
    // }

    const fetchServices = async () => {
      try {
        console.log('Fetching services...')
        // Uncomment the following line when the backend is ready
        // const response = await axios.get('http://localhost:5001/services')
        // services.value = response.data

        // Temporary mock services
        services.value = [
          { id: 1, name: 'Haircut', description: 'A professional haircut', price: 25 },
          { id: 2, name: 'Massage', description: 'A relaxing massage', price: 50 },
        ]
        console.log('Mock services loaded:', services.value)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    const cartTotal = computed(() =>
      selectedServices.value.reduce((total, service) => total + service.price, 0),
    )
    // Add service to the selected services list
    const addService = (service: Service) => {
      selectedServices.value.push(service)
    }

    // Update contact information
    const updateContact = (updatedContact: Contact) => {
      contact.value = updatedContact
    }

    // Go to the next page with the selected services and contact information
    const goToDateTimePage = () => {
      // Pass selected services and contact to the next page
      router.push({
        path: '/datetime',
        state: { services: selectedServices.value, contact: contact.value },
      })
    }

    // Fetch services on mounted
    onMounted(() => {
      fetchServices()
    })

    // Return the reactive variables and methods
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
  justify-content: space-between; /* Adds space between services and cart */
  align-items: flex-start; /* Aligns services and cart at the top */
  gap: 10px; /* Adds spacing between the two sections */
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex: 2; /* Make services take more space */
}

.cart-summary {
  flex: 1; /* Make cart take less space */
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
