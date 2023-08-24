import React from 'react'
import EmbedHtmlComponent from '.'
import { componentHtmlHsForm } from '../../../__mocks__/componentHtmlMock'
import { componentHtmlYoutube } from '../../../__mocks__/componentHtmlMock'

export default {
  component: EmbedHtmlComponent,
  title: 'Components/ContentfulComponents/EmbedHtmlComponent',
}

const Template = (args) => <EmbedHtmlComponent {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Full-width HTML bottom with youtube video
export const FullWidthHtmlBottomYoutubeInput = Template.bind({})
FullWidthHtmlBottomYoutubeInput.args = {
  testId: 'html-component',
  ...componentHtmlYoutube,
}
FullWidthHtmlBottomYoutubeInput.storyName =
  'Full-width HTML bottom with youtube video'

// Full-width HTML bottom with youtube video
export const TwoColumnHtmlLeftYoutubeInput = Template.bind({})
TwoColumnHtmlLeftYoutubeInput.args = {
  testId: 'html-component',
  ...componentHtmlYoutube,
  displayFormat: '2-column HTML left',
}
TwoColumnHtmlLeftYoutubeInput.storyName =
  '2-column HTML left with youtube video'

// Full-width HTML bottom with hubspot form
export const FullWidthHtmlBottomHsFormInput = Template.bind({})
FullWidthHtmlBottomHsFormInput.args = {
  testId: 'html-component',
  ...componentHtmlHsForm,
}
FullWidthHtmlBottomHsFormInput.storyName =
  'Full-width HTML bottom with hubspot form'

// Full-width HTML bottom with youtube video
export const TwoColumnHtmlLeftHsFormInput = Template.bind({})
TwoColumnHtmlLeftHsFormInput.args = {
  testId: 'html-component',
  ...componentHtmlHsForm,
  displayFormat: '2-column HTML left',
}
TwoColumnHtmlLeftHsFormInput.storyName = '2-column HTML left with hubspot form'
