<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto">
    <p class="mt-5 mb-5">ホーム</p>
    <!-- Rooms -->
    <Container>
      <template #content>
        <!-- Header -->
        <div class="flex items-end gap-x-3">
          <HeaderText v-bind="roomHeaderText" />
          <NuxtLink to="/top" class="text-yellow">
            &gt;&gt; ルームを作成する
          </NuxtLink>
        </div>
        <!-- Table -->
        <table class="mt-3 w-full table-fixed border-collapse">
          <thead>
            <tr class="hidden">
              <th></th>
              <th class="w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="room in rooms"
              :key="room.displayId"
              class="border border-gray-400"
            >
              <td class="pt-2 pl-3 pb-3">{{ room.name }}</td>
              <td class="text-center pr-3 text-right">＞</td>
            </tr>
          </tbody>
        </table>
      </template>
    </Container>
    <!-- account -->
    <Container class="mt-10">
      <template #content>
        <HeaderText v-bind="accountHeaderText" />
        <p class="mt-3">各サービスのアカウントと連携します。</p>
        <table class="mt-3 w-full table-auto border-collapse">
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
              <td class="pt-2 pl-3 pb-2 flex items-center gap-x-3">
                <img
                  :src="require('@/assets/img/' + account.name + '_Icon.svg')"
                  class="w-9"
                />
                {{ account.name }}
              </td>
              <td class="text-center text-center">
                <button v-if="account.isConnected" class="pt-2 pb-2">
                  連携を解除
                </button>
                <button v-else class="text-yellow pt-2 pb-2">
                  &gt;&gt; 連携する
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { HeaderText } from '~/components/01-atoms/HeaderText.vue'

export interface Room {
  name: string
  description: string
  displayId: string
}

export interface Account {
  name: string
  isConnected: boolean
}

export default defineComponent({
  setup() {
    const roomHeaderText = ref<HeaderText>({
      text: 'Rooms',
    })
    const accountHeaderText = ref<HeaderText>({
      text: 'Account Link',
    })
    const rooms = ref<Room[]>([
      {
        name: 'DJちっち',
        description: '',
        displayId: 'dj-chicchi',
      },
      {
        name: 'DJさわっくま',
        description: '',
        displayId: 'dj-sawa-kuma',
      },
    ])
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
    return { roomHeaderText, accountHeaderText, accounts, rooms }
  },
})
</script>
