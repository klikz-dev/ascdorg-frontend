import React from 'react'
import { ApolloProvider } from '@apollo/client'
import Header from '.'
import { client } from '../../../lib/apollo-client'

export default {
  component: Header,
  title: 'Components/Header',
}

const Template = (args) => (
  <ApolloProvider client={client}>
    <Header {...args} />
  </ApolloProvider>
)

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'
