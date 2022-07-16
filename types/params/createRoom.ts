import { ProviderName } from '~/types/data/providerName'

export interface ICreateRoomParams {
  urlName: string
  roomName: string
  description: string
  provider: ProviderName
}
