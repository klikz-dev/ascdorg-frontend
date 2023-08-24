import React from 'react'
import ComponentRichText from '.'
import { componentRichTextItem } from '../../../__mocks__/componentRichTextMock'

export default {
  component: ComponentRichText,
  title: 'Components/ContentfulComponents/ComponentRichText',
}

const Template = (args) => <ComponentRichText {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...componentRichTextItem,
}
Item.storyName = 'With Item'
