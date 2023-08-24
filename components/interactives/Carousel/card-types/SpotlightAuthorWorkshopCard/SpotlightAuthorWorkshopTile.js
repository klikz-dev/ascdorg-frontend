import { Box, Typography, Card } from '@mui/material'
import { shape, string } from 'prop-types'
import paths from '../../../../../paths/path'
import TopicTag from '../../../../TopicTag'
import SpotlightImage from '../../../../WorkshopComponents/SpotlightImage'
import CtaButton from '../../../Buttons/CtaButton'

export default function SpotlightAuthorWorkshopTile({
  testId = 'SpotlightArticleWorkshopTile',
  slug,
  imageUrl,
  details,
  topicType,
  authorName,
  title,
}) {
  const renderHTTPImage = (image) => {
    if (image) {
      if (image.startsWith('//')) {
        return `https:${image}`
      } else {
        return image
      }
    } else {
      return '/images/ASCDImageFiller.png'
    }
  }

  const displayAuthor = (authorName) => {
    if (authorName.length === 1) {
      return `${authorName?.[0]?.firstName} ${authorName?.[0]?.lastName}`
    } else if (authorName.length === 2) {
      return authorName
        .map((author) => {
          return `${author?.firstName} ${author?.lastName}`
        })
        .join(' & ')
    } else {
      return authorName
        .map((author) => {
          return `${author?.firstName} ${author?.lastName}`
        })
        .join(', ')
    }
  }

  return (
    <Card
      square
      elevation={0}
      sx={{
        border: 'none',
      }}
      data-testid={testId}
    >
      <Card
        disableRipple
        sx={{
          position: 'relative',
          width: '1040px',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            textDecoration: 'none',
          },
        }}
      >
        <SpotlightImage imgUrl={renderHTTPImage(imageUrl)} />
        <Box
          sx={{
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            left: '7.03%',
            right: '44.14%',
            top: '18.8%',
            bottom: '22.8%',
            mt: '10px',
          }}
          data-testid={`${testId}-topic`}
        >
          {topicType && (
            <TopicTag
              variant='special'
              label={topicType}
              color={'black'}
              sx={{ mb: '10px' }}
              data-testid={`${testId}-topicType`}
            />
          )}
          <Typography variant='h3' data-testid={`${testId}-title`}>
            {title}
          </Typography>
          {
            <Typography variant='h5' data-testid={`${testId}-author`}>
              {displayAuthor(authorName)}
            </Typography>
          }
          <Box
            sx={{
              display: 'flex',
              justifyContent: details ? 'space-between' : 'start',
              mt: '5px',
            }}
          >
            <Typography variant='h6' data-testid={`${testId}-details`}>
              {details}
            </Typography>
            <CtaButton
              href={paths.blog({ slug: slug })}
              sx={{
                width: { md: 'fit-content' },
              }}
              color='primary'
              label='Learn more'
              fullWidth
            />
          </Box>
        </Box>
      </Card>
    </Card>
  )
}

SpotlightAuthorWorkshopTile.propTypes = {
  testId: string,
  slug: string,
  imageUrl: string,
  details: string,
  topicType: string,
  authorName: shape({
    firstName: string,
    lastName: string,
  }),
  title: string,
}
