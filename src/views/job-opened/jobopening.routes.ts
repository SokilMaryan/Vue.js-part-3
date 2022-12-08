import type { RouteRecordRaw } from 'vue-router'

import JobOpening from './JobOpening.vue'
// import UpsertContact from '@/views/contacts/UpsertContact.vue'

export const jobRouteNames = {
  job: 'job'
  // upsertContact: 'upsertContact'
}

export const jobRoute: RouteRecordRaw[] = [
  {
    path: '/job-opening',
    name: jobRouteNames.job,
    component: JobOpening
  }
]
