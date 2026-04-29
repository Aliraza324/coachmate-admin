export const apiRoutes = {
  auth: {
    adminLogin: '/auth/admin/login',
    adminLogout: '/admin/logout',
  },
  athletes: {
    list: '/admin/athletes',
    detail: (id) => `/admin/athletes/${id}`,
    suspend: (id) => `/admin/athletes/${id}/suspend`,
    unsuspend: (id) => `/admin/athletes/${id}/unsuspend`,
    delete: (id) => `/admin/athletes/${id}`,
  },
  coaches: {
    list: '/admin/coaches',
    detail: (id) => `/admin/coaches/${id}`,
    suspend: (id) => `/admin/coaches/${id}/suspend`,
    unsuspend: (id) => `/admin/coaches/${id}/unsuspend`,
    delete: (id) => `/admin/coaches/${id}`,
  },
  notifications: {
    list: '/admin/notifications',
    unreadCount: '/admin/notifications/unread-count',
    clear: '/admin/notifications',
  },
}
