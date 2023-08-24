import React from 'react'
import TwoColumnCTAText from '.'
import {
  titleOne,
  bodyOne,
  titleTwo,
  bodyTwo,
  ctaLinks,
  backgroundImage,
} from './TwoColumnCtaMockData'

export default {
  component: TwoColumnCTAText,
  title: 'Components/TwoColumnCTAText',
}

const Template = (args) => <TwoColumnCTAText {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Titles, Bodies, Links
export const Info = Template.bind({})
Info.args = {
  titleOne,
  bodyOne,
  titleTwo,
  bodyTwo,
  ctaLinksOne: ctaLinks,
  ctaLinksTwo: ctaLinks,
}
Info.storyName = 'With Titles, Bodies, Links'

// Alignment Left
export const Left = Template.bind({})
Left.args = {
  ...Info.args,
  titleOneAlignment: 'left',
  bodyOneAlignment: 'left',
  titleTwoAlignment: 'left',
  bodyTwoAlignment: 'left',
  ctaLinksOneAlignment: 'left',
  ctaLinksTwoAlignment: 'left',
}
Left.storyName = 'Alignment Left'

// Alignment Right
export const Right = Template.bind({})
Right.args = {
  ...Info.args,
  titleOneAlignment: 'right',
  bodyOneAlignment: 'right',
  titleTwoAlignment: 'right',
  bodyTwoAlignment: 'right',
  ctaLinksOneAlignment: 'right',
  ctaLinksTwoAlignment: 'right',
}
Right.storyName = 'Alignment Right'

// dark green background
export const DarkGreen = Template.bind({})
DarkGreen.args = {
  ...Info.args,
  backgroundColor: 'dark_green',
}
DarkGreen.storyName = 'Dark Green'

// light green background
export const LightGreen = Template.bind({})
LightGreen.args = {
  ...Info.args,
  backgroundColor: 'light_green',
}
LightGreen.storyName = 'Light Green'

// light grey background
export const LightGrey = Template.bind({})
LightGrey.args = {
  ...Info.args,
  backgroundColor: 'light_grey',
}
LightGrey.storyName = 'Light Grey'

// light pink background
export const LightPink = Template.bind({})
LightPink.args = {
  ...Info.args,
  backgroundColor: 'light_pink',
}
LightPink.storyName = 'Light Pink'

// with background image (and dark green background)
export const WithImage = Template.bind({})
WithImage.args = {
  ...Info.args,
  backgroundImage,
  backgroundColor: 'dark_green',
}
WithImage.storyName = 'With Background image (and dark green color for text)'
