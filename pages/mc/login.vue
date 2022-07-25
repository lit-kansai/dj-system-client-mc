<template>
  <div class="fixed inset-0 h-screen">
    <div class="flex items-center justify-center h-full">
      <Container class="w-[95%] h-auto max-w-sm md:max-w-lg">
        <template #content>
          <HeaderText v-bind="headerText" />
          <p class="text-gray-200 mt-3">
            DJ
            Gassiは「会場に参加者のリクエスト曲を流したい!」そんな思いを叶えるサービスです。ログインしてMCになりましょう。
          </p>
          <div class="flex justify-center my-4">
            <LoginWithGoogle @click.native="onLoginButtonClick" />
          </div>
        </template>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { HeaderText } from '~/components/01-atoms/HeaderText.vue'
import { Button } from '~/components/01-atoms/Button.vue'
import { useGoogleLogin } from '~/core/03-composables/useGoogleLogin'

export default defineComponent({
  setup() {
    const { headerText, loginButton } = useComponentComposables()
    const onLoginButtonClick = () => {
      useGoogleLogin().then((res) => window.location.assign(res.redirectUrl))
    }
    return { headerText, loginButton, onLoginButtonClick }
  },
})
const useComponentComposables = () => {
  const headerText = ref<HeaderText>({
    text: 'DJ Gassi',
  })
  const loginButton = ref<Button>({
    type: 'text',
    text: 'ログインする',
  })
  return {
    loginButton,
    headerText,
  }
}
</script>
