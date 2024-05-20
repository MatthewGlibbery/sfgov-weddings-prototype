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
        <ul className="list-none inline-block m-0 p-0">
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
        </ul>
      </When>
    </div>
  )
}
