<template>
  <div class="flex flex-col items-center content-center">
    <img
      width="200px"
      height="200px"
      :src="imageUrl"
      :alt="`${roomName} Logo`"
    />
    <p class="mt-5 text-4xl">{{ roomName }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

export interface RoomLogo {
  roomName: string
  imageUrl: string
}

export default defineComponent({
  props: {
    roomLogo: { type: Object as PropType<RoomLogo>, required: true },
  },
  setup(props) {
    const roomName = computed((): string => props.roomLogo.roomName)
    const imageUrl = computed((): string =>
      props.roomLogo.imageUrl
        ? props.roomLogo.imageUrl
        : require('@/assets/img/default_room_logo.png')
    )
    return {
      roomName,
      imageUrl,
    }
  },
})
</script>
