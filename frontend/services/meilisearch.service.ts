import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Config, MeiliSearch } from 'meilisearch'
import { MEILISEARCH_GROUPS_INDEX } from '~/../common/constants/meilisearch.constants'
import { IMeilisearchGroup } from '~/../common/transfer/meilisearch/meilisearch-group-dto.interface'

export class MeilisearchService {
  private async getConfig() {
    return await this.axios.$get<Config>('/meilisearch/config')
  }

  private clientPromise: Promise<MeiliSearch> | undefined
  private async getClient() {
    if (!this.clientPromise) {
      this.clientPromise = this.getConfig().then(config => new MeiliSearch(config))
    }
    return await this.clientPromise
  }

  private groupCountryOfOriginFacetName: keyof IMeilisearchGroup = 'countryOfOrigin'
  
  constructor(private axios: NuxtAxiosInstance) {}

  async searchGroups(text: string, countryOfOrigin: string | undefined): Promise<IMeilisearchGroup[]> {
    if (!text.trim() && !countryOfOrigin?.trim()) return []
    const client = await this.getClient()
    const result = await client.index(MEILISEARCH_GROUPS_INDEX).search(text, {
      facetFilters: countryOfOrigin ? [`${this.groupCountryOfOriginFacetName}:${countryOfOrigin}`] : undefined
    })
    return result.hits
  }
}
