import { HeadingXl, HeadingXXl } from '@/design-system'
import type {
  TypeContentTileBlock,
  TypeResourcesSectionBlock,
  TypeServicesSectionBlock
} from '@/types'
import { ContentTileList } from './Tile'

type TileContentSectionProps = JSX.IntrinsicElements['div'] & {
  title?: string
}

type ServiceSectionProps = {
  heading: string
  sections: TypeServicesSectionBlock[]
}

type ResourceSectionProps = {
  heading: string
  sections: TypeResourcesSectionBlock[]
}

type TileSectionWrapperProps = {
  links: TypeContentTileBlock[]
  title: string
}

export function TileContentSection({
  title,
  children,
  ...rest
}: TileContentSectionProps) {
  return (
    <div {...rest}>
      {title ? (
        <HeadingXl as="p" className="font-body !mb-20">
          {title}
        </HeadingXl>
      ) : null}
      {children}
    </div>
  )
}

function TileSectionWrapper({ links, title }: TileSectionWrapperProps) {
  return (
    <TileContentSection title={title}>
      <ContentTileList links={links} />
    </TileContentSection>
  )
}

export function ServiceSection({ heading, sections }: ServiceSectionProps) {
  return (
    <>
      <HeadingXXl as="h2" className="!mb-28">
        {heading}
      </HeadingXXl>
      <div className="space-y-40 lg:space-y-60">
        {sections.map((serviceSection) => (
          <TileSectionWrapper
            key={serviceSection.id}
            links={serviceSection.value.services}
            title={serviceSection.value.title}
          />
        ))}
      </div>
    </>
  )
}

export function ResourceSection({ heading, sections }: ResourceSectionProps) {
  return (
    <>
      <HeadingXXl as="h2" className="!mb-28">
        {heading}
      </HeadingXXl>
      <div className="flex flex-col space-y-40 lg:space-y-60">
        {sections.map((resourceSection) => (
          <TileSectionWrapper
            key={resourceSection.id}
            links={resourceSection.value.resources}
            title={resourceSection.value.title}
          />
        ))}
      </div>
    </>
  )
}
