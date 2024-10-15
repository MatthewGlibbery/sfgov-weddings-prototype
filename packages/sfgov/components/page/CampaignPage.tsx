import {
  classes,
  Container,
  DisplayXXXl,
  Grid,
  HeadingLg,
  HeadingXXl,
  Link,
  PageLabel,
  PageTitleSection
} from '@/design-system'
import { getPageURL } from '@/lib/utils'
import {
  CampaignPageData,
  TypeAccordionSectionBlock,
  TypeImageWithTextBlock,
  TypeResourcesSectionBlock,
  TypeVideoBlock,
  WagtailImageData
} from '@/types'
import { useTranslation } from 'next-i18next'
import { ComponentType } from 'react'
import { Accordion } from '../Accordion'
import { Image } from '../Image'
import { Location } from '../Location'
import { PhoneNumberBlock } from '../PhoneNumberBlock'
import { RelatedContentList } from '../RelatedContentList'
import { RichText } from '../RichText'
import { Spotlight } from '../Spotlight'
import { ContentTileList } from '../Tile'
import { TileContentSection } from '../TileContentSection'
import { TitleAndText } from '../TitleAndText'
import { Video } from '../Video'
import { PageWrapper } from './PageWrapper'

export const CampaignPage: ComponentType<{ page: CampaignPageData }> = ({
  page
}) => {
  const {
    title,
    logo,
    background_header_image: headerImage,
    theme,
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

  const themeBackground = {
    imageWithText: 'bg-primary700',
    accordion: '',
    video: 'bg-primary10'
  }
  const themeText = {
    spotlight1: 'text-primary800',
    spotlight2: 'text-white'
  }
  const themeButton = {
    spotlight1: '',
    spotlight2: 'bg-white text-primary600'
  }
  switch (theme) {
    case 'black':
      themeBackground.imageWithText = 'bg-neutral800'
      themeBackground.video = 'bg-neutral10'
      themeText.spotlight1 = 'text-white'
      themeText.spotlight2 = 'text-white'
      themeButton.spotlight1 = 'bg-white text-primary600'
      break
    // istanbul ignore next
    case 'green':
      themeBackground.imageWithText = 'bg-secondary600'
      themeBackground.accordion = 'bg-secondary10 border-secondary200'
      themeBackground.video = 'bg-secondary10'
      themeText.spotlight1 = 'text-secondary800'
      themeText.spotlight2 = 'text-white'
      break
    // istanbul ignore next
    case 'orange':
      themeBackground.imageWithText = 'bg-accent600'
      themeBackground.accordion = 'bg-accent10 border-accent200'
      themeBackground.video = 'bg-accent10'
      themeText.spotlight1 = 'text-accent800'
      themeText.spotlight2 = 'text-white'
      break
    // istanbul ignore next
    default:
      break
  }

  const getAdditionalContentComponent = (
    content:
      | TypeImageWithTextBlock
      | TypeResourcesSectionBlock
      | TypeAccordionSectionBlock
      | TypeVideoBlock
  ) => {
    switch (content.type) {
      case 'image_with_text':
        return (
          <div
            className={classes(
              themeBackground.imageWithText,
              'text-white py-28 md:rounded-4'
            )}
          >
            <div className="flex flex-col mx-20">
              {content.value.image ? (
                <Image className="mb-16" imageRef={content.value.image} />
              ) : null}
              <TitleAndText
                title={content.value.title}
                heading={HeadingXXl}
                as="h2"
                headingClasses="text-white"
                text={content.value.description}
              />
            </div>
          </div>
        )
      case 'resources': {
        const resourceSections = content.value.resource_sections.map(
          (resourceSection) => {
            const TileList = (
              <ContentTileList
                links={resourceSection.value.resource_sections.resources}
              />
            )
            return (
              <TileContentSection
                key={resourceSection.id}
                title={resourceSection.value.resource_sections.title}
                tileList={TileList}
              />
            )
          }
        )
        return (
          <div className="mx-20 md:mx-0">
            <HeadingXXl as="h2">{content.value.title}</HeadingXXl>
            <div>{resourceSections}</div>
          </div>
        )
      }
      case 'accordion_section':
        return (
          <div className="mx-20 md:mx-0 space-y-20">
            {content.value.title ? (
              <HeadingXXl as="h2">{content.value.title}</HeadingXXl>
            ) : null}
            {content.value.accordion_sidebar ? (
              <RichText html={content.value.accordion_sidebar} />
            ) : null}
            {content.value.accordion_items.map((item) => (
              <Accordion
                key={item.id}
                as="p"
                title={item.value.title}
                classes={themeBackground.accordion}
              >
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
      case 'video':
        return (
          <div
            className={classes(themeBackground.video, 'py-40 px-20 xl:px-40')}
          >
            <Video {...content.value} />
          </div>
        )
    }
  }

  const LogoComponent = ({ logo }: { logo: WagtailImageData }) => (
    <Image className="max-w-[33%] mt-20 xl:mt-0" imageRef={logo} />
  )

  const label = t('campaign', { defaultValue: 'Campaign' })

  return (
    <PageWrapper title={title}>
      {headerImage ? (
        <div className="w-1/1 max-h-[200px] md:max-h-[300px] xl:max-h-[400px] absolute overflow-hidden z-0">
          <Image
            imageRef={headerImage}
            className="object-cover w-1/1"
            alt={headerImage?.title}
          />
        </div>
      ) : null}
      <Container className="bg-white relative p-20 top-[100px] xl:top-[250px] mx-0 md:mx-16 lg:mx-auto">
        <div className="hidden xl:flex xl:justify-between">
          <div>
            <PageTitleSection title={title} label={label} />
          </div>
          {logo ? <LogoComponent logo={logo} /> : null}
        </div>
        <div className="xl:hidden flex flex-col">
          <PageLabel label={label} />
          {logo ? <LogoComponent logo={logo} /> : null}
          <DisplayXXXl as="h1" className="my-12 md:my-20">
            {title}
          </DisplayXXXl>
        </div>
      </Container>
      <div className="relative top-[100px] xl:top-[250px] mb-[200px] xl:mb-[400px] max-w-lg md:mx-16 lg:mx-auto">
        {spotlight1.length ? (
          <Spotlight
            theme={theme}
            themeClasses={themeText.spotlight1}
            buttonClasses={themeButton.spotlight1}
            {...spotlight1[0]}
          />
        ) : null}
        <Container className="mb-20">
          <HeadingXXl as="h2">{factsTitle}</HeadingXXl>
          {factItems.length ? (
            <Grid className="gap-28">
              {factItems.map((item) => {
                const image = item.value.image
                const titleAndText = item.value.title_and_text
                return (
                  <div
                    className="flex flex-col col-span-6 lg:col-span-4"
                    key={item.id}
                  >
                    {image ? (
                      <Image
                        key={image?.id}
                        imageRef={image}
                        className="mb-20"
                      />
                    ) : null}
                    {titleAndText ? (
                      <TitleAndText
                        key={item.id}
                        as="p"
                        heading={HeadingLg}
                        title={titleAndText.title}
                        text={titleAndText.text}
                      />
                    ) : null}
                  </div>
                )
              })}
            </Grid>
          ) : null}
        </Container>
        {spotlight2.length ? (
          <Spotlight
            theme={theme}
            secondary="true"
            themeClasses={themeText.spotlight2}
            buttonClasses={themeButton.spotlight2}
            {...spotlight2[0]}
          />
        ) : null}
        {additionalContent.map((content) => (
          <div key={content.id} className="mb-20 md:mb-40 lg:mb-60">
            {getAdditionalContentComponent(content)}
          </div>
        ))}
        <Container className="flex flex-col md:gap-40 lg:gap-60">
          {about ? (
            <div>
              <HeadingXXl as="h2" className="mb-[20px]">
                {t('about', { defaultValue: 'About' })}
              </HeadingXXl>
              <RichText html={about} />
            </div>
          ) : null}
          <RelatedContentList
            title={t('partner-agencies', { defaultValue: 'Partner Agencies' })}
            content={agencies}
          />
          {links.length ? (
            <div>
              <HeadingXXl as="h2" className="mb-[20px]">
                {t('related', { defaultValue: 'Related' })}
              </HeadingXXl>
              {links.map((link) => (
                <div key={link.id}>
                  <Link href={link.value.url || getPageURL(link.value.page)}>
                    {link.value.link_text}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </div>
    </PageWrapper>
  )
}
