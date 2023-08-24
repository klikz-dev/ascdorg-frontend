import React from 'react'
import { customRefinementListItem } from '../../../__mocks__/searchPageComponentMock'
import RefinementList from './CustomRefinementList'

export default {
  component: RefinementList,
  title: 'Components/AlgoliaComponents/CustomCRefinementList',
}

const items = [customRefinementListItem]
const refine = () => null

const Template = (args) => <RefinementList {...args} />

export const Default = Template.bind({})
Default.args = {
  items,
  refine,
}
