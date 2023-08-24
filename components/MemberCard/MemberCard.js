import { Paper, Box, Chip, Typography, List, ListItem } from '@mui/material'
import { string, bool, array } from 'prop-types'
import CtaButton from '../interactives/Buttons/CtaButton'

export default function MemberCard({
  testId = 'MemberCard',
  free,
  popular,
  price,
  title,
  points,
  id,
  ps,
}) {
  const rootStyle = {
    position: 'relative',
    width: { xs: '325px', md: '295px', lg: '325px' },
    height: { lg: 'calc(100% - 24px)' },
    borderRadius: '16px',
    boxShadow:
      '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)',
  }
  const rootPopularStyle = {
    boxShadow: {
      xs: '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)',
      md: '0px 24px 38px rgba(0, 0, 0, 0.04), 0px 9px 46px rgba(0, 0, 0, 0.08), 0px 11px 15px rgba(0, 0, 0, 0.08)',
    },
  }
  return (
    <Paper
      sx={popular ? { ...rootStyle, ...rootPopularStyle } : rootStyle}
      data-testid={testId}
    >
      <Box
        sx={
          popular
            ? {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '16px 24px 36px',
                height: '174px',
                bgcolor: 'primary.main',
                borderRadius: '16px',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: 0,
                color: 'common.white',
                position: { md: 'relative' },
                top: { md: '-24px' },
                /* this targets the details directly after 
                the header only for the popular card */
                '& + div': {
                  md: {
                    position: 'relative',
                    top: '-24px',
                  },
                },
              }
            : {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: '16px 24px 36px',
                height: '150px',
                bgcolor: 'accent.paleGreen',
                borderRadius: '16px',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: 0,
              }
        }
      >
        {popular && (
          <Chip
            label='Most Popular'
            sx={{
              marginLeft: 'auto',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              color: 'common.white',
            }}
            data-testid={`${testId}-popular`}
          />
        )}
        <Box display='flex'>
          <Typography
            sx={{
              fontSize: (theme) => theme.typography.pxToRem(24),
              fontWeight: '600',
              lineHeight: (theme) => theme.typography.pxToRem(24),
              letterSpacing: '0.02em',
            }}
          >
            $
          </Typography>
          <Typography
            sx={{
              fontSize: '3.5rem',
              fontWeight: '800',
              lineHeight: (theme) => theme.typography.pxToRem(50),
              letterSpacing: '0.02em',
            }}
            data-testid={`${testId}-price`}
          >
            {price}
          </Typography>
          <Typography
            variant='subtitle2'
            sx={
              popular
                ? {
                    color: 'common.white',
                    opacity: '0.6',
                    alignSelf: 'flex-end',
                  }
                : {
                    color: 'common.black',
                    opacity: '0.6',
                    alignSelf: 'flex-end',
                  }
            }
          >
            /month
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: { md: '536px' },
          padding: '40px 32px',
          '& ul': {
            paddingLeft: '26px',
            marginBottom: 0,
            '& li:last-child': {
              marginBottom: 0,
            },
          },
        }}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box mb={5} data-testid={`${testId}-points`}>
          <Typography variant='h3'>{title}</Typography>
          <List sx={{ listStyle: 'disc' }}>
            {points &&
              points.map((point, key) => (
                <ListItem
                  key={`${title}-pointer-${key}`}
                  sx={{
                    pointer: {
                      marginBottom: 1,
                      '& p.MuiTypography-root': {
                        fontSize: '14px',
                      },
                    },
                    padding: 0,
                    display: 'list-item',
                    marginTop: 1,
                  }}
                >
                  <Typography variant='body3'>{point}</Typography>
                </ListItem>
              ))}
          </List>
        </Box>
        <Box py={3} data-testid={`${testId}-ps`}>
          <Typography variant='body3'>{ps}</Typography>
        </Box>

        <CtaButton
          variant='contained'
          color='primary'
          size='large'
          label={free ? 'Get Started' : 'Join'}
          backgroundColor={'#3C64B1'}
          id={id}
        />
      </Box>
    </Paper>
  )
}

MemberCard.propTypes = {
  testId: string,
  free: string,
  popular: bool,
  price: string,
  title: string,
  points: array,
  id: string,
  ps: string,
}
