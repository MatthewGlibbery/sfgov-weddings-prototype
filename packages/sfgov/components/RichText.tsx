import React, { ComponentType } from 'react'
import parse, {
  domToReact,
  Element,
  type HTMLReactParserOptions
} from 'html-react-parser'

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

const ALWAYS_FORBID_ATTR_VALUES: Matcher[] = [
  /javascript:/
]

export type RichTextProps = {
  html: string
  components?: ComponentMap
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
export function RichText (props: RichTextProps) {
  const { html, components = {} } = props

  const options: HTMLReactParserOptions = {
    replace (node) {
      if (!isElementNode(node)) {
        return
      }

      const { tagName, attribs } = node
      if (!isAllowedElement(tagName)) {
        console.warn(
          'skipping forbidden element "%s" with attributes:',
          node.tagName, node.attribs
        )
        return <></>
      }

      const Component: ComponentType | string = components[tagName] || tagName
      if (typeof Component === 'string' && !isAllowedElement(Component)) {
        return <></>
      }

      const props = Object.fromEntries(
        Object.entries(attribs)
          .filter(([attr, value]) => isAllowedAttr(attr, value))
      )

      // @ts-expect-error this is dumb
      return <Component {...props}>
        {domToReact(node.children, options)}
      </Component>
    }
  }
  return <>{parse(html, options)}</>

  function isAllowedElement (name: string): boolean {
    const lowerName = name.toLowerCase()
    if (ALWAYS_FORBID_ELEMENTS.includes(lowerName)) return false
    return true
  }

  function isAllowedAttr (name: string, value: string) {
    if (matchesAny(name, ALWAYS_FORBID_ATTRS)) {
      return false
    } else if (matchesAny(value, ALWAYS_FORBID_ATTR_VALUES)) {
      return false
    }
    return true
  }
}

function isElementNode (node: unknown): node is Element {
  return node instanceof Element || (node as Element)?.nodeType === 1
}

function matches (value: string, matcher: Matcher) {
  return matcher instanceof RegExp
    ? matcher.test(value)
    : matcher === value
}

function matchesAny (value: string, matchers: Matcher[]): boolean {
  return matchers?.some(matcher => matches(value, matcher))
}
