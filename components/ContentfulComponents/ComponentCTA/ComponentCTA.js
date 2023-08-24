import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  string,
  shape,
  arrayOf,
  object,
  oneOfType,
  number,
  bool,
} from 'prop-types'
import { options } from '../../../const'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import TextCTA from '../../TextCta'

/**
 * Component Cta from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentCTA = ({
  testId,
  title,
  titleAlignment,
  ctaBody,
  bodyAlignment,
  ctaLink,
  backgroundColor,
  backgroundImage,
  roundedModule,
  ctaItems,
}) => {
  return (
    <TextCTA
      testId={testId}
      title={title}
      titleAlignment={titleAlignment}
      description={documentToReactComponents(ctaBody?.json, options())}
      descriptionAlignment={bodyAlignment}
      /** @deprecated please use ctaLinks with styling fields instead of 'button' */
      ctaLabel={ctaLink?.linkLabel || ctaLink?.label || null}
      ctaLink={ctaLink?.linkUrl || ctaLink?.url}
      ctaTarget={ctaLink?.linkTarget || null}
      button
      /** end of deprecated props */
      bgColor={backgroundColor || 'primary'}
      bgImage={contentfulImageTransformation(backgroundImage, true)}
      rounded={roundedModule}
      ctaLinks={ctaItems}
    />
  )
}

ComponentCTA.propTypes = {
  testId: string,
  title: string,
  titleAlignment: string,
  bodyAlignment: string,
  ctaBody: object,
  backgroundColor: string,
  roundedModule: bool,
  ctaLink: oneOfType([
    shape({
      label: string,
      url: string,
    }),
    shape({
      id: string,
      buttonStyle: arrayOf(string),
      linkUrl: string,
      linkLabel: string,
      linkTarget: string,
    }),
  ]),
  ctaItems: arrayOf(
    shape({
      id: string,
      buttonStyle: arrayOf(string),
      linkUrl: string,
      linkLabel: string,
      linkTarget: string,
    })
  ),
  backgroundImage: shape({
    alternate: string,
    title: string,
    imageBynder: arrayOf(
      shape({
        src: string,
        width: number,
        height: number,
        copyright: string,
      })
    ),
    imageContentful: shape({
      url: string,
      width: number,
      height: number,
    }),
  }),
}

export default ComponentCTA
