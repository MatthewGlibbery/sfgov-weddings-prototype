import Head from 'next/head'
import { ComponentProps } from 'react'

type HeadProps = ComponentProps<typeof Head>

export default jest.fn(({ children }: HeadProps) => children)
