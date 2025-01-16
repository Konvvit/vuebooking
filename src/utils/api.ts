import axios from 'axios'
import type { BookingData } from '@/types/types'

const apiClient = axios.create({
  baseURL: 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// fetching all bookings for AdminPage
export const fetchBookingsAPI = async (token: string) => {
  const response = await apiClient.get('/bookings', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

// Confirm a booking
export const confirmBookingAPI = async (bookingData: BookingData) => {
  const response = await apiClient.post('/bookings', bookingData)
  return response.data
}

// Login
export const loginAPI = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password })
  return response.data
}

// Fetch all services from the backend
export const fetchServicesAPI = async () => {
  const response = await apiClient.get('/services')
  return response.data
}
