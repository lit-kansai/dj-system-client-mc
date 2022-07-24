import { IFetchRoomDetailModel } from '~/core/01-models/fetchRoomDetail'

export interface IRoomDetail {
  name: string
  description: string
  displayId: string
  type: string
  playlistId: string
}

export const toRoomDetailComponentProps = (
  roomDetail: IFetchRoomDetailModel
): IRoomDetail => {
  return {
    name: roomDetail.name,
    description: roomDetail.description,
    displayId: roomDetail.displayId,
    type: roomDetail.provider,
    playlistId: roomDetail.playlistId,
  }
}
