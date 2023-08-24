import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { string, object } from 'prop-types'
import { options } from '../../../const'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import TwoColumnCTAText from '../../TwoColumnCTAText'

/**
 * Component Two Column Cta Text from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentTwoColCTAText = ({
  testId = 'component-two-col-cta-text',
  titleOne,
  titleOneAlignment,
  titleTwo,
  titleTwoAlignment,
  bodyOne,
  bodyOneAlignment,
  bodyTwo,
  bodyTwoAlignment,
  ctaLinksOne,
  ctaLinksOneAlignment,
  ctaLinksTwo,
  ctaLinksTwoAlignment,
  backgroundColor,
  backgroundImage,
}) => {
  return (
    <TwoColumnCTAText
      testId={testId}
      titleOne={titleOne}
      titleOneAlignment={titleOneAlignment}
      titleTwo={titleTwo}
      titleTwoAlignment={titleTwoAlignment}
      bodyOne={documentToReactComponents(bodyOne?.json, options())}
      bodyOneAlignment={bodyOneAlignment}
      bodyTwo={documentToReactComponents(bodyTwo?.json, options())}
      bodyTwoAlignment={bodyTwoAlignment}
      ctaLinksOne={ctaLinksOne.items}
      ctaLinksOneAlignment={ctaLinksOneAlignment}
      ctaLinksTwo={ctaLinksTwo.items}
      ctaLinksTwoAlignment={ctaLinksTwoAlignment}
      backgroundColor={backgroundColor}
      backgroundImage={contentfulImageTransformation(backgroundImage, true)}
    />
  )
}

ComponentTwoColCTAText.propTypes = {
  testId: string,
  titleOne: string,
  titleOneAlignment: string,
  titleTwo: string,
  titleTwoAlignment: string,
  bodyOne: object,
  bodyOneAlignment: string,
  bodyTwo: object,
  bodyTwoAlignment: string,
  ctaLinksOne: object,
  ctaLinksOneAlignment: string,
  ctaLinksTwo: object,
  ctaLinksTwoAlignment: string,
  backgroundColor: string,
  backgroundImage: object,
}

export default ComponentTwoColCTAText
