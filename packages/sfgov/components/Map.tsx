import { Button, IconPhone } from '@/design-system'
import { TypeLocationBlock, WagtailImageData } from '@/types'
import { useTranslation } from 'next-i18next'
import NextImage from 'next/image'
import { ComponentType, useMemo } from 'react'
import { Image, Location } from '.'

export type MapProps = JSX.IntrinsicElements['div'] & {
  googleMapsApiKey: string
  address: TypeLocationBlock
  image: WagtailImageData
  locationName: string
}

export const Map: ComponentType<MapProps> = ({
  address,
  image,
  locationName,
  googleMapsApiKey,
  ...rest
}) => {
  const { t } = useTranslation()
  const mapSize = { width: 1000, height: 400 }
  const mapZoom = 16

  // eslint-disable-next-line max-len
  const addressQuery = useMemo(
    () =>
      `${address.value.line1}, ${address.value.city} ${address.value.state}, ${address.value.zip}`,
    [address]
  )

  const AddressTile: ComponentType<{
    address: TypeLocationBlock
    image: WagtailImageData
  }> = ({ address, image }) => (
    <div className="flex flex-col md:flex-row-reverse md:gap-x-28 lg:flex-col space-y-20">
      {image ? (
        <div className="flex-1 aspect-[3/2]">
          <Image
            imageRef={image}
            className="object-cover object-center w-full"
            data-testid="address-tile-image"
          />
        </div>
      ) : null}
      <div className="flex flex-col flex-1 space-y-20">
        <Location {...address?.value} variant="card" />
        <Button as="a" variant="tertiary" className="w-full" href="#contact">
          <IconPhone width={16} />
          {t('contact-and-hours', {
            defaultValue: 'Contact and hours'
          })}
        </Button>
      </div>
    </div>
  )

  const mapImageURL = new URL('https://maps.googleapis.com/maps/api/staticmap')
  mapImageURL.searchParams.set('key', googleMapsApiKey)
  mapImageURL.searchParams.set('center', addressQuery)
  mapImageURL.searchParams.set('markers', addressQuery)
  mapImageURL.searchParams.set('zoom', String(mapZoom))
  mapImageURL.searchParams.set(
    'size',
    [mapSize.width, mapSize.height].join('x')
  )

  return (
    <div className="relative" data-testid="map">
      <NextImage
        className="w-full"
        src={mapImageURL.href}
        width={mapSize.width}
        height={mapSize.height}
        alt={t('map-alt-text', {
          defaultValue: 'Map of {{zyx}}',
          zyx: locationName
        })}
        data-testid="map-image"
      />
      <div className="static top-28 right-60 py-20 lg:px-16 lg:absolute lg:w-[40%] lg:float-right bg-white lg:shadow-md rounded-4">
        <AddressTile address={address} image={image} />
      </div>
    </div>
  )
}
