// istanbul ignore file
import type {
  IContentAPI,
  PageData,
  TypeLocationBlock,
  WagtailImageData
} from '@/types'
import type { TFunction } from 'i18next'
import type { ComponentType } from 'react'
import { createContext, useContext } from 'react'

export function getPageURL(page: PageData) {
  let meta = page?.meta
  if (page?.value?.meta) {
    meta = page.value.meta
  }
  if (page?.meta) {
    meta = page.meta
  }
  if (meta?.html_url) {
    return meta.html_url.includes('://')
      ? new URL(meta.html_url).pathname
      : meta.html_url
  } else {
    return meta?.url_path
  }
}

export async function resolveImage(
  img: WagtailImageData | number,
  api: IContentAPI
) {
  if (!img) {
    // noop
  } else if (typeof img === 'number') {
    return api.getData<WagtailImageData>(`images/${img}`)
  } else if (img.meta?.download_url) {
    return img
  } else if (img.id && !img.meta?.download_url) {
    return api.getData<WagtailImageData>(`images/${img.id}`)
  }
}

export function resolvePage<T extends PageData = PageData>(
  idOrObj: number | T,
  api: IContentAPI
) {
  if (typeof idOrObj === 'number') {
    return api.getData<T>(`pages/${idOrObj}/`)
  } else {
    return idOrObj as T
  }
}

export function camelCase(str: string | undefined) {
  return str
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function getHeaderLinks(t: TFunction) {
  return [
    { href: '/services', text: t('services', { defaultValue: 'Services' }) },
    {
      href: '/departments',
      text: t('departments', { defaultValue: 'Departments' })
    },
    {
      href: 'https://careers.sf.gov',
      text: t('jobs', { defaultValue: 'Jobs' })
    }
  ]
}

export function getFooterLinks(t: TFunction) {
  return [
    ...getHeaderLinks(t),
    {
      href: '/contact-sfgov',
      text: t('contact-us', { defaultValue: 'Contact us' })
    }
  ]
}

type TypeHeaderWithContent = {
  title: string
  links: { href: string; text: string }[]
  buildFn: (links: { href: string; text: string }[]) => JSX.Element
}

export type TypeHeaderData = {
  services: TypeHeaderWithContent
  departments: TypeHeaderWithContent
  jobs: TypeHeaderWithContent
  contact: TypeHeaderWithContent
}

export function getHeaderData(t: TFunction) {
  return {
    services: {
      title: t('services', { defaultValue: 'Services' }),
      links: getServicesLinks(t)
    },
    departments: {
      title: t('departments', { defaultValue: 'Departments' }),
      links: getDepartmentsLinks(t)
    },
    jobs: {
      title: t('jobs', { defaultValue: 'Jobs' })
    },
    contact: {
      title: t('contact', { defaultValue: 'Contact' }),
      links: getContactLinks(t)
    }
  } as TypeHeaderData
}

function getServicesLinks(t: TFunction) {
  return [
    {
      href: '/step-by-step--get-married-san-francisco',
      text: t('get-married-sf-link', {
        defaultValue: 'Get married in San Francisco'
      })
    },
    {
      href: '/get-birth-certificate-someone-over-3',
      text: t('birth-certificate-link', {
        defaultValue: 'Get a birth certificate'
      })
    },
    {
      href: '/topics--housing',
      text: t('find-affordable-housing-link', {
        defaultValue: 'Find affordable housing'
      })
    },
    {
      href: '/topics--building-permits',
      text: t('building-permits-link', {
        defaultValue: 'Get a building permit'
      })
    },
    {
      href: '/topics--problems-and-complaints',
      text: t('problems-and-complaints-link', {
        defaultValue: 'Report a problem'
      })
    },
    {
      href: '/topics--building',
      text: t('building-link', {
        defaultValue: 'Building'
      })
    },
    {
      href: '/topics--business',
      text: t('business-link', {
        defaultValue: 'Business'
      })
    },
    {
      href: '/topics--health',
      text: t('health-link', {
        defaultValue: 'Health'
      })
    },
    {
      href: '/topics--homelessness',
      text: t('homelessness-link', {
        defaultValue: 'Homelessness'
      })
    },
    {
      href: '/topics--housing',
      text: t('housing-link', {
        defaultValue: 'Housing'
      })
    },
    {
      href: '/topics--personal-records',
      text: t('personal-records-link', {
        defaultValue: 'Personal records'
      })
    },
    {
      href: '/topics--parking',
      text: t('parking-link', {
        defaultValue: 'Parking'
      })
    },
    {
      href: '/topics--volunteering',
      text: t('volunteering-link', {
        defaultValue: 'Volunteering'
      })
    },
    {
      href: '/services',
      text: t('see-all-services-button', {
        defaultValue: 'See all services'
      })
    }
  ]
}

function getDepartmentsLinks(t: TFunction) {
  return [
    {
      href: '/departments--assessor-recorder',
      text: t('assessor-recorder-link', {
        defaultValue: 'Assessor-Recorder'
      })
    },
    {
      href: '/departments--city-administrator',
      text: t('city-administrator-link', {
        defaultValue: 'City Administrator'
      })
    },
    {
      href: '/departments--department-building-inspection',
      text: t('dbi-link', {
        defaultValue: 'Department of Building Inspections'
      })
    },
    {
      href: '/departments--department-elections',
      text: t('doe-link', {
        defaultValue: 'Department of Elections'
      })
    },
    {
      href: '/departments--department-public-health',
      text: t('dph-link', {
        defaultValue: 'Department of Public Health'
      })
    },
    {
      href: '/departments--rent-board',
      text: t('rent-board-link', {
        defaultValue: 'Rent Board'
      })
    },
    {
      href: '/departments--san-francisco-government-tv',
      text: t('sfgovtv-link', {
        defaultValue: 'SFGovTV'
      })
    },
    {
      href: '/departments',
      text: t('see-all-departments-button', {
        defaultValue: 'See all departments'
      })
    }
  ]
}

function getContactLinks(t: TFunction) {
  return [
    {
      href: '/topics--problems-and-complaints',
      text: t('contact-report-a-problem-link', {
        defaultValue: 'Report a problem'
      })
    },
    {
      href: '/departments',
      text: t('contact-city-departments-link', {
        defaultValue: 'Contact City departments'
      })
    },
    {
      href: '/departments--311-customer-service-center',
      text: t('contact-311-customer-service-link', {
        defaultValue: 'Contact 311 Customer Service Center'
      })
    },
    {
      href: '/location--san-francisco-city-hall',
      text: t('city-hall-link', {
        defaultValue: 'City Hall'
      })
    },
    {
      href: '/location--san-francisco-permit-center',
      text: t('permit-center-link', {
        defaultValue: 'Permit Center'
      })
    },
    {
      href: '/contact-the-city',
      text: t('find-contacts-button', { defaultValue: 'Find contacts' })
    }
  ]
}

/**
 * Create a React component that renders the given component with prop defaults.
 * The props type is inferred from the component type:
 *
 * ```ts
 * const Hello = (p: { what: string }) => <div>Hello, {p.what}!</div>
 * const X = withDefaultProps(Y, { what: 'World' })
 * <X /> // renders <div>Hello, world!</div>
 * ```
 */
export function withDefaultProps<P extends object>(
  Component: ComponentType<P>,
  defaults: Partial<P>
) {
  return function WithDefaultProps(props: P) {
    return <Component {...defaults} {...props} />
  }
}

export function isPermitCenter(page: PageData): boolean {
  return (
    page.meta.slug === 'location--san-francisco-permit-center' ||
    (page.meta.html_url !== undefined &&
      page.meta.html_url?.includes('location--san-francisco-permit-center'))
  )
}

/** event page listing utilities */
export function formatDateTimeRange(
  start: string,
  end: string,
  includeEndDateTime: boolean
) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit'
  }
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)
  const startDateStr = startDateTime.toLocaleString('default', dateOptions)
  const startTimeStr = startDateTime.toLocaleString('default', timeOptions)
  const endDateStr = endDateTime.toLocaleString('default', dateOptions)
  const endTimeStr = endDateTime.toLocaleString('default', timeOptions)

  const dateRange =
    !includeEndDateTime ||
    startDateTime.toDateString() === endDateTime.toDateString()
      ? startDateStr
      : `${startDateStr} to ${endDateStr}`
  const timeRange =
    !includeEndDateTime ||
    startDateTime.toDateString() === endDateTime.toDateString()
      ? startTimeStr
      : `${startTimeStr} to ${endTimeStr}`

  return { dateRange, timeRange }
}

