import { Story, withTemplateStory } from '../util'

import { InformationPage as Page } from '@/sfgov'
import { InfoPageFactory } from '@/lib/factories'

const title = 'Pages/Information Page'
const { args, meta } = withTemplateStory(Page, InfoPageFactory)
export default { ...meta, title }

export const InformationPage: Story<typeof meta> = {
  args
}
