export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://jacob-aftermost-shaina.ngrok-free.dev/api'

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || BASE_URL.replace(/\/api\/?$/, '')
