import AgencyPage from '@/components/AgencyPage'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'
import { Container, Monospace, TitleMd } from '@sfgov/design-system/dist/react'
import type { PageProps } from '@/lib/types'

const controller = new Controller(new ContentAPI(), {
  'sfgov_agency.Agency': AgencyPage
})

export const getServerSideProps = controller.makeGetServerSideProps()

export default function View (props: PageProps) {
  try {
    const Template = controller.getTemplateForType(props.page.meta.type)
    return <Template {...props} />
  } catch (error) {
    return (
      <Container>
        <TitleMd as='h1'>Error</TitleMd>
        <Monospace as='pre'>{error.stack}</Monospace>
        <Monospace as='pre'>
          {JSON.stringify(props, null, 2)}
        </Monospace>
        <Monospace as='pre'>
          {JSON.stringify(process.env, null, 2)}
        </Monospace>
      </Container>
    )
  }
}
