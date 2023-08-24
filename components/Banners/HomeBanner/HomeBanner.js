import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Grid, Typography } from '@mui/material'
import { string, shape, arrayOf, oneOfType, object, array } from 'prop-types'
import { options } from '../../../const'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import { moduleBGColor } from '../../../lib/utils'
import CtaButton from '../../interactives/Buttons/CtaButton'
import ViewAllCTA from '../../interactives/Buttons/ViewAllCTA'
import HomeCtaBanner from '../HomeCtaBanner/HomeCtaBanner'

export default function HomeBanner({
  testId = 'home-banner',
  displayTitle,
  button1,
  button2,
  imageContent,
  bodyText,
  items,
  backgroundColor,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
      data-testid={testId}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: 0,
          backgroundImage: {
            md: `url(${contentfulImageTransformation(imageContent)})`,
            sm: `url(${contentfulImageTransformation(imageContent)})`,
          },
          backgroundColor: {
            xs: moduleBGColor(backgroundColor),
            sm: moduleBGColor(backgroundColor),
          },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '395px',
          px: { xs: 3, sm: 4, md: 5 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ width: { xs: '80%', sm: '60%', md: '50%' } }}>
            <Typography
              variant='h2'
              data-testid={`${testId}-displayTitle`}
              sx={{ fontSize: '2.5rem', lineHeight: '3.125rem' }}
            >
              {displayTitle}
            </Typography>
            <Typography variant='subtitle1' data-testid={`${testId}-body`}>
              {documentToReactComponents(bodyText, options())}
            </Typography>
          </Box>
          {(button1 || button2) && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '0',
                gap: 2,
              }}
            >
              {button1 && (
                <Box data-testid={`${testId}-button1`}>
                  <CtaButton
                    testId={`${testId}-button-1`}
                    variant='outlinedPrimary'
                    label={button1?.mainButtonLinkLabel}
                    href={button1?.mainButtonLinkUrl}
                    target={button1?.mainButtonLinkTarget}
                    id={button1?.mainButtonId}
                  />
                </Box>
              )}
              {button2 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  data-testid={`${testId}-button2`}
                >
                  <ViewAllCTA
                    testId={`${testId}-button-2`}
                    label={button2?.linkLabel}
                    href={button2?.linkUrl}
                    target={button2?.linkTarget}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        data-testid={`${testId}-grid`}
      >
        {items?.map((item, i) => {
          return (
            <Grid key={i} item xs={12} sm={12} md={6}>
              <HomeCtaBanner
                displayTitle={item?.displayTitle}
                button1={item?.button1}
                imageContent={item?.imageContent}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

HomeBanner.propTypes = {
  testId: string,
  displayTitle: string,
  body: string,
  items: array,
  bodyText: shape({
    json: object,
  }),
  backgroundColor: string,
  imageContent: shape({
    imageBynder: arrayOf(
      shape({
        src: string,
      })
    ),
  }),
  button1: oneOfType([
    shape({
      urlLink: string,
      labelLink: string,
      targetLink: string,
    }),
  ]),
  button2: oneOfType([
    shape({
      linkUrl: string,
      linkLabel: string,
      linkTarget: string,
    }),
  ]),
}
