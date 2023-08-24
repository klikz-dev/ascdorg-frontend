import { Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { string, shape, arrayOf, oneOfType } from 'prop-types'

export default function HomeCtaBanner({
  testId = 'homeCtaBanner',
  imageContent,
  button1,
  displayTitle,
}) {
  return (
    <Card
      data-testid={testId}
      sx={{
        borderRadius: 0,
        height: '179px',
        '&:hover': {
          cursor: 'pointer',
        },
        width: '100%',
      }}
      elevation={0}
    >
      <CardActionArea
        sx={{
          height: '100%',
          width: '100%',
          '&:hover': { textDecoration: 'none' },
        }}
        href={button1?.mainButtonLinkUrl}
      >
        <CardMedia
          component='image'
          image={imageContent?.imageBynder?.[0]?.src}
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            px: 5,
          }}
          data-testid={`${testId}-image`}
        >
          <Typography
            sx={{
              width: '50%',
              fontSize: '1rem',
              fontWeight: '700',
              lineHeight: 1.625,
              letterSpacing: '.02px',
              textAlign: 'left',
            }}
            data-testid={`${testId}-displayTitle`}
          >
            {displayTitle}
          </Typography>
        </CardMedia>
      </CardActionArea>
    </Card>
  )
}

HomeCtaBanner.propTypes = {
  testId: string,
  displayTitle: string,
  imageContent: shape({
    imageBynder: arrayOf(
      shape({
        src: string,
      })
    ),
  }),
  button1: oneOfType([
    shape({
      mainButtonLinkUrl: string,
    }),
  ]),
}
