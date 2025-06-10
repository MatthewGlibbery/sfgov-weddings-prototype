import { getenv } from '@/lib/env'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { TypeQLessData } from '@/types'
import { HeadingXXl } from '@/design-system'
import { Table } from './Table'
import { ComposedDate } from './DateTime'

export function QLessQueue() {
  const { t } = useTranslation()
  const router = useRouter()
  const [qLessData, setQLessData] = useState<TypeQLessData | null>(null)

  const columns = []
  const rows = []
  // istanbul ignore next
  if (qLessData) {
    const queuesToDisplay = [
      1069, // Intake: OTC with plans
      2510, // SFPlanning
      1077, // Building: Non-Structural
      1076, // Building: Structural
      1079, // Mechanical review
      1080, // Electrical review
      1081, // Fire: Plan review
      1085, // Public Works: Permits and Plan review
      1087, // PUC: Plan review
      2586, // Public Health: Plan review
      1068, // Permit Processing: OTC with plans
      2395, // Permit Processing: No plans / Trade
      2718, // OSB Permit Center
      1124 // Intake: No Plans
    ]

    columns.push(
      {
        type: 'rich_text',
        heading: t('queue-table-header', { defaultValue: 'Queue' })
      },
      {
        type: 'rich_text',
        heading: t('queue-wait-time-table-header', {
          defaultValue: 'Wait time'
        })
      }
    )

    qLessData.data.queues = qLessData.data.queues.filter((item) =>
      queuesToDisplay.some((id) => id === item.id)
    )

    const getHoursMinutes = (
      value: number,
      label: string,
      labelPlural: string
    ) => (value > 0 ? `${value} ${value === 1 ? label : labelPlural}` : '')

    for (const queue of qLessData.data.queues) {
      const hours = Math.floor(queue.wait_time / 60)
      const minutes = queue.wait_time % 60
      const hourText = getHoursMinutes(
        hours,
        t('hour', { defaultValue: 'hour' }),
        t('hours', { defaultValue: 'hours' })
      )
      const minText = getHoursMinutes(
        minutes,
        t('minute', { defaultValue: 'minute' }),
        t('minutes', { defaultValue: 'minutes' })
      )
      const waitTime = `${hourText} ${minText}`
      let text
      switch (queue.state) {
        case 'ACTIVE':
          text = `<p class="text-success500 font-bold">${waitTime}</p>`
          break
        case 'INACTIVE':
        case 'CLOSED':
          text = `<p class="text-neutral500, font-bold">${t('queue-closed', {
            defaultValue: 'Closed'
          })}</p>`
          break
        case 'CLOSING':
          text = `<p class="font-bold">${t('queue-full', {
            defaultValue: 'Full'
          })}</p>`
          break
        // istanbul ignore next
        default:
          break
      }
      rows.push({ values: [queue.name, text] })
    }
  }

  // istanbul ignore next
  useEffect(() => {
    if (qLessData) {
      // This is a hack to refresh server-side props and fetch
      // QLess data. It causes a full page reset though,
      // because the page props are re-fetched too.
      // There are ways around this but would take some QLess tweaking
      const refreshData = () => {
        router.replace(router.asPath)
      }

      const intervalCall = setInterval(() => {
        refreshData()
      }, 300000)
      return () => {
        clearInterval(intervalCall)
      }
    }

    const loadData = async () => {
      const res = await fetch('/api/qless')
      const data = await res.json()
      setQLessData(data)
    }

    loadData()
  }, [qLessData, router])

  return (
    <>
      <HeadingXXl>
        {t('qless-wait-times-header', { defaultValue: 'Wait times' })}
      </HeadingXXl>
      <p>
        {t('qless-permit-center-desc', {
          defaultValue:
            'The Permit Center uses QLess to manage customer lines and wait times.'
        })}
      </p>
      {rows.length ? (
        <>
          <Table
            table_header_options="row"
            table={{ rows, columns }}
            caption=""
          ></Table>
          <p className="mt-12 text-neutral500">
            {t('qless-timestamp', { defaultValue: 'Last updated:' })}{' '}
            <ComposedDate
              startDateInput={qLessData?.data.timestamp}
              dateStyle={{
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              }}
            />
          </p>
        </>
      ) : null}
    </>
  )
}
