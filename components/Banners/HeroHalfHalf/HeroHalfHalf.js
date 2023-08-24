import { Box, Grid, Typography } from '@mui/material'
import {
  string,
  oneOfType,
  array,
  bool,
  arrayOf,
  object,
  shape,
  number,
} from 'prop-types'
import ReactMarkdown from 'react-markdown'
import CustomBlock from '../../../const/CustomBlocks'
import { moduleBGColor } from '../../../lib/utils'
import TopicTag from '../../TopicTag'

export default function HeroHalfHalf({
  testId = 'hero-half-half',
  label,
  title,
  subtitle,
  titleAboveImage,
  titleCenterAlign,
  description,
  date,
  time,
  ctaItems,
  image,
  imageAlt,
  imagePos,
  imageBorderCornerPosition,
  imageMobilePosition,
  backgroundColor,
}) {
  const buttonStyle = (theme) => ({
    width: { xs: '100%', md: 'auto' },
    paddingRight: theme.spacing(2),
    '& a': {
      justifyContent: 'center !important',
    },
    '& button': {
      width: '100%',
    },
    '& .MuiButton-label': {
      fontWeight: 600,
    },
  })

  const containerBorderStyle = () => {
    if (
      imagePos &&
      (imageBorderCornerPosition === 'bottom-left' ||
        !imageBorderCornerPosition)
    ) {
      return { xs: '0 0 0 0', sm: '8px 8px 8px 96px' }
    } else if (imagePos && imageBorderCornerPosition === 'top-left') {
      return { xs: '96px 0 0 0', md: '96px 8px 8px 8px' }
    } else if (!imagePos && imageBorderCornerPosition === 'top-right') {
      return { xs: '0 96px 0 0', md: '8px 96px 8px 8px' }
    } else if (!imagePos && imageBorderCornerPosition === 'bottom-right') {
      return { xs: '0 0 96px 0', md: '8px 8px 96px 8px' }
      /** mobile  exception */
    } else if (!imagePos && imageBorderCornerPosition === 'top-left') {
      return { xs: '96px 0 0 0', sm: '8px 8px 8px 8px' }
    } else {
      return { xs: '0 0 0 0', md: '8px 8px 8px 8px' }
    }
  }

  const imageBorderStyle = () => {
    switch (imageBorderCornerPosition) {
      case 'top-left':
        return { xs: '96px 0 0 0', md: '96px 8px 8px 8px' }
      case 'top-right':
        return { xs: '0 96px 0 0', md: '8px 96px 8px 8px' }
      case 'bottom-right':
        return { xs: '0 0 96px 0', md: '8px 8px 96px 8px' }
      case 'bottom-left':
      default:
        return { xs: '0 0 0 96px', md: '8px 8px 8px 96px' }
    }
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        backgroundColor: moduleBGColor(backgroundColor),
        borderRadius: containerBorderStyle(),
      }}
      data-testid={testId}
    >
      {titleAboveImage && (
        <Grid
          xs={12}
          mt={2}
          mb={2}
          px={2}
          order={{ xs: imageMobilePosition === 'above-title' ? 2 : 1, sm: 1 }}
        >
          {title && (
            <Typography
              variant='h1'
              color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
              textAlign={titleCenterAlign ? 'center' : 'left'}
              data-testid={`${testId}-title`}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant='body2'
              color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
              textAlign={titleCenterAlign ? 'center' : 'left'}
              mt={1}
              data-testid={`${testId}-subtitle`}
            >
              <strong>{subtitle}</strong>
            </Typography>
          )}
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sm={6}
        order={{
          xs: imageMobilePosition === 'below-body' ? 2 : 3,
          sm: imagePos ? 3 : 2,
        }}
        sx={{
          height: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
          paddingTop: 3,
          paddingBottom: 3,
          marginTop: 'auto',
          marginBottom: 'auto',
          paddingLeft: { xs: 1, md: 2 },
        }}
      >
        <Box ml={[3, 2, 0]} mr={[3, 0]} width='468px'>
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
            {!titleAboveImage && title && (
              <Typography
                variant='h1'
                color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
                textAlign={titleCenterAlign ? 'center' : 'left'}
                data-testid={`${testId}-title`}
              >
                {title}
              </Typography>
            )}
            {!titleAboveImage && subtitle && (
              <Typography
                variant='body2'
                color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
                textAlign={titleCenterAlign ? 'center' : 'left'}
                mt={1}
                data-testid={`${testId}-subtitle`}
              >
                <strong>{subtitle}</strong>
              </Typography>
            )}

            {date && time && (
              <>
                <Typography
                  variant='subtitle2'
                  color={
                    backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'
                  }
                  data-testid={`${testId}-date-time`}
                >{`${date} - ${time} EST`}</Typography>
              </>
            )}
            <Box
              mt={2}
              sx={{
                maxWidth: { md: '85%' },
              }}
            >
              <Typography
                variant='subtitle2'
                color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
                data-testid={`${testId}-description`}
              >
                {Array.isArray(description) ? (
                  description
                ) : (
                  <Box
                    sx={{
                      '& a': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <ReactMarkdown>{description}</ReactMarkdown>
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            mt={5}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              textAlign: 'center',
            }}
            data-testid={`${testId}-cta-label`}
          >
            {ctaItems?.map((ctaLink, i) => (
              <Box pt={0} sx={buttonStyle} key={i}>
                <CustomBlock item={ctaLink} testId={`${testId}-cta${i + 1}`} />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        order={{
          xs:
            imageMobilePosition === 'below-body'
              ? 3
              : imageMobilePosition === 'above-title'
              ? 1
              : 2,
          sm: imagePos ? 2 : 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            objectFit: 'cover',
            overflow: 'hidden',
            height: { xs: 375, md: 500 },
            maxHeight: { xs: 375, md: 500 },
            width: { xs: '100%', md: 500 },
            borderRadius: imageBorderStyle(),
          }}
          data-testid={`${testId}-image`}
        >
          {image && (
            <Box
              component='img'
              src={image}
              alt={imageAlt}
              style={{ width: '100%', height: 'inherit', objectFit: 'cover' }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

HeroHalfHalf.propTypes = {
  testId: string,
  label: string,
  title: string,
  subtitle: string,
  titleAboveImage: bool,
  titleCenterAlign: bool,
  description: oneOfType([array, string]),
  date: string,
  time: string,
  ctaItems: arrayOf(
    oneOfType([
      shape({
        __typename: string,
        associatedProduct: oneOfType([
          shape({
            productNumber: number,
            title: string,
            priceNonMember: number,
            priceMember: number,
            taxJar: shape({
              taxJarId: number,
            }),
            digitalFileGuid: string,
            royaltyFlag: bool,
            bookType: shape({
              title: string,
            }),
            dateRelease: string,
            linkedFrom: {
              items: arrayOf(
                shape({
                  slug: string,
                  description: shape({
                    json: string,
                  }),
                  thumbnail: shape({
                    thumbnail: shape({
                      imageBynder: arrayOf(
                        shape({
                          src: string,
                        })
                      ),
                      imageContentful: shape({
                        file: shape({
                          url: string,
                        }),
                      }),
                    }),
                  }),

                  authors: shape({
                    items: arrayOf(
                      shape({
                        title: string,
                        email: string,
                      })
                    ),
                  }),
                })
              ),
            },
          }),
        ]),
      }),
      shape({
        __typename: string,
        id: string,
        buttonStyle: arrayOf(string),
        linkUrl: string,
        linkLabel: string,
        linkTarget: string,
      }),
    ])
  ),
  image: string,
  imageAlt: string,
  imagePos: bool,
  snipcart: object,
  imageBorderCornerPosition: string,
  imageMobilePosition: string,
  backgroundColor: string,
}
