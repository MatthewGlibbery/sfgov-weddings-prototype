import { Box, Container, TitleSm } from '@/design-system'
import { PageLink, PageWrapper } from '@/components'
import { ContentAPI } from '@/lib/api'
import type { PageData } from '@/types'
import type { GetServerSideProps } from 'next'

export const config = {
  runtime: 'nodejs'
}

type PagesData = {
  meta?: {
    total_count: number
  }
  items: PageData[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const api = new ContentAPI()
  const data: PagesData = await api.loadJSON<PagesData>('pages/', { locale: 'en' })
    .catch(error => {
      console.error('Error fetching pages:', error)
      return {
        items: []
      }
    })
  return {
    props: {
      pages: data.items
    }
  }
}

export default function Home ({ pages }: { pages: PageData[] }) {
  return (
    <PageWrapper>
      <Container css={{ py: 8, marginBottom: 20 }}>
        <TitleSm as='h1'>Pages</TitleSm>
        {pages.length
          ? <>
            <ul>
              {pages.map(page => <li key={page.id}><PageLink page={page} /></li>)}
            </ul>
          </>
          : <Box css={{ bg: '$redL1', color: '$redL4', p: 20, br: 8 }}>No pages found?</Box>}
      </Container>
    </PageWrapper>
  )
}
