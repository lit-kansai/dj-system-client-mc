interface Config {
  googleLoginRedirectUrl: string
  spotifyLoginRedirectUrl: string
  baseUrl: string
  backendUrl: string
}

export const config: Config = {
  googleLoginRedirectUrl: '',
  spotifyLoginRedirectUrl: '',
  baseUrl: '',
  backendUrl: '',
}

export const setConfig = (_config: Config): void => {
  Object.assign(config, _config)
}

export const hasConfigRequiredProperty = (_config: any): _config is Config => {
  return (
    'googleLoginRedirectUrl' in _config &&
    'spotifyLoginRedirectUrl' in _config &&
    'baseUrl' in _config &&
    'backendUrl' in _config
  )
}

export const isConfigValueSet = (config: Config): boolean => {
  let result = true
  const keys = Object.keys(config) as (keyof typeof config)[]
  keys.forEach((key) => {
    if (config[key].length === 0) {
      result = false
    }
  })
  return result
}
