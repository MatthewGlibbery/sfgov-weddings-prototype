import { Container, DisplayXXXl, HeadingXXl } from '@/design-system'
import { getPageURL } from '@/lib/utils'
import {
  CampaignPageData,
  TypeAccordionSectionBlock,
  TypeImageWithTextBlock,
  TypeResourcesSectionBlock
} from '@/types'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { When } from 'react-if'
import { Accordion } from '../Accordion'
import { Image } from '../Image'
import { Location } from '../Location'
import { PageLabel } from '../PageLabel'
import { PhoneNumberBlock } from '../PhoneNumberBlock'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'
import { ServicesAndResourcesSection } from '../ServicesAndResourcesSection'
import { Spotlight } from '../Spotlight'
import { TitleAndText } from '../TitleAndText'
import { PageWrapper } from './PageWrapper'

export const CampaignPage: ComponentType<{ page: CampaignPageData }> = ({
  page
}) => {
  const {
    title,
    logo,
    // theme,
    header_spotlight: headerSpotlight,
    facts_title: factsTitle,
    fact_items: factItems,
    additional_content: additionalContent,
    spotlight,
    about_campaign: about,
    related_content_agencies: agencies,
    related_links: links
  } = page

  const { t } = useTranslation()

  const getAdditionalContentComponent = (
    content:
      | TypeImageWithTextBlock
      | TypeResourcesSectionBlock
      | TypeAccordionSectionBlock
  ) => {
    switch (content.type) {
      case 'image_with_text':
        return (
          <div className="border-2 border-grey300 rounded px-12 space-y-20">
            <When condition={!!content.value.image}>
              <Image imageRef={content.value.image} />
            </When>
            <TitleAndText
              title={content.value.title}
              text={content.value.description}
            />
          </div>
        )
      case 'resources':
        return (
          <ServicesAndResourcesSection
            title={content.value.title}
            tiles={content.value.resources}
          />
        )
      case 'accordion_section':
        return (
          <div className="space-y-20">
            <When condition={content.value.title}>
              <HeadingXXl as="h2">{content.value.title}</HeadingXXl>
            </When>
            <When condition={content.value.accordion_sidebar}>
              <RichText html={content.value.accordion_sidebar} />
            </When>
            {content.value.accordion_items.map((item) => (
              <Accordion key={item.id} title={item.value.title}>
                {item.value.body.map((content) => {
                  switch (content.type) {
                    case 'text':
                      return <RichText html={content.value} />
                    case 'address':
                      return <Location {...content.value} />
                    case 'phone_number':
                      return <PhoneNumberBlock {...content.value} />
                    default:
                      return <></>
                  }
                })}
              </Accordion>
            ))}
          </div>
        )
    }
  }
  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <PageLabel label={t('Campaign')} />
        <div className="flex flex-col xl:flex-row-reverse xl:justify-end">
          <When condition={!!logo}>
            {() => (
              <Image
                className="max-w-[50%] mt-20 xl:mt-0"
                imageRef={logo}
                alt={logo.title}
              />
            )}
          </When>
          <DisplayXXXl as="h1" className="my-12 md:my-20 xl:mr-28">
            {title}
          </DisplayXXXl>
        </div>
      </Container>
      <When condition={!!headerSpotlight.length}>
        <div className="md:mx-16 mb-80">
          <Spotlight {...headerSpotlight[0]} />
        </div>
      </When>
      <Container className="mb-80">
        <HeadingXXl as="h2">{factsTitle}</HeadingXXl>
        {factItems.map((item) =>
          item.type === 'title_and_text' ? (
            <TitleAndText
              key={item.id}
              title={item.value.title}
              text={item.value.text}
            />
          ) : (
            <Image key={item.id} imageRef={item.value} />
          )
        )}
      </Container>
      <When condition={!!spotlight.length}>
        <div className="md:mx-16 mb-80">
          <Spotlight {...spotlight[0]} />
        </div>
      </When>
      <Container>
        {additionalContent.map((content) => (
          <div key={content.id} className="mb-80">
            {getAdditionalContentComponent(content)}
          </div>
        ))}
        <When condition={about}>
          <HeadingXXl as="h2">{t('About')}</HeadingXXl>
          <RichText html={about} />
        </When>
        <RelatedContentList title={t('Agencies')} content={agencies} />
        <When condition={!!links.length}>
          <Container>
            <HeadingXXl as="h2">{t('Related')}</HeadingXXl>
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.value.url || getPageURL(link.value.page)}>
                    {link.value.link_text}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </When>
      </Container>
    </PageWrapper>
  )
}
