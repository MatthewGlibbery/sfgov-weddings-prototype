import {
  getServerSideTranslations,
  withServerSideTranslations
} from './translations'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext } from 'next'

jest.mock('next-i18next/serverSideTranslations')

describe('translation utilitities', () => {
  beforeEach(() => {
    ;(serverSideTranslations as jest.Mock).mockReset()
  })

  describe('getServerSideTranslations()', () => {
    it('calls serverSideTranslations()', async () => {
      const props = await getServerSideTranslations(stubContext())
      expect(serverSideTranslations).toHaveBeenCalled()
      expect(props).toEqual(expect.objectContaining({}))
    })
  })

  describe('withServerSideTranslations()', () => {
    it('calls the wrapped function and adds props from getServerSideTranslations()', async () => {
      const mockPropsResult = {
        props: { foo: 'bar' }
      }
      const makeProps = jest.fn().mockResolvedValue(mockPropsResult)
      const getServerSideProps = withServerSideTranslations(makeProps)
      const props = await getServerSideProps(stubContext())
      expect(makeProps).toHaveBeenCalled()
      expect(serverSideTranslations).toHaveBeenCalled()
      expect(props).toEqual(expect.objectContaining(mockPropsResult))
    })

    it.each([
      {
        notFound: true
      },
      {
        redirect: {}
      }
    ])('skips on 404s and redirects', async (propsResult) => {
      // if a page 404s or redirects, we shouldn't attempt to load translations
      // because there will be no props on the resulting object
      const makeProps = jest.fn().mockResolvedValue(propsResult)
      const getServerSideProps = withServerSideTranslations(makeProps)
      const props = await getServerSideProps(stubContext())
      expect(makeProps).toHaveBeenCalled()
      expect(serverSideTranslations).not.toHaveBeenCalled()
      expect(props).toEqual(propsResult)
    })
  })
})

function stubContext(): GetServerSidePropsContext {
  return {
    defaultLocale: 'en',
    query: {},
    params: {},
    req: {
      headers: {}
    }
  } as unknown as GetServerSidePropsContext
}
