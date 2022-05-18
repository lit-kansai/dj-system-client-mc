<template>
  <div class="flex items-center justify-center h-full">
    <div>
      <Container>
        <template #content>
          <div class="min-w-[540px] min-h-[300px] w-[80vh] h-[45vh] p-6">
            <HeaderText v-bind="headerText" />
            <div class="flex flex-col items-center justify-center h-[90%]">
              <p class="text-xl">
                Googleをアカウント使ってログインしてください
              </p>
              <Button
                class="mt-4"
                v-bind="loginButton"
                @click.native="onLoginButtonClick"
              />
            </div>
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
    const { googleLogin } = useGoogleLogin()
    const onLoginButtonClick = () => {
      googleLogin.then((res) => window.open(res.redirectUrl))
    }
    return { headerText, loginButton, onLoginButtonClick }
  },
})
const useComponentComposables = () => {
  const headerText = ref<HeaderText>({
    text: 'LOGIN',
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
