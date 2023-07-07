import { RelatedContentData } from '@/types'
import { PageLink } from './PageLink'

type RelatedAgenciesListProps = {
  agencies: RelatedContentData[]
}
export const RelatedAgenciesList = ({ agencies }: RelatedAgenciesListProps) => (
  <>
    {agencies.map((agency, i) => (
      <span
        key={agency.page_content.id}
        data-testid="related_content_agencies-section"
      >
        {i > 0 && ', '}
        <PageLink page={agency.page_content} />
      </span>
    ))}
  </>
)
