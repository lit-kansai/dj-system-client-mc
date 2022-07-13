export interface ICreateRoomModel {
  id: number
  name: string
  description: string
}

export class CreateRoomModel implements ICreateRoomModel {
  private readonly _id: number
  private readonly _name: string
  private readonly _description: string
  constructor(response: ICreateRoomModel) {
    this._id = response.id
    this._name = response.name
    this._description = response.description
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }
}
