import { Box, Grid, Avatar, Typography } from '@mui/material'
import { string, oneOfType, element, number, array } from 'prop-types'
import CustomBlock from '../../const/CustomBlocks'
import TopicTag from '../TopicTag'

export default function TwoColumnCta({
  testId = 'two-column-cta',
  label,
  title,
  description,
  descriptionLineNumbers,
  date,
  ctaItems,
  image,
  imageAlt,
  imagePos = 'left',
  variant,
  backgroundColor,
  imageFrameStyle,
}) {
  const moduleBGColor = () => {
    if (variant === 'grey') {
      return 'background.lightGrey'
    } else {
      switch (backgroundColor) {
        case 'light_grey':
          return 'background.lightGrey'
        case 'dark_green':
          return 'primary.main'
        case 'light_green':
          return 'background.lightGreen'
        case 'light_pink':
          return 'background.lightPink'
        case 'white':
        default:
          return 'background.light'
      }
    }
  }
  return (
    <Grid
      container
      sx={{
        width: '100%',
        minHeight: { xs: '100%', sm: '359px' },
        backgroundColor: moduleBGColor(),
        display: 'flex',
        flexDirection: {
          xs: variant === 'error' ? 'column' : 'column-reverse',
          sm: imagePos === 'right' ? 'row' : 'row-reverse !important',
        },
      }}
      data-testid={testId}
    >
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          minHeight: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 1,
          paddingBottom: { xs: 3, sm: 1 },
          paddingLeft: { xs: 0, sm: imagePos === 'left' ? 3 : 0 },
        }}
      >
        <Box
          ml={
            variant === 'grey'
              ? descriptionLineNumbers > 4
                ? [0, 1, 2]
                : [0, 3, 6]
              : descriptionLineNumbers > 4
              ? [0, 1, 2]
              : 0
          }
          mr={[0, 1]}
          mt={[3, 0]}
          px={variant === 'grey' ? [2, 0] : 0}
          width='100%'
        >
          {label && (
            <Box pb={1} data-testid={`${testId}-label`}>
              <TopicTag
                label={label}
                variant='special'
                color='black'
                textTransform='uppercase'
              />
            </Box>
          )}
          <Box>
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                lineHeight: { xs: '1.875rem', md: '2rem' },
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title && (
                <Typography
                  variant={
                    variant === 'error'
                      ? 'error'
                      : variant === 'h1'
                      ? 'h1'
                      : variant === 'h2'
                      ? 'h2'
                      : 'h3'
                  }
                  color={
                    backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'
                  }
                  data-testid={`${testId}-title`}
                >
                  {title}
                </Typography>
              )}
            </Box>
            {date && (
              <>
                <Typography
                  variant='subtitle2'
                  color={
                    backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'
                  }
                  data-testid={`${testId}-date`}
                >
                  {date}
                </Typography>
              </>
            )}
            <Box
              pt={1}
              sx={
                descriptionLineNumbers < 5
                  ? {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      lineHeight: '1.5rem' /* fallback */,
                      WebkitLineClamp:
                        descriptionLineNumbers ||
                        'initial' /* number of lines to show */,
                      WebkitBoxOrient: 'vertical',
                      maxWidth: { md: '85%' },
                    }
                  : {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      lineHeight: '1.5rem' /* fallback */,
                      WebkitLineClamp:
                        descriptionLineNumbers ||
                        'initial' /* number of lines to show */,
                      WebkitBoxOrient: 'vertical',
                      maxWidth: { md: '99%' },
                    }
              }
            >
              {description && (
                <Typography
                  variant={
                    variant === 'error'
                      ? 'h3'
                      : descriptionLineNumbers < 5
                      ? 'subtitle2'
                      : 'subtitle3'
                  }
                  color={
                    backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'
                  }
                  sx={{
                    'div > p > a': {
                      color:
                        backgroundColor === 'dark_green'
                          ? '#FFFFFF'
                          : 'primary.main',
                    },
                  }}
                  data-testid={`${testId}-description`}
                >
                  {description}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              pt={3}
              sx={{
                display: 'flex',
                // flexDirection: { xs: 'column', md: 'row' },
                width: { xs: '100%', md: 'auto' },
                paddingRight: { md: 3 },
                '& a': {
                  paddingRight: '24px',
                  justifyContent: 'center !important',
                },
                '& div': {
                  paddingRight: '24px',
                },
                '& button': {
                  width: 'auto',
                },
              }}
              pr={[0, 2]}
            >
              {ctaItems?.map((ctaLink, i) => (
                <CustomBlock
                  key={i}
                  item={ctaLink}
                  testId={`${testId}-cta${i + 1}`}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          overflow: 'hidden',
          width: '100%',
          height: { xs: '239px', sm: '359px' },
          maxHeight: { xs: '239px', sm: '359px' },
          position: 'relative',
          ...(imageFrameStyle === 'avatar'
            ? {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }
            : {}),
        }}
      >
        {/** @todo: use either next image or some type of mui image */}
        {imageFrameStyle === 'avatar' ? (
          <Avatar
            alt={imageAlt}
            src={
              image
                ? image.startsWith('//')
                  ? `https:${image}`
                  : image
                : '/images/ASCDImageFiller.png'
            }
            sx={{
              margin: 'auto',
              width: '240px',
              height: '240px',
              border: '6px solid white',
              boxShadow: 16,
            }}
            data-testid={`${testId}-avatar`}
          />
        ) : (
          <Box
            component='img'
            src={
              image
                ? image.startsWith('//')
                  ? `https:${image}`
                  : image
                : '/images/ASCDImageFiller.png'
            }
            alt={imageAlt}
            sx={{
              overflow: 'hidden',
              width: '100%',
              height: { xs: '239px', sm: '359px' },
              maxHeight: { xs: '239px', sm: '359px' },
              objectFit: variant === 'error' ? 'fill' : 'cover',
            }}
          />
        )}
      </Grid>
    </Grid>
  )
}

TwoColumnCta.propTypes = {
  testId: string,
  label: string,
  title: string,
  description: oneOfType([string, array, element]),
  descriptionLineNumbers: number,
  date: string,
  ctaItems: array,
  image: string,
  imageAlt: string,
  imagePos: string,
  variant: string,
  backgroundColor: string,
  imageFrameStyle: string,
}