export function getLocation(location: TypeLocationBlock[]) {
  return location
    ? location
        .map((item) => {
          if (item.type === 'address') return item?.value?.line1
          else if (item.type === 'online') return 'Online'
          else return ''
        })
        .join(', ')
    : null
}

export function truncateText(desc: string, max: number) {
  if (desc.length <= max) {
    return desc
  }
  const truncated = desc.substring(0, max)
  return truncated.substring(0, truncated.lastIndexOf(' ') || max) + ' ...'
}

/**
 * Quick n dirty way to do A/B assignment for test groups. Hard coded at 50%.
 * This will be deleted once the testing is done: CMS-1232
 * @returns null | string
 */
export async function getTestGroup() {
  if (window === undefined) {
    return null
  }

  const storageKey = 'testGroup'
  const cookie = await window.cookieStore.get(storageKey)
  let testGroup = null

  if (!cookie) {
    testGroup = Math.round(Math.random()) ? 'a' : 'b'
    window.cookieStore.set({
      name: storageKey,
      value: testGroup,
      expires: Date.now() + 1209600000 // 2 weeks from now
    })
  } else {
    testGroup = cookie.value
  }

  return testGroup
}

// create test group context to expose test group to other components
// mainly for PageWrapper.tsx where we determine which header to show
export const TestGroupContext = createContext<string | null>(null)
export const useTestGroup = () => useContext(TestGroupContext)
