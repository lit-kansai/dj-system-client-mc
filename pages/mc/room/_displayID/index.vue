<template>
  <div class="relative w-full m-auto mb-5">
    <LoadingOverlay v-if="mountedLoading" />
    <p class="mb-5">
      <NuxtLink to="/mc">ホーム</NuxtLink> / {{ roomDetail.name }}
    </p>
    <div class="flex flex-col gap-10">
      <!-- Details -->
      <div class="flex flex-col gap-10">
        <div class="self-stretch md:w-5/5">
          <Container>
            <template #content>
              <div class="flex items-end gap-x-3">
                <HeaderText text="Detail" />
                <NuxtLink
                  :to="`/mc/room/${displayId}/settings`"
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
                  <a
                    :href="fullSharedUrl"
                    target="_blank"
                    rel="noopener"
                    class="underline break-words"
                  >
                    {{ fullSharedUrl }}&nbsp;<fa
                      icon="arrow-up-right-from-square"
                    />
                  </a>
                </li>
                <li>
                  <a :href="externalPlaylistUrl" target="_blank"
                    >SpotifyプレイリストURL：
                    <span class="underline break-words">{{
                      externalPlaylistUrl
                    }}</span
                    >&nbsp;<fa icon="arrow-up-right-from-square" />
                  </a>
                </li>
              </ul>
            </template>
          </Container>
        </div>
        <!-- Request -->
      </div>
      <!-- Message -->
      <Container>
        <template #content>
          <div class="flex mb-4">
            <HeaderText text="Letter" class="flex-grow" />
            <fa
              class="text-2xl cursor-pointer active:opacity-70"
              icon="refresh"
              @click="fetchUserRequests"
            />
          </div>
          <div v-if="fetchUserRequestsLoading" class="flex justify-center">
            <Loading class="text-2xl" />
          </div>
          <template v-else>
            <UserRequestCard
              v-for="(userRequest, index) in userRequests"
              :key="index"
              :card="userRequest"
              class="mb-4"
            />
          </template>
        </template>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from '@nuxtjs/composition-api'
import { useFetchRoomDetail } from '~/core/03-composables/useFetchRoomDetail'
import { FetchRoomDetailRepository } from '~/core/02-repositories/fetchRoomDetail'
import { FetchUserRequestsRepository } from '~/core/02-repositories/fetchUserRequests'

export default defineComponent({
  setup() {
    const {
      roomDetail,
      fetchRoomDetailError,
      displayId,
      mountedLoading,
      mounted,
      externalPlaylistUrl,
      fullSharedUrl,
      fetchUserRequests,
      userRequests,
      fetchUserRequestsLoading,
    } = useFetchRoomDetail(
      new FetchRoomDetailRepository(),
      new FetchUserRequestsRepository()
    )
    watch(fetchRoomDetailError, (error) => {
      alert(`ルーム情報の取得に失敗しました。${JSON.stringify(error?.message)}`)
    })
    onMounted(() => {
      mounted()
    })
    return {
      displayId,
      mountedLoading,
      userRequests,
      roomDetail,
      fetchUserRequests,
      externalPlaylistUrl,
      fullSharedUrl,
      fetchUserRequestsLoading,
    }
  },
})
</script>
