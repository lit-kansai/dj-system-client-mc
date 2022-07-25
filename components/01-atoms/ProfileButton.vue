<template>
  <div class="relative">
    <button class="flex items-center" @click="clickProfileButton">
      <img
        :src="state.imageUrl.value"
        class="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
      />
      <div
        class="h-2 w-2 ml-2 mt-1 shrink-0 text-white group-hover:text-gray-200"
      >
        <svg
          class="fill-current"
          viewBox="0 0 8 6"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          :class="state.isOpen.value ? 'rotate-180' : ''"
        >
          <path d="M4.21053 5.05263L8 0H0.421053L4.21053 5.05263Z"></path>
        </svg>
      </div>
    </button>
    <div
      v-if="state.isOpen.value"
      class="fixed top-0 bottom-0 left-0 right-0"
      @click="close()"
    />
    <div v-if="state.isOpen.value" class="absolute right-0 z-10">
      <div
        class="mt-2 bg-gray-800 w-80 rounded-2xl border-2 border-neon-blue shadow-modal-neon-blue z-30"
      >
        <div class="flex flex-col p-5">
          <div class="flex items-center">
            <img
              :src="state.imageUrl.value"
              class="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
            />
            <div class="pl-3">
              <p class="font-bold">{{ state.userName.value }}</p>
              <p>{{ state.email.value }}</p>
            </div>
          </div>
          <div class="border-t border-gray-400 mt-4 mb-4" />
          <button class="text-left cursor-pointer" @click="logout">
            Logout
          </button>
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
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { FetchUserProfileRepository } from '~/core/02-repositories/fetchUserProfile'
import { useFetchUserProfile } from '~/core/03-composables/useFetchUserProfile'
import { USER_CREDENTIALS_LOCAL_STORAGE_KEY } from '~/utils/constants'

interface State {
  imageUrl: string
  userName: string
  email: string
  isOpen: boolean
}

export default defineComponent({
  setup() {
    const {
      fetchUserProfileResponse,
      fetchUserProfileError,
      fetchUserProfile,
    } = useFetchUserProfile(new FetchUserProfileRepository())
    const router = useRouter()
    const state = toRefs(
      reactive<State>({
        imageUrl: '',
        userName: '',
        email: '',
        isOpen: false,
      })
    )
    const clickProfileButton = () => {
      state.isOpen.value = !state.isOpen.value
    }
    const close = () => {
      state.isOpen.value = false
    }
    const logout = () => {
      state.isOpen.value = false
      localStorage.removeItem(USER_CREDENTIALS_LOCAL_STORAGE_KEY)
      router.push('/mc/login')
    }
    onBeforeMount(() => {
      fetchUserProfile()
    })
    watch(fetchUserProfileResponse, (value) => {
      state.imageUrl.value = value?.icon as string
      state.userName.value = value?.name as string
      state.email.value = ''
    })
    watch(fetchUserProfileError, (error) => {
      alert(
        `ユーザー情報の取得に失敗しました。${JSON.stringify(error?.message)}`
      )
    })
    return {
      state,
      router,
      clickProfileButton,
      close,
      logout,
    }
  },
})
</script>

function fetchUserProfile() { throw new Error('Function not implemented.') }
