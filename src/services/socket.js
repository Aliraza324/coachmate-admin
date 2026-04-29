import { io } from 'socket.io-client'
import { SOCKET_URL } from './baseUrl'

const TOKEN_KEY = 'token'

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

let socket = null

export function getAdminSocket() {
  const token = readToken()
  if (!token) return null

  if (socket && socket.connected && socket.auth?.token === token) {
    return socket
  }

  if (socket) {
    socket.disconnect()
    socket = null
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    withCredentials: true,
    extraHeaders: { 'ngrok-skip-browser-warning': 'true' },
  })

  return socket
}

export function disconnectAdminSocket() {
  if (socket) {
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }
}

export function isFatalAuthError(reason) {
  return reason === 'auth_required' || reason === 'invalid_token' || reason === 'account_suspended'
}
