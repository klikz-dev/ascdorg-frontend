import {
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Avatar,
  Typography,
} from '@mui/material'
import { string, object, bool, number } from 'prop-types'
import ReactMarkdown from 'react-markdown'
import CustomBlock from '../../const/CustomBlocks'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import CtaButton from '../interactives/Buttons/CtaButton'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'

export default function CardGridContent({
  testId,
  adminTitle,
  thumbnail,
  title,
  titleAlignment,
  bodyAlignment,
  body,
  linkButton,
  buttonLink,
  link,
  cta,
  showAvatar,
  leftAlignment,
  gridMd,
  underlined,
  pageId,
}) {
  if (!body && !title) {
    return null
  }
  return (
    <CardContent
      data-testid={testId}
      sx={
        showAvatar
          ? {
              width: leftAlignment ? '100%' : 'auto',
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              justifyContent: {
                xs: 'space-between',
                md: 'center',
              },
              textAlign: { xs: 'left', md: 'center' },
              alignItems: { xs: 'center', md: 'stretch' },
            }
          : undefined
      }
    >
      <Box
        sx={
          showAvatar
            ? {
                display: 'flex',
                flexDirection: leftAlignment
                  ? 'row'
                  : { xs: 'row', md: 'column' },
                justifyContent: leftAlignment
                  ? 'flex-start'
                  : {
                      xs: 'space-between',
                      md: 'center',
                    },
                textAlign: { xs: 'left', md: 'center' },
                alignItems: { xs: 'center', md: 'stretch' },
              }
            : leftAlignment
            ? {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }
            : undefined
        }
      >
        {thumbnail && !showAvatar && (
          <CardMedia
            data-testid={`${testId}-no-avatar`}
            sx={
              leftAlignment
                ? {
                    width: { xs: '120px', md: '200px' },
                    height: { xs: '100px', md: '124px' },
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    alignSelf: 'center',
                  }
                : {
                    paddingTop: '56.25%', // 16:9
                    height: { md: 245 },
                    width: { md: '100%' },
                    borderRadius: 8,
                  }
            }
            image={contentfulImageTransformation(thumbnail)}
            title={title}
          />
        )}
        {showAvatar &&
          (thumbnail?.imageBynder?.[0]?.src ||
          thumbnail?.imageContentful?.url ? (
            <Avatar
              data-testid={`${testId}-avatar`}
              alt={thumbnail?.title}
              src={contentfulImageTransformation(thumbnail)}
              sx={{
                width: { xs: '52px', md: '120px' },
                height: { xs: '52px', md: '120px' },
                border: '4px solid white',
                boxShadow: 4,
                margin: leftAlignment ? 'initial' : { md: 'auto' },
                marginRight: 2,
                marginTop: leftAlignment ? 'auto' : { md: '20px' },
                marginBottom: leftAlignment ? 'auto' : 'initial',
              }}
            />
          ) : (
            <Avatar
              alt={thumbnail?.title}
              sx={{
                width: { xs: '52px', md: '120px' },
                height: { xs: '52px', md: '120px' },
                backgroundColor: 'background.light',
                boxShadow: 0,
                marginRight: 2,
                margin: { md: 'auto' },
                marginTop: { md: '20px' },
              }}
            >
              &nbsp;
            </Avatar>
          ))}
        <Box
          textAlign={['left', 'left', showAvatar ? 'center' : 'left']}
          sx={leftAlignment ? { width: '50%' } : undefined}
        >
          <Box mt={2} mb={showAvatar ? 0 : 1}>
            <Typography
              variant='h5'
              textAlign={[
                'left',
                'left',
                titleAlignment ? titleAlignment : showAvatar ? 'center' : '',
              ]}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            variant={showAvatar ? 'caption' : 'subtitle3'}
            color={showAvatar ? '#546366' : 'inherit'}
            textAlign={[
              'left',
              'left',
              bodyAlignment ? bodyAlignment : showAvatar ? 'center' : '',
            ]}
          >
            <ReactMarkdown>{body}</ReactMarkdown>
          </Typography>
        </Box>
        {(linkButton?.eventLinkUrl ||
          linkButton?.eventId ||
          buttonLink?.buttonLinkLinkUrl ||
          buttonLink?.associatedProduct) && (
          <CardActions href={link ? link : ''}>
            <Box
              display='flex'
              justifyContent='flex-start'
              flexDirection={
                gridMd > 5
                  ? ['column', 'column', 'row']
                  : ['column', 'row', 'column']
              }
              alignItems={
                gridMd > 5
                  ? ['stretch', 'stretch', 'center']
                  : ['stretch', 'center', 'stretch']
              }
            >
              {linkButton?.eventId ? (
                <Box
                  sx={
                    gridMd > 5
                      ? {
                          mr: { xs: 0, sm: 0, md: 2 },
                          mb: { xs: 2, sm: 2, md: 0 },
                        }
                      : {
                          mr: { xs: 0, sm: 2, md: 0 },
                          mb: { xs: 2, sm: 0, md: 2 },
                        }
                  }
                >
                  <Typography
                    id={linkButton?.eventId}
                    variant='string'
                    sx={{
                      textDecoration: underlined ? 'underline' : 'none',
                      whiteSpace: 'nowrap',
                      minWidth: '64px',
                      boxSizing: 'border-box',
                      transition:
                        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                      fontFamily: 'Poppins',
                      borderRadius: '2px',
                      textTransform: 'none',
                      boxShadow: 'none',
                      minHeight: '40px',
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                      color: 'common.white',
                      backgroundColor: '#005E47',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      lineHeight: '1.5rem',
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    {pageId === 'pre-conference-institute-pricing'
                      ? 'Register for this Institute'
                      : linkButton.eventLinkLabel
                      ? linkButton.eventLinkLabel
                      : adminTitle
                      ? adminTitle
                      : 'Join'}
                  </Typography>
                </Box>
              ) : (
                linkButton?.eventLinkUrl && (
                  <Box
                    sx={
                      gridMd > 5
                        ? {
                            mr: { xs: 0, sm: 0, md: 2 },
                            mb: { xs: 2, sm: 2, md: 0 },
                          }
                        : {
                            mr: { xs: 0, sm: 2, md: 0 },
                            mb: { xs: 2, sm: 0, md: 2 },
                          }
                    }
                  >
                    <CustomBlock item={linkButton} />
                  </Box>
                )
              )}
              {buttonLink?.buttonLinkLinkUrl && (
                <CtaButton
                  variant='contained'
                  label={buttonLink?.buttonLinkLinkLabel}
                  target={buttonLink?.buttonLinkLinkTarget}
                  href={buttonLink?.buttonLinkLinkUrl}
                  styles={{ padding: '12px 24px' }}
                />
              )}
              {buttonLink?.associatedProduct && (
                <CustomBlock item={buttonLink} />
              )}
            </Box>
          </CardActions>
        )}
        {cta && (
          <Box
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            pt={2}
          >
            <ViewAllCTA href={cta?.url} label={cta?.label} />
          </Box>
        )}
      </Box>
    </CardContent>
  )
}

CardGridContent.propTypes = {
  testId: string,
  adminTitle: string,
  thumbnail: object,
  title: string,
  titleAlignment: bool,
  bodyAlignment: bool,
  body: string,
  linkButton: object,
  buttonLink: object,
  link: string,
  cta: object,
  showAvatar: bool,
  leftAlignment: bool,
  gridMd: number,
  underlined: bool,
  pageId: string,
}
