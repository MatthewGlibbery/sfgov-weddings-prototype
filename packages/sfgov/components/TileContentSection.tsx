import { HeadingXl, HeadingXXl } from '@/design-system'
import type {
  TypeContentTileBlock,
  TypeResourcesSectionBlock,
  TypeServicesSectionBlock
} from '@/types'
import { useTranslation } from 'next-i18next'
import type { ReactNode } from 'react'
import { ContentTileList } from './Tile'

type TileContentSectionProps = JSX.IntrinsicElements['div'] & {
  title?: string
}

type ServiceSectionProps = {
  sections: TypeServicesSectionBlock[]
}

type ResourceSectionProps = {
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

export function ServiceSection({ sections }: ServiceSectionProps) {
  const { t } = useTranslation()
  return (
    <>
      <HeadingXXl as="h2" className="!mb-28">
        {t('services', { defaultValue: 'Services' })}
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

export function ResourceSection({ sections }: ResourceSectionProps) {
  const { t } = useTranslation()
  return (
    <>
      <HeadingXXl as="h2" className="!mb-28">
        {t('resources', { defaultValue: 'Resources' })}
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
