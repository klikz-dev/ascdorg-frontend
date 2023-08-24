import React from 'react'
import HomeCtaBanner from '.'
import { homeBannerMock } from '../../../__mocks__/homeBannerMock'

export default {
  component: HomeCtaBanner,
  title: 'Components/Banners/HomeCtaBanner',
}
const Template = (args) => <HomeCtaBanner {...args} />

const imageContent = homeBannerMock[0].imageContent
const button1 = homeBannerMock[0].button1
const displayTitle = homeBannerMock[0].displayTitle

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Fields
export const Fields = Template.bind({})
Fields.args = {
  imageContent,
  button1,
  displayTitle,
}
Fields.storyName = 'With Fields'
