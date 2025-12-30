// Centralized API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lakeview-page-backend.onrender.com';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_URL}/api/auth/login`,
  register: `${API_URL}/api/auth/register`,
  verify: `${API_URL}/api/auth/verify`,
  
  // Bookings
  bookings: `${API_URL}/api/bookings`,
  
  // Payments
  paymentsInitialize: `${API_URL}/api/payments/initialize`,
  paymentsVerify: (reference: string) => `${API_URL}/api/payments/verify/${reference}`,
  paymentsReceipt: (id: string) => `${API_URL}/api/payments/${id}/receipt`,
  paymentsRefund: (id: string) => `${API_URL}/api/payments/${id}/refund`,
  
  // Services & Pricing
  services: `${API_URL}/api/services`,
  pricing: `${API_URL}/api/pricing`,
  pricingBySlug: (slug: string) => `${API_URL}/api/pricing/slug/${slug}`,
  
  // FAQs & Testimonials
  faqs: `${API_URL}/api/faqs`,
  testimonials: `${API_URL}/api/testimonials`,
  
  // Contact
  contact: `${API_URL}/api/contact`,
  
  // Admin
  adminDashboard: `${API_URL}/api/admin/dashboard`,
  adminBookings: `${API_URL}/api/admin/bookings`,
  adminBookingStatus: (id: string) => `${API_URL}/api/admin/bookings/${id}/status`,
  adminPayments: `${API_URL}/api/admin/payments`,
  adminContent: (type: string) => `${API_URL}/api/${type}`,
  adminContentById: (type: string, id: string) => `${API_URL}/api/${type}/${id}`,
};
