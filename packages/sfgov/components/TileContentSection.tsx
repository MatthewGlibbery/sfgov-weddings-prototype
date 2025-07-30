import { HeadingXl, HeadingXXl } from '@/design-system'
import {
  TypeContentTileBlock,
  TypeResourcesSectionBlock,
  TypeServicesSectionBlock
} from '@/types'
import { useTranslation } from 'next-i18next'
import { ContentTileList } from './Tile'
import type { ReactNode } from 'react'

type TileContentSectionProps = {
  title: string
  tileList: ReactNode
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

export const TileContentSection = ({
  title,
  tileList
}: TileContentSectionProps) => (
  <div>
    {title ? (
      <HeadingXl as="p" className="font-body !mb-20">
        {title}
      </HeadingXl>
    ) : null}
    {tileList}
  </div>
)

const TileSectionWrapper = ({ links, title }: TileSectionWrapperProps) => {
  const tileList = <ContentTileList links={links} />
  return <TileContentSection title={title} tileList={tileList} />
}

export const ServiceSection = ({ sections }: ServiceSectionProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HeadingXXl as="h2" className="!mb-28">
        {t('services', { defaultValue: 'Services' })}
      </HeadingXXl>
      <div className="flex flex-col space-y-40 lg:space-y-60">
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

export const ResourceSection = ({ sections }: ResourceSectionProps) => {
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
