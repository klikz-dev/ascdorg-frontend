import { Box, Grid, Avatar, GlobalStyles, Typography } from '@mui/material'
import { string, object } from 'prop-types'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import ProfileSocialButtons from '../interactives/Buttons/ProfileSocialButton'

const profileHeaderGlobalStyles = (
  <GlobalStyles
    styles={{
      '.MuiSvgIcon-colorPrimary': {
        color: '#ffffff',
        background: '#3C64B1',
        padding: '5px',
        borderRadius: '20px',
      },
    }}
  />
)

export default function ProfileHeader({
  testId = 'profile-header',
  thumbnail,
  email,
  instagram,
  twitter,
  facebook,
  youTube,
  linkedIn,
  firstName,
  lastName,
  role,
  experience,
  position,
}) {
  const socialLinks = [
    {
      link: email ? `mailto:${email}` : '',
      name: 'Email',
    },
    {
      link: instagram,
      name: 'Instagram',
    },
    {
      link: twitter,
      name: 'Twitter',
    },
    {
      link: facebook,
      name: 'Facebook',
    },
    {
      link: youTube,
      name: 'YouTube',
    },
    {
      link: linkedIn,
      name: 'LinkedIn',
    },
  ]
  return (
    <>
      {profileHeaderGlobalStyles}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'grey.extraLight',
          borderBottomLeftRadius: { xs: '64px', md: '180px' },
          minHeight: { xs: '600px', md: '398px' },
          paddingBottom: { md: 0 },
          height: { md: '398px' },
          '&::after': {
            content: '" "',
            borderBottom: {
              xs: '600px solid rgba(255, 255, 255, 0.4)',
              md: '398px solid rgba(255, 255, 255, 0.4)',
            },
            borderRight: '100vw solid transparent',
            width: 0,
            position: 'absolute',
          },
        }}
        data-testid={testId}
      >
        <Box maxWidth={850} width='100%' zIndex={1}>
          <Grid
            container
            sx={{
              flexDirection: { xs: 'column', md: 'row ' },
              alignItems: 'center',
              justifyContent: { md: 'flex-start' },
            }}
          >
            <Grid item md={4} xs={12} data-testid={`${testId}-avatar`}>
              <Avatar
                style={{ margin: '0 auto' }}
                alt={thumbnail?.title}
                src={contentfulImageTransformation(thumbnail, true)}
                sx={{
                  width: '240px',
                  height: '240px',
                  border: '6px solid white',
                  boxShadow: 16,
                }}
              />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                display='flex'
                flexDirection='column'
                sx={{
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
                mt={[5, 5, 0]}
              >
                <Typography variant='h2' data-testid={`${testId}-name`}>
                  {firstName} {lastName}
                </Typography>
                <Box mt={1} data-testid={`${testId}-about`}>
                  <Typography variant='body2' color='rgba(84, 99, 102, 1)'>
                    {role}
                    {role && experience && `, ${experience}`}

                    {(role || experience) && position && `, ${position}`}
                  </Typography>
                </Box>
              </Box>

              <Box
                mt={3}
                ml={[3, 0]}
                display='flex'
                sx={{
                  flexDirection: { xs: 'column', md: 'row' },
                }}
                data-testid={`${testId}-socialbutton`}
              >
                {socialLinks?.map((social, i) => {
                  return (
                    <ProfileSocialButtons
                      href={social?.link}
                      name={social?.name}
                      key={i}
                    />
                  )
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

ProfileHeader.propTypes = {
  testId: string,
  thumbnail: object,
  email: string,
  instagram: string,
  twitter: string,
  facebook: string,
  youTube: string,
  linkedIn: string,
  firstName: string,
  lastName: string,
  role: string,
  experience: string,
  position: string,
}
