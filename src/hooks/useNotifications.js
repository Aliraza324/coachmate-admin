import { useCallback, useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiService'
import { apiRoutes } from '@/services/apiRoutes'
import { getAdminSocket, disconnectAdminSocket, isFatalAuthError } from '@/services/socket'

const NOTIFICATIONS_KEY = 'notifications'
const NOTIFICATION_SOUND_SRC = '/sound/universfield-new-notification-09-352705 (1).mp3'

export function useNotificationsList(options = {}) {
  return useQuery({
    queryKey: [NOTIFICATIONS_KEY, 'list'],
    queryFn: () => api.get(apiRoutes.notifications.list),
    staleTime: 0,
    ...options,
  })
}

export function useUnreadCount(options = {}) {
  return useQuery({
    queryKey: [NOTIFICATIONS_KEY, 'unread-count'],
    queryFn: () => api.get(apiRoutes.notifications.unreadCount),
    staleTime: 0,
    ...options,
  })
}

export function useClearNotifications(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.delete(apiRoutes.notifications.clear),
    onSuccess: (...args) => {
      queryClient.setQueryData([NOTIFICATIONS_KEY, 'unread-count'], {
        success: true,
        data: { unreadCount: 0 },
      })
      queryClient.setQueryData([NOTIFICATIONS_KEY, 'list'], {
        success: true,
        data: { total: 0, notifications: [] },
      })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}

function useNotificationSound() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(NOTIFICATION_SOUND_SRC)
    audio.preload = 'auto'
    audio.volume = 0.8
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  return useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.currentTime = 0
      const result = audio.play()
      if (result && typeof result.catch === 'function') {
        result.catch(() => {
          /* autoplay blocked — silent fail */
        })
      }
    } catch {
      /* ignore */
    }
  }, [])
}

export function useAdminNotificationsSocket({ onAuthError } = {}) {
  const queryClient = useQueryClient()
  const playSound = useNotificationSound()
  const onAuthErrorRef = useRef(onAuthError)

  useEffect(() => {
    onAuthErrorRef.current = onAuthError
  }, [onAuthError])

  useEffect(() => {
    const socket = getAdminSocket()
    if (!socket) return undefined

    const handleNew = ({ notification } = {}) => {
      if (!notification) return
      playSound()
      queryClient.setQueryData([NOTIFICATIONS_KEY, 'list'], (prev) => {
        const prevList = prev?.data?.notifications ?? []
        if (prevList.some((n) => n._id === notification._id)) return prev
        return {
          success: true,
          data: {
            total: (prev?.data?.total ?? 0) + 1,
            notifications: [notification, ...prevList],
          },
        }
      })
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY, 'unread-count'] })
    }

    const handleUnreadCount = ({ unreadCount } = {}) => {
      if (typeof unreadCount !== 'number') return
      queryClient.setQueryData([NOTIFICATIONS_KEY, 'unread-count'], {
        success: true,
        data: { unreadCount },
      })
    }

    const handleDisconnect = (reason) => {
      if (isFatalAuthError(reason)) {
        onAuthErrorRef.current?.(reason)
      }
    }

    const handleConnectError = (err) => {
      const reason = err?.message || err?.data?.reason
      if (isFatalAuthError(reason)) {
        onAuthErrorRef.current?.(reason)
      }
    }

    socket.on('admin:notification:new', handleNew)
    socket.on('admin:notification:unread-count', handleUnreadCount)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)

    return () => {
      socket.off('admin:notification:new', handleNew)
      socket.off('admin:notification:unread-count', handleUnreadCount)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
    }
  }, [queryClient, playSound])
}

export { disconnectAdminSocket }
