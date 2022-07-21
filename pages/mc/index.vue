<template>
  <div class="w-full max-w-sm m-auto mb-5 md:max-w-7xl">
    <p class="mb-5"><NuxtLink to="/mc">ホーム</NuxtLink></p>
    <!-- Rooms -->
    <div class="flex flex-col md:flex-row gap-10">
      <Container>
        <template #content>
          <!-- Header -->
          <div class="flex items-end gap-x-3">
            <HeaderText v-bind="roomHeaderText" />
            <NuxtLink to="/mc/room/create" class="text-yellow">
              &gt;&gt; ルームを作成する
            </NuxtLink>
          </div>
          <p class="mt-3">
            "Room"ごとに曲のリクエストを募集することができます。
          </p>
          <!-- Table -->
          <table class="relative w-full mt-3 border-collapse table-fixed">
            <LoadingOverlay v-if="fetchRoomsLoading" />
            <thead class="hidden text-left md:table-header-group">
              <tr class="border border-gray-400">
                <th class="pt-2 pb-2 pl-3">ルーム名</th>
                <th>ルーム説明</th>
                <th>共有URL</th>
                <th class="w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="room in rooms"
                :key="room.displayId"
                class="border border-gray-400 cursor-pointer hover:bg-neon-blue"
                @click="routerPush(room.displayId)"
              >
                <td class="hidden pt-2 pb-3 pl-3 md:table-cell">
                  {{ room.name }}
                </td>
                <td class="pt-2 pb-3 pl-3 md:pl-0">
                  {{ room.description }}
                  <div class="text-sm md:hidden">
                    {{ room.name }}
                  </div>
                </td>
                <td class="hidden md:table-cell">
                  <div class="flex gap-1.5">
                    <NuxtLink
                      :to="'/room/' + room.displayId"
                      class="underline"
                      target="_blank"
                    >
                      {{ room.displayId }}
                    </NuxtLink>
                    <button>
                      <img src="~/assets/img/copy_url.svg" class="w-4" />
                    </button>
                  </div>
                </td>
                <td class="pr-3 text-center text-right">＞</td>
              </tr>
            </tbody>
          </table>
        </template>
      </Container>
      <!-- account -->
      <Container class="max-w-md">
        <template #content>
          <HeaderText v-bind="accountHeaderText" />
          <p class="mt-3">各サービスのアカウントと連携します。</p>
          <table class="w-full mt-3 border-collapse table-auto">
            <thead>
              <tr class="hidden">
                <th class="w-2/3"></th>
                <th class="w-1/3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="account in accounts"
                :key="account.name"
                class="border border-gray-400"
              >
                <td class="flex items-center pt-2 pb-2 pl-3 gap-x-3">
                  <img
                    :src="require('@/assets/img/' + account.name + '_Icon.svg')"
                    class="w-9"
                  />
                  {{ account.name }}
                </td>
                <td class="text-center">
                  <button v-if="account.isConnected" class="pt-2 pb-2">
                    連携を解除
                  </button>
                  <button
                    v-else
                    class="pt-2 pb-2 text-yellow"
                    @click="connectSpotify"
                  >
                    &gt;&gt; 連携する
                  </button>
                </td>
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
import { onMounted, useRouter, watch } from '@nuxtjs/composition-api'
import { HeaderText } from '~/components/01-atoms/HeaderText.vue'
import { FetchRoomsRepository } from '~/core/02-repositories/fetchRooms'
import { useFetchRooms } from '~/core/03-composables/useFetchRooms'
import { useLoading } from '~/core/03-composables/useLoading'
import LoadingOverlay from '~/components/02-molecules/LoadingOverlay.vue'
import { useSpotifyLogin } from '~/core/03-composables/useSpotifyLogin'
import { SpotifyLoginRepository } from '~/core/02-repositories/spotifyLogin'

export interface Room {
  name: string
  description: string
  displayId: string
  type: string
  playlistId: string
}

export interface Account {
  name: string
  isConnected: boolean
}

export default defineComponent({
  components: { LoadingOverlay },
  setup() {
    const { loginSpotify } = useSpotifyLogin(new SpotifyLoginRepository())
    const { fetchRoomsResponse, fetchRoomsError, fetchRooms } = useFetchRooms(
      new FetchRoomsRepository()
    )
    const { loading: fetchRoomsLoading, setLoading: setFetchRoomsLoading } =
      useLoading()
    const router = useRouter()
    const roomHeaderText = ref<HeaderText>({
      text: 'Rooms',
    })
    const accountHeaderText = ref<HeaderText>({
      text: 'Account Link',
    })
    const rooms = ref<Room[]>([])
    const accounts = ref<Account[]>([
      {
        name: 'Spotify',
        isConnected: false,
      },
      {
        name: 'AppleMusic',
        isConnected: true,
      },
    ])
    const routerPush = (displayId: String) => {
      router.push(`/mc/room/${displayId}`)
    }
    const connectSpotify = () => {
      console.log('connectSpotify')
      loginSpotify()
    }
    watch(fetchRoomsResponse, (value) => {
      setFetchRoomsLoading(false)
      if (!value) {
        return
      }
      value.map((room) =>
        rooms.value.push({
          name: room.name,
          description: room.description,
          displayId: room.displayId,
          type: 'applemusic',
          playlistId: String(room.playlistId),
        })
      )
    })
    watch(fetchRoomsError, (error) => {
      alert(`ルームの取得に失敗しました。${JSON.stringify(error?.message)}`)
    })
    onMounted(() => {
      setFetchRoomsLoading(true)
      fetchRooms()
    })
    return {
      connectSpotify,
      fetchRoomsLoading,
      roomHeaderText,
      accountHeaderText,
      accounts,
      rooms,
      routerPush,
    }
  },
})
</script>
