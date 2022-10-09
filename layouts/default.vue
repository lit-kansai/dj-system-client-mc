<template>
  <div class="w-screen h-screen px-4">
    <div
      class="w-full h-full mx-auto my-0 max-w-screen-lg"
      :class="isMcRoute() ? 'md:max-w-7xl' : ''"
    >
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
  useRouter,
} from '@nuxtjs/composition-api'
import { Header } from '~/components/03-organisms/Header.vue'
import { FetchRoomOverviewRepository } from '~/core/02-repositories/fetchRoomOverview'
import { LocalUserCredentialsRepository } from '~/core/02-repositories/localUserCredentials'
import { useFetchRoomOverview } from '~/core/03-composables/useFetchRoomOverview'
import { useLocalUserCredentials } from '~/core/03-composables/useLocalUserCredentials'

interface State {
  header: Header
  isShowProfileButton: boolean
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = toRefs(
      reactive<State>({
        header: { title: '', redirectUrl: '' },
        isShowProfileButton: false,
      })
    )
    const { hasUserCredentials } = useLocalUserCredentials(
      new LocalUserCredentialsRepository()
    )
    const { fetchRoomOverviewResponse, fetchRoomOverview } =
      useFetchRoomOverview(new FetchRoomOverviewRepository())
    const isMcRoute = () => {
      const mcPageRegex = /^(\/mc.*)/
      const currentPath = route.value.path
      return mcPageRegex.test(currentPath)
    }
    const checkShowProfile = () => {
      if (isMcRoute() && hasUserCredentials()) {
        state.isShowProfileButton.value = true
      } else {
        state.isShowProfileButton.value = false
      }
    }
    const clickHeaderTitle = () => {
      router.push(state.header.value.redirectUrl)
    }
    onBeforeMount(() => {
      if (isMcRoute()) {
        state.header.value.title = 'DJ Gassi Console'
        state.header.value.redirectUrl = '/mc'
        // TODO: MCの個人情報を取得する
      } else {
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
        state.header.value.redirectUrl = `/room/${response.id}`
      }
    })
    return {
      state,
      clickHeaderTitle,
      isMcRoute,
    }
  },
})
</script>
