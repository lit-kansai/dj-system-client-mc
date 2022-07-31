import { LowerProviderName } from '~/types/data/lowerProviderName'
import { OfficialProviderName } from '~/types/data/officialProviderName'

export const toOfficialProviderName = (
  providerName: LowerProviderName
): OfficialProviderName => {
  switch (providerName) {
    case 'applemusic':
      return 'Apple Music'
    case 'spotify':
      return 'Spotify'
  }
}
