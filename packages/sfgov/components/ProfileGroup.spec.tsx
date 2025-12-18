import { ProfileGroupFactory, ProfilePageFactory } from '@/lib/factories'
import type { TypeProfileGroupBlock } from '@/types'
import { render, screen } from '@testing-library/react'
import { ProfileGroup } from './ProfileGroup'

describe('ProfileGroup', () => {
  let profileGroupData: TypeProfileGroupBlock

  beforeEach(() => {
    profileGroupData = ProfileGroupFactory.make()
  })
  it('renders a profile group', () => {
    render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )

    const title = screen.getByRole('heading', {
      level: 3
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(profileGroupData.value.title)
  })

  it('does not render a profile tile if there is no profile data', () => {
    profileGroupData.value.profiles[0].value = {
      profile_page: null,
      role: ''
    }
    render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
  })

  it('renders the image for the profile tile if it is defined', () => {
    const img = profileGroupData.value.profiles[0].value.profile_page?.image
    render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(screen.getByAltText(img!.alt_text)).toBeInTheDocument()
  })

  it('renders a default image with alt text of profile page title if no profile image', () => {
    const profilePage = ProfilePageFactory.make({ image: undefined })
    profileGroupData.value.profiles[0].value.profile_page = profilePage
    render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(screen.getByAltText(profilePage.title)).toBeInTheDocument()
  })

  it('renders the profile role', () => {
    const profileRole = profileGroupData.value.profiles[0].value.role
    render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(screen.getByText(profileRole)).toBeInTheDocument()
  })

  it('does not render the profile role if not present', () => {
    const profile = profileGroupData.value.profiles[0]
    const profilePage = profile.value.profile_page
    const profileGroupTitle = profileGroupData.value.title
    const profileTitle = profilePage?.title
    const profilePronouns = profilePage?.pronouns
    const primaryJobTitle = profilePage?.primary_job_title
    const primaryJobTitle2 = profilePage?.primary_job_title_line_2
    profile.value = {
      ...profile.value,
      role: ''
    }
    profileGroupData.value.profiles = [profile]
    const { container } = render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(container).toHaveTextContent(
      `${profileGroupTitle}${profileTitle}(${profilePronouns})${primaryJobTitle}${primaryJobTitle2}`
    )
  })

  it('renders the profile primary job title if present', () => {
    const primaryJobTitle =
      profileGroupData.value.profiles[0].value.profile_page?.primary_job_title
    render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(screen.getByText(primaryJobTitle!)).toBeInTheDocument()
  })

  it('does not render the profile primary job title if not present', () => {
    const profile = profileGroupData.value.profiles[0]
    const profilePage = profile.value.profile_page
    profilePage!.primary_job_title = ''
    profile.value.profile_page = profilePage
    const profileGroupTitle = profileGroupData.value.title
    const profileTitle = profilePage?.title
    const profilePronouns = profilePage?.pronouns
    const primaryJobTitle2 = profilePage?.primary_job_title_line_2
    profile.value = {
      ...profile.value,
      role: ''
    }
    profileGroupData.value.profiles = [profile]
    const { container } = render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(container).toHaveTextContent(
      `${profileGroupTitle}${profileTitle}(${profilePronouns})${primaryJobTitle2}`
    )
  })

  it('does not render the profile primary job title 2 if not present', () => {
    const profile = profileGroupData.value.profiles[0]
    const profilePage = profile.value.profile_page
    profilePage!.primary_job_title_line_2 = ''
    profile.value.profile_page = profilePage
    const profileGroupTitle = profileGroupData.value.title
    const profileTitle = profilePage?.title
    const profilePronouns = profilePage?.pronouns
    const primaryJobTitle = profilePage?.primary_job_title
    profile.value = {
      ...profile.value,
      role: ''
    }
    profileGroupData.value.profiles = [profile]
    const { container } = render(
      <ProfileGroup
        title={profileGroupData.value.title}
        profiles={profileGroupData.value.profiles}
      />
    )
    expect(container).toHaveTextContent(
      `${profileGroupTitle}${profileTitle}(${profilePronouns})${primaryJobTitle}`
    )
  })
})
