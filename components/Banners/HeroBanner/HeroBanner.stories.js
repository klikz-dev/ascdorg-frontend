import React from 'react'
import HeroBanner from '.'

export default {
  component: HeroBanner,
  title: 'Components/Banners/HeroBanner',
}

const Template = (args) => <HeroBanner {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Fields
export const Fields = Template.bind({})
Fields.args = {
  title: 'title',
  description: 'desc',
  ctaLabel1: 'button1',
  ctaLink1: '/',
  ctaTarget1: '_blank',
  ctaLabel2: 'button2',
  ctaLink2: '/',
  ctaTarget2: '_blank',
  image:
    'https://library.ascd.org/m/3f2b70f080e3ef9b/webimage-1000X1000_HeroBlock_AuthorWorkshop.jpg?q=90',
  imageAlt: 'alt',
}
Fields.storyName = 'With Fields'
