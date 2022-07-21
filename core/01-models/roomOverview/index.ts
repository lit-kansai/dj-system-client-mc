export interface IRoomOverviewModel {
  id: string
  name: string
  description: string
}

export class RoomOverviewModel implements IRoomOverviewModel {
  private readonly _id: string
  private readonly _name: string
  private readonly _description: string

  constructor(response: IRoomOverviewModel) {
    this._id = response.id
    this._name = response.name
    this._description = response.description
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }
}
