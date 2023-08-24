import { Paper, Box, Chip, Typography, List, ListItem } from '@mui/material'
import CtaButton from '../../Buttons/CtaButton'

export default function MemberPricingTile({
  testId = 'MemberPricingTile',
  popular,
  popularLabel,
  price,
  title,
  body,
  priceSymbol,
  ctaButton1,
  ctaButton2,
  titleCentered,
  bodyCentered,
  term,
  bulletPoint,
  amountOfItems,
}) {
  const widthSizing = () => {
    if (amountOfItems?.length < 3) {
      return { xs: '360px', md: '340px', lg: '360px' }
    } else if (amountOfItems?.length > 4) {
      return { xs: '300px', md: '295px', lg: '300px' }
    } else {
      return { xs: '340px', md: '330px', lg: '340px' }
    }
  }
  const rootStyle = {
    position: 'relative',
    width: widthSizing(),
    // height: { lg: 'calc(100% - 24px)' },
    borderRadius: '16px',
    boxShadow:
      '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)',
  }
  const rootPopularStyle = {
    boxShadow: {
      xs: '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)',
      md: '0px 24px 38px rgba(0, 0, 0, 0.04), 0px 9px 46px rgba(0, 0, 0, 0.08), 0px 11px 15px rgba(0, 0, 0, 0.08)',
    },
  }
  const priceFontSize = (priceSymbol, price) => {
    if (priceSymbol) {
      if (price?.length > 7) {
        return '32px'
      } else if (price?.length > 6) {
        return '38px'
      } else {
        return '48px'
      }
    } else {
      if (price?.length > 8) {
        return '32px'
      } else if (price?.length > 7) {
        return '38px'
      } else {
        return '42px'
      }
    }
  }
  const priceLineHeight = (priceSymbol, price) => {
    if (priceSymbol) {
      if (price?.length > 7) {
        return '32px'
      } else if (price?.length > 6) {
        return '36px'
      } else {
        return '44px'
      }
    } else {
      if (price?.length > 8) {
        return '18px'
      } else if (price?.length > 7) {
        return '38px'
      } else {
        return '40px'
      }
    }
  }
  return (
    <Paper
      sx={popular ? { ...rootStyle, ...rootPopularStyle } : rootStyle}
      data-testid={testId}
    >
      <Box
        sx={
          popular
            ? {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: `${
                  popularLabel ? 'space-between' : 'flex-end'
                }`,
                padding: '16px 24px 36px',
                height: '174px',
                bgcolor: 'primary.main',
                borderRadius: '16px',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: 0,
                color: 'common.white',
                position: { md: 'relative' },
                top: { md: '-20px' },
                /* this targets the details directly after 
                the header only for the popular card */
                '& + div': {
                  md: {
                    position: 'relative',
                    top: '-20px',
                  },
                },
              }
            : {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: '16px 24px 36px',
                height: '150px',
                bgcolor: 'accent.paleGreen',
                borderRadius: '16px',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: 0,
              }
        }
      >
        {popularLabel && (
          <Chip
            label={popularLabel}
            data-testid={`${testId}-popular`}
            sx={{
              marginLeft: 'auto',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              color: 'common.white',
            }}
          />
        )}
        {price && (
          <Box display='flex'>
            <Typography
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(24),
                fontWeight: '600',
                lineHeight: (theme) => theme.typography.pxToRem(28),
                letterSpacing: '0.02em',
              }}
              data-testid={`${testId}-priceSymbol`}
            >
              {priceSymbol ? '$' : ''}
            </Typography>
            <Typography
              sx={{
                fontSize: priceFontSize(priceSymbol, price),
                fontWeight: '800',
                lineHeight: priceLineHeight(priceSymbol, price),
                letterSpacing: '0.02em',
              }}
              data-testid={`${testId}-price`}
            >
              {price}
            </Typography>
            <Typography
              variant='subtitle2'
              sx={
                popular
                  ? {
                      color: 'common.white',
                      opacity: '0.6',
                      alignSelf: 'flex-end',
                    }
                  : {
                      color: 'common.black',
                      opacity: '0.6',
                      alignSelf: 'flex-end',
                    }
              }
            >
              {term}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          // height: { md: '536px' },
          padding: '40px 32px',
          '& ul': {
            paddingLeft: '26px',
            marginBottom: 0,
            '& li:last-child': {
              marginBottom: 0,
            },
          },
        }}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box mb={5}>
          <Typography
            variant='h3'
            sx={{
              display: 'flex',
              justifyContent: `${titleCentered ? 'center' : 'none'}`,
            }}
            data-testid={`${testId}-title`}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: `${bodyCentered ? 'center' : 'none'}`,
            }}
            data-testid={`${testId}-body`}
          >
            {bulletPoint ? (
              <List sx={{ listStyle: 'disc' }}>
                {body &&
                  body.map((point, key) => (
                    <ListItem
                      key={`${title}-pointer-${key}`}
                      sx={{
                        marginBottom: 1,
                        '& p.MuiTypography-root': {
                          fontSize: '14px',
                        },
                        padding: 0,
                        display: 'list-item',
                        marginTop: 1,
                      }}
                    >
                      <Typography variant='body3'>{point}</Typography>
                    </ListItem>
                  ))}
              </List>
            ) : (
              <Typography sx={{ mt: '15px' }}>
                {body &&
                  body.map((point, key) => (
                    <Box
                      key={`${title}-pointer-${key}`}
                      sx={{
                        marginBottom: 1,
                        '& p.MuiTypography-root': {
                          fontSize: '14px',
                        },
                      }}
                    >
                      <Typography variant='body3'>{point}</Typography>
                    </Box>
                  ))}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {ctaButton1 && (
            <CtaButton
              variant='contained'
              color='primary'
              size='large'
              label={ctaButton1?.linkLabel}
              target={ctaButton1?.linkTarget}
              href={ctaButton1?.linkUrl}
              backgroundColor={'#3C64B1'}
            />
          )}
          {ctaButton2 && (
            <CtaButton
              variant='contained'
              color='primary'
              size='large'
              label={ctaButton2?.linkLabel}
              target={ctaButton2?.linkTarget}
              href={ctaButton2?.linkUrl}
              backgroundColor={'#3C64B1'}
            />
          )}
        </Box>
      </Box>
    </Paper>
  )
}
