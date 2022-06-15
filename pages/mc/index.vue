<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto">
    <p class="mt-5 mb-5">ホーム</p>
    <!-- Rooms -->
    <Container>
      <template #content>
        <div class="p-4">
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
              <tr class="text-left h-0">
                <th class="w-2/3 font-medium"></th>
                <th class="w-1/6 font-medium"></th>
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
                <td>
                  <img src="~assets/img/copy_url.svg" class="h-5 m-auto" />
                </td>
                <td class="text-center pr-3 text-right">編集</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Container>
    <!-- account -->
    <Container class="mt-10">
      <template #content>
        <div>
          <HeaderText v-bind="accountHeaderText" />
        </div>
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

export default defineComponent({
  setup() {
    const roomHeaderText = ref<HeaderText>({
      text: 'Rooms',
    })
    const accountHeaderText = ref<HeaderText>({
      text: 'Accounts',
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
    return { roomHeaderText, accountHeaderText, rooms }
  },
})
</script>
