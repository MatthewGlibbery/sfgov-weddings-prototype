import { Container, DisplayXXXl, HeadingXXl, PageLabel } from '@/design-system'
import { getPageURL } from '@/lib/utils'
import {
  CampaignPageData,
  TypeAccordionSectionBlock,
  TypeImageWithTextBlock,
  TypeResourcesSectionBlock
} from '@/types'
import { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'
import { When, If } from 'react-if'
import { Accordion } from '../Accordion'
import { Image } from '../Image'
import { Location } from '../Location'
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
    spotlight_1: spotlight1,
    facts_title: factsTitle,
    fact_items: factItems,
    additional_content: additionalContent,
    spotlight_2: spotlight2,
    about_campaign: about,
    partner_agencies: agencies,
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
      case 'resources': {
        const resourceSections = content.value.resource_sections.map(
          (resourceSection) => {
            return (
              <ServicesAndResourcesSection
                key={resourceSection.id}
                title={resourceSection.value.resource_sections.title}
                tiles={resourceSection.value.resource_sections.resources}
              />
            )
          }
        )
        return (
          <div>
            <div>{content.value.title}</div>
            <div>{resourceSections}</div>
          </div>
        )
      }
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
        <PageLabel label={t('campaign', { defaultValue: 'Campaign' })} />
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
      <Container className="mb-80">
        <When condition={!!spotlight1.length}>
          <div className="p-20 lg:p-28 mb-80 bg-primary100">
            <Spotlight {...spotlight1[0]} />
          </div>
        </When>
        <HeadingXXl as="h2">{factsTitle}</HeadingXXl>
        <When condition={!!factItems.length}>
          <div className="flex gap-28">
            {factItems.map((item) => {
              const image = item.value.image
              const titleAndText = item.value.title_and_text
              return (
                <div key={item.id} className="w-1/3">
                  <When condition={image}>
                    <Image key={image?.id} imageRef={image} className="mb-20" />
                  </When>
                  <When condition={!!titleAndText}>
                    <TitleAndText
                      key={item.id}
                      title={titleAndText.title}
                      text={titleAndText.text}
                    />
                  </When>
                </div>
              )
            })}
          </div>
        </When>
        <When condition={!!spotlight2.length}>
          <div className="p-20 lg:p-28 mb-80 bg-primary700">
            <Spotlight {...spotlight2[0]} />
          </div>
        </When>
      </Container>
      <Container>
        {additionalContent.map((content) => (
          <div key={content.id} className="mb-80">
            {getAdditionalContentComponent(content)}
          </div>
        ))}
        <When condition={about}>
          <HeadingXXl as="h2">
            {t('about', { defaultValue: 'About' })}
          </HeadingXXl>
          <RichText html={about} />
        </When>
        <RelatedContentList
          title={t('agencies', { defaultValue: 'Agencies' })}
          content={agencies}
        />
        <When condition={!!links.length}>
          <Container>
            <HeadingXXl as="h2">
              {t('related', { defaultValue: 'Related' })}
            </HeadingXXl>
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
