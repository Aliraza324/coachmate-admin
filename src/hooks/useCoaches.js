import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiService'
import { apiRoutes } from '@/services/apiRoutes'

const COACHES_KEY = 'coaches'

export function useCoachesList({ page = 1, limit = 10, search = '', status = '' } = {}) {
  return useQuery({
    queryKey: [COACHES_KEY, 'list', { page, limit, search, status }],
    queryFn: () =>
      api.get(apiRoutes.coaches.list, {
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
        },
      }),
    keepPreviousData: true,
  })
}

export function useCoachDetail(id) {
  return useQuery({
    queryKey: [COACHES_KEY, 'detail', id],
    queryFn: () => api.get(apiRoutes.coaches.detail(id)),
    enabled: Boolean(id),
  })
}

export function useSuspendCoach(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }) =>
      api.post(apiRoutes.coaches.suspend(id), reason ? { reason } : {}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [COACHES_KEY] })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}

export function useUnsuspendCoach(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => api.post(apiRoutes.coaches.unsuspend(id)),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [COACHES_KEY] })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}

export function useDeleteCoach(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => api.delete(apiRoutes.coaches.delete(id)),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [COACHES_KEY] })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}
