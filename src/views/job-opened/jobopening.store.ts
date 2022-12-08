
import { jobOpenings, type IJobOpening } from '@/_homework/job-openings'
import { departments, type IDepartment } from '@/_homework/departments'

export const useJobOpeningsStore = defineStore('jobOpeningsStore', () => {
  const jobOpeningStore = shallowRef<IJobOpening[]>(jobOpenings)
  const departmentStore = shallowRef<IDepartment[]>(departments)

  const jobOpeningValue = computed(() => {
    return jobOpeningStore.value.map(item => ({
      title: item.title,
      id: item.id,
      departments: item.departments.toString(), // for skip [] and use value.toString() to filter
      isClosed: item.isClosed,
      url: item.url
    }))
  })

  const departmentsValue = computed(() => {
    return departmentStore.value.map(item => ({
      name: item.name,
      value: item.value
    }))
  })

  return {
    jobOpeningStore,
    departmentStore,
    jobOpeningValue,
    departmentsValue
  }
})
