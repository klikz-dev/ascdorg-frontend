import { string, object } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import TwoColumnCTA from '../../TwoColumnCta'

/**
 * Profile Component from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const Profile = ({ testId, title, slug, thumbnail, shortBio }) => {
  return (
    <TwoColumnCTA
      testId={testId}
      label=''
      title={title}
      ctaItems={[
        {
          __typename: 'ButtonLinkComponent',
          linkUrl: paths.author({ slug: slug }),
          linkLabel: 'Read More',
        },
        {
          __typename: 'ButtonLinkComponent',
          linkUrl: paths.author({ slug: 'all' }),
          linkLabel: 'View all authors',
          buttonStyle: ['Text Link w/Arrow (Preset #2)'],
        },
      ]}
      description={shortBio}
      image={contentfulImageTransformation(thumbnail)}
      imagePos='left'
      descriptionLineNumbers={2}
    />
  )
}

Profile.propTypes = {
  testId: string,
  title: string,
  slug: string,
  thumbnail: object,
  shortBio: string,
}

export default Profile
