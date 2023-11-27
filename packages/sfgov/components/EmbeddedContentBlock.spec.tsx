import { EmbeddedContentFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { EmbeddedContentBlock } from './EmbeddedContentBlock'

describe('EmbeddedContentBlock', () => {
  it('renders the embedded content block', async () => {
    const fixture = EmbeddedContentFactory.make()
    render(<EmbeddedContentBlock {...fixture.value} />)
    expect(await screen.getAllByTitle(fixture.value.alt_text).length).toBe(2)
  })
})
