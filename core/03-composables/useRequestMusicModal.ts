import { InjectionKey } from '@nuxtjs/composition-api'
import { useRequestMusicModalState } from '~/core/03-composables/useRequestMusicModalState'
import { useSelectedMusic } from '~/core/03-composables/useSelectedMusic'
import { useModal } from '~/core/03-composables/useModal'
import { IMusicModel } from '~/core/01-models/music'
import { useRequestMusic } from '~/core/03-composables/useRequestMusic'
import { RequestMusicRepository } from '~/core/02-repositories/requestMusic'
import { sharedUseUrlParams } from '~/core/03-composables/useUrlParams'
import { DISPLAY_ID_KEY } from '~/types/data/urlParamsKey'

const { selectedMusic, setSelectedMusic } = useSelectedMusic()
const { currentModal, nextModal, previousModal } = useRequestMusicModalState()
const { modalState, openModal, closeModal } = useModal()
const { requestMusicError, requestMusic, requestMusicLoading } =
  useRequestMusic(new RequestMusicRepository())
const displayID = sharedUseUrlParams.getParams(DISPLAY_ID_KEY)

const onCloseModal = () => {
  closeModal()
  previousModal()
}

const selectMusic = (music: IMusicModel) => {
  setSelectedMusic(music)
  openModal()
}

const submitMusic = async (
  music: IMusicModel,
  radioName: string,
  message: string
) => {
  await requestMusic(music, radioName, message, displayID)
  nextModal()
}

export type PreviousModalType = typeof previousModal
export type SelectMusicType = typeof selectMusic
export type SubmitMusicType = typeof submitMusic
export const previousModalInjectionKey: InjectionKey<PreviousModalType> =
  Symbol('previousModal')
export const selectMusicInjectionKey: InjectionKey<SelectMusicType> =
  Symbol('selectMusic')
export const submitMusicInjectionKey: InjectionKey<SubmitMusicType> =
  Symbol('submitMusic')

export const useRequestMusicModal = () => {
  return {
    currentModal,
    modalState,
    previousModal,
    selectedMusic,
    selectMusic,
    submitMusic,
    onCloseModal,
    nextModal,
    requestMusicError,
    requestMusic,
    requestMusicLoading,
  }
}
