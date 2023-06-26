import {
  ContentSectionFactory,
  ButtonLinkFactory,
  PhoneNumberFactory,
  TextBlockFactory
} from '@/lib/factories'
import { ButtonLinkBlock, PhoneNumberBlockType, TextBlock } from '@/types'
import { render, screen } from '@testing-library/react'
import { ContentSection } from './ContentSection'

describe('ContentSection', () => {
  it('renders a content section with a title', () => {
    const { value: contentSectionValue } = ContentSectionFactory.make()
    render(<ContentSection {...contentSectionValue} />)
    expect(screen.getByText(contentSectionValue.title)).toBeInTheDocument()
  })

  it('renders a content section with a button', () => {
    const contentSection = ContentSectionFactory.make({
      value: {
        section_content: [ButtonLinkFactory.make()]
      }
    })
    const component = contentSection.value.section_content[0] as ButtonLinkBlock
    render(<ContentSection {...contentSection.value} />)
    expect(
      screen.getByRole('link', {
        name: component.value.link_text
      })
    ).toHaveAttribute('href', component.value.url)
  })

  it('renders a content section with a phone number', () => {
    const contentSection = ContentSectionFactory.make({
      value: {
        section_content: [PhoneNumberFactory.make()]
      }
    })
    const component = contentSection.value
      .section_content[0] as PhoneNumberBlockType
    render(<ContentSection {...contentSection.value} />)
    expect(screen.getByText(component.value.phone_number)).toBeInTheDocument()
  })

  it('renders a content section with a text component', () => {
    const contentSection = ContentSectionFactory.make({
      value: {
        section_content: [TextBlockFactory.make()]
      }
    })
    const component = contentSection.value.section_content[0] as TextBlock
    render(<ContentSection {...contentSection.value} />)
    expect(screen.getByText(component.value)).toBeInTheDocument()
  })
})
