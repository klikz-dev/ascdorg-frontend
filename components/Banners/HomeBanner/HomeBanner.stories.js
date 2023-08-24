import React from 'react'
import HomeBanner from '.'
import { homeBannerMock } from '../../../__mocks__/homeBannerMock'

export default {
  component: HomeBanner,
  title: 'Components/Banners/HomeBanner',
}
const Template = (args) => <HomeBanner {...args} />

const displayTitle = homeBannerMock[0].displayTitle
const button1 = homeBannerMock[0].button1
const button2 = homeBannerMock[0].button2
const imageContent = homeBannerMock[0].imageContent
const bodyText = homeBannerMock[0].bodyText.json
const items = homeBannerMock.slice(1, 4)

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Fields
export const Fields = Template.bind({})
Fields.args = {
  displayTitle,
  button1,
  button2,
  imageContent,
  bodyText,
  items,
}
Fields.storyName = 'With Fields'
