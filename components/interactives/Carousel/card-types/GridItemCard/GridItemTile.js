import { Card, CardActionArea, Avatar, Grid, Typography } from '@mui/material'
import { string } from 'prop-types'
import paths from '../../../../../paths/path'

export default function GridItemTile({
  testId = 'GridItemTile',
  thumbnail,
  title,
  slug,
}) {
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
  return (
    <Card square elevation={0} data-testid={testId}>
      <CardActionArea
        href={paths.profile({ slug: slug })}
        disableRipple
        sx={{
          position: 'relative',
          width: '250px',
          height: '250px',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            boxShadow:
              '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
            textDecoration: 'none',
          },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={thumbnail}
            alt={undefined}
            sx={avatarStyle}
            data-testid={`${testId}-thumbnail`}
          />
          <Typography
            variant='h4'
            sx={{
              width: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            data-testid={`${testId}-title`}
          >
            <span style={{ fontSize: 12 }}>{title}</span>
          </Typography>
        </Grid>
      </CardActionArea>
    </Card>
  )
}

GridItemTile.propTypes = {
  testId: string,
  thumbnail: string,
  title: string,
  slug: string,
}
