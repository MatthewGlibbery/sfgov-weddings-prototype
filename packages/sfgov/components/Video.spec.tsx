import { LinkFactory, VideoFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Video } from './Video'

describe('Video', () => {
  it('renders the embed', () => {
    const fixture = VideoFactory.make(1, {
      value: {
        video_type: [
          {
            type: 'embed',
            value: {
              embed_url: 'https://www.youtube.com/watch?v=rS00xWnqwvI',
              video_transcript: 'Video transcript'
            }
          }
        ]
      }
    })
    render(<Video {...fixture[0].value}></Video>)
    const iframe = screen.getByTitle(fixture[0].value.title)
    expect(iframe).toHaveAttribute(
      'src',
      fixture[0].value.video_type[0].value.embed_url
    )
  })

  it('renders the external link', () => {
    const fixture = VideoFactory.make(1, {
      value: {
        video_type: [
          {
            type: 'external_link',
            value: LinkFactory.make()
          }
        ]
      }
    })
    render(<Video {...fixture[0].value}></Video>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      fixture[0].value.video_type[0].value.url
    )
  })
})
