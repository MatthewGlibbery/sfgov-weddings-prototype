import { PageLink } from '@/components'
import { Container, Monospace, TitleLg } from '@/design-system'
import { pages } from '@/__fixtures__'

export async function getServerSideProps () {
  // pass the page fixtures to the page so that it can render the props debugger
  return {
    props: {
      pages
    }
  }
}

export default function TestIndex ({ pages }) {
  return (
    <Container css={{
      my: 60,
      'td, th': {
        p: 4
      }
    }}>
      <TitleLg as='h1' css={{ mb: 20 }}>Test page fixtures</TitleLg>
      <table>
        <thead>
          <tr>
            <th align='left'>Link</th>
            <th align='left'>Type</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(data => (
            <tr key={data.id}>
              <td>
                <PageLink page={data} />
              </td>
              <td>
                <Monospace as='code'>{data.meta.type}</Monospace>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
