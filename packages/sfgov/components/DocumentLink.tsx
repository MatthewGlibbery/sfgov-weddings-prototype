import { IconDocument, Link } from '@/design-system'
import { TypeDocumentBlockValues } from '@/types'
import { useEffect, useState } from 'react'

type DocumentLinkProps = {
  document: TypeDocumentBlockValues | number | string
}

const apiUrl = process.env.NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL

export const DocumentLink = ({ document }: DocumentLinkProps) => {
  const [documentData, setDocumentData] = useState(document)

  let url = `${apiUrl}/documents/${document}`

  /* this is a hack to accomodate when document comes in as a
   * well-formed URL to the document api. Ex. reports. Remove once
   * we've aligned our document serialization
   */
  // istanbul ignore next
  if (typeof document === 'string') {
    url = document
  }
  useEffect(() => {
    const getDocumentData = async () => {
      // istanbul ignore next
      if (!documentData.file) {
        const res = await fetch(url)
        const data = await res.json()
        setDocumentData(data)
      }
    }
    getDocumentData()
  })

  console.log(documentData)
  return (
    <Link href={documentData.file} className="flex gap-4">
      <IconDocument width={20} />
      {documentData.title}
    </Link>
  )
}
