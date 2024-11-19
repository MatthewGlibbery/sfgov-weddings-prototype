import { HeadingXl, IconDocument, IconDownload, Link } from '@/design-system'
import { TypeDownloadableFilesBlockValues } from '@/types'
import { FC } from 'react'
import { ContentTile } from './Tile'

export const DownloadableFilesSection = (
  props: TypeDownloadableFilesBlockValues & { heading?: FC; isTile?: boolean }
) => {
  const { title, documents, heading, isTile } = props
  let titleComponent, children
  if (heading) titleComponent = heading
  else
    titleComponent = title ? (
      <HeadingXl as="p" className="mb-12 font-body">
        {title}
      </HeadingXl>
    ) : null

  if (isTile)
    children = documents.map((document) => (
      <ContentTile
        key={document.value.id}
        link={{
          url: document.value.file,
          title: document.value.title,
          description: document.value.description || ''
        }}
        icon={
          <IconDocument className="mb-12 text-primary600 shrink-0" width={24} />
        }
      />
    ))
  else
    children = documents.map((document) => (
      <Link
        href={document.value.file}
        className="flex gap-4"
        key={document.value.id}
      >
        <IconDownload width={20} />
        {document.value.title}
      </Link>
    ))
  return (
    <div>
      {titleComponent}
      {children}
    </div>
  )
}
