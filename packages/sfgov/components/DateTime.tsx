import { ReactElement } from 'react'
import type { TypeDateTimeValues } from '@/types'
import { BodyText, HeadingLg } from '@/design-system'
import { useTranslation } from 'next-i18next'

type FormatOptions = {
  weekday?: 'narrow' | 'short' | 'long'
  era?: 'narrow' | 'short' | 'long'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
}

type ComposedDateProps = {
  startDateInput: string
  endDateInput?: string
  locale?: string
  dateStyle?: 'full' | 'long' | 'medium' | 'short' | FormatOptions | undefined
  asString: boolean
}

/**
 * Handles formatting for a single or range
 * date section of the display and will allow us to handle locales
 * easily.
 *
 * Note: Given that it's possible that the API provides no time,
 * I don't require a "valid" ISO-8601 format,
 * but instead, just accept a well-formatted date string and
 * will automatically append a time (00:00:00) to
 * the date such that it can be formatted appropriately.
 * If we didn't add the time, it's possible that
 * the timezones will mess with the output, and thus you could
 * get a day earlier or later.
 *
 * @param {string} startDateInput Begining date. Format is YYYY-MM-DD.
 * @param {string} [endDateInput] End date. Format is valid YYYY-MM-DD.
 * @param {string} [locale] Valid locale identifier
 */
export const ComposedDate = ({
  startDateInput,
  endDateInput = '',
  locale = 'en-US',
  dateStyle = 'full',
  asString = false
}: ComposedDateProps) => {
  if (typeof startDateInput !== 'string' || typeof endDateInput !== 'string') {
    console.warn(
      `Input is an invalid type. Expected a
      string:${startDateInput}, ${endDateInput}`
    )
    return null
  }

  try {
    let dateFormat = { dateStyle }
    if (typeof dateStyle === 'object') {
      dateFormat = { ...dateStyle }
    }
    const formatter = Intl.DateTimeFormat(locale, dateFormat)
    const startDate = startDateInput.includes('T')
      ? new Date(startDateInput)
      : new Date(`${startDateInput}T00:00:00`)

    if (!endDateInput || startDateInput === endDateInput) {
      const formattedDate = formatter.format(startDate)
      if (asString) {
        return formattedDate
      }
      return <time dateTime={startDateInput}>{formattedDate}</time>
    }

    const endDate = new Date(`${endDateInput}T00:00:00`)

    // Builds a semantically "appropriate" date range.
    // There's a little additional complexity because in React,
    // you must have a closing element tag
    // (i.e. you can only have a self-closing tag <tag />
    // or a pair <tag></tag>). To get around
    // that, we build up an array of elements and then
    // drop it in between the final tag that we want (in
    // this case <time></time>). Note, this is not a
    // full-proof plan, but works for most locales - there are
    // some exceptions where the separator (en dash)
    // is several characters and I'm not sure why.
    let tmp: Array<string> = []
    const output: Array<string | ReactElement> = []
    let isBetweenRange = false

    formatter.formatRangeToParts(startDate, endDate).forEach((part, i, arr) => {
      // value apart of the range? Save it off.
      if (part.source === 'startRange' || part.source === 'endRange') {
        tmp.push(part.value)
        isBetweenRange = false

        // shared values are items that are used by
        // both the dates, so the en dash, comma, and year
      } else if (part.source === 'shared') {
        if (arr[i - 1].source === 'startRange') {
          output.push(
            <time key="startRange" dateTime={startDateInput}>
              {tmp}
            </time>
          )
          tmp = []
          isBetweenRange = true
        }

        // TODO: When localization becomes a thing,
        // need to translate the 'to' string here
        // Also, fyi, not a hyphen, but an "en dash"
        if (isBetweenRange) {
          output.push(part.value === ' – ' ? ' to ' : part.value)

          // notice we're pushing to the tmp array here..
          // that's because even though these elements
          // are shared, we still want them wrapped in the
          // final end range time tag instead of at
          // the same level as the en dash
        } else {
          tmp.push(part.value)
        }
      }

      if (i === arr.length - 1) {
        output.push(
          <time key="endRange" dateTime={endDateInput}>
            {tmp}
          </time>
        )
      }
    })

    if (asString) {
      return output.toString()
    }

    // fragment for consistent return typing
    return <>{output}</>
  } catch (e) {
    console.warn(e)
    return null
  }
}

