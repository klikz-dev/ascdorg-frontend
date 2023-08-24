import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography,
} from '@mui/material'
import CustomBlock from '../../const/CustomBlocks'

export default function TwoColumnCTAText({
  testId = 'two-column-cta-text',
  titleOne,
  titleOneAlignment,
  bodyOne,
  bodyOneAlignment,
  titleTwo,
  titleTwoAlignment,
  bodyTwo,
  bodyTwoAlignment,
  ctaLinksOne,
  ctaLinksOneAlignment,
  ctaLinksTwo,
  ctaLinksTwoAlignment,
  backgroundColor,
  backgroundImage,
}) {
  const moduleBGColor = () => {
    switch (backgroundColor) {
      case 'dark_green':
        return 'primary.main'
      case 'light_grey':
        return 'background.lightGrey'
      case 'light_green':
        return 'background.lightGreen'
      case 'light_pink':
        return 'background.lightPink'
      case 'default':
      default:
        return 'background.light'
    }
  }

  /** instead of a y/n boolean, alignment is controlled by text */
  const contentAlignment = (content) => {
    switch (content) {
      case 'left':
        return 'flex-start'
      case 'right':
        return 'flex-end'
      case 'center':
      default:
        return 'center'
    }
  }

  return (
    <Box
      data-testid={testId}
      sx={{
        width: '100%',
        bgcolor: moduleBGColor(),
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      py={4}
      px={[1, 0]}
    >
      <Container maxWidth={false}>
        <Grid container sx={{ justifyContent: 'space-around' }}>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', sm: '45%' },
              mt: { xs: 1, md: 6 },
              mb: { xs: 1, md: 6 },
              pt: { xs: 1, md: 0 },
              pb: { xs: 6, md: 0 },
              borderBottom: {
                xs: `1px solid ${
                  ['dark_green'].includes(backgroundColor)
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.2)'
                }`,
                sm: 'none',
              },
            }}
            container
            alignItems='center'
          >
            {titleOne && (
              <Box
                mb={2}
                sx={{
                  alignSelf: contentAlignment(titleOneAlignment),
                }}
                data-testid={`${testId}-title-one-align`}
              >
                <Typography
                  variant='h2'
                  color={
                    ['dark_green'].includes(backgroundColor) ? 'white' : 'black'
                  }
                  data-testid={`${testId}-title-one`}
                >
                  {titleOne}
                </Typography>
              </Box>
            )}
            {bodyOne && (
              <Box
                sx={{
                  alignSelf: contentAlignment(bodyOneAlignment),
                }}
                data-testid={`${testId}-body-one-align`}
              >
                <Typography
                  variant='subtitle1'
                  color={
                    ['dark_green'].includes(backgroundColor) ? 'white' : 'black'
                  }
                  sx={{
                    'div > p > a': {
                      color: ['dark_green'].includes(backgroundColor)
                        ? 'white'
                        : 'primary',
                    },
                  }}
                  data-testid={`${testId}-body-one`}
                >
                  {bodyOne}
                </Typography>
              </Box>
            )}
            {!!ctaLinksOne?.length && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignSelf: contentAlignment(ctaLinksOneAlignment),
                  alignItems: contentAlignment(ctaLinksOneAlignment),
                  textAlign: 'center',
                }}
                data-testid={`${testId}-cta-links-one`}
              >
                {ctaLinksOne.map((ctaLink, i) => (
                  <Box
                    key={i}
                    pt={3}
                    sx={{
                      width: 'auto',
                      paddingRight: { md: 3 },
                      '& a': {
                        justifyContent: 'center !important',
                      },
                      '& button': {
                        width: '100%',
                      },
                    }}
                    pr={[0, 2]}
                    data-testid={`${testId}-cta-link-one`}
                  >
                    <CustomBlock
                      item={ctaLink}
                      color={
                        ['dark_green'].includes(backgroundColor)
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={false} sm={1} container justifyContent='center'>
            <Hidden only='xs'>
              <Divider
                orientation='vertical'
                flexItem
                sx={{ minHeight: '150px', height: '100%' }}
                color={
                  ['dark_green'].includes(backgroundColor) ? 'white' : 'initial'
                }
              />
            </Hidden>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', sm: '45%' },
              mt: { xs: 1, md: 6 },
              mb: { xs: 1, md: 6 },
              pt: { xs: 1, md: 0 },
              pb: { xs: 1, md: 0 },
            }}
            container
            alignItems='center'
          >
            {titleTwo && (
              <Box
                mb={2}
                sx={{
                  alignSelf: contentAlignment(titleTwoAlignment),
                }}
                data-testid={`${testId}-title-two-align`}
              >
                <Typography
                  variant='h2'
                  color={
                    ['dark_green'].includes(backgroundColor) ? 'white' : 'black'
                  }
                  data-testid={`${testId}-title-two`}
                >
                  {titleTwo}
                </Typography>
              </Box>
            )}
            {bodyTwo && (
              <Box
                sx={{
                  alignSelf: contentAlignment(bodyTwoAlignment),
                }}
                data-testid={`${testId}-body-two-align`}
              >
                <Typography
                  variant='subtitle1'
                  color={
                    ['dark_green'].includes(backgroundColor) ? 'white' : 'black'
                  }
                  sx={{
                    'div > p > a': {
                      color: ['dark_green'].includes(backgroundColor)
                        ? 'white'
                        : 'primary.main',
                    },
                  }}
                  data-testid={`${testId}-body-two`}
                >
                  {bodyTwo}
                </Typography>
              </Box>
            )}
            {!!ctaLinksTwo?.length && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignSelf: contentAlignment(ctaLinksTwoAlignment),
                  alignItems: contentAlignment(ctaLinksTwoAlignment),
                  textAlign: 'center',
                }}
                data-testid={`${testId}-cta-links-two`}
              >
                {ctaLinksTwo.map((ctaLink, i) => (
                  <Box
                    key={i}
                    pt={3}
                    sx={{
                      width: 'auto',
                      paddingRight: { md: 3 },
                      '& a': {
                        justifyContent: 'center !important',
                      },
                      '& button': {
                        width: '100%',
                      },
                    }}
                    pr={[0, 2]}
                    data-testid={`${testId}-cta-link-two`}
                  >
                    <CustomBlock
                      item={ctaLink}
                      color={
                        ['dark_green'].includes(backgroundColor)
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
