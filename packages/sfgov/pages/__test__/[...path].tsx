import { DEFAULT_PAGE_TEMPLATES } from '@/constants'
import { FixtureAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'
import { pages } from '@/__fixtures__'

const controller = new Controller(new FixtureAPI({ pages }), DEFAULT_PAGE_TEMPLATES)

export const getServerSideProps = controller.makeGetServerSideProps()

export default controller.makeViewComponent()
