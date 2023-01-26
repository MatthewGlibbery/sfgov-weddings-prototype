import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { json } from 'stream/consumers'

export default function Agency(props) {
  const router = useRouter()
  const { slug } = router.query

  return <><pre>{JSON.stringify(props, null, 2)}</pre><p>Agency: {slug}</p></>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { message: `Sfgov next`, path: context.params.path, resolvedUrl: context.resolvedUrl }, // will be passed to the page component as props
  }
}
