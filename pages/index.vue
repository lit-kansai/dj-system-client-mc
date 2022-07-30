<template>
  <div class="w-full flex items-center justify-center">
    <RoomLogo class="md:max-w-[500px]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useGoogleLogin } from '~/core/03-composables/useGoogleLogin'

export default defineComponent({
  setup() {
    const onLoginButtonClick = () => {
      useGoogleLogin().then((res) => window.location.assign(res.redirectUrl))
    }
    return { onLoginButtonClick }
  },
})
</script>
