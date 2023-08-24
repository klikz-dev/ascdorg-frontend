import React from 'react'
import HeroArticle from './HeroArticle'

export default {
  component: HeroArticle,
  title: 'components/HeroArticle',
}

const Template = (args) => <HeroArticle {...args} />
const article = {
  date: '2022-01-28T00:00-05:00',
  authors: [
    {
      thumbnail: {
        imageBynder:
          'https://library.ascd.org/m/e372b6d6a2a8299/webimage-Nell_Duke.jpg',
      },
      slug: 'nell-k.-duke',
      title: 'Nell K. Duke',
    },
  ],
  title:
    'What Wordle Reminds Us About Effective Phonics and Spelling Instruction',
  contentType: 'blog',
  slug: 'what-wordle-reminds-us-about-effective-phonics-and-spelling-instruction',
}

const minuteRead = () => {
  return 25
}

const testId = 'jest'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  ...article,
  minuteRead,
}
ValidInput.storyName = 'With Valid Inputs'
