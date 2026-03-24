import React, { type ComponentType } from 'react'
import parse, {
  domToReact,
  Element,
  type HTMLReactParserOptions
} from 'html-react-parser'

export type AnyElement = keyof JSX.IntrinsicElements

export type HTMLComponentMap<El extends AnyElement = AnyElement> = Partial<{
  [Tag in El]:  // FIXME: do something more explicit for classed components
    | ComponentType<JSX.IntrinsicElements[Tag] & { as?: any }>
    | AnyElement
    | null
    | false
}>

type Matcher = string | RegExp

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
  components?: HTMLComponentMap
  options?: Pick<HTMLReactParserOptions, 'trim'>
}

export function RichText({
  html,
  components = {},
  options: opts
}: RichTextProps) {
  // don't bother rendering if there's no content
  if (!html?.trim()) return null

  // TODO: we _could_ move this into replace() if we need rich text components
  // to specify custom components to their children
  const options: HTMLReactParserOptions = {
    trim: opts?.trim,
    replace(node) {
      if (!isElementNode(node)) {
        return
      }

      const { tagName, attribs } = node
      if (!isAllowedElement(tagName)) {
        console.warn(
          'skipping forbidden element "%s" with attributes:',
          tagName,
          attribs
        )
        return <></>
      }

      const Component =
        tagName in components
          ? components[tagName as keyof HTMLComponentMap]
          : tagName
      if (!Component) {
        return <></>
      } else if (
        typeof Component === 'string' &&
        !isAllowedElement(Component)
      ) {
        return <></>
      }

      const props = Object.fromEntries(
        Object.entries(attribs).filter(([attr, value]) =>
          isAllowedAttr(attr, value)
        )
      )
      return (
        <Component {...props}>{domToReact(node.children, options)}</Component>
      )
    }
  }
  return <>{parse(html, options)}</>
}

function isElementNode(node: unknown): node is Element {
  return node instanceof Element || (node as Element)?.nodeType === 1
}

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

function matches(value: string, matcher: Matcher) {
  return matcher instanceof RegExp ? matcher.test(value) : matcher === value
}

function matchesAny(value: string, matchers: Matcher[]): boolean {
  return matchers.some((matcher) => matches(value, matcher))
}
