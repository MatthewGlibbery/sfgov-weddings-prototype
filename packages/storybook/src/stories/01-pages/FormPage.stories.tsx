import React from 'react'
import { FormPage } from '@/sfgov/components'
import { FormPageFactory } from '@/sfgov/lib/factories'
import { FormPageData } from '@/sfgov/types'
import type { Meta, StoryObj } from '@storybook/react'

// default form URL
const FEEDBACK_FORM_URL =
  'https://formio.sfgov.org/live11-ruehbbakcoznmcf/sfgovfeedbackform'

/**
 * This object defines which forms we want to test directly in Storybook, and
 * allows us to alias them to keywords which can be used in story permalinks,
 * e.g.
 *
 * /storybook/?path=/story/pages-form--form&args=url:buildingPermit
 *                                                   ^^^^^^^^^^^^^^
 * We can't permalink URLs in args because Storybook forbids it for safety:
 * https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
 */
const FORM_ALIASES = {
  feedback: {
    url: FEEDBACK_FORM_URL,
    title: 'SF.gov feedback'
  },
  buildingPermit: {
    url: 'https://formio.sfgov.org/dbi/applyforabuildingpermit2024',
    title: 'Apply for a building permit'
  }
} as const

type FormArgs = {
  data: Partial<FormPageData>
  url: string
  submitted?: boolean
  page?: number
}

const meta: Meta<FormArgs> = {
  title: 'pages / Form',
  render: ({ data, url, submitted, page }) => (
    <FormPage
      // seeding the factory "locks" the randomness so we don't get different
      // random data on every page load
      page={FormPageFactory.seed(123).make({
        ...data,
        form_schema_url: url
      })}
      submitted={submitted}
      // page indexes are 0-based, but 1-based makes more sense in Storybook
      formPage={page ? page - 1 : 0}
    />
  ),
  args: {
    url: 'feedback',
    submitted: false
  },
  argTypes: {
    url: {
      name: 'Form',
      options: Object.keys(FORM_ALIASES),
      mapping: Object.fromEntries(
        Object.entries(FORM_ALIASES).map(([key, { url }]) => [key, url])
      ),
      control: {
        type: 'select',
        labels: Object.fromEntries(
          Object.entries(FORM_ALIASES).map(([key, { title }]) => [key, title])
        )
      }
    },
    page: {
      name: 'Skip to page',
      type: 'number',
      control: {
        min: 1
      },
      if: {
        arg: 'submitted',
        neq: true
      }
    },
    submitted: {
      name: 'Submitted',
      type: 'boolean'
    }
  },
  parameters: {
    container: false,
    controls: {
      exclude: ['data']
    }
  }
}

export default meta

type FormPageStory = StoryObj<typeof meta>

export const _Form: FormPageStory = {}
