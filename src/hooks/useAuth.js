import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiService'
import { apiRoutes } from '@/services/apiRoutes'
import { disconnectAdminSocket } from '@/services/socket'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const getStoredToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const clearAuth = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
  disconnectAdminSocket()
}

export function useAdminLogin(options = {}) {
  return useMutation({
    mutationFn: (credentials) => api.post(apiRoutes.auth.adminLogin, credentials),
    onSuccess: (response, ...rest) => {
      const token = response?.data?.token
      const user = response?.data?.user
      if (token) localStorage.setItem(TOKEN_KEY, token)
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
      options.onSuccess?.(response, ...rest)
    },
    onError: options.onError,
  })
}

export function useAdminLogout(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.post(apiRoutes.auth.adminLogout),
    onSettled: (...args) => {
      clearAuth()
      queryClient.clear()
      options.onSettled?.(...args)
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  })
}
