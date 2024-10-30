import { RelatedContentData } from '@/types'
import { PageLink } from './PageLink'

type PageLinksListProps = JSX.IntrinsicElements['div'] & {
  label?: string
  pageLinks: RelatedContentData[]
}

export const PageLinksList = ({
  pageLinks,
  label,
  ...rest
}: PageLinksListProps) => {
  return (
    <div {...rest}>
      {label ? <span>{label}</span> : null}
      {pageLinks.length ? (
        <div>
          {pageLinks.map((pageLink, i) => (
            <span key={i} data-testid="related_content_agencies-section">
              {i > 0 && ', '}
              <PageLink
                page={pageLink}
                aria-label={`View the page for ${pageLink?.value?.title}`}
              />
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
