import React from 'react'
import Image from '.'
import { imageItem } from '../../../__mocks__/imageMock'

export default {
  component: Image,
  title: 'Components/ContentfulComponents/Image',
}

const Template = (args) => <Image {...args} />

const item = imageItem

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  item,
}
Item.storyName = 'With Item'
