import { IconDocument, Link } from '@/design-system'
import { TypeDocumentBlockValues } from '@/types'

type DocumentLinkProps = {
  document: TypeDocumentBlockValues | number | string
}

export const DocumentLink = ({ document }: DocumentLinkProps) => {
  return (
    <Link href={document.file} className="flex gap-4">
      <IconDocument width={20} />
      {document.title}
    </Link>
  )
}
