// A page to provide a well-known URL that throws an error

import { GetServerSidePropsContext } from 'next'

export function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.query.server === 'true') {
    throw new Error('Intentional error (getServerSideProps)')
  }
  return {
    props: {}
  }
}

export default function IntentionalErrorPage() {
  throw new Error('Intentional error (render)')
}
