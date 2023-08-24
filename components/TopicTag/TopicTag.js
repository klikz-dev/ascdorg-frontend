import { Chip, Typography, Box } from '@mui/material'
import { string, func, object, bool } from 'prop-types'

export default function TopicTag({
  label,
  onClick,
  href,
  onDelete,
  deleteIcon,
  variant,
  premium,
  textTransform,
  marginRight,
  color,
}) {
  const topic = (variant) => {
    if (variant === 'special') {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {premium && (
            <Box
              component='img'
              role='img'
              src='/images/premium.png'
              alt='premium resources logo'
              style={{ width: '20px', marginRight: '8px' }}
            />
          )}
          <Chip
            component='a'
            data-testid='specialTag'
            label={<Typography variant='overline'>{label}</Typography>}
            href={href}
            onClick={onClick || null}
            onDelete={onDelete || null}
            deleteIcon={deleteIcon}
            sx={{
              mt: 1,
              ml: '2px',
              width: 'fit-content',
              textTransform: textTransform,
              marginRight: marginRight ? marginRight : 0,
              borderRadius: '4px',
              background: 'transparent',
              backgroundColor:
                color === 'white'
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(0, 0, 0, 0.05)',
              color: color ? color : 'text.primary',
              height: '24px',
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'none',
                bgcolor: 'rgba(0, 0, 0, 0.12)',
              },
            }}
            size='small'
          />
        </Box>
      )
    } else if (variant === 'white') {
      return (
        <Chip
          component='a'
          label={<Typography variant='overline'>{label}</Typography>}
          href={href}
          onClick={onClick || null}
          onDelete={onDelete || null}
          deleteIcon={deleteIcon}
          sx={{
            width: 'fit-content',
            textTransform: textTransform,
            marginRight: marginRight ? marginRight : 0,
            borderRadius: '4px',
            backgroundColor: 'background.light',
            color: 'text.primary',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'none',
              bgcolor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
        />
      )
    } else if (variant === 'premium') {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            component='img'
            role='img'
            src='/images/premium.png'
            alt='premium resources logo'
            style={{ width: '30px', marginRight: '8px' }}
          />
          <Chip
            label={
              <Typography
                sx={{
                  textTransform: textTransform,
                  color: '#A45E0A',
                  fontSize: (theme) => theme.typography.pxToRem(11),
                  fontWeight: '600',
                  lineHeight: (theme) => theme.typography.pxToRem(20),
                  letterSpacing: '0.2px',
                }}
              >
                {label}
              </Typography>
            }
            sx={{
              width: 'fit-content',
              marginRight: marginRight ? marginRight : 0,
              backgroundColor: 'rgba(255, 140, 0, 0.12)',
              color: '#A45E0A',
              fontSize: (theme) => theme.typography.pxToRem(11),
              fontWeight: '600',
              lineHeight: (theme) => theme.typography.pxToRem(20),
              letterSpacing: '0.2px',
            }}
          />
        </Box>
      )
    } else if (variant === 'basic') {
      return (
        <Chip
          component='a'
          label={label}
          data-testid='topic'
          href={href}
          onClick={onClick || null}
          onDelete={onDelete || null}
          deleteIcon={deleteIcon}
          sx={{
            width: 'fit-content',
            textTransform: textTransform,
            marginRight: marginRight ? marginRight : 0,
            fontSize: (theme) => theme.typography.pxToRem(14),
            fontWeight: '500',
            lineHeight: (theme) => theme.typography.pxToRem(20),
            letterSpacing: '4%',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'none',
              bgcolor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
          color='primary'
          size='medium'
        />
      )
    } else if (variant === 'basicSmall') {
      return (
        <Chip
          component='a'
          label={label}
          href={href}
          onClick={onClick || null}
          onDelete={onDelete || null}
          deleteIcon={deleteIcon}
          sx={{
            width: 'fit-content',
            textTransform: textTransform,
            marginRight: marginRight ? marginRight : 0,
            fontSize: (theme) => theme.typography.pxToRem(11),
            fontWeight: '500',
            lineHeight: (theme) => theme.typography.pxToRem(20),
            letterSpacing: '4%',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'none',
              bgcolor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
          color='primary'
          size='medium'
        />
      )
    } else {
      return (
        <Chip
          component='a'
          label={label}
          href={href}
          onClick={onClick || null}
          onDelete={onDelete || null}
          deleteIcon={deleteIcon}
          sx={{
            width: 'fit-content',
            textTransform: textTransform,
            marginRight: marginRight ? marginRight : 0,
            fontSize: (theme) => theme.typography.pxToRem(14),
            fontWeight: '500',
            lineHeight: (theme) => theme.typography.pxToRem(20),
            letterSpacing: '4%',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'none',
              bgcolor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
          color={variant === 'basic' ? 'primary' : 'secondary'}
          size='small'
        />
      )
    }
  }

  return <>{topic(variant)}</>
}

TopicTag.propTypes = {
  label: string,
  href: string,
  onClick: func,
  onDelete: func,
  deleteIcon: object,
  variant: string,
  premium: bool,
  textTransform: string,
  marginRight: string,
  color: string,
}
