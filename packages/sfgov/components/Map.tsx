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
import { getenv } from '@/lib/env'

export type MapProps = JSX.IntrinsicElements['div'] & {
  address: TypeLocationBlock
  image: WagtailImageData
  locationName: string
}

export const Map: ComponentType<MapProps> = ({
  address,
  image,
  locationName,
  ...rest
}) => {
  const { t } = useTranslation()

  // Sets the default coords to 1 SVN
  const [lat, setLat] = useState(37.759571206469374)
  const [lng, setLng] = useState(-122.44429767907141)

  const GOOGLE_MAPS_API_KEY = getenv('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')!
  setKey(GOOGLE_MAPS_API_KEY)

  // eslint-disable-next-line max-len
  const addressQuery = `${address.value.line1}, ${address.value.city} ${address.value.state}, ${address.value.zip}`

  fromAddress(addressQuery)
    .then(({ results }) => {
      setLat(results[0].geometry.location.lat)
      setLng(results[0].geometry.location.lng)
      return true
    })
    .catch(console.error)

  const libraries = useMemo<Libraries>(() => ['places'], [])

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
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  })

  const AddressTile: ComponentType<{
    address: TypeLocationBlock
    image: WagtailImageData
    locationName: string
  }> = ({ address, image, locationName }) => (
    <div className="flex flex-col md:flex-row-reverse md:gap-x-28 lg:flex-col space-y-20">
      <div className="flex-1">
        {image ? (
          <Image imageRef={image} alt={`Photo of ${locationName}`} />
        ) : null}
      </div>
      <div className="flex flex-col flex-1 space-y-20">
        <Location {...address?.value} />
        <Button variant="secondary">
          <IconPhone width={16} />
          {t('view-full-contact-information', {
            defaultValue: 'View full contact information'
          })}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="lg:hidden">
        <NextImage
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${addressQuery}&zoom=16&markers=${addressQuery}&size=1000x400&key=${GOOGLE_MAPS_API_KEY}`}
          width={1000}
          height={400}
          alt={`Map showing ${locationName}`}
          data-testid="map-image"
        />
        <div className="py-20">
          <AddressTile
            address={address}
            image={image}
            locationName={locationName}
          />
        </div>
      </div>
      <div className="hidden lg:block" data-testid="google-map" {...rest}>
        {isLoaded ? (
          <GoogleMap
            options={mapOptions}
            zoom={16}
            center={{ lat, lng: lng + 0.001 }}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '100%', height: '550px' }}
          >
            <MarkerF position={mapCenter} />
            <div className="w-[40%] relative top-28 right-60 py-20 px-16 float-right bg-white shadow-md">
              <AddressTile
                address={address}
                image={image}
                locationName={locationName}
              />
            </div>
          </GoogleMap>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </>
  )
}
