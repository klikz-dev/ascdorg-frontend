import { Container, Box, Grid, Typography } from '@mui/material'
import { string, oneOfType, element, arrayOf } from 'prop-types'
import CtaButton from '../../interactives/Buttons/CtaButton'

export default function HeroBanner({
  testId = 'hero-banner',
  title,
  description,
  ctaLabel1,
  ctaLink1,
  ctaTarget1,
  ctaLabel2,
  ctaLink2,
  ctaTarget2,
  image,
  imageAlt,
}) {
  return (
    <Box
      sx={{
        borderBottomLeftRadius: { xs: '64px', md: '180px' },
        width: '100%',
        pb: { xs: 7, md: 0 },
        height: { md: '506px' },
      }}
      data-testid={testId}
    >
      <Container
        maxWidth='lg'
        disableGutters={false}
        sx={{
          height: '100%',
          pt: { xs: 5, sm: 10, md: 0 },
          pl: { sm: 7 },
          pr: { sm: 7 },
        }}
      >
        <Grid
          container
          sx={{
            height: '100%',
          }}
        >
          <Grid item xs={12} md={6} justifyContent='flex-start'>
            <Box
              sx={{
                mt: { xs: '5px', md: '67px' },
                width: { xs: '100%', md: '427px' },
                pl: { xs: '8px', sm: 0 },
                pr: { xs: '8px', sm: 0 },
              }}
            >
              <Typography variant='h1' data-testid={`${testId}-title`}>
                {title}
              </Typography>
              <Box mt={2} mb={5}>
                <Typography
                  variant='subtitle1'
                  data-testid={`${testId}-description`}
                >
                  {description}
                </Typography>
              </Box>
              <Grid
                container
                spacing={1}
                sx={{
                  width: { xs: '100%', md: '80%' },
                }}
              >
                <Grid item xs={12} md={6}>
                  {ctaLabel1 && (
                    <CtaButton
                      testId={`${testId}-button-1`}
                      variant='contained'
                      color='primary'
                      label={ctaLabel1}
                      href={ctaLink1}
                      target={ctaTarget1}
                      fullWidth
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  {ctaLabel2 && (
                    <CtaButton
                      testId={`${testId}-button-2`}
                      variant='outlined'
                      color='primary'
                      label={ctaLabel2}
                      href={ctaLink2}
                      target={ctaTarget2}
                      fullWidth
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent='flex-end'>
            <Box
              sx={{
                bgcolor: 'primary.main',
                objectFit: 'cover',
                overflow: 'hidden',
                height: { xs: '375px', md: '500px' },
                maxHeight: { xs: '375px', md: '500px' },
                width: { xs: '100%', md: '500px' },
                alignSelf: 'center',
                borderRadius: { xs: '0 0 0 96px', md: '8px 8px 8px 96px' },
              }}
              mt={2}
            >
              {/** @todo: either convert to Next Image or find alternate solution */}
              {image && (
                <img
                  data-testid={`${testId}-image`}
                  src={image || '/images/ASCDImageFiller.png'}
                  alt={imageAlt}
                  style={{
                    width: '100%',
                    height: 'inherit',
                    objectFit: 'cover',
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

HeroBanner.propTypes = {
  testId: string,
  title: string,
  description: oneOfType([string, arrayOf(element)]),
  ctaLabel1: string,
  ctaLink1: string,
  ctaTarget1: string,
  ctaLabel2: string,
  ctaLink2: string,
  ctaTarget2: string,
  image: string,
  imageAlt: string,
}
