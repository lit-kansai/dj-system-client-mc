<template>
  <div class="min-h-screen h-auto flex flex-col items-center justify-center">
    <img width="256px" height="256px" src="~assets/img/404.png" alt="404.png" />
    <nuxt-link to="/">HOMEへ戻る</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  layout: 'empty',
})
</script>
