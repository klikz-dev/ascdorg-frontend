import { Box, Typography } from '@mui/material'
import { string } from 'prop-types'
import CtaButton from '../../interactives/Buttons/CtaButton'

export default function MediaBanner({
  testId = ' MediaBanner',
  title,
  subtitle,
}) {
  return (
    <Box display='flex' justifyContent='center' data-testid={testId}>
      <Box
        mt={[6, 10]}
        px={[3, 'auto']}
        display='flex'
        flexDirection='column'
        alignItems='center'
        maxWidth='650px'
        textAlign='center'
      >
        <Typography component='h1' variant='h1' data-testid={`${testId}-title`}>
          {title}
        </Typography>
        <Box mt={5} textAlign='center' data-testid={`${testId}-subTitle`}>
          <Typography variant='subtitle1'>{subtitle}</Typography>
          <Box
            mt={2}
            sx={{
              width: { xs: '100%', md: 'auto' },
              pr: { md: 3 },
              '& a': {
                justifyContent: 'center !important',
              },
              '& button': {
                width: '100%',
              },
            }}
          >
            <CtaButton
              variant='outlined'
              color='primary'
              width='100%'
              size='large'
              label='Upcoming webinars'
              href='/events#upcoming-events'
              align='center'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

MediaBanner.propTypes = {
  testId: string,
  title: string,
  subtitle: string,
}
