import React from 'react'
import IssueGrid from '.'
import { issues } from '../../__mocks__/issueGridMock'

export default {
  component: IssueGrid,
  title: 'Components/IssueGrid',
}

const Template = (args) => <IssueGrid {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Items
export const Item = Template.bind({})
Item.args = { issues }
Item.storyName = 'With Item'
