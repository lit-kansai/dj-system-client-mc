<template>
  <div class="relative flex flex-col h-screen min-h-screen">
    <Header v-bind="state.haeder.value">
      <template #right>
        <ProfileButton
          v-if="state.isShowProfileButton.value"
          v-bind="state.profile.value"
        />
        <p v-else class="hidden md:block">powered by DJ GASSI</p>
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
  watch,
} from '@nuxtjs/composition-api'
import { ProfileButton } from '~/components/01-atoms/ProfileButton.vue'
import { Header } from '~/components/03-organisms/Header.vue'
import { useUserCredentials } from '~/core/03-composables/useUserCredentials'

interface State {
  haeder: Header
  isShowProfileButton: boolean
  profile: ProfileButton
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const mcPageRegex = /^(\/mc.*)/
    const currentPath = route.value.path
    const state = toRefs(
      reactive<State>({
        haeder: { title: 'DJ Gassi', redirectUrl: '' },
        isShowProfileButton: false,
        profile: {
          imageUrl: 'https://guide.line.me/ja/dogday_01.jpg',
          userName: 'Dog',
          email: 'dog@sample.com',
        },
      })
    )
    const { hasUserCredentials } = useUserCredentials()
    const checkShowProfile = () => {
      if (mcPageRegex.test(currentPath) && hasUserCredentials()) {
        state.isShowProfileButton.value = true
      } else {
        state.isShowProfileButton.value = false
      }
    }
    onBeforeMount(() => {
      if (mcPageRegex.test(currentPath)) {
        state.haeder.value.title = 'DJ Gassi Console'
        state.haeder.value.redirectUrl = '/mc'
        // TODO: MCの個人情報を取得する
      } else {
        // TODO: メンバーページの場合のタイトルとホームのアドレスを設定
      }
      checkShowProfile()
    })
    watch(
      () => route.value.path,
      (_) => {
        checkShowProfile()
      }
    )
    return {
      state,
    }
  },
})
</script>
