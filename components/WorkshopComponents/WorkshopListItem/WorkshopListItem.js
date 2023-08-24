import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import { string, number, oneOfType, bool } from 'prop-types'
import TopicTag from '../../TopicTag'

export default function WorkshopListItem({
  actionHref,
  mediaImg,
  topicTag,
  authorName,
  title,
  workshopDate,
  clockHours,
  memberPrice,
  nonMemberPrice,
  useMemberBookPrice,
}) {
  return (
    <Card
      square
      elevation={0}
      sx={{
        height: { xs: '250px', md: '450px' },
        borderRadius: '8px',
        padding: '6px',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          boxShadow:
            '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardActionArea
        href={actionHref}
        sx={{
          display: 'flex',
          borderRadius: '8px',
          flexDirection: { md: 'column' },
          '&:hover': {
            textDecoration: 'none',
            '& .MuiCardActionArea-focusHighlight': {
              opacity: '0',
            },
          },
        }}
        disableRipple
      >
        <Box
          sx={{
            position: 'relative',
            height: '200px',
            width: { xs: '30%', md: '100%' },
            borderRadius: '4px',
            bgcolor: 'common.black',
          }}
        >
          <CardMedia
            component='img'
            image={mediaImg}
            sx={{
              borderRadius: '4px',
              height: '200px',
              opacity: '0.8',
              '&:hover': {
                opacity: '0.6',
              },
            }}
          />
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 0,
            width: { xs: '70%', md: '100%' },
            height: { xs: '250px', md: 'inherit' },
            marginLeft: { xs: '2px', md: 0 },
            marginBottom: { md: '2px' },
            '& > div': {
              marginTop: { xs: '4px', md: '1px' },
              marginBottom: 0,
              '&:first-of-type': {
                marginTop: { xs: 0, md: '1.5px' },
              },
            },
          }}
        >
          <Box>
            <Box>
              <Box my={2}>
                <TopicTag label={topicTag} textTransform='uppercase' />
              </Box>
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  lineHeight: { xs: '1.125rem', md: '1.25rem' } /* fallback */,
                  maxHeight: { xs: '5.25rem', md: '4.5rem' },
                  WebkitLineClamp: '1' /* number of lines to show */,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                <Typography variant='h4'>{authorName}</Typography>
              </Box>
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  lineHeight: { xs: '1.125rem', md: '1.25rem' } /* fallback */,
                  maxHeight: { xs: '5.25rem', md: '4.5rem' },
                  WebkitLineClamp: '2' /* number of lines to show */,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                <Typography variant='h4'>{title}</Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1'>
                  {workshopDate} - {clockHours}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant='subtitle1'>
                  ${useMemberBookPrice ? memberPrice : nonMemberPrice}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

WorkshopListItem.propTypes = {
  clockHours: string,
  title: string,
  actionHref: string,
  mediaImg: string,
  topicTag: string,
  authorName: string,
  workshopDate: string,
  memberPrice: oneOfType([string, number]),
  nonMemberPrice: oneOfType([string, number]),
  useMemberBookPrice: bool,
}
