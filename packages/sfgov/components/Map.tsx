import { Button, IconPhone } from '@/design-system'
import { TypeLocationBlock, WagtailImageData } from '@/types'
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  type Libraries
} from '@react-google-maps/api'
import { useTranslation } from 'next-i18next'
import NextImage from 'next/image'
import { ComponentType, useMemo, useState } from 'react'
import { fromAddress, setKey } from 'react-geocode'
import { Image, Location } from '.'

export type MapProps = JSX.IntrinsicElements['div'] & {
  googleMapsApiKey: string
  address: TypeLocationBlock
  image: WagtailImageData
  locationName: string
}

const GMAPS_LIBRARIES: Libraries = ['places']

export const Map: ComponentType<MapProps> = ({
  address,
  image,
  locationName,
  googleMapsApiKey,
  ...rest
}) => {
  const { t } = useTranslation()

  // Sets the default coords to 1 SVN
  const [lat, setLat] = useState(37.759571206469374)
  const [lng, setLng] = useState(-122.44429767907141)
  const mapSize = { width: 1000, height: 400 }
  const mapZoom = 16

  // istanbul ignore next
  if (googleMapsApiKey) {
    setKey(googleMapsApiKey)
  } else {
    console.error('Missing google maps API key; this will not work!')
  }

  // eslint-disable-next-line max-len
  const addressQuery = useMemo(
    () =>
      `${address.value.line1}, ${address.value.city} ${address.value.state}, ${address.value.zip}`,
    [address]
  )
  fromAddress(addressQuery)
    .then(({ results }) => {
      setLat(results[0].geometry.location.lat)
      setLng(results[0].geometry.location.lng)
      return true
    })
    .catch(console.error)

  const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng])
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      fullscreenControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      streetViewControl: false,
      zoomControlOptions: { position: 6 }
    }),
    []
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries: GMAPS_LIBRARIES
  })

  const AddressTile: ComponentType<{
    address: TypeLocationBlock
    image: WagtailImageData
  }> = ({ address, image }) => (
    <div className="flex flex-col md:flex-row-reverse md:gap-x-28 lg:flex-col space-y-20">
      <div className="flex-1 aspect-[3/2]">
        {image ? (
          <Image
            imageRef={image}
            className="object-cover object-center w-full"
          />
        ) : null}
      </div>
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
    <>
      <div className="lg:hidden">
        <NextImage
          src={mapImageURL.href}
          width={mapSize.width}
          height={mapSize.height}
          alt={t('map-alt-text', {
            defaultValue: 'Map of {{locationName}}',
            locationName
          })}
          data-testid="map-image"
        />
        <div className="py-20 rounded-4">
          <AddressTile address={address} image={image} />
        </div>
      </div>
      <div className="hidden lg:block" data-testid="google-map" {...rest}>
        {isLoaded ? (
          <GoogleMap
            options={mapOptions}
            zoom={mapZoom}
            center={{ lat, lng: lng + 0.001 }}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '100%', height: '600px' }}
          >
            <MarkerF position={mapCenter} />
            <div className="w-[40%] relative top-28 right-60 py-20 px-16 float-right bg-white shadow-md rounded-4">
              <AddressTile address={address} image={image} />
            </div>
          </GoogleMap>
        ) : (
          <div>{t('map-loading', { defaultValue: 'loading...' })}</div>
        )}
      </div>
    </>
  )
}
