import { Dictionary } from '~/types/data/dictionary'

export const hasProperty = <Key extends string>(
  x: Dictionary<string>,
  name: Key
): x is { [M in Key]: string } => {
  return x instanceof Object && name in x
}
