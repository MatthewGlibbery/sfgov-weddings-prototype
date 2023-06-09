import {
  ButtonLinkFactory,
  CalloutFactory,
  EmailBlockFactory,
  LocationBlockFactory,
  PhoneNumberFactory,
  TextBlockFactory,
  WhatToDoFactory,
  WhatToDoStepFactory
} from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { WhatToDo } from './WhatToDo'

describe('WhatToDo', () => {
  const fixture = WhatToDoFactory.make()

  it('renders a callout field', () => {
    const props = {
      ...fixture,
      value: [CalloutFactory.make()]
    }
    render(<WhatToDo {...props} />)

    const text = screen.queryByText(props.value[0].value)
    expect(text).toBeInTheDocument()
  })

  it.each([
    {
      what: 'callout',
      input: WhatToDoStepFactory.make({
        value: { step_specifics: [CalloutFactory.make()] }
      })
    },
    {
      what: 'address',
      input: WhatToDoStepFactory.make({
        value: { step_specifics: [LocationBlockFactory.make()] }
      })
    },
    {
      what: 'email',
      input: WhatToDoStepFactory.make({
        value: { step_specifics: [EmailBlockFactory.make()] }
      })
    },
    {
      what: 'button_link',
      input: WhatToDoStepFactory.make({
        value: { step_specifics: [ButtonLinkFactory.make()] }
      })
    },
    {
      what: 'phone_number',
      input: WhatToDoStepFactory.make({
        value: { step_specifics: [PhoneNumberFactory.make()] }
      })
    },
    {
      what: 'text',
      input: WhatToDoStepFactory.make({
        value: { step_specifics: [TextBlockFactory.make()] }
      })
    }
  ])('renders a $what field in a What to Do step', ({ input, what }) => {
    const props = {
      ...fixture,
      value: [
        {
          ...input
        }
      ]
    }
    render(<WhatToDo {...props} />)

    expect(screen.getByTestId(`${what}-field`)).toBeInTheDocument()
  })
})
