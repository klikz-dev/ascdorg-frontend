import { Box, Container, Typography } from '@mui/material'
import { string, bool } from 'prop-types'
import CtaButton from '../../interactives/Buttons/CtaButton'

export default function Banner({
  testId = 'banner',
  title,
  subtitle,
  btn1Label,
  btn1Url,
  btn2Label,
  btn2Url,
  borderBottomLeft,
}) {
  return (
    <Box
      py={[9, 10]}
      sx={{
        backgroundColor: 'accent.paleGreen',
        color: 'text.primary',
        ...(borderBottomLeft ? { borderBottomLeftRadius: '96px' } : {}),
      }}
      data-testid={testId}
    >
      <Container>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <Box>
            <Typography variant='h1' data-testid={`${testId}-title`}>
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle1' data-testid={`${testId}-subtitle`}>
              {subtitle}
            </Typography>
          </Box>
          {(btn1Label || btn2Label) && (
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                marginRight: ['15vw', '12vw', '20vw'],
                marginBottom: '0',
                marginLeft: ['8vw', '12vw', '20vw'],
                '& h1': {
                  marginBottom: ['4vw', '1vw', '1vw'],
                },
              }}
            >
              {btn1Label && (
                <Box mr={[0, 2]} mb={[2, 0]}>
                  <CtaButton
                    testId={`${testId}-button-1`}
                    variant='outlinedPrimary'
                    label={btn1Label}
                    href={btn1Url}
                  />
                </Box>
              )}
              {btn2Label && (
                <Box>
                  <CtaButton
                    testId={`${testId}-button-2`}
                    variant='containedPrimary'
                    label={btn2Label}
                    href={btn2Url}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

Banner.propTypes = {
  testId: string,
  title: string,
  subtitle: string,
  btn1Label: string,
  btn1Url: string,
  btn2Label: string,
  btn2Url: string,
  borderBottomLeft: bool,
}
