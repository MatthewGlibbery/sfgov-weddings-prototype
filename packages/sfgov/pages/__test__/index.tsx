import { classed, Container, Monospace, TitleLg } from '@/design-system'
import { PageLink } from '@/components'
import { pages } from '@/__fixtures__'
import type { GetServerSideProps } from 'next'

type TestIndexProps = {
  pages: typeof pages
}

export const getServerSideProps: GetServerSideProps<
  TestIndexProps
> = async () => {
  // pass the page fixtures to the page so that it can render the props debugger
  return {
    props: {
      pages
    }
  }
}

const TD = classed('td', 'p-4')
const TH = classed('th', 'p-4')

const TestIndex = ({ pages }: TestIndexProps) => {
  return (
    <Container className="my-60">
      <TitleLg as="h1" className="mb-20">
        Test page fixtures
      </TitleLg>
      <table>
        <thead>
          <tr>
            <TH align="left">Link</TH>
            <TH align="left">Type</TH>
          </tr>
        </thead>
        <tbody>
          {pages.map((data) => (
            <tr key={data.id}>
              <TD>
                <PageLink page={data} />
              </TD>
              <TD>
                <Monospace as="code">{data.meta.type}</Monospace>
              </TD>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default TestIndex
