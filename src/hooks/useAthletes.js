import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiService'
import { apiRoutes } from '@/services/apiRoutes'

const ATHLETES_KEY = 'athletes'

export function useAthletesList({ page = 1, limit = 10, search = '', status = '' } = {}) {
  return useQuery({
    queryKey: [ATHLETES_KEY, 'list', { page, limit, search, status }],
    queryFn: () =>
      api.get(apiRoutes.athletes.list, {
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

export function useAthleteDetail(id) {
  return useQuery({
    queryKey: [ATHLETES_KEY, 'detail', id],
    queryFn: () => api.get(apiRoutes.athletes.detail(id)),
    enabled: Boolean(id),
  })
}

export function useSuspendAthlete(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }) =>
      api.post(apiRoutes.athletes.suspend(id), reason ? { reason } : {}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [ATHLETES_KEY] })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}

export function useUnsuspendAthlete(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => api.post(apiRoutes.athletes.unsuspend(id)),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [ATHLETES_KEY] })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}

export function useDeleteAthlete(options = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => api.delete(apiRoutes.athletes.delete(id)),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [ATHLETES_KEY] })
      options.onSuccess?.(...args)
    },
    onError: options.onError,
  })
}
