import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Container, Box, Grid, Button, Typography } from '@mui/material'
import { string, object, func, bool } from 'prop-types'
import ReactMarkdown from 'react-markdown'
import BannerMessage from '../../Banners/BannerMessage'
import CtaItem from '../../CtaItem'

export default function ValuePropositionCta({
  title,
  ctaTagline,
  ctaValuePropositionItems,
  ctaAdditionalInfo,
  isHeader = false,
  toggleVideoBanner,
  testId = 'jumbo-tron',
}) {
  return (
    <Box data-testid={testId}>
      <Box
        sx={{
          bgcolor: 'common.white',
          borderBottomLeftRadius: {
            xs: '64px',
            md: '180px',
          },
          height: {
            md: '556px',
          },
          width: '100%',
          pb: {
            xs: 7,
            md: 0,
          },
        }}
      >
        <Container
          maxWidth='lg'
          disableGutters={isHeader ? false : true}
          sx={
            isHeader
              ? {
                  height: '100%',
                  pt: { xs: 5, sm: 10, md: 0 },
                  pl: { sm: 7 },
                  pr: { sm: 7 },
                }
              : undefined
          }
        >
          <Grid
            container
            sx={{
              height: '100%',
            }}
          >
            <Grid item xs={12} md={6} container justifyContent='flex-start'>
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
                <Box mt={2} mb={5} data-testid={`${testId}-ctaTagLine`}>
                  <Typography variant='subtitle1'>{ctaTagline}</Typography>
                </Box>
                {isHeader && (
                  <Box mt={2} mb={5} data-testid={`${testId}-isHeader`}>
                    <Button
                      variant='contained'
                      color='primary'
                      label='Primary Button'
                      onClick={() => toggleVideoBanner()}
                      startIcon={<PlayCircleOutlineIcon />}
                    >
                      View our video
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} container justifyContent='flex-end'>
              <Box
                sx={{
                  mt: { xs: 0, md: '60px' },
                  width: { xs: '100%', md: '470px' },
                  pl: { xs: '8px', sm: 0 },
                  pr: { xs: '8px', sm: 0 },
                }}
              >
                <Grid
                  container
                  spacing={5}
                  data-testid={`${testId}-valueproposition`}
                >
                  {ctaValuePropositionItems &&
                    ctaValuePropositionItems?.items?.map(
                      (
                        { icon, itemTagline, itemDescription, itemCtaUrl },
                        index
                      ) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <CtaItem
                            icon={icon}
                            tagline={itemTagline}
                            subtagline={itemDescription}
                            url={itemCtaUrl}
                          />
                        </Grid>
                      )
                    )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {isHeader && (
        <Box
          display='flex'
          justifyContent='center'
          sx={{
            mt: { xs: 3, md: '-22px' },
          }}
        >
          <Box
            sx={{
              width: { xs: '80%', md: '70%', lg: '50%' },
              '& a': {
                textDecoration: 'underline',
              },
            }}
          >
            <BannerMessage>
              <ReactMarkdown>{ctaAdditionalInfo}</ReactMarkdown>
            </BannerMessage>
          </Box>
        </Box>
      )}
    </Box>
  )
}

ValuePropositionCta.propTypes = {
  title: string,
  ctaTagline: string,
  ctaValuePropositionItems: object,
  ctaAdditionalInfo: string,
  cta1: object,
  cta2: object,
  isHeader: bool,
  toggleVideoBanner: func,
  testId: string,
}
