import { ProfileGroupFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ProfileGroup } from './ProfileGroup'

describe('ProfileGroup', () => {
  const data = ProfileGroupFactory.make()

  it('should render a profile group', () => {
    render(
      <ProfileGroup title={data.value.title} profiles={data.value.profiles} />
    )

    const title = screen.getByRole('heading', {
      level: 3
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(data.value.title)
  })
})
