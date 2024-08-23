import { RelatedContentData } from '@/types'
import { When } from 'react-if'
import { PageLink } from './PageLink'

type PageLinksListProps = {
  label?: string
  pageLinks: RelatedContentData[]
}
export const PageLinksList = ({ pageLinks, label }: PageLinksListProps) => {
  return (
    <div>
      <When condition={label}>
        <span>{label}</span>
      </When>
      <When condition={!!pageLinks.length}>
        <div>
          {pageLinks.map((pageLink, i) => (
            <span
              key={pageLink.id}
              data-testid="related_content_agencies-section"
            >
              {i > 0 && ', '}
              <PageLink
                page={pageLink}
                aria-label={`View the page for ${pageLink.title}`}
              />
            </span>
          ))}
        </div>
      </When>
    </div>
  )
}
