import Image from 'next/image'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { string, bool, object, oneOfType, array, number } from 'prop-types'
import { formatAuthor } from '../../lib/utils'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'
import TopicTag from '../TopicTag'

export default function HorizontalCard({
  testId = 'Horizontalcard',
  premium,
  label,
  title,
  customTitleVariant,
  authorName,
  date,
  price,
  image,
  ctaLink,
  body,
  customBodySx,
  reverse = false, // image is left
  variant = 'event', // el, article, event, author (same as paths)
  noImage = false,
  learnMore = true,
  customSx,
  lines = 2,
}) {
  return (
    <Card
      data-testid={testId}
      sx={{
        minHeight: lines > 2 ? 0 : '126px',
        margin: variant === 'author' ? '-20px' : '',
        padding: variant === 'author' ? '20px' : '10px',
        '&:hover': {
          /** title line */
          a: {
            'div:nth-of-type(2)': {
              'div:nth-of-type(2)': {
                'h4, h5, h6': {
                  color: 'hover.main',
                  textDecoration: 'underline',
                },
              },
            },
          },
          boxShadow:
            '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: 'common.white',
        },
        backgroundColor: 'transparent',
        ...customSx,
      }}
      elevation={0}
    >
      <CardActionArea
        href={ctaLink ? ctaLink : null}
        sx={{
          display: 'flex',
          paddingLeft: { xs: variant === 'author' && 3, md: 0 },
          paddingRight: { xs: variant === 'author' && 3, md: 0 },
          alignItems: 'flex-start',
          flexDirection: {
            xs:
              variant === 'author' ? 'column' : reverse ? 'row-reverse' : 'row',
            md: reverse ? 'row-reverse' : 'row',
          },
          '&:hover': {
            textDecoration: 'none',
            '& .MuiCardActionArea-focusHighlight': {
              opacity: 0,
            },
          },
        }}
        disableRipple
      >
        {!noImage && (
          <CardMedia title={image?.title}>
            {variant === 'author' ? (
              <Avatar
                alt={image?.title}
                src={image}
                sx={{
                  width: '128px',
                  height: '128px',
                  border: '4px solid white',
                  boxShadow: 4,
                }}
              />
            ) : (
              <Box
                component='img'
                src={image}
                alt={`${image?.title}`}
                sx={{
                  backgroundColor: 'grey.extraLight',
                  width: { xs: 120, md: 150 },
                  height:
                    variant === 'event'
                      ? { xs: 96, md: 110 }
                      : { xs: 100, md: 124 },
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  objectFit: 'cover',
                }}
              />
            )}
          </CardMedia>
        )}

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingLeft: reverse ? 0 : '',
            padingRight: reverse ? '70px' : '',
            paddingTop: 0,
            paddingBottom: (lines > 2 || variant === 'workshop') && 0,
          }}
        >
          <Box display='flex'>
            {premium && (
              <Image
                src='/images/premium.svg'
                width={20}
                height={20}
                sx={{
                  paddingTop: 0,
                  marginRight: 5,
                }}
              />
            )}
            {label && <TopicTag variant='special' label={label} />}
            {price && (
              <Typography
                sx={{
                  marginLeft: 'auto',
                }}
                variant='overlineLarge'
              >
                ${price}
              </Typography>
            )}
          </Box>
          {['article', 'blog'].includes(variant) ? (
            <Box>
              {title && (
                <Typography
                  variant={customTitleVariant || (lines > 2 ? 'h6' : 'h5')}
                  data-testid={`${testId}-title`}
                >
                  {title}
                </Typography>
              )}
              {authorName && (
                <Typography
                  variant='caption'
                  data-testid={`${testId}-authorName`}
                >
                  {formatAuthor(authorName)}
                </Typography>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: `${lines}` /* number of lines to show */,
                WebkitBoxOrient: 'vertical',
                '& h5': {
                  minHeight: '3rem',
                },
              }}
            >
              {authorName && (
                <Typography
                  variant={
                    lines > 2 ? 'h6' : variant === 'workshop' ? 'h4' : 'h5'
                  }
                  data-testid={`${testId}-authorName`}
                >
                  {formatAuthor(authorName)}
                </Typography>
              )}
              {title && (
                <Typography
                  variant={
                    customTitleVariant ||
                    (lines > 2 ? 'h6' : variant === 'workshop' ? 'h4' : 'h5')
                  }
                  data-testid={`${testId}-title`}
                >
                  {title}
                </Typography>
              )}
            </Box>
          )}

          {body && (
            <Box
              display='flex'
              flexDirection='column'
              alignContent='space-between'
              height='100%'
              data-testid={`${testId}-body`}
            >
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp:
                    variant === 'author'
                      ? '4'
                      : '2' /* number of lines to show */,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                <Typography variant='body2' sx={{ ...customBodySx }}>
                  {body}
                </Typography>
              </Box>
              {variant === 'author' && learnMore && (
                <Box mt={2}>
                  <ViewAllCTA href={ctaLink} label='Learn More' lg />
                </Box>
              )}
            </Box>
          )}

          {date && (
            <Box mt={1.5}>
              <Typography
                variant='caption'
                color='#546366'
                sx={
                  variant === 'workshop'
                    ? {
                        fontSize: (theme) => theme.typography.pxToRem(16),
                        fontWeight: 600,
                        lineHeight: (theme) => theme.typography.pxToRem(24),
                        letterSpacing: 0.2,
                        color: 'accent.lightGrey',
                      }
                    : undefined
                }
                data-testid={`${testId}-date`}
              >
                {date}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

HorizontalCard.propType = {
  testId: string,
  premium: bool,
  label: string,
  title: string,
  authorName: oneOfType([string, object, array]),
  date: string,
  price: string,
  image: oneOfType([string, object]),
  ctaLink: string,
  body: string,
  reverse: bool,
  variant: string,
  noImage: bool,
  lines: number,
}
