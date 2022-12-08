<template>
  <div class="sidebar w-[500px] ">
    <div class="flex items-center text-center gap-4">
      <h3 class="font-medium m-0 mb-2">Job Opening</h3>
    </div>

    <div class="flex flex-col items-start gap-2">
      <spa>Departments</spa>
      <select
        v-model="selectedDepartments"
        class="rounded-md font-medium border border-gray-medium focus:border-gray-dark text-sm p-2 "
      >
        <option value disabled selected> Please select a depatment </option>
        <option
          v-for="deps in filterDoesntExistDepartmen"
          :key="deps.value"
        >
          {{ deps.value }}
        </option>
        <option> ...Other </option>
      </select>
      <!--  count showing out of  job openings -->
      <span class="text-md p-2 text-center">
        Showing {{ filteredRenderingListContact?.length }} out of {{ jobOpeningValue.length }} job openings
      </span>
    </div>

    <div class="flex gap-5 overflow-y-scroll w-[400px] max-h-[800px] bg-white">
      <!-- Render chose list -->
      <template v-if="!selectedDepartments">
        <div class="flex flex-col gap-0 font-medium w-full">
          <ul
            v-for="jobOpening in noSelectedDepartments"
            :key="jobOpening.title"
            class="cursor-pointer"
            @click="onOfShowChange"
          >
            <li class="flex tetx-black mb-1 text-sm p-2">
              <span class="border-1 mr-2 w-[10px] h-[10px] justify-center items-center rounded-full bg-lime-700">''
              </span>
              <div class="text-gray cursor-text mt-1 truncate">
                {{ jobOpening.title }} {{ jobOpening.departments.length }}
                <ul
                  v-for="dep in jobOpening.departments "
                  :key="dep"
                  @click="onOfShowChange"
                >
                  <li class="flex tetx-black mb-1 text-sm p-2">
                    <span
                      class="border-1 mr-2 w-[10px] h-[10px] justify-center items-center rounded-full bg-lime-700"
                    >
                      ''
                    </span>
                    <div class="text-gray cursor-text mt-1 truncate">
                      {{ dep }}
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <AppButton @click="onOfShowChange">
            Show more
          </AppButton>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col gap-0 font-medium w-full">
          <ul
            v-for="jobOpening in filteredRenderingListContact"
            :key="jobOpening.title"
            class="cursor-pointer"
            @click="onOfShowChange"
          >
            <li class="flex tetx-black mb-1 text-sm p-2">
              <span
                class="border-1 mr-2 w-[10px] h-[10px] justify-center items-center rounded-full bg-lime-700"
              >
                ''
              </span>
              <div class="text-gray cursor-text mt-1 truncate">{{ jobOpening.title }}</div>
            </li>
          </ul>

          <AppButton @click="onOfShowChange">
            Show more
          </AppButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJobOpeningsStore } from './jobopening.store'
import AppButton from '@/components/AppButton.vue'

const onOfShow = ref(false)
const selectedDepartments = ref('')
const { jobOpeningValue } = useJobOpeningsStore()
const { departmentsValue } = useJobOpeningsStore()

function onOfShowChange () {
  onOfShow.value = !onOfShow.value
}

function grupedFiteredOther () {
  //  doesn't have any departments
  const otherJodsArr = []

  for (let i = 0; i < jobOpeningValue.length; i++) {
    if (jobOpeningValue[i].departments.length < 1) {
      otherJodsArr.push(jobOpeningValue[i])
    }
  }
  return otherJodsArr
}

const filterDoesntExistDepartmen = computed(() => {
  const curentDeps = departmentsValue.filter(
    el => {
      for (let i = 0; i < jobOpeningValue.length; i++) {
        if (jobOpeningValue[i].departments.includes(el.value)) {
          return jobOpeningValue[i]
        }
      }
    }
  )
  const alphabetically = curentDeps.sort((a, b) => a.name.localeCompare(b.name))
  return alphabetically
})

const noSelectedDepartments = computed(() => {
  const arrValues = []
  for (let i = 0; i < filterDoesntExistDepartmen.value.length; i++) {
    const elem = filterDoesntExistDepartmen.value[i].value
    const filteredValue = jobOpeningValue
      .filter(job => job.departments
        .includes(elem.toLowerCase()))

    const arr = []
    for (const key in filteredValue) {
      if (Object.prototype.hasOwnProperty.call(filteredValue, key)) {
        const element = filteredValue[key].title
        arr.push(element)
      }
    }
    arrValues.push({ title: elem, departments: arr })
  }
  return arrValues
})

const filteredRenderingListContact = computed(() => {
  if (selectedDepartments.value === '...Other') {
    return onOfShow.value
      ? grupedFiteredOther()
      : grupedFiteredOther().slice(0, 5)
  } else if (selectedDepartments.value) {
    const filteredValue = jobOpeningValue
      .filter(job => job.departments
        .includes(selectedDepartments.value.toLowerCase()))

    return onOfShow.value
      ? filteredValue
      : filteredValue.slice(0, 5)
  }
})

</script>
