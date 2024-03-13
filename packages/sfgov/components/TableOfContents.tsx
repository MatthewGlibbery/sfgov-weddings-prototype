// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import {
  classed,
  classes,
  IconChevronDown,
  IconChevronUp,
  Link
} from '@/design-system'
import { StyledDetails } from './Accordion'

export const tocWrapperClasses = classes(
  'z-50',
  'bg-white col-span-full lg:col-start-9 h-fit sticky top-0 lg:top-40',
  'px-20 py-28 md:px-28 mb-20',
  'lg:mr-28 lg:pt-0 lg:pb-40 lg:order-2'
)
const TOCWrapper = classed('ul', 'list-none my-0 ps-0')

const ListItem = classed('li', 'mb-16')

const TopLevelTOC = classed(Link, 'block font-bold no-underline', {
  variants: {
    isactive: {
      true: 'text-white bg-primary500 rounded-[40px] px-12 py-8'
    }
  }
})

const NavHeader = classed(
  'summary',
  classes(
    'flex py-8 px-20 justify-between',
    'text-primary500 bg-white',
    'border-1 border-solid border-neutral400 rounded-[24px]'
  )
)

const LowerLevelTOC = classed(TopLevelTOC, 'font-normal ps-16')

const scrollToHeading = (target) => {
  const element = document.querySelector(target)
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
const Headings = ({ headings, activeId, id = '' }) => (
  <>
    {headings.map((heading) => (
      <span key={heading.id}>
        <ListItem isactive={heading.id === activeId ? 'true' : 'false'}>
          <TopLevelTOC
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToHeading(`#${heading.id}`)
            }}
            isactive={heading.id === activeId ? 'true' : 'false'}
            data-testid={`top-level-toc${id}`}
          >
            {heading.title}
          </TopLevelTOC>
        </ListItem>
        {!!heading.items.length &&
          heading.items.map((child) => (
            <ListItem
              key={child.id}
              isactive={child.id === activeId ? 'true' : 'false'}
            >
              <LowerLevelTOC
                href={`#${child.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(`#${child.id}`)
                }}
                isactive={child.id === activeId ? 'true' : 'false'}
                data-testid={`lower-level-toc${id}`}
              >
                {child.title}
              </LowerLevelTOC>
            </ListItem>
          ))}
      </span>
    ))}
  </>
)

const TOC = ({ headings, activeNode, activeId }) => {
  const OpenedIcon = IconChevronUp
  const ClosedIcon = IconChevronDown

  const [isOpen, setOpen] = useState(false)
  const Icon = isOpen ? OpenedIcon : ClosedIcon

  /* istanbul ignore next */
  const toggleOpen = (e) => {
    e.preventDefault()
    setOpen(!isOpen)
  }

  return (
    <StyledDetails open={isOpen} onClick={toggleOpen}>
      <NavHeader>
        <span>{activeNode?.textContent || '...Loading'}</span>
        <Icon width={24} />
      </NavHeader>
      <div className="mt-12 py-28 px-20 bg-white border-1 border-solid border-neutral400 rounded-[26px]">
        <Headings headings={headings} activeId={activeId} />
      </div>
    </StyledDetails>
  )
}

const TOCDesktop = ({ headings, activeId }) => (
  <TOCWrapper>
    <Headings headings={headings} activeId={activeId} id="desktop" />
  </TOCWrapper>
)

/**
 * Dynamically generates the table of contents list,
 * using any H2s and H3s it can find in the main text
 */
const useHeadingsData = (screen) => {
  const [nestedHeadings, setNestedHeadings] = useState([])

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h2[id], h3[id]:not([id=""]')
    )

    let headings = headingElements
    if (screen) {
      headings = headingElements.filter((el) => el.id.includes(screen))
    }

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headings)
    setNestedHeadings(newNestedHeadings)
  }, [screen])

  return { nestedHeadings }
}

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = []

  headingElements.forEach((heading) => {
    const { innerText: title, id } = heading

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] })
    } else if (
      heading.nodeName === 'H3' &&
      !!nestedHeadings.length &&
      nestedHeadings[nestedHeadings.length - 1].id !== 'getHelp'
    ) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title
      })
    }
  })

  return nestedHeadings
}

const useIntersectionObserver = (activeNode, setActiveNode, screen) => {
  const headingElementsRef = useRef({})
  useEffect(() => {
    // istanbul ignore next
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      // Get all headings that are currently visible on the page
      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      // If there is only one visible heading, this is our "active" heading
      // otherwise, the heading closest to the top of the page is active
      if (visibleHeadings.length >= 1) {
        setActiveNode(visibleHeadings[0].target)
      } else if (!activeNode) {
        setActiveNode(headingElements[0])
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-30% 0% 0% 0px'
    })

    let headingElements = Array.from(
      document.querySelectorAll('h2[id], h3[id]:not([id=""]')
    )

    if (screen) {
      headingElements = headingElements.filter((el) => el.id.includes(screen))
    }

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [activeNode, setActiveNode, screen])
}

/**
 * Renders the table of contents.
 */
export const TableOfContents = ({ screen = '' }) => {
  const [activeNode, setActiveNode] = useState()
  const { nestedHeadings } = useHeadingsData(screen)
  useIntersectionObserver(activeNode, setActiveNode, screen)

  // istanbul ignore next
  const activeId = activeNode ? activeNode.id : ''

  return (
    <nav aria-label="Table of contents">
      <span className="hidden lg:block">
        <TOCDesktop headings={nestedHeadings} activeId={activeId} />
      </span>
      <span className="block lg:hidden">
        <TOC
          headings={nestedHeadings}
          activeNode={activeNode}
          activeId={activeId}
        />
      </span>
    </nav>
  )
}
