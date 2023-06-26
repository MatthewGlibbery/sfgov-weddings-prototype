import { TitleLg } from '@/design-system'
import { ServicesSectionValues } from '@/types'
import { ServiceTileList } from './Tile'

export const ServicesSection = ({ title, services }: ServicesSectionValues) => {
  return (
    <div>
      <TitleLg as="h3" className="m-0 mb-28">
        {title}
      </TitleLg>
      <ServiceTileList links={services} />
    </div>
  )
}
