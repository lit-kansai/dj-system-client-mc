<template>
  <div class="relative flex flex-col h-screen min-h-screen">
    <Header :title="state.headerText.value">
      <template #right>
        <p v-if="!state.isShowUserButton.value" class="hidden md:block">
          powered by DJ GASSI
        </p>
      </template>
    </Header>
    <div class="flex-grow">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  toRefs,
  useRoute,
} from '@nuxtjs/composition-api'

interface State {
  headerText: string
  isShowUserButton: boolean
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const state = toRefs(
      reactive<State>({
        headerText: 'DJ Gassi',
        isShowUserButton: false,
      })
    )
    onBeforeMount(() => {
      const currentPath = route.value.path
      const mcPageRegex = /^(\/mc.*)/

      if (mcPageRegex.test(currentPath)) {
        state.headerText.value = 'DJ Gassi Console'
        state.isShowUserButton.value = true
      } else {
        state.isShowUserButton.value = false
      }
    })
    return {
      state,
    }
  },
})
</script>
