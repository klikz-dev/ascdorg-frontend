import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, ListItem, List } from '@mui/material'

const socialButtons = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/ascd.org',
    icon: <FacebookIcon />,
    ariaLabel: 'External Link: Visit our Facebook page',
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/ASCD',
    icon: <TwitterIcon />,
    ariaLabel: 'External Link: Visit our Twitter page',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/officialascd',
    icon: <InstagramIcon />,
    ariaLabel: 'External Link: Visit our Instagram page',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ascd',
    icon: <LinkedInIcon />,
    ariaLabel: 'External Link: Visit our LinkedIn page',
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/user/officialascd',
    icon: <YouTubeIcon />,
    ariaLabel: 'External Link: Visit our YouTube page',
  },
  {
    title: 'Pinterest',
    href: 'https://www.pinterest.com/officialascd',
    icon: <PinterestIcon />,
    ariaLabel: 'External Link: Visit our Pinterest page',
  },
]

export default function SocialButtons({ testId = 'SocialButtons' }) {
  return (
    <Box data-testid={testId}>
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-end' },
          paddingLeft: 0,
          marginTop: { xs: '18px', md: '2px' },
          marginBottom: { xs: '18px', md: '2px' },
        }}
      >
        {socialButtons.map((socialButton) => (
          <List
            key={socialButton.title}
            sx={{
              listStyleType: 'none',
              width: { xs: '36px', sm: '28px' },
              height: { xs: '36px', sm: '28px' },
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              margin: '0 4px',
              '&:last-of-type': { marginRight: { xs: 'initial', sm: 0 } },
              transition: 'all .2s ease-in-out',
              '&:hover, &:focus': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.2)',
              },
              '& a': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                '& .MuiSvgIcon-root': {
                  height: 18,
                  width: 18,
                  '& path': {
                    color: 'primary.dark',
                  },
                },
              },
            }}
            data-testid={`${testId}-${socialButton.title}`}
          >
            <a
              href={socialButton.href}
              title={socialButton.title}
              target='_blank'
              rel='noreferrer'
            >
              {socialButton.icon}
            </a>
          </List>
        ))}
      </ListItem>
    </Box>
  )
}
