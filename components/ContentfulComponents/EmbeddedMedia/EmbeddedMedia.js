import Head from 'next/head'
import { Box, Typography } from '@mui/material'
import { string } from 'prop-types'

export default function EmbeddedMedia({
  displayTitle,
  wistiaId,
  radio,
  testId = 'embedded-media',
}) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '4px solid',
        borderBottomColor: 'primary.light',
        backgroundColor: 'background.light',
      }}
      data-testid={testId}
    >
      {displayTitle && (
        <Box mb={6} data-testid={`${testId}-title`}>
          <Typography
            variant='h3'
            sx={{
              color: 'inherit',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              textAlign: 'center',
            }}
          >
            {displayTitle}
          </Typography>
        </Box>
      )}
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <Box
        className={`wistia_embed wistia_async_${wistiaId} seo=false`}
        sx={
          radio === 'Video'
            ? {
                height: { xs: '240px', sm: '425px', md: '460px' },
                width: '100%',
                backgroundColor: 'primary.main',
                alignItems: 'center',
              }
            : {
                position: 'relative',
                width: { xs: '100%', md: '90%' },
                height: { xs: '230px', md: '308px' },
                margin: { md: 'auto' },
              }
        }
      />
    </Box>
  )
}

EmbeddedMedia.propTypes = {
  testId: string,
  displayTitle: string,
  wistiaId: string,
  radio: string,
}
