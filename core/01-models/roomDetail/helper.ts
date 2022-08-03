import { IRoomDetailModel } from '~/core/01-models/roomDetail'
import { IRoomDetail } from '~/types/components/roomDetail'

export const toRoomDetailComponentProps = (
  model: IRoomDetailModel
): IRoomDetail => {
  return {
    name: model.name,
    description: model.description,
    displayId: model.displayId,
    type: model.provider,
    playlistId: model.playlistId,
  }
}
