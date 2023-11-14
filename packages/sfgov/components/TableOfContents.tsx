// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { classed } from '@/design-system'

const TOCWrapper = classed('ul', 'list-none ps-0')

const ListItem = classed('li', 'mb-16')

const TopLevelTOC = classed('a', 'block text-grey700 font-bold no-underline', {
  variants: {
    isactive: {
      true: 'text-white bg-grey700 rounded-[40px] px-12 py-8'
    }
  }
})

const LowerLevelTOC = classed(TopLevelTOC, 'font-normal ps-16')

/**
 * This renders an item in the table of contents list.
 * scrollIntoView is used to ensure that when a user
 * clicks on an item, it will smoothly scroll.
 */
const Headings = ({ headings, activeId }) => (
  <TOCWrapper>
    {headings.map((heading) => (
      <span key={heading.id}>
        <ListItem isActive={heading.id === activeId}>
          <TopLevelTOC
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: 'smooth'
              })
            }}
            isactive={heading.id === activeId}
            data-testid="top-level-toc"
          >
            {heading.title}
          </TopLevelTOC>
        </ListItem>
        {!!heading.items.length &&
          heading.items.map((child) => (
            <ListItem key={child.id} isActive={child.id === activeId}>
              <LowerLevelTOC
                href={`#${child.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${child.id}`).scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
                isactive={child.id === activeId}
                data-testid="lower-level-toc"
              >
                {child.title}
              </LowerLevelTOC>
            </ListItem>
          ))}
      </span>
    ))}
  </TOCWrapper>
)

/**
 * Dynamically generates the table of contents list,
 * using any H2s and H3s it can find in the main text
 */
const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([])

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h2[id], h3[id]:not([id=""]')
    )

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
  }, [])

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

const useIntersectionObserver = (setActiveId) => {
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

      setActiveId(visibleHeadings[0].target.id)
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20% 0% -35% 0px'
    })

    const headingElements = Array.from(
      document.querySelectorAll('h2[id], h3[id]:not([id=""]')
    )

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}

/**
 * Renders the table of contents.
 */
export const TableOfContents = () => {
  const [activeId, setActiveId] = useState()
  const { nestedHeadings } = useHeadingsData()
  useIntersectionObserver(setActiveId)

  return (
    <nav aria-label="Table of contents">
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  )
}
