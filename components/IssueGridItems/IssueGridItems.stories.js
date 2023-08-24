import React from 'react'
import IssueGridItems from '.'
import { issues } from '../../__mocks__/issueGridMock'

export default {
  component: IssueGridItems,
  title: 'Components/IssueGridItems',
}

const Template = (args) => <IssueGridItems {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Items
export const Item = Template.bind({})
Item.args = { issues, year: '2021', topic: '' }
Item.storyName = 'With Item'
