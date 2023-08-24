import { Box, Typography } from '@mui/material'
import { string, array, oneOfType, bool } from 'prop-types'
import CustomBlock from '../../const/CustomBlocks'
import CtaButton from '../interactives/Buttons/CtaButton'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'

export default function TextCTA({
  testId = 'TextCTA',
  title,
  titleAlignment,
  description,
  descriptionAlignment,
  button,
  ctaLabel,
  ctaLink,
  target,
  ctaLinks,
  bgColor,
  bgImage,
  rounded,
}) {
  const moduleBGColor = () => {
    switch (bgColor) {
      case 'primary':
      case 'dark_green':
        return 'primary.main'
      case 'light_grey':
        return 'background.lightGrey'
      case 'light_green':
        return 'background.lightGreen'
      case 'light_pink':
        return 'background.lightPink'
      default:
        return 'grey.extraLight'
    }
  }

  return (
    <Box
      py={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: rounded ? '8px' : 0,
        bgcolor: moduleBGColor(),
        backgroundImage: bgImage ? `url(${bgImage})` : '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: bgColor === 'primary' ? 'common.white' : 'initial',
      }}
      data-testid={testId}
    >
      {title && (
        <Box
          maxWidth='650px'
          textAlign={titleAlignment || 'center'}
          sx={{
            alignSelf: titleAlignment === 'left' ? 'flex-start' : 'center',
          }}
          px={3}
          data-testid={`${testId}-title`}
        >
          <Typography
            variant='h4'
            color={
              ['primary', 'dark_green'].includes(bgColor) ? 'white' : 'black'
            }
          >
            {title}
          </Typography>
        </Box>
      )}
      {description && (
        <Box
          maxWidth='650px'
          textAlign={descriptionAlignment || 'center'}
          sx={{
            alignSelf:
              descriptionAlignment === 'left' ? 'flex-start' : 'center',
          }}
          pt={1}
          px={3}
          mb={2}
          data-testid={`${testId}-description`}
        >
          <Typography
            variant='subtitle1'
            color={
              ['primary', 'dark_green'].includes(bgColor) ? 'white' : 'black'
            }
            sx={{
              'div > p > a': {
                color: ['primary', 'dark_green'].includes(bgColor)
                  ? 'white'
                  : 'primary.main',
              },
            }}
          >
            {description}
          </Typography>
        </Box>
      )}
      {ctaLabel && (
        <Box data-testid={`${testId}-ctaLabel`}>
          {button ? (
            <CtaButton
              variant='contained'
              color={
                ['primary', 'dark_green'].includes(bgColor)
                  ? 'secondary'
                  : 'primary'
              }
              width='100%'
              height='42'
              label={ctaLabel}
              target={target}
              href={ctaLink}
            />
          ) : (
            <ViewAllCTA href={ctaLink} target={target} label={ctaLabel} lg />
          )}
        </Box>
      )}
      {!!ctaLinks?.length && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
          data-testid={`${testId}-links`}
        >
          {ctaLinks?.map((ctaLink, i) => (
            <Box
              key={i}
              pt={3}
              sx={{
                width: { xs: '100%', md: 'auto' },
                paddingRight: { md: 3 },
                paddingLeft: { md: 3 },
                '& a': {
                  justifyContent: 'center !important',
                },
                '& button': {
                  width: '100%',
                },
              }}
              pr={[0, 2]}
            >
              <CustomBlock
                item={ctaLink}
                color={
                  ['primary', 'dark_green'].includes(bgColor)
                    ? 'secondary'
                    : 'primary'
                }
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

TextCTA.propTypes = {
  testId: string,
  title: string,
  description: oneOfType([string, array]),
  button: bool,
  ctaLabel: string,
  ctaLink: string,
  target: string,
  titleAlignment: string,
  descriptionAlignment: string,
  ctaLinks: array,
  bgColor: string,
  bgImage: string,
  rounded: bool,
}
