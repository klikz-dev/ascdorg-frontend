import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { string, object, shape } from 'prop-types'
import { mainHeaderOptions } from '../../../const/options'
import { breakpoints } from '../../../styles/mui/defaultTheme'

export default function ImageBanner({
  image,
  displayTitle,
  body,
  testId = 'image-banner',
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        px: 5,
        py: 2,
      }}
      data-testid={testId}
    >
      {image && (
        <Box
          component='img'
          src={image || '/images/image404.png'}
          alt='premium resources logo'
          sx={{
            width: { xs: '175px', md: '191px' },
            height: { md: '140px' },
          }}
          data-testid={`${testId}-image`}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            textAlign: { xs: 'center' },
            [breakpoints.up('md')]: {
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              textAlign: 'left',
            },
          }}
          data-testid={`${testId}-displayTitle`}
        >
          {displayTitle}
        </Typography>
        <Typography
          data-testid={`${testId}-body`}
          sx={{
            fontSize: '1.125rem',
            lineHeight: '1.5rem',
            textAlign: { xs: 'center', md: 'left' },
            display: 'flex',
            flexDirection: 'column',
            gap: body?.links ? 1 : 0,
          }}
        >
          {documentToReactComponents(
            body?.json,
            mainHeaderOptions(body?.links)
          )}
        </Typography>
      </Box>
    </Box>
  )
}

ImageBanner.propTypes = {
  image: string,
  displayTitle: string,
  testId: string,
  body: shape({
    json: object,
  }),
}
