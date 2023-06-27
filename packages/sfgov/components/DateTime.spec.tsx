import { render, screen } from '@testing-library/react'
import mockConsole from 'jest-mock-console'

import type { TypeDateTimeValues } from '@/types'
import { DateTimeBlock, ComposedDate, ComposedTime } from './DateTime'

describe('DateTime Component', () => {
  describe('<ComposedDate />', () => {
    it.each([
      ['2023-11-19', undefined],
      ['2023-11-19', '']
    ])('constructs the proper date string with valid input: %s, %s', (a, b) => {
      render(<ComposedDate startDateInput={a} endDateInput={b} />)
      expect(screen.getByText('Sunday, November 19, 2023')).toBeInTheDocument()
    })

    it('constructs the proper date range', () => {
      render(
        <ComposedDate startDateInput="2023-11-19" endDateInput="2023-11-25" />
      )

      // TODO: revise when i10n/i18n come into play
      // Checks the following:
      // - Date conversion
      // - "to" instead of "-"
      // - type of <time />
      const beginDate = screen.getByText('Sunday, November 19')
      const endDate = screen.getByText('Saturday, November 25, 2023')
      expect(beginDate).toBeInTheDocument()
      expect(beginDate).toEqual(expect.any(HTMLTimeElement))
      expect(screen.getByText('to')).toBeInTheDocument()
      expect(endDate).toBeInTheDocument()
      expect(endDate).toEqual(expect.any(HTMLTimeElement))
    })

    it('accepts a locale and adjusts its output accordingly for a single day', () => {
      render(<ComposedDate startDateInput="2023-11-19" locale="es" />)
      expect(
        screen.getByText('domingo, 19 de noviembre de 2023')
      ).toBeInTheDocument()
    })

    it('accepts a locale and adjusts its output accordingly for a date range', () => {
      render(
        <ComposedDate
          startDateInput="2023-11-19"
          endDateInput="2023-11-25"
          locale="es"
        />
      )

      // TODO: revise when i10n/i18n come into play
      // Checks the following:
      // - Date conversion
      // - "to" instead of "-"
      // - type of <time />
      const beginDate = screen.getByText('domingo, 19 de noviembre')
      const endDate = screen.getByText('sábado, 25 de noviembre de 2023')
      expect(beginDate).toBeInTheDocument()
      expect(beginDate).toEqual(expect.any(HTMLTimeElement))
      expect(screen.getByText('to')).toBeInTheDocument()
      expect(endDate).toBeInTheDocument()
      expect(endDate).toEqual(expect.any(HTMLTimeElement))
    })

    it('ignores non-"en dash" date range separators', () => {
      render(
        <ComposedDate
          startDateInput="2023-11-19"
          endDateInput="2023-11-25"
          locale="ko"
        />
      )
      expect(screen.queryByText('to')).not.toBeInTheDocument()
      expect(screen.getByText(') ~')).toBeInTheDocument()
    })

    it.each([
      // invalid first param
      ['2023-11-190', undefined],
      ['', undefined],
      [false, undefined],
      [2023 - 11 - 19, undefined],
      [undefined, undefined],
      // invalid second param
      ['2023-11-19', '2023-11-250'],
      ['2023-11-19', '2023-11-190'],
      ['2023-11-19', 2023 - 11 - 19]
    ])('returns an empty string with invalid inputs: %s, %s', (a, b) => {
      // Mock the warn as the handler calls it in the try/catch
      const restoreConsole = mockConsole()

      // @ts-expect-error invalid input types
      render(<ComposedDate startDateInput={a} endDateInput={b} />)
      expect(screen.queryByText(/Sunday, November/)).not.toBeInTheDocument()
      expect(console.warn).toHaveBeenCalled()

      // Restore it
      restoreConsole()
    })
  })

  describe('<ComposedTime />', () => {
    it.each([
      ['2023-11-19T01:23:45', undefined],
      ['2023-11-19T01:23:45', '']
    ])('constructs the proper time string with valid input: %s, %s', (a, b) => {
      render(<ComposedTime startDateTimeInput={a} endDateTimeInput={b} />)
      expect(screen.getByText('1:23 am')).toBeInTheDocument()
    })

    it('constructs the proper time range', () => {
      render(
        <ComposedTime
          startDateTimeInput="2023-11-19T01:23:45"
          endDateTimeInput="2023-11-25T21:01:23"
        />
      )

      // Checks the following:
      // - Date and time conversion
      // - "to" instead of "-"
      // - lowercased am/pm
      // - type of <time />
      const beginTime = screen.getByText('1:23 am')
      const endTime = screen.getByText('9:01 pm')
      expect(beginTime).toBeInTheDocument()
      expect(beginTime).toEqual(expect.any(HTMLTimeElement))
      expect(screen.getByText('to')).toBeInTheDocument()
      expect(endTime).toBeInTheDocument()
      expect(endTime).toEqual(expect.any(HTMLTimeElement))
    })

    it('accepts a locale and adjusts its output accordingly for a time', () => {
      render(
        <ComposedTime startDateTimeInput="2023-11-19T01:23:45" locale="es" />
      )
      expect(screen.getByText('1:23')).toBeInTheDocument()
    })

    // TODO: Note the 'to' in the expected output.
    // This test needs to change once we get i18n/l10n done
    it('accepts a locale and adjusts its output accordingly for a time range', () => {
      render(
        <ComposedTime
          startDateTimeInput="2023-11-19T01:23:45"
          endDateTimeInput="2023-11-25T21:01:23"
          locale="es"
        />
      )

      // Checks the following:
      // - Date and time conversion
      // - "to" instead of "-"
      // - lowercased am/pm
      // - type of <time />
      const beginTime = screen.getByText('1:23')
      const endTime = screen.getByText('21:01')
      expect(beginTime).toBeInTheDocument()
      expect(beginTime).toEqual(expect.any(HTMLTimeElement))
      expect(screen.getByText('to')).toBeInTheDocument()
      expect(endTime).toBeInTheDocument()
      expect(endTime).toEqual(expect.any(HTMLTimeElement))
    })

    it.each([
      // invalid first param
      ['2023-11-19T01:23:450', undefined],
      ['2023-11-190T01:23:45', undefined],
      ['2023-11-1901:23:45', undefined],
      ['2023-11-19T01:23:4', undefined],
      ['202-11-19T01:23:45', undefined],
      [undefined, undefined],
      [true, undefined],
      ['', undefined],
      [1, undefined],
      // invalid second param
      ['2023-11-19T01:23:45', '2023-11-19T01:23:450'],
      ['2023-11-19T01:23:45', '2023-11-190T01:23:45'],
      ['2023-11-19T01:23:45', '2023-11-1901:23:45'],
      ['2023-11-19T01:23:45', '2023-11-19T01:23:4'],
      ['2023-11-19T01:23:45', '202-11-19T01:23:45'],
      ['2023-11-19T01:23:45', true],
      ['2023-11-19T01:23:45', 1]
    ])('returns an empty string with invalid inputs: %s, %s', (a, b) => {
      // Mock the warn as the handler calls it in the try/catch
      const restoreConsole = mockConsole()

      // @ts-expect-error invalid input types
      render(<ComposedTime startDateTimeInput={a} endDateTimeInput={b} />)
      expect(screen.queryByText(/1:23/)).not.toBeInTheDocument()
      expect(console.warn).toHaveBeenCalled()

      // Restore it
      restoreConsole()
    })
  })

  describe('<DateTimeBlock />', () => {
    let baseProps = {} as TypeDateTimeValues
    beforeAll(() => {
      baseProps = {
        start_date: '2023-11-19',
        start_time: '01:23:45',
        end_date: '2023-11-19',
        end_time: '21:02:34',
        is_all_day: false,
        include_end_date_time: 'yes'
      }
    })

    it('renders a single day with a simple time range', () => {
      render(<DateTimeBlock {...baseProps} />)
      screen.getByRole('heading')

      expect(screen.getByRole('heading')).toHaveTextContent('Date')
      expect(screen.getByText(/Sunday, November 19, 2023/)).toBeInTheDocument()
      ;['1:23 am', '9:02 pm'].forEach((input) =>
        expect(screen.getByText(input)).toBeInTheDocument()
      )
      expect(screen.getByText(/to/)).toBeInTheDocument()
    })

    it('renders a single day with no time (all day)', () => {
      const props = {
        ...baseProps,
        ...{ is_all_day: true }
      }
      render(<DateTimeBlock {...props} />)
      screen.getByRole('heading')

      expect(screen.getByRole('heading')).toHaveTextContent('Date')
      expect(screen.getByText('Sunday, November 19, 2023')).toBeInTheDocument()
      ;['1:23 am', '9:02 pm'].forEach((input) =>
        expect(screen.queryByText(input)).not.toBeInTheDocument()
      )
      expect(screen.queryByText(/to/)).not.toBeInTheDocument()
    })

    it('renders a date range with a simple time range', () => {
      const props = {
        ...baseProps,
        ...{ end_date: '2023-11-25' }
      }
      render(<DateTimeBlock {...props} />)
      screen.getByRole('heading')

      expect(screen.getByRole('heading')).toHaveTextContent('Date')
      ;[
        'Sunday, November 19',
        'Saturday, November 25, 2023',
        '1:23 am',
        '9:02 pm'
      ].forEach((input) => expect(screen.getByText(input)).toBeInTheDocument())
      expect(screen.getAllByText(/to/)).toHaveLength(2)
    })

    it('renders a date range with no time', () => {
      const props = {
        ...baseProps,
        ...{ end_date: '2023-11-25', start_time: '', end_time: '' }
      }
      render(<DateTimeBlock {...props} />)
      screen.getByRole('heading')

      expect(screen.getByRole('heading')).toHaveTextContent('Date')
      ;['Sunday, November 19', 'Saturday, November 25, 2023'].forEach((input) =>
        expect(screen.getByText(input)).toBeInTheDocument()
      )
      ;['1:23 am', '9:02 pm'].forEach((input) =>
        expect(screen.queryByText(input)).not.toBeInTheDocument()
      )
      expect(screen.getAllByText(/to/)).toHaveLength(1)
    })

    it('renders a date range with a start time only', () => {
      const props = {
        ...baseProps,
        ...{ end_date: '2023-11-25', include_end_date_time: 'no' }
      }
      render(<DateTimeBlock {...props} />)
      screen.getByRole('heading')

      expect(screen.getByRole('heading')).toHaveTextContent('Date')
      ;[
        'Sunday, November 19',
        'Saturday, November 25, 2023',
        '1:23 am'
      ].forEach((input) => expect(screen.getByText(input)).toBeInTheDocument())
      expect(screen.queryByText('9:02 pm')).not.toBeInTheDocument()
      expect(screen.getAllByText(/to/)).toHaveLength(1)
    })

    it.each([
      { modProps: { start_date: '20-11-19' } },
      { modProps: { end_date: '20-11-25' } }
    ])(
      'does not render the date and time with improper inputs: $modProps',
      ({ modProps }) => {
        // Mock the warn as the handler calls it in the try/catch
        const restoreConsole = mockConsole()
        const props = {
          ...baseProps,
          ...modProps
        }

        render(<DateTimeBlock {...props} />)
        screen.getByRole('heading')

        expect(screen.getByRole('heading')).toHaveTextContent('Date')
        expect(
          screen.queryByText('Sunday, November 19, 2023')
        ).not.toBeInTheDocument()
        // Because date is used in generating the time, it will not be rendered
        ;['1:23 am', '9:02 pm'].forEach((input) =>
          expect(screen.queryByText(input)).not.toBeInTheDocument()
        )
        expect(console.warn).toHaveBeenCalled()

        // Restore it
        restoreConsole()
      }
    )

    it.each([
      { modProps: { start_time: ':23:45' } },
      { modProps: { end_time: ':02:34' } }
    ])(
      'does not render the time with improper inputs: $modProps',
      ({ modProps }) => {
        // Mock the warn as the handler calls it in the try/catch
        const restoreConsole = mockConsole()
        const props = {
          ...baseProps,
          ...modProps
        }

        render(<DateTimeBlock {...props} />)
        screen.getByRole('heading')

        expect(screen.getByRole('heading')).toHaveTextContent('Date')
        expect(
          screen.getByText('Sunday, November 19, 2023')
        ).toBeInTheDocument()
        ;['1:23 am', '9:02 pm'].forEach((input) =>
          expect(screen.queryByText(input)).not.toBeInTheDocument()
        )
        expect(console.warn).toHaveBeenCalled()

        // Restore it
        restoreConsole()
      }
    )
  })
})
