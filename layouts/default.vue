<template>
  <div class="min-h-screen">
    <Header />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
})
export default class DefaultLayout extends Vue {}
</script>
