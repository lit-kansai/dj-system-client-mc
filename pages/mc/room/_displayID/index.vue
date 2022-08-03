<template>
  <div class="relative w-full m-auto mb-5">
    <LoadingOverlay v-if="mountedLoading || fetchPlaylistLoading" />
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
                  <NuxtLink :to="sharedUrlPath" class="underline"
                    >{{ fullSharedUrl }}&nbsp;<fa
                      icon="arrow-up-right-from-square"
                    />
                  </NuxtLink>
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
                target="_blank"
                class="cursor-pointer text-yellow"
                :href="externalPlaylistUrl"
              >
                &gt;&gt; プレイリストを見る
              </a>
            </div>
            <!-- Table -->
            <table class="relative w-full mt-3 border-collapse">
              <thead class="hidden text-left md:table-header-group">
                <tr>
                  <th>Song</th>
                  <th></th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Time</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(music, index) in playlist"
                  :key="index"
                  class="w-full border border-gray-400 cursor-pointer hover:bg-neon-blue"
                  @click="redirectOutside(music.spotifyUrl)"
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
                  <td class="hidden md:table-cell">
                    {{ music.secondsToMMSS }}
                  </td>
                  <td>
                    <div>
                      <img
                        src="~/assets/img/copy_url.svg"
                        class="w-4 ml-2 mr-2"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="!mountedLoading && !fetchPlaylistLoading"
              class="mt-4 text-center"
            >
              <button>
                <fa
                  icon="refresh"
                  class="text-3xl active:opacity-50"
                  @click="reloadPlaylist"
                />
              </button>
            </div>
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
                class="border border-gray-400 hover:bg-neon-blue"
              >
                <template v-if="letter.message != ''">
                  <td class="pt-2 pb-2 pl-2">{{ letter.radioName }}</td>
                  <td>{{ letter.message }}</td>
                </template>
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

export default defineComponent({
  setup() {
    const route = useRoute()
    const displayID = computed(() => route.value.params.displayID)
    const redirectOutside = (url: string) => {
      window.open(url, '_blank')
    }
    const {
      letters,
      roomDetail,
      playlist,
      fetchRoomDetailError,
      fetchPlaylist,
      fetchPlaylistLoading,
      mountedLoading,
      mounted,
      externalPlaylistUrl,
      sharedUrlPath,
      fullSharedUrl,
    } = useFetchRoomDetail(
      new FetchRoomDetailRepository(),
      new FetchRoomPlaylistRepository()
    )
    watch(fetchRoomDetailError, (error) => {
      alert(`ルーム情報の取得に失敗しました。${JSON.stringify(error?.message)}`)
    })
    const reloadPlaylist = () => {
      fetchPlaylist()
    }
    onMounted(() => {
      mounted({
        roomId: displayID.value,
      })
    })
    return {
      mountedLoading,
      fetchPlaylistLoading,
      redirectOutside,
      roomDetail,
      reloadPlaylist,
      playlist,
      letters,
      externalPlaylistUrl,
      sharedUrlPath,
      fullSharedUrl,
    }
  },
})
</script>
