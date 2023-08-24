import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import dateFormat from 'dateformat'
import paths from '../../../paths/path'

export default function IssueTile({
  slug,
  imageUrl,
  title,
  publicationDate,
  volNo,
  issueNo,
}) {
  return (
    <Card
      sx={{
        position: 'relative',
        width: '205px',
        minHeight: '300px',
        padding: '10px',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow:
            '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
          borderRadius: '4px',
        },
      }}
      square
      elevation={0}
    >
      <CardActionArea
        href={paths.el({ slug: slug })}
        sx={{
          '&:hover': {
            textDecoration: 'none',
            '& .MuiCardActionArea-focusHighlight': {
              opacity: 0,
            },
          },
        }}
        disableRipple
      >
        <CardMedia
          image={imageUrl}
          title={title}
          sx={{
            width: '185px',
            height: '240px',
            backgroundSize: '185px 240px',
          }}
        />

        <CardContent
          sx={{
            padding: '16px 0px',
          }}
        >
          <Box>
            <Typography variant='h5'>
              {publicationDate
                ? dateFormat(publicationDate, 'UTC:mmmm yyyy')
                : ''}
            </Typography>
            <Typography variant='caption'>
              Vol {volNo}, No. {issueNo}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
