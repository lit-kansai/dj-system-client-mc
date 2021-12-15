<template>
  <div class="p-11 flex">
    <RoomLogo v-bind="roomLogo" />
    <Card v-bind="card" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Card } from '~/components/02-molecules/Card.vue'
import { RoomLogo } from '~/components/02-molecules/RoomLogo.vue'

export default defineComponent({
  layout: 'default',
  setup() {
    const card = ref<Card>({
      musicTitle: 'ヒステリックナイトガール',
      artistName: 'PSYQUI',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
    })
    const roomLogo = ref<RoomLogo>({
      roomName: 'ルーム名',
      imageUrl: '',
    })
    return {
      card,
      roomLogo,
    }
  },
})
</script>
