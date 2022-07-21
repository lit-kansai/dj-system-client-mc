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
} from '@nuxtjs/composition-api'
import { ProfileButton } from '~/components/01-atoms/ProfileButton.vue'
import { Header } from '~/components/03-organisms/Header.vue'

interface State {
  haeder: Header
  isShowProfileButton: boolean
  profile: ProfileButton
}

export default defineComponent({
  setup() {
    const route = useRoute()
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
    onBeforeMount(() => {
      const currentPath = route.value.path
      const mcPageRegex = /^(\/mc.*)/

      if (mcPageRegex.test(currentPath)) {
        state.isShowProfileButton.value = true
        state.haeder.value.title = 'DJ Gassi Console'
        state.haeder.value.redirectUrl = '/mc'
        // TODO: MCの個人情報を取得する
      } else {
        state.isShowProfileButton.value = false
        // TODO: メンバーページの場合のタイトルとホームのアドレスを設定
      }
    })
    return {
      state,
    }
  },
})
</script>
