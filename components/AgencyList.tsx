import { AgencyData } from '@/types'

type AgencyListProps = {
  agencies: AgencyData[]
}

export default function AgencyList (props: AgencyListProps) {
  const { agencies, ...rest } = props
  return (
    <ul {...rest}>
      {agencies.map((agency, i) => {
        return (
          <li key={i}>
            <a href={agency.meta?.url_path}>{agency.title}</a>
          </li>
        )
      })}
    </ul>
  )
}
