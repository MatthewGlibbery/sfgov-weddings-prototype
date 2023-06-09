import type {
  ComponentProps,
  ComponentType,
  ElementType,
  ReactNode
} from 'react'

export type ClassProps = {
  className?: string
}

export type IntrinsicPropsWithoutClass<C extends ElementType> = Omit<
  ComponentProps<C>,
  'className'
>

export type LinkProps = JSX.IntrinsicElements['link']

export type FontWeightName = 'light' | 'normal' | 'bold' | 'semibold'
export type FixedFontWeightMap = Partial<Record<FontWeightName, number>>

// "8..144,300;8..144,400;8..144,700"
type OpticalWeights = Partial<Record<FontWeightName, [number[], number]>>

export type OpticalGoogleFont = {
  optical: true
  weights: OpticalWeights
}

export type GoogleFontOptions =
  | {
      optical: false
    }
  | OpticalGoogleFont

export type FontSpec = {
  name: string
  fallbacks: string[]
  weights: FixedFontWeightMap
  googleFont?: GoogleFontOptions
}

export type FontSpecProps = {
  fonts?: FontSpec[]
}

export type GlobalCSSProps = FontSpecProps

export type FIXMEChildrenProps = {
  children?: ReactNode
}

export type FIXMEAsableProps = {
  as?: ComponentType | ElementType
}

export type ChildrenProps = {
  children?: ReactNode
} & JSX.IntrinsicAttributes
