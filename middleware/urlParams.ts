import { Context } from '@nuxt/types'
import { sharedUseUrlParams } from '~/core/03-composables/useUrlParams'

export default function (context: Context) {
  const { route } = context
  const { params } = route
  sharedUseUrlParams.setParams(params)
}
