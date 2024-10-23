import { HeadingXl, IconDownload, Link } from '@/design-system'
import { TypeDownloadableFilesBlockValues } from '@/types'

export const DownloadableFilesSection = (
  props: TypeDownloadableFilesBlockValues
) => {
  const { title, documents, heading } = props
  let titleComponent
  if (heading) titleComponent = heading
  else
    titleComponent = title ? (
      <HeadingXl as="p" className="mb-12 font-body">
        {title}
      </HeadingXl>
    ) : null
  return (
    <div>
      {titleComponent}
      {documents.map((document) => (
        <Link
          href={document.value.file}
          className="flex gap-4"
          key={document.value.id}
        >
          <IconDownload width={20} />
          {document.value.title}
        </Link>
      ))}
    </div>
  )
}
