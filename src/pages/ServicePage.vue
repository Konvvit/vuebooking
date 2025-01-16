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
      <CartSummary :services="selectedServices" />
    </div>
    <!-- Contact Form -->
    <ContactForm :contact="contact" @update="updateContact" />
    <button @click="goToDateTimePage">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import ContactForm from '../components/ContactForm.vue'
import CartSummary from '../components/CartSummary.vue'
import { fetchServicesAPI } from '@/utils/api'
import type { Service, Contact } from '@/types/types'

export default defineComponent({
  name: 'ServicesPage',
  components: { ServiceCard, ContactForm, CartSummary },
  setup() {
    const router = useRouter()

    const services = ref<Service[]>([])
    const selectedServices = ref<Service[]>([])
    const contact = ref<Contact>({ name: '', email: '', phone: '' })

    // Fetch services from the backend
    const fetchServices = async (): Promise<void> => {
      try {
        const data = await fetchServicesAPI()
        services.value = data
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

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
    }
  },
})
</script>

<style src="@/styles/services-page.css" scoped></style>
