<template>
  <div class="flex flex-col items-center content-center">
    <img width="200px" height="200px" :src="url" :alt="`${roomName} Logo`" />
    <p class="mt-5 text-4xl">{{ roomName }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class RoomLogo extends Vue {
  @Prop() private readonly roomName!: string
  @Prop() private readonly imageUrl!: string
  get url() {
    return this.imageUrl
      ? this.imageUrl
      : require('@/assets/img/default_room_logo.png')
  }
}
</script>
