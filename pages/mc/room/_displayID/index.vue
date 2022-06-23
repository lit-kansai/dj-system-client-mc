<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto mb-5">
    <p class="mt-5 mb-5">
      <NuxtLink to="/mc">ホーム</NuxtLink> / {{ room.name }}
    </p>
    <div class="flex flex-col gap-10">
      <!-- Details -->
      <div class="flex flex-col md:flex-row gap-10">
        <div class="md:w-3/5 self-stretch">
          <Container>
            <template #content>
              <div class="flex items-end gap-x-3">
                <HeaderText v-bind="detailTitle" />
                <NuxtLink
                  :to="`/mc/room/${room.displayId}/settings`"
                  class="text-yellow"
                >
                  &gt;&gt; ルームを編集する
                </NuxtLink>
              </div>
              <ul class="mt-3 mb-3">
                <li>ルームネーム: {{ room.name }}</li>
                <li>ルーム説明: {{ room.description }}</li>
                <li>使用サービス: {{ room.type }}</li>
                <li>
                  ルームURL:
                  <NuxtLink :to="`/room/${room.displayId}`">{{
                    protocolAndHostname + '/room/' + room.displayId
                  }}</NuxtLink>
                </li>
              </ul>
            </template>
          </Container>
        </div>
        <!-- Request -->
        <Container>
          <template #content>
            <div class="flex items-end gap-x-3">
              <HeaderText v-bind="requestTitle" />
              <a :href="room.playlistId" target="_blank" class="text-yellow">
                &gt;&gt; プレイリストを見る
              </a>
            </div>
            <!-- Table -->
            <table class="mt-3 w-full border-collapse">
              <thead class="hidden md:table-header-group text-left">
                <tr>
                  <th>Song</th>
                  <th></th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Time</th>
                  <th>RadioName</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="music in musics"
                  :key="music.providedMusicId"
                  class="border border-gray-400 hover:bg-neon-blue cursor-pointer w-full"
                >
                  <td class="w-14">
                    <img
                      :src="music.imageUrl"
                      class="w-14 h-14 mt-1 ml-1 mb-1 object-cover"
                    />
                  </td>
                  <td class="pl-3">
                    {{ music.musicTitle }}
                    <div class="text-sm md:hidden">
                      {{ music.artistName }}
                    </div>
                  </td>
                  <td class="hidden md:table-cell">{{ music.artistName }}</td>
                  <td class="hidden md:table-cell">{{ music.albumName }}</td>
                  <td class="hidden md:table-cell">{{ music.duration }}</td>
                  <td class="hidden md:table-cell w-1/6 text-sm">
                    {{ music.radioNames.join(',') }}
                  </td>
                  <td>
                    <a :href="music.providerUrl" target="_blank">
                      <img
                        src="~/assets/img/copy_url.svg"
                        class="w-4 ml-2 mr-2"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </Container>
      </div>
      <!-- Message -->
      <Container>
        <template #content>
          <HeaderText v-bind="letterTitle" />
          <table class="mt-3 w-full border-collapse">
            <thead>
              <tr class="text-left">
                <th>Name</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="letter in letters"
                :key="letter.id"
                class="border border-gray-400 hover:bg-neon-blue cursor-pointer"
              >
                <td class="pl-2 pt-2 pb-2">{{ letter.radioName }}</td>
                <td>{{ letter.message }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { computed, useRoute } from '@nuxtjs/composition-api'
import { Room } from '~/pages/mc/index.vue'
import { HeaderText } from '~/components/01-atoms/HeaderText.vue'

export interface RequestMusicDetail {
  musicTitle: string
  albumName: string
  artistName: string
  imageUrl: string
  providerUrl: string
  duration: number
  providedMusicId: string
  radioNames: string[]
}

export interface Letter {
  id: number
  radioName: string
  message: string
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const protocolAndHostname = computed(
      () => window.location.protocol + '//' + window.location.hostname
    )
    const id = computed(() => route.value.params.id)
    const room = ref<Room>({
      name: 'DJさわっくま',
      description: 'B日程用',
      displayId: 'dj-sawa-kuma',
      type: 'applemusic',
      playlistId: 'dj2402d',
    })
    const detailTitle = ref<HeaderText>({
      text: 'Detail',
    })
    const requestTitle = ref<HeaderText>({
      text: 'Request',
    })
    const letterTitle = ref<HeaderText>({
      text: 'Letter',
    })
    const musics = ref<RequestMusicDetail[]>([
      {
        musicTitle: 'ヒステリックナイトガール',
        albumName: 'Styley!',
        artistName: 'PSUQUI',
        imageUrl:
          'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
        providerUrl:
          'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
        duration: 220,
        providedMusicId: 'm2ed2',
        radioNames: ['がっしー', 'てぃーてぃー'],
      },
      {
        musicTitle: 'ヒステリックナイトガール',
        artistName: 'PSUQUI',
        albumName: 'Styley!',
        imageUrl:
          'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
        providerUrl:
          'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
        duration: 220,
        providedMusicId: 'm2ed2',
        radioNames: ['がっしー'],
      },
    ])
    const letters = ref<Letter[]>([
      {
        id: 0,
        radioName: 'がっしー',
        message: '初めて投稿しました！',
      },
      {
        id: 1,
        radioName: 'てぃーてぃー',
        message: 'やっぱりこの曲！',
      },
    ])
    return {
      id,
      protocolAndHostname,
      room,
      detailTitle,
      requestTitle,
      letterTitle,
      musics,
      letters,
    }
  },
})
</script>
