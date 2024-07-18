/* eslint-disable camelcase */
import {
  Roboto_Flex,
  Roboto_Slab,
  Roboto_Mono
  // Noto_Sans_TC
} from 'next/font/google'

export const SansFont = Roboto_Flex({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  fallback: ['ui-sans-serif', 'sans-serif'],
  variable: '--font-sans'
})

export const SlabFont = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['ui-serif', 'serif'],
  variable: '--font-slab'
})

export const MonoFont = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
  fallback: ['ui-monospace', 'monospace'],
  variable: '--font-mono'
})

/*
export const ChineseFont = Noto_Sans_TC({
  preload: false,
  weight: ['300', '400', '500'],
  fallback: ['ui-sans-serif', 'sans-serif'],
  variable: '--font-chinese'
})
*/

export const ALL_FONTS = [
  SansFont,
  SlabFont,
  MonoFont
  // ChineseFont
]
