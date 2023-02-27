import { render, screen } from '@testing-library/react'
import {
  Text,
  BodyText,
  SmallText,
  BigDesc,
  TitleXs,
  TitleSm,
  TitleMd,
  TitleLg,
  TitleXl,
  DisplaySm,
  DisplayLg,
  Monospace
} from './Text'

describe('Text', () => {
  it('renders a styled Text element', () => {
    render(<Text>Hi!</Text>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled BodyText element', () => {
    render(<BodyText>Hi!</BodyText>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled SmallText element', () => {
    render(<SmallText>Hi!</SmallText>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled BigDesc element', () => {
    render(<BigDesc>Hi!</BigDesc>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled TitleXs element', () => {
    render(<TitleXs>Hi!</TitleXs>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled TitleSm element', () => {
    render(<TitleSm>Hi!</TitleSm>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled TitleMd element', () => {
    render(<TitleMd>Hi!</TitleMd>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled TitleLg element', () => {
    render(<TitleLg>Hi!</TitleLg>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled TitleXl element', () => {
    render(<TitleXl>Hi!</TitleXl>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled DisplaySm element', () => {
    render(<DisplaySm>Hi!</DisplaySm>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled DisplayLg element', () => {
    render(<DisplayLg>Hi!</DisplayLg>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })

  it('renders a styled Monospace element', () => {
    render(<Monospace>Hi!</Monospace>)

    const text = screen.getByText('Hi!')
    expect(text).toBeInTheDocument()
  })
})
