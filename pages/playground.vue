<template>
  <div>
    <fa icon="search" />
    <RoomLogo class="w-20 h-20" v-bind="roomLogo" />
    <!-- <MemberOtayori /> -->
    <!-- <Complete title="送信完了" subtitle="流れるのをお楽しみに!" /> -->
    <div class="flex p-11">
      <RoomLogo v-bind="roomLogo" />
      <!-- <Card v-bind="card" /> -->
    </div>
    <div class="p-11">
      <!-- <RequestMusicOverview v-bind="requestMusicOverview" /> -->
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        class="mt-3"
        @update:text="updateSearchWord"
      />
      <p class="gray-50">{{ searchWord }}</p>
      <Button v-bind="textButton" />
      <Button v-bind="searchButton" />
      <HeaderText v-bind="headerText" />
      <Container>
        <template #content>
          <div class="p-8">
            <HeaderText v-bind="headerText" />
          </div>
        </template>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
// import { RequestMusicOverview } from '~/components/02-molecules/RequestMusicOverview.vue'
import { TextInput } from '~/types/components/textInput'
// import { Card } from '~/components/02-molecules/Card.vue'
import { MusicOverview } from '~/types/components/music_overview'
import { RoomLogo } from '~/components/02-molecules/RoomLogo.vue'
import { Button } from '~/components/01-atoms/Button.vue'
import { HeaderText } from '~/components/01-atoms/HeaderText.vue'

export default defineComponent({
  layout: 'default',
  setup() {
    const card = ref<MusicOverview>({
      musicTitle: 'ヒステリックナイトガール',
      artistName: 'PSYQUI',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
    })
    const roomLogo = ref<RoomLogo>({
      roomName: 'ルーム名',
      imageUrl: '',
    })
    const requestMusicOverview = ref<MusicOverview>({
      musicTitle: 'ヒステリックナイトガール',
      artistName: 'PSYQUI',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
    })
    const searchWord = ref('')
    const textInput = ref<TextInput>({
      text: searchWord,
      type: 'text',
      placeholder: '曲名・アーティスト名を入力',
      spellcheck: false,
      autocomplete: 'off',
      isShowSearchIcon: true,
    })
    const updateSearchWord = (val: string) => {
      searchWord.value = val
    }
    const textButton = ref<Button>({
      type: 'text',
      text: 'MCにリクエストを送信',
    })
    const searchButton = ref<Button>({
      type: 'search',
      text: '',
    })
    const headerText = ref<HeaderText>({
      text: 'DJ GASSI',
    })
    return {
      card,
      roomLogo,
      requestMusicOverview,
      textInput,
      searchWord,
      updateSearchWord,
      textButton,
      searchButton,
      headerText,
    }
  },
})
</script>
