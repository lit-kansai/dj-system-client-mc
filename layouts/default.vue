<template>
  <div class="relative flex flex-col h-screen min-h-screen">
    <Header v-bind="header">
      <template #right>
        <p class="text-2xl">powered by DJ GASSI</p>
      </template>
    </Header>
    <div class="flex-grow">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Header } from '~/components/03-organisms/Header.vue'

export default defineComponent({
  setup() {
    const header = ref<Header>({
      title: 'DJ Gassi',
    })
    return {
      header,
    }
  },
})
</script>
