<template>
  <div class="p-10">
    <div class="flex items-end mb-10">
      <HeaderText text="OTAYORI" class="mr-3" />
      <p>MCに! お便り! 送れますよ!</p>
    </div>
    <div class="grid grid-cols-title-and-content gap-5 mb-10">
      <p>リクエスト曲</p>
      <RequestMusicOverview v-bind="requestMusicOverview" />
      <p>ラジオネーム（任意）</p>
      <TextInput text="" />
      <p>お便り内容（任意）</p>
      <TextInput text="" />
    </div>
    <div class="flex justify-center">
      <Button text="リクエストを送信" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { RequestMusicOverview } from '~/components/02-molecules/RequestMusicOverview.vue'

export default defineComponent({
  setup() {
    const requestMusicOverview = ref<RequestMusicOverview>({
      musicTitle: 'ヒステリックナイトガール',
      artistName: 'PSYQUI',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
    })
    return {
      requestMusicOverview,
    }
  },
})
</script>
