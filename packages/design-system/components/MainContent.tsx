// Creates a <main> wrapper for indicating
// the main content area of a page. This is
// a landmark role important for screen reader
// navigation and information findability. Read
// more here: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role

import { classed } from './utils'
import type { AnyComponent, ComponentProps } from '../types'

const MainContent = classed('main' as AnyComponent)
MainContent.defaultProps = {
  id: 'main-content',
  role: 'main'
}

type MainContentProps = ComponentProps<typeof MainContent>

export { MainContent }
export type { MainContentProps }
