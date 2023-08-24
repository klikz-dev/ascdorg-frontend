import React from 'react'
import ProfileHitComponent from '.'
import { profileHit } from '../../../__mocks__/searchPageComponentMock'

export default {
  component: ProfileHitComponent,
  title: 'Components/SearchPageComponents/ProfileHitComponent',
}

const Template = (args) => <ProfileHitComponent {...args} />

// With Book Hit
export const BookHit = Template.bind({})
BookHit.args = { hit: profileHit }
BookHit.storyName = 'With Book Hit'
