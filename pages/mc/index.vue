<template>
  <div class="w-full m-auto mb-5">
    <p class="mb-5"><NuxtLink to="/mc">ホーム</NuxtLink></p>
    <!-- Rooms -->
    <div class="relative flex flex-col md:flex-row gap-10">
      <LoadingOverlay v-if="loading" />
      <Container>
        <template #content>
          <!-- Header -->
          <div class="flex items-end gap-x-3">
            <HeaderText text="Rooms" />
            <button class="text-yellow" @click="onCreateRoomButtonClicked">
              &gt;&gt; ルームを作成する
            </button>
          </div>
          <p class="mt-3">
            "Room"ごとに曲のリクエストを募集することができます。
          </p>
          <!-- Table -->
          <table class="relative w-full mt-3 border-collapse table-fixed">
            <thead class="hidden text-left md:table-header-group">
              <tr class="border border-gray-400">
                <th class="pt-2 pb-2 pl-3">ルーム名</th>
                <th>ルーム説明</th>
                <th>共有URL</th>
                <th class="w-1/6"></th>
              </tr>
            </thead>
            <tbody v-if="!loading">
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
          <HeaderText text="Account Link" />
          <p class="mt-3">各サービスのアカウントと連携します。</p>
          <table class="w-full mt-3 border-collapse table-auto">
            <thead>
              <tr class="hidden">
                <th class="w-2/3"></th>
                <th class="w-1/3"></th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="status in userProviderStatus"
                :key="status.name"
                class="border border-gray-400"
              >
                <td class="flex items-center pt-2 pb-2 pl-3 gap-x-3">
                  <img
                    :src="require('@/assets/img/' + status.name + 'Icon.svg')"
                    class="w-9"
                  />
                  {{ status.displayName }}
                </td>
                <td class="text-center">
                  <button v-if="status.isConnected" class="pt-2 pb-2">
                    連携完了
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
import {
  defineComponent,
  onMounted,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { FetchRoomsRepository } from '~/core/02-repositories/fetchRooms'
import { SpotifyLoginRepository } from '~/core/02-repositories/spotifyLogin'
import { useAccountDetail } from '~/core/03-composables/useAccountDetail'
import { FetchUserProfileRepository } from '~/core/02-repositories/fetchUserProfile'

export default defineComponent({
  setup() {
    const {
      userProviderStatus,
      loading,
      rooms,
      accountDetailError,
      fetchAccountDetail,
      isProviderConnected,
      loginSpotify,
    } = useAccountDetail(
      new FetchRoomsRepository(),
      new FetchUserProfileRepository(),
      new SpotifyLoginRepository()
    )
    const router = useRouter()
    const routerPush = (displayId: String) => {
      router.push(`/mc/room/${displayId}`)
    }
    const connectSpotify = () => {
      loginSpotify()
    }
    const onCreateRoomButtonClicked = () => {
      if (isProviderConnected.value) {
        router.push(`/mc/room/create`)
      } else {
        alert('ルームの作成にはSpotifyアカウントとの連携が必要です')
      }
    }
    watch(accountDetailError, (error) => {
      alert(`ルームの取得に失敗しました。${JSON.stringify(error?.message)}`)
    })
    onMounted(() => {
      fetchAccountDetail()
    })
    return {
      userProviderStatus,
      onCreateRoomButtonClicked,
      loading,
      connectSpotify,
      rooms,
      routerPush,
    }
  },
})
</script>
