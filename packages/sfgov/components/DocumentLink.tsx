import { IconDocument, Link } from '@/design-system'
import { TypeDocumentBlockValues } from '@/types'

type DocumentLinkProps = {
  document: TypeDocumentBlockValues
}

export const DocumentLink = ({ document }: DocumentLinkProps) => {
  return document && document.file ? (
    <Link href={document.file} className="flex gap-4">
      <IconDocument width={20} />
      {document.title}
    </Link>
  ) : null
}
