import React, { ComponentType } from 'react'
import parse, {
  attributesToProps,
  domToReact,
  Element,
  type HTMLReactParserOptions
} from 'html-react-parser'
import { HeadingMd, HeadingSm } from '@/design-system'

export type Matcher = string | RegExp
export type ComponentMap = Record<string, ComponentType | string>
export type ElementAttrMatchers = Record<string, Record<string, Matcher[]>>

// These are elements that we should _never_ render directly.
const ALWAYS_FORBID_ELEMENTS: string[] = [
  'embed',
  'iframe',
  'object',
  'script',
  'style'
]

// These are attributes (and regex patterns) that we should never render (these
// are ignored in rendering, and don't prevent the element from rendering)
const ALWAYS_FORBID_ATTRS: Matcher[] = [
  // discard any inline styles
  'style',
  // all JavaScript event handlers are off the table
  /^on/
]

const ALWAYS_FORBID_ATTR_VALUES: Matcher[] = [/javascript:/]

export type RichTextProps = {
  html: string
  components?: ComponentMap
  isNews?: boolean
  'data-testid'?: never
}

/**
 * The RichText component takes (valid) HTML, parses it into text and element
 * nodes, and renders it as React components. Like with MDX, you can provide a
 * `components` prop that maps HTML element names to React components, which
 * allows us to style or adjust props as necessary on specific elements, e.g.
 *
 * ```tsx
 * import NextLink from 'next/link'
 *
 * // render all links with Next's Link component
 * <RichText html={'<a href="/some/url">link text</a>'} components={{
 *   a: NextLink
 * }} />)
 * ```
 */
export const RichText = (props: RichTextProps) => {
  const { html, components = {}, isNews } = props

  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!isElementNode(node)) {
        return
      }

      const { tagName, attribs, next, prev } = node

      if (!isAllowedElement(tagName)) {
        console.warn(
          'skipping forbidden element "%s" with attributes:',
          node.tagName,
          node.attribs
        )
        return <></>
      }

      const Component: ComponentType | string = components[tagName] || tagName
      if (typeof Component === 'string' && !isAllowedElement(Component)) {
        return <></>
      }

      const props = Object.fromEntries(
        Object.entries(attribs).filter(([attr, value]) =>
          isAllowedAttr(attr, value)
        )
      )

      // I'm not sure why this works, but if we don't
      // short-circuit here, next/react throws a bunch of errors
      // about not liking self-closing tags. We can be more
      // rigorous about transforming <br/>'s if we like, but
      // this is an easy workaround for now
      /* istanbul ignore next */
      if (tagName === 'br') {
        return
      }

      if (tagName === 'blockquote') {
        if (isNews && prev?.tagName === 'p') {
          // news content type is special
          return (
            <div className="flex flex-col lg:flex-row lg:w-[110%] lg:space-x-28">
              <p className="mb-20 lg:mb-0 lg:w-1/2">
                {domToReact(prev.children, options)}
              </p>
              {/* @ts-expect-error this is dumb */}
              <Component {...props}>
                {domToReact(node.children, options)}
              </Component>
            </div>
          )
        }
        return (
          <blockquote className="p-8 border-l-neutral500 border-solid border-l-3">
            {domToReact(node.children, options)}
          </blockquote>
        )
      }

      if (tagName === 'p') {
        return (
          <p className="my-8" {...props}>
            {domToReact(node.children, options)}
          </p>
        )
      }

      if (tagName === 'h3') {
        return (
          <HeadingMd as="h3" {...props}>
            {domToReact(node.children, options)}
          </HeadingMd>
        )
      }

      if (tagName === 'h4') {
        return (
          <HeadingSm as="h4" {...props}>
            {domToReact(node.children, options)}
          </HeadingSm>
        )
      }

      if (tagName === 'ul') {
        return <ul className="m-0">{domToReact(node.children, options)}</ul>
      }

      if (tagName === 'ol') {
        return <ol className="m-0">{domToReact(node.children, options)}</ol>
      }

      return (
        // @ts-expect-error this is dumb
        <Component {...props}>{domToReact(node.children, options)}</Component>
      )
    }
  }
  return <>{parse(html, options)}</>

  function isAllowedElement(name: string): boolean {
    const lowerName = name.toLowerCase()
    if (ALWAYS_FORBID_ELEMENTS.includes(lowerName)) return false
    return true
  }

  function isAllowedAttr(name: string, value: string) {
    if (matchesAny(name, ALWAYS_FORBID_ATTRS)) {
      return false
    } else if (matchesAny(value, ALWAYS_FORBID_ATTR_VALUES)) {
      return false
    }
    return true
  }
}

function isElementNode(node: unknown): node is Element {
  return node instanceof Element || (node as Element)?.nodeType === 1
}

function matches(value: string, matcher: Matcher) {
  return matcher instanceof RegExp ? matcher.test(value) : matcher === value
}

function matchesAny(value: string, matchers: Matcher[]): boolean {
  return matchers?.some((matcher) => matches(value, matcher))
}
