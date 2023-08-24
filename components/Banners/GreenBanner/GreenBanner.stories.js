import React from 'react'
import { greenBannerArgs } from '../../../__mocks__/bannerMock'
import GreenBanner from './GreenBanner'
export default {
  component: GreenBanner,
  title: 'components/GreenBanner',
}

const Template = (args) => <GreenBanner {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  ...greenBannerArgs,
}
ValidInput.storyName = 'With Valid Inputs'
