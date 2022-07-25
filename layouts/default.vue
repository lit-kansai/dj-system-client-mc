<template>
  <div class="w-full max-w-screen-lg mx-auto my-0 h-screen">
    <div class="relative flex flex-col h-full">
      <Header v-bind="state.header.value">
        <template #right>
          <ProfileButton v-if="state.isShowProfileButton.value" />
          <p v-else class="hidden md:block">powered by DJ GASSI</p>
        </template>
      </Header>
      <div class="flex-grow">
        <nuxt />
      </div>
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
  watch,
  computed,
} from '@nuxtjs/composition-api'
import { Header } from '~/components/03-organisms/Header.vue'
import { FetchRoomOverviewRepository } from '~/core/02-repositories/fetchRoomOverview'
import { useFetchRoomOverview } from '~/core/03-composables/useFetchRoomOverview'
import { useUserCredentials } from '~/core/03-composables/useUserCredentials'

interface State {
  header: Header
  isShowProfileButton: boolean
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const mcPageRegex = /^(\/mc.*)/
    const currentPath = route.value.path
    const state = toRefs(
      reactive<State>({
        header: { title: 'DJ Gassi', redirectUrl: '' },
        isShowProfileButton: false,
      })
    )
    const { hasUserCredentials } = useUserCredentials()
    const { fetchRoomOverviewResponse, fetchRoomOverview } =
      useFetchRoomOverview(new FetchRoomOverviewRepository())
    const checkShowProfile = () => {
      if (mcPageRegex.test(currentPath) && hasUserCredentials()) {
        state.isShowProfileButton.value = true
      } else {
        state.isShowProfileButton.value = false
      }
    }
    onBeforeMount(() => {
      if (mcPageRegex.test(currentPath)) {
        state.header.value.title = 'DJ Gassi Console'
        state.header.value.redirectUrl = '/mc'
        // TODO: MCの個人情報を取得する
      } else {
        // TODO: メンバーページの場合のタイトルとホームのアドレスを設定
        const displayID = computed(() => route.value.params.displayID)
        fetchRoomOverview({ roomId: displayID.value })
      }
      checkShowProfile()
    })
    watch(
      () => route.value.path,
      (_) => {
        checkShowProfile()
      }
    )
    watch(fetchRoomOverviewResponse, (response) => {
      if (response) {
        state.header.value.title = response.name
        state.header.value.redirectUrl = `room/${response.id}`
      }
    })
    return {
      state,
    }
  },
})
</script>
