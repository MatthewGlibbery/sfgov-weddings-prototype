import { DocumentBlockFactory } from '@/lib/factories'
import { render } from '@testing-library/react'
import { DownloadableFilesSection } from './DownloadableFilesSection'

describe('DownloadableFilesSection', () => {
  it('renders the DownloadableFilesSection for tiles', () => {
    const documents = [
      DocumentBlockFactory.make({ value: { description: undefined } })
    ]
    render(<DownloadableFilesSection documents={documents} isTile />)
  })
})
