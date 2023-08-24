import { Box } from '@mui/material'
import { string, number, bool, arrayOf, shape, oneOfType } from 'prop-types'
import paths from '../../../paths/path'
import HorizontalCard from '../../HorizontalCard'

export default function HitComponent({
  testId = 'hit',
  hit: { keywords, profileType, slug, firstName, lastName, thumbnail },
}) {
  const expertises = `${keywords.join(', ')}`
  const body = `${profileType.join(', ')}\n${
    keywords.length ? `Areas of Expertise: ${expertises}` : ''
  }`
  return (
    <Box my={3} data-testid={testId}>
      <HorizontalCard
        key={slug}
        customTitleVariant='h4'
        customBodySx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'grey.medium',
          marginBottom: { sm: '12px', md: '20px' },
          '& h6': {
            marginRight: '8px',
            textTransform: 'uppercase',
          },
        }}
        title={`${firstName} ${lastName}`}
        image={thumbnail}
        body={body}
        ctaLink={paths.profile({ slug: slug })}
        reverse
        variant='author'
        learnMore={false}
        customSx={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        }}
      />
    </Box>
  )
}

HitComponent.propTypes = {
  testId: string,
  hit: oneOfType([
    /** profile */
    shape({
      type: string,
      url: string,
      slug: string,
      title: string,
      thumbnail: string,
      featured: bool,
      firstName: string,
      lastName: string,
      profileType: arrayOf(string),
      contentTypes: arrayOf(string),
      topics: arrayOf(string),
      keywords: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
  ]),
}
