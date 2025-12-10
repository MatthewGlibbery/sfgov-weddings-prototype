import type {
  CampaignPageData,
  TypeAccordionSectionBlock,
  TypeImageWithTextBlock,
  TypeResourcesSectionBlock,
  TypeVideoBlock,
  WagtailImageData
} from '@/types'
import type { ComponentType } from 'react'
import type { HTMLComponentMap } from '../wagtail'
import {
  classed,
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
import { useTranslation } from 'next-i18next'
import {
  Accordion,
  ContactFooter,
  ContentTileList,
  RICH_TEXT_DEFAULT_COMPONENTS,
  DownloadableFilesSection,
  Image,
  Location,
  PageLink,
  PageWrapper,
  PhoneNumberBlock,
  RelatedContentList,
  RichText,
  Spotlight,
  TileContentSection,
  TitleAndText,
  Video
} from '..'

export const CampaignPage: ComponentType<{ page: CampaignPageData }> = ({
  page
}) => {
  const {
    about_campaign: about,
    additional_content: additionalContent,
    background_header_image: headerImage,
    contact,
    fact_items: factItems,
    facts_title: factsTitle,
    logo,
    partner_agencies: agencies,
    primary_agency: primaryAgency,
    related_links: links,
    spotlight_1: spotlight1,
    spotlight_2: spotlight2,
    theme,
    title
  } = page

  const { t } = useTranslation()

  const themeBackground = {
    imageWithText: 'bg-primary50',
    accordion: '',
    video: 'bg-primary10'
  }
  const themeText = {
    imageWithTextHeading: 'text-primary600',
    imageWithTextBody: 'text-black',
    spotlight1: 'text-black'
  }
  const themeButton = {
    spotlight1: ''
  }
  switch (theme) {
    case 'black':
      themeBackground.imageWithText = 'bg-neutral800'
      themeBackground.video = 'bg-neutral10'
      themeText.spotlight1 = 'text-white'
      themeText.imageWithTextHeading = 'text-white'
      themeText.imageWithTextBody = 'text-white'
      themeButton.spotlight1 =
        'bg-primary100 text-primary700 hover:bg-primary200 hover:text-primary900 focus:bg-primary200 focus:border-primary200 focus:text-primary900'
      break
    // istanbul ignore next
    case 'green':
      themeBackground.imageWithText = 'bg-secondary50'
      themeBackground.accordion = 'bg-secondary10 border-secondary200'
      themeBackground.video = 'bg-secondary10'
      themeText.imageWithTextHeading = 'text-secondary800'
      break
    // istanbul ignore next
    case 'orange':
      themeBackground.imageWithText = 'bg-accent50'
      themeBackground.accordion = 'bg-accent10 border-accent200'
      themeBackground.video = 'bg-accent10'
      themeText.imageWithTextHeading = 'text-accent800'
      break
    // istanbul ignore next
    default:
      break
  }

  const richTextComponents: HTMLComponentMap = {
    h3: classed(
      RICH_TEXT_DEFAULT_COMPONENTS.h3,
      themeText.imageWithTextHeading
    ),
    h4: classed(
      RICH_TEXT_DEFAULT_COMPONENTS.h4,
      themeText.imageWithTextHeading
    ),
    a: (props) => (
      <Link
        as="a"
        className={theme === 'black' ? 'text-primary400' : 'text-primary600'}
        {...props}
      />
    )
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
              themeText.imageWithTextBody,
              'md:rounded-4 max-w-xl lg:mx-auto'
            )}
          >
            <div className="flex flex-col md:rounded-4 p-20 md:p-28 lg:p-40 gap-x-28 gap-y-20 max-w-xl lg:mx-auto">
              {content.value.image ? (
                <Image className="mb-16" imageRef={content.value.image} />
              ) : null}
              <TitleAndText
                title={content.value.title}
                heading={HeadingXXl}
                as="h2"
                headingClasses={themeText.imageWithTextHeading}
                text={content.value.description}
                richTextComponents={richTextComponents}
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
          <Container className="space-y-20 lg:space-y-40">
            <HeadingXXl as="h2">{content.value.title}</HeadingXXl>
            <div>{resourceSections}</div>
            {content.value?.downloadable_resources.length ? (
              <DownloadableFilesSection
                title={t('downloadable_files', {
                  defaultValue: 'Downloadable files'
                })}
                documents={content.value?.downloadable_resources}
                isTile={true}
              />
            ) : null}
          </Container>
        )
      }
      case 'accordion_section':
        return (
          <Container className="space-y-20">
            {content.value.title ? (
              <HeadingXXl as="h2">{content.value.title}</HeadingXXl>
            ) : null}
            {content.value.accordion_sidebar ? (
              <RichText html={content.value.accordion_sidebar} />
            ) : null}
            {content.value.accordion_items.map((item) => (
              <Accordion
                key={item.id}
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
          </Container>
        )
      case 'video':
        return (
          <div
            className={classes(
              themeBackground.video,
              'py-40 px-20 md:px-28 lg:px-40 mb-20 max-w-xl lg:mx-auto'
            )}
          >
            <Video {...content.value} />
          </div>
        )
    }
  }

  const LogoComponent = ({ logo }: { logo: WagtailImageData }) => (
    <Image
      className="max-w-[33%] md:max-w-1/4 object-contain mt-20 xl:mt-0"
      imageRef={logo}
    />
  )

  const label = t('campaign', { defaultValue: 'Campaign' })

  return (
    <PageWrapper title={title} meta={page.meta}>
      {headerImage ? (
        <div className="w-1/1 max-h-[200px] md:max-h-[300px] xl:max-h-[400px] absolute overflow-hidden z-0">
          <Image imageRef={headerImage} className="object-cover w-1/1" />
        </div>
      ) : null}
      <Container
        className={classes(
          'bg-white relative p-20 mx-0',
          headerImage ? 'top-[100px] xl:top-[250px]' : 'md:px-0'
        )}
      >
        <div className="hidden xl:flex xl:justify-between gap-28">
          <div>
            <PageTitleSection title={title} label={label} isHidden={true}>
              {primaryAgency ? <PageLink page={primaryAgency} /> : null}
            </PageTitleSection>
          </div>
          {logo ? <LogoComponent logo={logo} /> : null}
        </div>
        <div className="xl:hidden flex flex-col">
          <PageLabel label={label} isHidden={true} />
          {logo ? <LogoComponent logo={logo} /> : null}
          <DisplayXXXl as="h1" className="my-12 md:my-20">
            {title}
          </DisplayXXXl>
          {primaryAgency ? <PageLink page={primaryAgency} /> : null}
        </div>
      </Container>
      <div
        className={classes(
          'relative space-y-20 md:space-y-40 lg:space-y-60 mt-60',
          headerImage
            ? 'top-[100px] xl:top-[250px] mb-[150px] xl:mb-[300px]'
            : 'mb-20 md:mb-40 lg:mb-60'
        )}
      >
        {spotlight1.length ? (
          <div className="mb-20 max-w-xl lg:mx-auto">
            <Spotlight
              theme={theme}
              themeClasses={themeText.spotlight1}
              buttonClasses={themeButton.spotlight1}
              {...spotlight1[0]}
            />
          </div>
        ) : null}
        <Container className="mb-20">
          <HeadingXXl as="h2" className="!mb-20">
            {factsTitle}
          </HeadingXXl>
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
                        className="mb-20 aspect-[3/2] object-cover object-center"
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
        {additionalContent.map((content) => (
          <div key={content.id} className="mb-20 md:mb-40 lg:mb-60">
            {getAdditionalContentComponent(content)}
          </div>
        ))}
        {spotlight2.length ? (
          <div className="mb-20 max-w-xl lg:mx-auto">
            <Spotlight
              theme={theme}
              themeClasses={themeText.spotlight1}
              buttonClasses={themeButton.spotlight1}
              {...spotlight2[0]}
            />
          </div>
        ) : null}
        <Container className="flex flex-col gap-20 md:gap-40 lg:gap-60">
          {about ? (
            <div>
              <HeadingXXl as="h2" className="mb-[20px]">
                {t('about', { defaultValue: 'About' })}
              </HeadingXXl>
              <RichText html={about} />
            </div>
          ) : null}
          <RelatedContentList
            title={t('partner-agencies', { defaultValue: 'Partner agencies' })}
            content={agencies}
          />
          {links.length ? (
            <div>
              <HeadingXXl as="h2" className="mb-[20px]">
                {t('related', { defaultValue: 'Related' })}
              </HeadingXXl>
              {links
                .filter((link) => link?.value?.page?.live) // filter for published only
                .map((link) => {
                  return (
                    <div key={link.id}>
                      <Link
                        href={link.value.url || getPageURL(link.value.page)}
                      >
                        {link.value.link_text}
                      </Link>
                    </div>
                  )
                })}
            </div>
          ) : null}
          {contact?.length &&
          Object.values(contact[0].value).some((val) => val.length) ? (
            <div>
              <HeadingXXl as="h2" className="my-12 md:my-20">
                {t('contact-information', {
                  defaultValue: 'Contact information'
                })}
              </HeadingXXl>
              <ContactFooter items={contact[0]} />
            </div>
          ) : null}
        </Container>
      </div>
    </PageWrapper>
  )
}
