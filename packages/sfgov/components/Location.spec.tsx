import { render, screen } from '@testing-library/react'

import { LocationBlock } from './Location'

import type { LocationValues } from '@/types'

describe('<LocationBlock />', () => {
  let baseTestData = {} as LocationValues
  beforeAll(() => {
    baseTestData = {
      line1: '123 Sesame Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103'
    }
  })

  test.each([
    {},
    { line2: 'Suite 100' },
    { organization: 'Organization value' },
    { addressee: 'Addresee value' },
    { location_name: 'Location name value' },
    { location_notes: '<p data-block-key="m135x">Digital services location notes english</p>' },
    {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      }
    },
    { organization: 'Organization value', addressee: 'Addresee value', location_name: 'Location name value' },
    { organization: 'Organization value', addressee: 'Addresee value', location_name: 'Location name value' },
    {
      line2: 'Suite 100',
      organization: 'Organization value',
      addressee: 'Addresee value',
      location_name: 'Location name value',
      location_notes: '<p data-block-key="m135x">Digital services location notes english</p>',
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      }
    }
  ])('renders the address fields (with option(s) %o)', (optData) => {
    const testData = {
      ...baseTestData,
      ...optData
    } as LocationValues
    render(<LocationBlock {...testData} />)

    // Because the state is 2 chars, it has a high frequency of matching strings when we do { exact: false }
    // (also case insensitive), which mucks up the getByText selector. Therefore, to narrow it a bit, but
    // still allow for some fuzz matching, we use a regex.
    const stateRegex = new RegExp(testData.state)

    expect(screen.getByText(testData.line1, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(testData.city, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(stateRegex)).toBeInTheDocument()
    expect(screen.getByText(testData.zip, { exact: false })).toBeInTheDocument()

    const optDataKeyArr = Object.keys(optData)
    if (optDataKeyArr.length) {
      for (const key of optDataKeyArr) {
        const lookupText = typeof testData[key] === 'string' ? testData[key] : testData[key].title
        expect(screen.getByText(lookupText, { exact: false })).toBeInTheDocument()
      }
    }
  })

  it('it doesn\'t bold anything when there isn\'t anything to be bolded', () => {
    render(<LocationBlock {...baseTestData} />)
    const fontweightProp = window
      .getComputedStyle(screen.getByText(baseTestData.line1, { exact: false }))
      .getPropertyValue('font-weight')

    expect(screen.queryByTestId('title')).not.toBeInTheDocument()
    expect(fontweightProp).toBe('')
  })

  it.each([
    { organization: 'Organization value' },
    { addressee: 'Addresee value' },
    { location_name: 'Location name value' }
  ])('does not render both a bolded and normal version: %o', (optData) => {
    const testData = {
      ...baseTestData,
      ...optData
    } as LocationValues
    render(<LocationBlock {...testData} />)

    expect(screen.queryAllByText(Object.values(optData)[0]).length).toBe(1)
  })

  it.each([{
    // Agency
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      organization: 'Organization value',
      addressee: 'Addresee value',
      location_name: 'Location name value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      organization: 'Organization value',
      addressee: 'Addresee value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      organization: 'Organization value',
      location_name: 'Location name value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      addressee: 'Addresee value',
      location_name: 'Location name value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      organization: 'Organization value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      addressee: 'Addresee value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      },
      location_name: 'Location name value'
    },
    expected: 'Information page 1'
  }, {
    input: {
      agency: {
        meta: { html_url: 'http://localhost/information-page-1/', type: 'sfgov_information_page.InformationPage' },
        title: 'Information page 1'
      }
    },
    expected: 'Information page 1'
  }, {
  // Organization
    input: {
      organization: 'Organization value',
      addressee: 'Addresee value',
      location_name: 'Location name value'
    },
    expected: 'Organization value'
  }, {
    input: {
      organization: 'Organization value',
      addressee: 'Addresee value'
    },
    expected: 'Organization value'
  }, {
    input: {
      organization: 'Organization value',
      location_name: 'Location name value'
    },
    expected: 'Organization value'
  }, {
    input: { organization: 'Organization value' },
    expected: 'Organization value'
  }, {
    // Addressee
    input: {
      addressee: 'Addresee value',
      location_name: 'Location name value'
    },
    expected: 'Addresee value'
  }, {
    input: { addressee: 'Addresee value' },
    expected: 'Addresee value'
  }, {
    // Location
    input: { location_name: 'Location name value' },
    expected: 'Location name value'
  }])('bolds the first line appropriately: $input', ({ input, expected }) => {
    const testData = {
      ...baseTestData,
      ...input
    } as LocationValues
    render(<LocationBlock {...testData} />)
    const boldedContainer = screen.queryByTestId('title')
    const fontweightProp = window
      .getComputedStyle(boldedContainer)
      .getPropertyValue('font-weight')

    expect(fontweightProp).toBe('bold')
    expect(boldedContainer).toHaveTextContent(expected)
  })
})
