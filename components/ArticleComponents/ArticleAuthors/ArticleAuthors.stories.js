import React from 'react'
import { authors } from '../../../__mocks__/articleAuthorMock'
import ArticleAuthors from './ArticleAuthors'

export default {
  component: ArticleAuthors,
  title: 'components/ArticleAuthors',
}

const Template = (args) => <ArticleAuthors {...args} />
const testId = 'jest'
const title = 'About the authors'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  authors,
}
ValidInput.storyName = 'With Valid Inputs'
