/* eslint-disable import/no-mutable-exports */
import { Context } from '@nuxt/types'

let $nuxt: Context

export function initializeNuxtInstance(nuxtInstance: Context): void {
  $nuxt = nuxtInstance
}

export { $nuxt }
