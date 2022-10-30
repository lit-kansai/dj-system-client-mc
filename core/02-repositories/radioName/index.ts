export interface IRadioNameRepository {
  save(radioName: string): boolean
  fetch(): Promise<string>
}

export class RadioNameRepository implements IRadioNameRepository {
  save(radioName: string): boolean {
    localStorage.setItem('radioName', radioName)
    return !!radioName
  }

  fetch(): Promise<string> {
    return new Promise((resolve) => {
      const radioName = localStorage.getItem('radioName') ?? ''
      resolve(radioName)
    })
  }
}
