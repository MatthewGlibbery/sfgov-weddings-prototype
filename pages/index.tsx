import { Box, Container, TitleSm } from '@/design-system'
import { PageData } from '@/types'
import PageWrapper from '@/components/page/PageWrapper'
import { PageLink } from '@/components'
import { GetServerSideProps } from 'next'
import { ContentAPI } from '@/lib/api'
import Link from 'next/link'

export const config = {
  runtime: 'nodejs'
}

type PagesData = {
  meta?: {
    total_count: number
  }
  items: PageData[]
}

export const getServerSideProps: GetServerSideProps = async _context => {
  const api = new ContentAPI()
  const data: PagesData = await api.loadJSON<PagesData>('pages/')
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
        <div>
          Obligatory link for testing: <Link href='/about'>About SF.gov</Link>
        </div>
      </Container>
    </PageWrapper>
  )
}
