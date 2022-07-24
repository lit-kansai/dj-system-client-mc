<template>
  <div class="relative w-full max-w-sm m-auto mb-5 md:max-w-7xl">
    <LoadingOverlay v-if="fetchRoomDetailLoading" />
    <p class="mb-5">
      <NuxtLink to="/mc">ホーム</NuxtLink> / {{ roomDetail.name }}
    </p>
    <div class="flex flex-col gap-10">
      <!-- Details -->
      <div class="flex flex-col md:flex-row gap-10">
        <div class="self-stretch md:w-3/5">
          <Container>
            <template #content>
              <div class="flex items-end gap-x-3">
                <HeaderText text="Detail" />
                <NuxtLink
                  :to="`/mc/room/${roomDetail.displayId}/settings`"
                  class="text-yellow"
                >
                  &gt;&gt; ルームを編集する
                </NuxtLink>
              </div>
              <ul class="mt-3 mb-3">
                <li>ルームネーム: {{ roomDetail.name }}</li>
                <li>ルーム説明: {{ roomDetail.description }}</li>
                <li>使用サービス: {{ roomDetail.type }}</li>
                <li>
                  ルームURL:
                  <NuxtLink :to="`/room/${roomDetail.displayId}`">{{
                    protocolAndHostname + '/room/' + roomDetail.displayId
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
              <HeaderText text="Request" />
              <a
                :href="roomDetail.playlistId"
                target="_blank"
                class="text-yellow"
              >
                &gt;&gt; プレイリストを見る
              </a>
            </div>
            <!-- Table -->
            <table class="w-full mt-3 border-collapse">
              <thead class="hidden text-left md:table-header-group">
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
                  v-for="(music, index) in playlist"
                  :key="index"
                  class="w-full border border-gray-400 cursor-pointer hover:bg-neon-blue"
                  @click="redirectOutside(music.thumbnail)"
                >
                  <td class="w-14">
                    <img
                      :src="music.thumbnail"
                      class="object-cover mt-1 mb-1 ml-1 w-14 h-14"
                    />
                  </td>
                  <td class="pl-3">
                    {{ music.name }}
                    <div class="text-sm md:hidden">
                      {{ music.artists }}
                    </div>
                  </td>
                  <td class="hidden md:table-cell">{{ music.artists }}</td>
                  <td class="hidden md:table-cell">{{ music.album }}</td>
                  <td class="hidden md:table-cell">{{ music.duration }}</td>
                  <td class="hidden w-1/6 text-sm md:table-cell">
                    {{ 'がっしー' }}
                  </td>
                  <td>
                    <a :href="music.thumbnail" target="_blank">
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
          <HeaderText text="Letter" />
          <table class="w-full mt-3 border-collapse">
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
                class="border border-gray-400 cursor-pointer hover:bg-neon-blue"
              >
                <td class="pt-2 pb-2 pl-2">{{ letter.radioName }}</td>
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
import {
  defineComponent,
  onMounted,
  useRoute,
  computed,
  watch,
} from '@nuxtjs/composition-api'
import { useFetchRoomDetail } from '~/core/03-composables/useFetchRoomDetail'
import { FetchRoomDetailRepository } from '~/core/02-repositories/fetchRoomDetail'
import { FetchRoomPlaylistRepository } from '~/core/02-repositories/fetchRoomPlaylist'

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

export default defineComponent({
  setup() {
    const route = useRoute()
    const protocolAndHostname = computed(
      () => window.location.protocol + '//' + window.location.hostname
    )
    const displayID = computed(() => route.value.params.displayID)
    const redirectOutside = (url: string) => {
      window.open(url, '_blank')
    }
    const {
      letters,
      roomDetail,
      playlist,
      fetchRoomDetailError,
      fetchRoomDetailLoading,
      fetchRoom,
    } = useFetchRoomDetail(
      new FetchRoomDetailRepository(),
      new FetchRoomPlaylistRepository()
    )
    watch(fetchRoomDetailError, (error) => {
      alert(`ルーム情報の取得に失敗しました。${JSON.stringify(error?.message)}`)
    })
    onMounted(() => {
      fetchRoom({
        roomId: displayID.value,
      })
    })
    return {
      fetchRoomDetailLoading,
      redirectOutside,
      protocolAndHostname,
      roomDetail,
      playlist,
      letters,
    }
  },
})
</script>
