import React from 'react'
import CardGridContent from '.'
import { card, pageId } from '../../__mocks__/cardGridContentMock'
export default {
  component: CardGridContent,
  title: 'Components/CardGridContent',
}

const Template = (args) => <CardGridContent {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = { ...card, pageId, showAvatar: true, leftAlignment: false }
Item.storyName = 'With Item'

// Grid MD 3

export const GridMd3 = Template.bind({})
GridMd3.args = { ...Item.args, gridMd: 3 }
GridMd3.storyName = 'Grid md 3'
// Grid MD 4

export const GridMd4 = Template.bind({})
GridMd4.args = { ...Item.args, gridMd: 4 }
GridMd4.storyName = 'Grid md 4'

// Gird MD 6

export const GridMd6 = Template.bind({})
GridMd6.args = { ...Item.args, gridMd: 6 }
GridMd6.storyName = 'Grid md 6'
