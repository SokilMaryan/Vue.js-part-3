import type { RouteRecordRaw } from 'vue-router'

import { contactRouteNames, contactsRoutes } from '@/views/contacts/contacts.routes'
import { jobRoute } from '@/views/job-opened/jobopening.routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: contactRouteNames.contacts }
  },

  ...contactsRoutes,
  ...jobRoute
]
