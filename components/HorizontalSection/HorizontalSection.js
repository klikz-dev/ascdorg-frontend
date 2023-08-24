import Image from 'next/image'
import { Avatar, Box, Container, Grid, Typography } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { string, bool, oneOf } from 'prop-types'
import paths from '../../paths/path'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'
import TopicTag from '../TopicTag'

export default function HorizontalSection({
  testId,
  type = 'article',
  title,
  viewAllLink,
  label,
  linkText,
  linkSlug,
  description,
  date,
  authorImage,
  authorTitle,
  authorSubtitle,
  imageSlug,
  variant,
}) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
  const avatarStyle = {
    width: '15vw',
    height: '15vw',
    minWidth: '128px',
    minHeight: '128px',
    maxHeight: '212px',
    maxWidth: '212px',
    border: {
      xs: '4px solid #FFFFFF',
      sm: '4px solid #FFFFFF',
      md: '8px solid #FFFFFF',
    },
    backgroundColor: 'primary.main',
  }
  const emptyAvatarStyle = {
    width: '15vw',
    height: '15vw',
    minWidth: '128px',
    minHeight: '128px',
    maxHeight: '212px',
    maxWidth: '212px',
    backgroundColor: 'transparent',
  }
  const isDefaultOrUndefinedImageUrl = authorImage
    ? authorImage.toLowerCase().includes('ascdimagefiller.png') ||
      authorImage.toLowerCase().includes('undefined?q=')
    : false

  return (
    <Box data-testid={testId}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        {title && <Typography variant='h4'>{title}</Typography>}
        {viewAllLink && <ViewAllCTA label='View all' href={'#'} lg />}
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: { xs: '36px 28px', md: '46px 96px ' },
          borderRadius: { xs: '8px 8px 8px 48px', md: '8px 8px 8px 96px' },
          backgroundColor: 'grey.extraLight',
          backgroundImage:
            'linear-gradient(to top right, rgba(255, 255, 255, 0.4) 50%, #E4E9EC 50%)',
          '& .MuiContainer-root': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <Container>
          <Grid
            container
            alignItems='center'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={12} sm={8} md={7}>
              <Box
                sx={{
                  textAlign: 'left',
                  marginRight: { md: '30px' },
                  marginTop: { xs: '26px', sm: '26px' },
                }}
                data-testid={`${testId}-title`}
              >
                {variant === 'quote' && (
                  <Box display='flex'>
                    <Box pr={2}>
                      <Image
                        src='/images/quote.svg'
                        width={20}
                        height={20}
                        style={{
                          backgroundColor: 'transparent',
                          minWidth: '25px',
                          marginTop: '5px',
                        }}
                        layout='fixed'
                      />
                    </Box>
                    <Box>
                      <Typography variant='h4'>{description}</Typography>
                    </Box>
                  </Box>
                )}
                {label && (
                  <TopicTag
                    label={label}
                    variant='white'
                    textTransform='uppercase'
                  />
                )}
                {linkText && (
                  <Box my={1}>
                    <a
                      href={
                        type === 'blog'
                          ? linkSlug
                          : paths.article({ slug: linkSlug })
                      }
                    >
                      <Typography variant='h2'>{linkText}</Typography>
                    </a>
                  </Box>
                )}
                {date && (
                  <Typography variant='subtitle2'>
                    {timeAgo.format(Date.parse(date))}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              data-testid={`${testId}-authors`}
              item
              xs={12}
              sm={6}
              md={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {imageSlug &&
                (authorImage && !isDefaultOrUndefinedImageUrl ? (
                  <a
                    href={paths.author({
                      slug: imageSlug,
                    })}
                  >
                    <Avatar
                      src={authorImage}
                      alt={'Author Image'}
                      sx={avatarStyle}
                    />
                  </a>
                ) : (
                  variant !== 'quote' && (
                    <Avatar sx={emptyAvatarStyle}>&nbsp;</Avatar>
                  )
                ))}
              {!imageSlug &&
                (authorImage && !isDefaultOrUndefinedImageUrl ? (
                  <Avatar
                    src={authorImage}
                    alt={'Author Image'}
                    sx={avatarStyle}
                  />
                ) : (
                  variant !== 'quote' && (
                    <Avatar sx={emptyAvatarStyle}>&nbsp;</Avatar>
                  )
                ))}
              <Box pt={2} textAlign='center'>
                {!imageSlug ||
                (authorImage && !isDefaultOrUndefinedImageUrl) ? (
                  <Typography variant='h4'>
                    <span style={{ fontSize: 20 }}>{authorTitle}</span>
                  </Typography>
                ) : (
                  <a
                    href={paths.author({
                      slug: imageSlug,
                    })}
                  >
                    <Typography variant='h4'>
                      <span style={{ fontSize: 20 }}>{authorTitle}</span>
                    </Typography>
                  </a>
                )}
                <Box color='#546366'>
                  <Typography variant='caption'>{authorSubtitle}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

HorizontalSection.propTypes = {
  testId: string,
  type: oneOf(['blog', 'article']),
  title: string,
  viewAllLink: bool,
  label: string,
  linkText: string,
  linkSlug: string,
  description: string,
  date: string,
  authorImage: string,
  authorTitle: string,
  authorSubtitle: string,
  imageSlug: string,
  variant: string,
}
