import React from 'react'
import MiniCartTile from './MiniCartTile'

export default {
  component: MiniCartTile,
  title: 'components/MiniCartTile',
}

const Template = (args) => <MiniCartTile {...args} />

const testId = 'jest'
const snipcart = {
  label: 'Add to Cart',
  dataItemId: '121031',
  dataItemName:
    'Better Learning Through Structured Teaching: A Framework for the Gradual Release of Responsibility, 3rd Edition (Print Book)',
  dataItemUrl:
    'better-learning-through-structured-teaching-a-framework-for-the-gradual-release-of-responsibility-3rd-edition',
  dataItemImage:
    'https://library.ascd.org/m/554dc22877e74fc/webimage-bookcover6x9-BetterLearningThroughStructuredTeaching3rdEdition-Fisher-Frey.jpg?q=90',
  dataItemPrice: 29.95,
  dataItemCustom1Value: '81100',
  dataItemCustom2Value: true,
  dataItemCustom3Value: ['Douglas Fisher', 'Nancy Frey'],
  dataItemCustom4Value: false,
}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  snipcart,
}
ValidInput.storyName = 'With Valid Inputs'
