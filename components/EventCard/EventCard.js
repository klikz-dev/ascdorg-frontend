import { Card, CardContent, CardMedia, Box, Typography } from '@mui/material'
import { string } from 'prop-types'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'

export default function EventCard({
  testId = 'EventCard',
  image,
  alt,
  title,
  body,
  ctaLabel,
  ctaLink,
  ctaTarget,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
      }}
      data-testid={testId}
    >
      {image && (
        <CardMedia
          title={alt}
          sx={{
            minWidth: { xs: 295, md: 206 },
            height: { xs: 190, md: 190 },
            '& img': {
              objectFit: 'cover',
              borderRadius: '4px',
            },
          }}
          data-testid={`${testId}-image`}
        >
          <Box
            component='img'
            src={image}
            alt={alt}
            width='100%'
            height='190px'
          />
        </CardMedia>
      )}
      <CardContent
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Typography variant='h5' data-testid={`${testId}-title`}>
          {title}
        </Typography>
        <Typography variant='subtitle3' data-testid={`${testId}-body`}>
          {body}
        </Typography>
        {ctaLabel && (
          <Box mt={2} data-testid={`${testId}-link`}>
            <ViewAllCTA href={ctaLink} label={ctaLabel} target={ctaTarget} />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

EventCard.propTypes = {
  testId: string,
  image: string,
  alt: string,
  title: string,
  body: string,
  ctaLabel: string,
  ctaLink: string,
  ctaTarget: string,
}
