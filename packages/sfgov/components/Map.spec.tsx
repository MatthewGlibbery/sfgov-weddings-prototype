import { ImageFactory, LocationBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Map, type MapProps } from './Map'

describe('Map', () => {
  const props: MapProps = {
    address: LocationBlockFactory.make(),
    image: ImageFactory.make(),
    locationName: '1 SVN',
    googleMapsApiKey: 'test'
  }
  it('renders a Map', () => {
    render(<Map {...props} />)
    const el = screen.getByTestId('map')

    expect(el).toBeInTheDocument()
  })

  it('renders a Map with an AddressTile image if an image exists', () => {
    const props: MapProps = {
      address: LocationBlockFactory.make(),
      image: ImageFactory.make(),
      locationName: '1 SVN',
      googleMapsApiKey: 'test'
    }
    render(<Map {...props} />)
    const el = screen.getByTestId('map')
    expect(el).toBeInTheDocument()

    const addressTileImg = screen.getByTestId('address-tile-image')
    expect(addressTileImg).toBeInTheDocument()
  })

  it('renders a Map with an AddressTile without an image if there is no image', () => {
    const props: MapProps = {
      address: LocationBlockFactory.make(),
      locationName: '1 SVN',
      googleMapsApiKey: 'test'
    }
    render(<Map {...props} />)
    const el = screen.getByTestId('map')
    expect(el).toBeInTheDocument()

    const addressTileImg = screen.queryByTestId('address-tile-image')
    expect(addressTileImg).not.toBeInTheDocument()
  })
})
