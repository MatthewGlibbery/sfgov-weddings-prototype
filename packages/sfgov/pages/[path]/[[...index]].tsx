import { DEFAULT_PAGE_TEMPLATES } from '@/constants/templates'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'

const controller = new Controller(new ContentAPI(), DEFAULT_PAGE_TEMPLATES)

export const getServerSideProps = controller.makeGetServerSideProps()

export default controller.makeViewComponent()