type ComposedTimeProps = {
  startDateTimeInput: string
  endDateTimeInput?: string
  locale?: string
}
/**
 * Handles formatting for a single or range time section
 * of the display and will allow us to handle locales
 * easily.
 *
 * @param {string} startDateTimeInput Begining date-time. Format is valid
 * ISO-8061 without the zone info (YYYY-MM-DDThh:mm:ss).
 * @param {string} [endDateTimeInput] End date-time. Format is valid ISO-8061
 * without the zone info (YYYY-MM-DDThh:mm:ss)
 * @param {string} [locale] Valid locale identifier
 */
export const ComposedTime = ({
  startDateTimeInput,
  endDateTimeInput = '',
  locale = 'en-US'
}: ComposedTimeProps) => {
  if (
    typeof startDateTimeInput !== 'string' ||
    typeof endDateTimeInput !== 'string'
  ) {
    console.warn('Input is an invalid type. Expected a string.')
    return null
  }

  try {
    const formatter = Intl.DateTimeFormat(locale, { timeStyle: 'short' })
    const formattedStartTime = formatter
      .format(new Date(startDateTimeInput))
      .toLowerCase()
    if (!endDateTimeInput) {
      return <time>{formattedStartTime}</time>
    }

    // 😢, wanted to use the built-in FormatRange, but apparently
    // that always adds the date to it.. and that gets
    // tricky when you want to do different locales, and then you
    // have to do more work to strip out the dates
    // as the date formats change. Therefore, it was safer
    // to just build a string with the format we want
    // and we'll have to do translate accordingly later
    const formattedEndTime = formatter
      .format(new Date(endDateTimeInput))
      .toLowerCase()
    return (
      <>
        <time>{formattedStartTime}</time> to <time>{formattedEndTime}</time>
      </>
    )
  } catch (e) {
    console.warn(e)
    return null
  }
}

/* eslint-disable camelcase */
/**
 * The DateTimeBlock is the visualization
 * of a DateTimeBlock from the backend. It's
 * a 1-1 relationship and will handle rendering
 * five use-cases:
 *
 *  - Single day with time range
 *  - Single day with no time at all (all day)
 *  - Date range with a single time range
 *  - Date range with no time
 *  - Date range with a start time only
 */
export const DateTimeBlock = ({
  start_date,
  start_time,
  end_date,
  end_time,
  is_all_day,
  include_end_date_time
}: TypeDateTimeValues) => {
  let composedTimeProps = {} as ComposedTimeProps
  if (!is_all_day && start_date && start_time) {
    let endDateTime = ''
    if (include_end_date_time === 'yes' && end_date && end_time) {
      endDateTime = `${end_date}T${end_time}`
    }
    composedTimeProps = {
      startDateTimeInput: `${start_date}T${start_time}`,
      endDateTimeInput: endDateTime
    }
  }

  const { t } = useTranslation()
  const hasComposedTime = Object.keys(composedTimeProps).length > 0
  return (
    <div>
      <HeadingLg as="h3" className="mb-20">
        {t('date-and-time', { defaultValue: 'Date and time' })}
      </HeadingLg>
      <BodyText>
        <ComposedDate startDateInput={start_date} endDateInput={end_date} />
        {hasComposedTime ? (
          <div>
            <ComposedTime {...composedTimeProps} />
          </div>
        ) : null}
      </BodyText>
    </div>
  )
}
/* eslint-enable camelcase */
