import { imageBannerItem } from '../../../__mocks__/imageBannerMock'
import ImageBanner from './ImageBanner'

export default {
  component: ImageBanner,
  title: 'components/Banners/ImageBanner',
}

const Template = (args) => <ImageBanner {...args} />

const body = imageBannerItem?.body
const image = imageBannerItem?.imageContent?.imageContentful?.url
const displayTitle = imageBannerItem?.displayTitle

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  image,
  displayTitle,
  body,
}
ValidInput.storyName = 'With Valid Inputs'
