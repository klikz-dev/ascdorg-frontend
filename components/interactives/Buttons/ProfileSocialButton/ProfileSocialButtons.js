import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, Typography } from '@mui/material'
import { string } from 'prop-types'
import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share'

export default function ProfileSocialButtons({
  href,
  name,
  testId = 'profile-social-buttons',
}) {
  if (!href || !name) return null
  const icon = (name) => {
    switch (name) {
      case 'Email':
        return (
          <EmailIcon
            color='primary'
            style={{
              borderRadius: '10px',
              width: 38,
              height: 38,
            }}
          />
        )
      case 'Twitter':
        return (
          <TwitterIcon
            color='primary'
            style={{
              borderRadius: '10px',
              width: 38,
              height: 38,
            }}
          />
        )
      case 'Facebook':
        return (
          <FacebookIcon
            color='primary'
            style={{
              borderRadius: '10px',
              width: 38,
              height: 38,
            }}
          />
        )
      case 'YouTube':
        return (
          <YouTubeIcon
            color='primary'
            style={{
              borderRadius: '10px',
              width: 38,
              height: 38,
            }}
          />
        )
      case 'Instagram':
        return (
          <InstagramIcon
            color='primary'
            style={{
              borderRadius: '10px',
              width: 38,
              height: 38,
            }}
          />
        )
      case 'LinkedIn':
        return (
          <LinkedinIcon
            color='primary'
            style={{
              borderRadius: '10px',
              width: 38,
              height: 38,
            }}
          />
        )
      default:
        return null
    }
  }
  return (
    <Box data-testid={testId}>
      <a href={href} target='_New'>
        <Box mr={[0, 3]} display='flex' alignItems='center'>
          {icon(name)}
          <Box ml={1} data-testid={`${testId}-${name}`}>
            <Typography variant='buttonLarge'>{name}</Typography>
          </Box>
        </Box>
      </a>
    </Box>
  )
}

ProfileSocialButtons.propTypes = {
  href: string,
  name: string,
  testId: string,
}
