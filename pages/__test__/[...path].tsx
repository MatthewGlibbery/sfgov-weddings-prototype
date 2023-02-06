import { FixtureAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'
import { pages, templates } from './_fixtures'

const controller = new Controller(new FixtureAPI({ pages }), templates)

export const getServerSideProps = controller.makeGetServerSideProps()

export default controller.makeViewComponent()
