import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { string, array, object } from 'prop-types'
import { options } from '../../../const'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import TwoColumnCTA from '../../TwoColumnCta'

/**
 * Component Two Column Cta from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentTwoColumnCta = ({
  testId,
  title,
  twoColCtaBody,
  imagePosition,
  image,
  backgroundColor,
  imageFrameStyle,
  ctaItems,
}) => {
  return (
    <TwoColumnCTA
      testId={testId}
      label=''
      title={title}
      description={documentToReactComponents(twoColCtaBody?.json, options())}
      imagePos={imagePosition}
      image={contentfulImageTransformation(image)}
      backgroundColor={backgroundColor}
      imageFrameStyle={imageFrameStyle}
      imageAlt={title}
      ctaItems={ctaItems}
    />
  )
}

ComponentTwoColumnCta.propTypes = {
  testId: string,
  title: string,
  twoColCtaBody: object,
  imagePosition: string,
  image: object,
  backgroundColor: string,
  imageFrameStyle: string,
  ctaItems: array,
}

export default ComponentTwoColumnCta
