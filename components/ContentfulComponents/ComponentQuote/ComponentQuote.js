import { string, shape, arrayOf, number } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import HorizontalSection from '../../HorizontalSection'

/**
 * Component Quote from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentQuote = ({
  testId,
  description,
  thumbnail,
  expertise,
  name,
}) => {
  return (
    <HorizontalSection
      testId={testId}
      variant='quote'
      description={description}
      authorImage={contentfulImageTransformation(thumbnail)}
      authorTitle={name}
      authorSubtitle={expertise}
    />
  )
}

ComponentQuote.propTypes = {
  testId: string,
  name: string,
  description: string,
  expertise: string,
  thumbnail: shape({
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

export default ComponentQuote
