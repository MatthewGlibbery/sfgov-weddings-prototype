import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as icons from '../../design-system/components/icons'

export const withStory = (Component: any, options?: any) => {
  const meta = {
    ...options,
    component: Component,
    argTypes: {
      ...options?.argTypes,
      as: { table: { disable: true } },
      ref: { table: { disable: true } }
    }
  } satisfies Meta<typeof Component>

  return { meta }
}

export const withTemplateStory = (
  Component: any,
  factory: any,
  options?: any
) => {
  const meta = {
    component: Component,
    render: (args) => <Component page={args} />,
    ...options
  } satisfies Meta<typeof Component>

  const args = factory.make()
  delete args.id
  delete args.meta

  return { args, meta }
}

const iconKeys = Object.keys(icons)
export const iconMapping = {
  icon: {
    options: iconKeys,
    mapping: icons,
    control: {
      type: 'select',
      labels: iconKeys.reduce((a: any, b: string) => {
        // Below we set the value of a label to the icon name
        // minus the prefix 'Icon' e.g. 'IconAlert' becomes 'Alert'
        a[b] = b.substring(4)
        return a
      }, {})
    }
  }
}

export type Story<T = string> = StoryObj<T>
