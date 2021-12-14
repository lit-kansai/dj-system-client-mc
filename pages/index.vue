<template>
  <div class="p-11 flex">
    <RoomLogo v-bind="roomLogo" />
    <Card v-bind="post" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
  data: () => ({
    post: {
      musicTitle: 'ヒステリックナイトガール',
      artistName: 'PSYQUI',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
    },
    roomLogo: {
      roomName: 'ルーム名',
      imageUrl: '',
    },
  }),
})
export default class IndexPage extends Vue {}
</script>
