<template>
  <div class="relative">
    <button class="flex items-center" @click="clickProfileButton">
      <img
        :src="imageUrl"
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
          :class="isOpen ? 'rotate-180' : ''"
        >
          <path d="M4.21053 5.05263L8 0H0.421053L4.21053 5.05263Z"></path>
        </svg>
      </div>
    </button>
    <div
      v-if="isOpen"
      class="fixed top-0 bottom-0 left-0 right-0"
      @click="close()"
    />
    <div v-if="isOpen" class="absolute right-0 z-10">
      <div
        class="mt-2 bg-gray-800 w-80 rounded-2xl border-2 border-neon-blue shadow-modal-neon-blue z-30"
      >
        <div class="flex flex-col p-5">
          <div class="flex items-center">
            <img
              :src="imageUrl"
              class="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
            />
            <div class="pl-3">
              <p class="font-bold">{{ userName }}</p>
              <p>{{ email }}</p>
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
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export interface ProfileButton {
  imageUrl: string
  userName: string
  email: string
}

export default defineComponent({
  props: {
    imageUrl: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
  },
  setup() {
    const router = useRouter()
    const isOpen = ref(false)
    const clickProfileButton = () => {
      isOpen.value = !isOpen.value
    }
    const close = () => {
      isOpen.value = false
    }
    const logout = () => {
      localStorage.clear()
      router.push('/mc/login')
    }
    return {
      router,
      isOpen,
      clickProfileButton,
      close,
      logout,
    }
  },
})
</script>
