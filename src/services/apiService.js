import { BASE_URL } from './baseUrl'

const buildUrl = (path, params) => {
  const url = new URL(`${BASE_URL}${path}`)
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
  }
  return url.toString()
}

const getAuthToken = () => {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

const request = async (path, { method = 'GET', body, params, headers = {}, signal } = {}) => {
  const token = getAuthToken()
  const isFormData = body instanceof FormData

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'ngrok-skip-browser-warning': 'true',
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal,
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const error = new Error(data?.message || response.statusText || 'Request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  if (!isJson) {
    const error = new Error('Unexpected non-JSON response from server')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
