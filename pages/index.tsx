import Head from 'next/head'
import { Box, Container, PrimaryButton, TitleSm } from '@/design-system'
import Link from 'next/link'

export default function Home () {
  return (
    <>
      <Head>
        <title>SF.gov</title>
      </Head>

      <main>
        <Container css={{ py: 8, marginBottom: 20 }}>
          <TitleSm as='h1'>SF.gov</TitleSm>
        </Container>

        <Box css={{ bg: '$blueL1', py: 20, marginBottom: 60 }}>
          <Container>
            <PrimaryButton>Hi, I am a button!</PrimaryButton>
          </Container>
        </Box>

        <Box css={{ bg: '$yellowL2', py: 20 }}>
          <Container>
            <Link href="/about">
              About
            </Link>
          </Container>
        </Box>
      </main>
    </>
  )
}
