import React from 'react'
import ArticleIssue from '.'
import { issue } from '../../../__mocks__/articleIssueMock'
export default {
  component: ArticleIssue,
  title: 'Components/ArticleIssue',
}

const Template = (args) => <ArticleIssue {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Issue
export const Issue = Template.bind({})
Issue.args = {
  title: 'Test',
  ...issue,
}
Issue.storyName = 'With Issue'
