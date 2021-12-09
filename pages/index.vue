<template>
  <h1>Hello World!</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
})
export default class IndexPage extends Vue {}
</script>
