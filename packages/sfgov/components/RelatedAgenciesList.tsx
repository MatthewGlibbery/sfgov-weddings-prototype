import { RelatedContentData } from '@/types'
import { PageLink } from './PageLink'

type RelatedAgenciesListProps = {
  agencies: RelatedContentData[]
}
export const RelatedAgenciesList = ({ agencies }: RelatedAgenciesListProps) => (
  <>
    {agencies.map((agency, i) => (
      <span key={agency.id} data-testid="related_content_agencies-section">
        {i > 0 && ', '}
        <PageLink
          page={agency}
          aria-label={`View the agency page for ${agency.title}`}
        />
      </span>
    ))}
  </>
)
