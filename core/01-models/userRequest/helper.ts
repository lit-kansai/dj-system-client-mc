import dayjs from 'dayjs'
import { IUserRequestModel } from '~/core/01-models/userRequest'
import { UserRequestCardProps } from '~/types/components/userRequestCard'

export const formatedDate = (model: IUserRequestModel): string => {
  return dayjs(model.createdAt).format('YYYY/MM/DD HH:mm')
}

export const toUserRequestCardProps = (
  model: IUserRequestModel
): UserRequestCardProps => {
  return {
    userName: model.letter.radioName,
    date: model.formatedDate,
    artists: model.artist,
    body: model.letter.message,
    musicTitle: model.name,
    thumbnail: model.thumbnail,
  }
}
