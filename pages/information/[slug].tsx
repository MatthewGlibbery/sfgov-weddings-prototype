import { GetServerSidePropsContext } from 'next'
import { Container, TitleXl } from "@sfgov/react"

const BACKEND_BASE_URL = 'http://localhost:8000'

export default function InformationPage(props) {
  return <>
    <Container>
      <TitleXl>{props.page.items[0].title}</TitleXl>
    </Container>
    <details>
      <summary>json</summary>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </details>
  </>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = new URL('/api/v2/pages', BACKEND_BASE_URL)
  url.searchParams.set('slug', context.params.slug as string)
  const page = await fetch(url).then((res) => res.json())
  return {
    props: { page }, // will be passed to the page component as props
  }
}
