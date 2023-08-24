import { useReactiveVar } from '@apollo/client'
import { Box, Container, Grid, Typography } from '@mui/material'
import { shape, string, bool, number, object } from 'prop-types'
import CustomBlock from '../../../const/CustomBlocks'
import { hasMemberBookPriceVar } from '../../../lib/apollo-client/cache'
import { renderTime } from '../../../lib/utils'
import CtaButton from '../../interactives/Buttons/CtaButton'
import ShareButtons from '../../interactives/Buttons/ShareButtons'

export default function GreenBanner({
  testId = 'green-banner',
  location,
  title,
  link,
  dateTime,
  endingTime,
  linkButton,
  eventId,
  image,
  description,
  priceMember,
  nonMemberPrice,
  taxJar,
}) {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'common.white',
        }}
        py={6}
        prl={[5, 0]}
        data-testid={testId}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid
              xs={12}
              md={6}
              item
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
              data-testid={`${testId}-eventDetails`}
            >
              {title && (
                <Box minHeight='1.125rem'>
                  <Typography component='p' variant='subtitle1'>
                    {title}
                  </Typography>
                </Box>
              )}
              {dateTime && (
                <Box minHeight='1.125rem'>
                  <Typography component='p' variant='subtitle1'>
                    {renderTime(dateTime, endingTime, '', true)}
                  </Typography>
                </Box>
              )}
              {location && (
                <Box minHeight='1.125rem'>
                  <Typography component='p' variant='subtitle1'>
                    {location}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: { md: 'center', xs: 'center' },
                justifyContent: { md: 'flex-start' },
              }}
            >
              {link && (
                <CtaButton
                  variant='contained'
                  width='158'
                  height='42'
                  onclick={() => void 0}
                  href={link}
                  label='Event Details'
                  color='secondary'
                  size='medium'
                />
              )}
              {
                /** hard check for this conference to remove registration button
                 * @todo: find a way to do this inside contentful itself in the future
                 */
                linkButton && (
                  <Box ml={[0, 2]} mt={[2, 0]} data-testid={`${testId}-button`}>
                    <CustomBlock
                      item={linkButton}
                      snipcartData={{
                        label: linkButton?.linkLabel,
                        dataItemId: eventId,
                        dataItemName: title,
                        dataItemImage: image,
                        dataItemDescription: description,
                        dataItemPrice: hasMemberBookPrice
                          ? priceMember?.toFixed(2)
                          : nonMemberPrice?.toFixed(2),
                        dataItemCustom1Value: taxJar?.taxJarId || '',
                      }}
                    />
                  </Box>
                )
              }
              <Box data-testid={`${testId}-sharebuttons`}>
                <ShareButtons url={link} title={title} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

GreenBanner.propTypes = {
  testId: string,
  location: string,
  title: string,
  link: string,
  dateTime: string,
  endingTime: string,
  description: string,
  eventId: string,
  featured: bool,
  premium: bool,
  slug: string,
  nonMemberPrice: number,
  priceMember: number,
  linkButton: object,
  eventDetails: object,
  taxJar: shape({
    fields: shape({
      taxJarId: string,
    }),
  }),
  image: string,
}
