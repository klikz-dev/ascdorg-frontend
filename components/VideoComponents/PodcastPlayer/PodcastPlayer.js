import Script from 'next/script'
import { Box, Typography } from '@mui/material'
import { string } from 'prop-types'
import ViewAllCTA from '../../interactives/Buttons/ViewAllCTA'

export default function PodcastPlayer({
  testId,
  sectionTitle,
  ctaLink,
  podcast,
}) {
  return (
    <Box data-testid={testId}>
      <Script src={`https://fast.wistia.com/embed/medias/${podcast}.jsonp`} />
      <Script src='https://fast.wistia.com/assets/external/E-v1.js' />
      {(sectionTitle || ctaLink) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h4'>{sectionTitle}</Typography>

          {ctaLink && <ViewAllCTA label='View all' href={ctaLink} lg />}
        </Box>
      )}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '4px',
          borderColor: 'primary.light',
          bgcolor: 'primary.main',
        }}
      >
        <Box
          className={`wistia_embed wistia_async_${podcast} seo=false`}
          data-testid={`${testId}-wistia`}
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '90%' },
            height: { xs: '230px', md: '308px' },
            margin: { md: 'auto,' },
          }}
        />
      </Box>
    </Box>
  )
}

PodcastPlayer.propTypes = {
  testId: string,
  sectionTitle: string,
  ctaLink: string,
  podcast: string,
}
