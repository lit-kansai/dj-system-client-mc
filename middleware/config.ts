import { Context } from '@nuxt/types'
import {
  setConfig,
  hasConfigRequiredProperty,
  isConfigValueSet,
} from '~/environments/config'

let isFirstRendering = false
export default function (context: Context) {
  if (isFirstRendering) {
    return
  }
  isFirstRendering = true
  const { $config } = context
  if (!hasConfigRequiredProperty($config)) {
    console.error('Requried keys are not found', $config)
    return
  }

  if (!isConfigValueSet($config)) {
    console.error('Some keys are not set')
  }
  setConfig($config)
}
