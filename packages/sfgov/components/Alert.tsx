import { IconInfo } from '@/design-system'
import { TypeAlertBlockValues } from '@/types'
import { When, Switch, Case, Default } from 'react-if'
import { RichText } from './RichText'

export const Alert = ({
  description,
  expiration_date: expirationDate,
  variant
}: TypeAlertBlockValues) => (
  <Switch>
    <Case condition={variant === 'preview'}>
      <div className="w-full bg-[#1F7E9A] flex space-x-20 mb-28 py-28 px-20 md:px-28 lg:px-96 text-white">
        <IconInfo className="shrink-0" width={20} />
        <RichText html={description} />
      </div>
    </Case>
    <Default>
      <When
        condition={
          expirationDate ? new Date(expirationDate) > new Date() : false
        }
      >
        <div className="w-full bg-information10 border-1 border-information600 flex items-start md:items-center space-x-20 mb-28 py-28 px-20 md:px-28 lg:px-96">
          <IconInfo className="text-information600 shrink-0" width={20} />
          <RichText html={description} />
        </div>
      </When>
    </Default>
  </Switch>
)
