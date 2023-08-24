import React from 'react'
import ImageTile from './ImageTile'

export default {
  component: ImageTile,
  title: 'components/ImageTile',
}

const Template = (args) => <ImageTile {...args} />

const testId = 'jest'
const slug = '/'
const imageUrl = ''
const title = 'Test Title'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  slug,
  imageUrl,
  title,
}
ValidInput.storyName = 'With Valid Inputs'
