import type { AxiosError } from 'axios'

export interface Service {
  id: number
  name: string
  description: string
  price: number
}

export interface Booking {
  customer_name: string
  customer_email: string
  customer_phone: string
  booking_date: string
  booking_time: string
  services: Service[]
}

export interface BookingData {
  services: number[]
  booking_date: string
  booking_time: string
  customer_name: string
  customer_phone: string
  customer_email: string
}

export interface Contact {
  name: string
  email: string
  phone: string
}

export interface APIErrorResponse {
  error?: string
}

export type APIError = AxiosError<APIErrorResponse>
