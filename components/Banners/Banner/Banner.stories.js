import React from 'react'
import Banner from '.'

export default {
  component: Banner,
  title: 'Components/Banners/Banner',
}

const Template = (args) => <Banner {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Fields
export const Fields = Template.bind({})
Fields.args = {
  title: 'Test1',
  subtitle: 'Test2',
  btn1Label: 'BtnTest1',
  btn1Url: '/',
  btn2Label: 'BtnTest2',
  btn2Url: '/',
}
Fields.storyName = 'With Fields'
