import { InjectionKey, ref, watch } from '@nuxtjs/composition-api'
import { useRequestMusicModalState } from '~/core/03-composables/useRequestMusicModalState'
import { useSelectedMusic } from '~/core/03-composables/useSelectedMusic'
import { useModal } from '~/core/03-composables/useModal'
import { IMusicModel } from '~/core/01-models/music'
import {
  useRequestMusic,
  UseRequestMusicInputs,
} from '~/core/03-composables/useRequestMusic'
import { RequestMusicRepository } from '~/core/02-repositories/requestMusic'

export interface ISubmitMusicPayload {
  music: IMusicModel
  radioName: string
  message: string
}
export interface IRequestMusicPayload {
  music: IMusicModel
  radioName: string
  message: string
}
export interface IMusicSelectPayload {
  music: IMusicModel
}
const { selectedMusic, setSelectedMusic } = useSelectedMusic()
const { currentState, nextModal, previousModal } = useRequestMusicModalState()
const { modalState, openModal, closeModal } = useModal()
const {
  requestMusicResult,
  requestMusicError,
  requestMusic,
  requestMusicLoading,
} = useRequestMusic(new RequestMusicRepository())

const displayID = ref('')
const setDisplayID = (id: string) => (displayID.value = id)
const submitMusic = (payload: ISubmitMusicPayload) => {
  const inputs: UseRequestMusicInputs = {
    params: {
      musics: [payload.music.id],
      radioName: payload.radioName,
      message: payload.message,
    },
    roomId: displayID.value,
  }
  requestMusic(inputs)
}

const selectMusic = (payload: IMusicSelectPayload) => {
  setSelectedMusic(payload.music)
  openModal()
}

const onCloseModal = () => {
  closeModal()
  previousModal()
}

export type PreviousModalType = typeof previousModal
export type SelectMusicType = typeof selectMusic
export type SubmitMusicType = typeof submitMusic
export const previousModalInjectionKey: InjectionKey<typeof previousModal> =
  Symbol('previousModal')
export const selectMusicInjectionKey: InjectionKey<typeof selectMusic> =
  Symbol('selectMusic')
export const submitMusicInjectionKey: InjectionKey<SubmitMusicType> =
  Symbol('submitMusic')

export const useRequestMusicModal = () => {
  watch(requestMusicResult, () => {
    nextModal()
  })
  return {
    currentState,
    modalState,
    previousModal,
    selectedMusic,
    selectMusic,
    submitMusic,
    onCloseModal,
    nextModal,
    setDisplayID,
    requestMusicResult,
    requestMusicError,
    requestMusic,
    requestMusicLoading,
  }
}
