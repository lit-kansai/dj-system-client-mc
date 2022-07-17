<template>
  <div>
    <h1>Sample</h1>
    <button @click="onLoginButtonClick">Login</button>
    <NuxtLink to="/playground">playground</NuxtLink>
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
