import React from 'react'
import ComponentBanner from '.'
import { bannerMock } from '../../../__mocks__/componentBannerMock'

export default {
  component: ComponentBanner,
  title: 'Components/ContentfulComponents/ComponentBanner',
}

const Template = (args) => <ComponentBanner {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...bannerMock,
}
Item.storyName = 'With Item'
