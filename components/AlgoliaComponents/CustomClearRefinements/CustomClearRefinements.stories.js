import React from 'react'
import { clearRefinementAttribute } from '../../../__mocks__/searchPageComponentMock'
import ClearRefinements from './CustomClearRefinements'

export default {
  component: ClearRefinements,
  title: 'Components/AlgoliaComponents/CustomClearRefinements',
}

const items = [clearRefinementAttribute]
const refine = () => null

const Template = (args) => <ClearRefinements {...args} />

export const Default = Template.bind({})
Default.args = {
  items,
  refine,
}
