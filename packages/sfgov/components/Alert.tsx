import { IconInfo } from '@/design-system'
import { TypeAlertBlockValues } from '@/types'
import { When } from 'react-if'
import { RichText } from './RichText'

export const Alert = ({
  description,
  expiration_date: expirationDate
}: TypeAlertBlockValues) => (
  <When condition={new Date(expirationDate) > new Date()}>
    <div className="w-full bg-grey100 flex space-x-20 mb-28 py-28 px-20 md:px-28 lg:px-96">
      <IconInfo width={20} />
      <RichText html={description} />
    </div>
  </When>
)
