import { Box, Typography } from '@mui/material'
import { string, object } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import NextImageWrapper from '../../images/NextImageWrapper'
import CtaButton from '../../interactives/Buttons/CtaButton'

export default function ArticleIssue({
  testId = 'article-issue',
  thumbnail,
  title,
  slug,
}) {
  return (
    <Box width={185} data-testid={testId}>
      <Typography variant='h5'>From our issue</Typography>
      <Box my={1.5}>
        <NextImageWrapper
          testId={`${testId}-article-issue-image`}
          src={contentfulImageTransformation(thumbnail)}
          alt={thumbnail?.alternate}
          width={185}
          height={240}
          paddingTop={0}
        />
      </Box>
      <Typography variant='caption' data-testid={`${testId}-title`}>
        {title}
      </Typography>
      <Box mt={2}>
        <CtaButton
          testId={`${testId}-button`}
          variant='contained'
          color='primary'
          fullWidth
          height='49'
          label='Go To Publication'
          href={paths.el({ slug: slug })}
        />
      </Box>
    </Box>
  )
}

ArticleIssue.proptypes = {
  testId: string,
  issue: object,
}
