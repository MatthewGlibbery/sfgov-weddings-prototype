import { ImageFactory, LocationBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Map, type MapProps } from './Map'

jest.mock('@react-google-maps/api', () => {
  return {
    withGoogleMap: (Component: any) => Component,
    withScriptjs: (Component: any) => Component,
    Marker: (props: any) => <div {...props} />,
    GoogleMap: (props: any) => (
      <div>
        <div data-testid="mock-google-maps" />
        {props.children}
      </div>
    ),
    InfoWindow: (props: any) => <div {...props} />,
    MarkerF: (props: any) => <div {...props} />,
    useLoadScript: () => ({
      isLoaded: true
    })
  }
})

jest.mock('react-geocode', () => ({
  fromAddress: (props: any) =>
    Promise.resolve({
      results: [
        {
          geometry: {
            location: {
              lat: 37.759571206469374,
              lng: -122.44429767907141
            }
          }
        }
      ]
    }),
  setKey: () => true
}))

describe('Map', () => {
  const props: MapProps = {
    address: LocationBlockFactory.make(),
    image: ImageFactory.make(),
    locationName: '1 SVN',
    googleMapsApiKey: 'test'
  }
  it('renders a Map', () => {
    render(<Map {...props} />)
    const el = screen.getByTestId('mock-google-maps')

    expect(el).toBeInTheDocument()
  })
})
