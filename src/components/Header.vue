<template>
  <header class="pb-5 flex mr-3 text-base font-semibold gap-4">
    <AppButton>
      <RouterLink
        class="py-2 pr-4 nav-hover active w-[150px]"
        :to="{name: $routeNames.contacts}"
      >
        Contacts
      </RouterLink>
    </AppButton>

    <AppButton>
      <RouterLink
        class="py-2 pr-4 nav-hover active w-[150px]"
        :to="{name: $routeNames.job}"
      >
        Job Openings
      </RouterLink>
    </AppButton>
  </header>
</template>
