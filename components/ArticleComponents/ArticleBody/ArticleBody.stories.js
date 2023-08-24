import React from 'react'
import ArticleBody from '.'

export default {
  component: ArticleBody,
  title: 'Components/ArticleBody',
}

const Template = (args) => <ArticleBody {...args}>{args.children}</ArticleBody>

const children = <p>THIS IS A TEST</p>

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Children
export const Children = Template.bind({})
Children.args = {
  children,
}
Children.storyName = 'With Children'
