import React from 'react'
import { refinementAttribute } from '../../../__mocks__/searchPageComponentMock'
import CurrentRefinements from './CustomCurrentRefinements'

export default {
  component: CurrentRefinements,
  title: 'Components/AlgoliaComponents/CustomCCurrentRefinements',
}

const items = [refinementAttribute]
const refine = () => null
const createURL = () => null

const Template = (args) => <CurrentRefinements {...args} />

export const Default = Template.bind({})
Default.args = {
  items,
  refine,
  createURL,
}
