import { ref, Ref } from '@nuxtjs/composition-api'
import { Dictionary } from '~/types/data/dictionary'
import { UrlParamsKey } from '~/types/data/urlParamsKey'
import { hasProperty } from '~/utils/hasProperty'

interface IUseUrlParams {
  setParams(_params: Dictionary<string>): void
  getParams(key: UrlParamsKey): string
}

const useUrlParams = (): IUseUrlParams => {
  const params: Ref<Dictionary<string>> = ref({})
  const setParams = (_params: Dictionary<string>) => {
    params.value = _params
  }
  const getParams = (key: UrlParamsKey): string => {
    if (!hasProperty(params.value, key)) {
      return ''
    }
    return params.value[key]
  }
  return {
    getParams,
    setParams,
  }
}

export const sharedUseUrlParams = useUrlParams()
