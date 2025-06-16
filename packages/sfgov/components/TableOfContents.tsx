// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  classed,
  classes,
  HeadingLg,
  IconArrowUp,
  IconChevronDown,
  IconChevronUp,
  Link
} from '@/design-system'
import { useTranslation } from 'next-i18next'

export const tocWrapperClasses = classes(
  'z-50',
  'bg-white col-span-full lg:col-start-9 h-fit sticky top-0 lg:top-40',
  'px-20 py-28 md:px-0 mb-20',
  'lg:pt-0 lg:pb-40 lg:order-2'
)
const TOCWrapper = classed(
  'ul',
  'list-none ps-20 border-l-1 border-l-neutral200'
)

const ListItem = classed('li', 'mb-16')

const TopLevelTOC = classed(Link, 'line-clamp-2')

// istanbul ignore next
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToHeading = (target) => {
  const element = document.getElementById(target)
  const headerOffset = 45
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}
/**
 * This renders an item in the table of contents list.
 * scrollIntoView is used to ensure that when a user
 * clicks on an item, it will smoothly scroll.
 */

// istanbul ignore next
const Headings = ({ headings }) => {
  const hideHeadings = headings.length > 10
  const [showAll, setShowAll] = useState(false)
  const [headingsList, setHeadingsList] = useState(
    hideHeadings ? headings.slice(0, 9) : headings
  )

  useEffect(() => {
    if (showAll) {
      setHeadingsList(headings)
    } else {
      setHeadingsList(headings.slice(0, 9))
    }
  }, [headings, setHeadingsList, showAll])

  const { t } = useTranslation()

  const gradientStyles = {
    '-webkit-mask-image':
      '-webkit-gradient(linear, left top, left bottom, from(black), to(transparent))',
    '-webkit-mask-image':
      'linear-gradient(to bottom, black 70%, transparent 100%)',
    'mask-image':
      '-webkit-gradient(linear, left top, left bottom, from(black), to(transparent))',
    'mask-image': 'linear-gradient(to bottom, black 70%, transparent 120%)'
  }

  return (
    <>
      <div style={!showAll && hideHeadings ? gradientStyles : {}}>
        <TOCWrapper>
          {headingsList.map((heading) => (
            <ListItem key={heading.id}>
              <TopLevelTOC
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(heading.id)
                }}
                data-testid="top-level-toc"
                tabIndex={0}
              >
                {heading.title}
              </TopLevelTOC>
            </ListItem>
          ))}
        </TOCWrapper>
      </div>
      {hideHeadings ? (
        <Button
          variant="link"
          className="!px-0 !no-underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? t('show-less-toc', { defaultValue: 'Show less' })
            : t('show-all-toc', { defaultValue: 'Show all' })}
          {showAll ? (
            <IconChevronUp width={20} />
          ) : (
            <IconChevronDown width={20} />
          )}
        </Button>
      ) : null}
    </>
  )
}

const TOC = ({ headings }) => <Headings headings={headings} />

/**
 * Dynamically generates the table of contents list,
 * using any H2s it can find in the main text
 */
const useHeadingsData = () => {
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h2[id]:not([id=""])')
    )

    // istanbul ignore next
    if (headingElements.length < 3) {
      // istanbul ignore next
      return { headings: [] }
    }
    // Created a list of headings
    const newHeadings = []
    headingElements.forEach((heading) => {
      heading.id = heading.id.replace(/\s+/g, '')
      const { innerText: title, id } = heading

      newHeadings.push({ id, title })
    })
    setHeadings(newHeadings)
  }, [])

  return { headings }
}

const useIntersectionObserver = (showBackToTop, setShowBackToTop) => {
  useEffect(() => {
    // istanbul ignore next
    const callback = ([firstHeading]) => {
      if (firstHeading.boundingClientRect.top < 32) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    const observer = new IntersectionObserver(callback)

    const headingElements = Array.from(
      document.querySelectorAll('h2[id]:not([id=""])')
    )

    // We don't have ToC if there are fewer than 3 headings
    // don't observe if this is the case
    if (headingElements.length >= 3) {
      observer.observe(headingElements[0])
    }

    return () => observer.disconnect()
  }, [showBackToTop, setShowBackToTop])
}

/**
 * Renders the table of contents.
 */
export const TableOfContents = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { headings } = useHeadingsData()
  useIntersectionObserver(showBackToTop, setShowBackToTop)

  const { t } = useTranslation()

  if (headings.length >= 3) {
    return (
      <nav role="navigation" aria-label="Table of contents" tabIndex={0}>
        <HeadingLg as="p" className="mb-[24px]">
          {t('table-of-contents-heading', { defaultValue: 'On this page' })}
        </HeadingLg>
        <TOC headings={headings} />
        {/* istanbul ignore next */}
        {showBackToTop ? (
          <Button
            variant="secondary"
            className="fixed bottom-16 right-16 md:bottom-[50px] md:right-[50px] z-50"
            onClick={
              /* istanbul ignore next */ () =>
                /* istanbul ignore next */ scrollToTop()
            }
          >
            <IconArrowUp width={20} />
            {t('back-to-top-button', { defaultValue: 'Back to top' })}
          </Button>
        ) : null}
      </nav>
    )
  }
  return null
}
