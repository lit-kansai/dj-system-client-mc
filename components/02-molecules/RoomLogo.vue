<template>
  <div class="flex flex-col items-center content-center">
    <img :src="url" :alt="`${roomName} Logo`" class="w-11/12" />
    <p class="hidden md:block -m-3 text-4xl">{{ roomName }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export interface RoomLogo {
  roomName: string
  imageUrl: string
}

export default defineComponent({
  props: {
    roomName: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  setup(props: RoomLogo) {
    const url = computed((): string =>
      props.imageUrl
        ? props.imageUrl
        : require('@/assets/img/default_room_logo.png')
    )
    return {
      url,
    }
  },
})
</script>
