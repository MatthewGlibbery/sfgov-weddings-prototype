import { AgencyData } from '@/types'
import { PageLink } from './PageLink'

type AgencyListProps = {
  agencies: AgencyData[]
}

export const AgencyList = (props: AgencyListProps) => {
  const { agencies, ...rest } = props
  if (!agencies?.length) return null
  return (
    <ul {...rest}>
      {agencies.map((agency, i) => {
        return (
          <li key={i}>
            <PageLink page={agency} />
          </li>
        )
      })}
    </ul>
  )
}
