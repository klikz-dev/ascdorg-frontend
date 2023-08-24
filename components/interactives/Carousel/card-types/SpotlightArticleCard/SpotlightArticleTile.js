import { Box, Typography, Card } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { string } from 'prop-types'
import paths from '../../../../../paths/path'
import TopicTag from '../../../../TopicTag'
import SpotlightImage from '../../../../WorkshopComponents/SpotlightImage'
import CtaButton from '../../../Buttons/CtaButton'

export default function SpotlightArticleTile({
  testId = 'SpotlightArticleTile',
  slug,
  imageUrl,
  title,
  topic,
  authorName,
  issueDate,
}) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            left: '7.03%',
            right: '44.14%',
            top: '18.8%',
            bottom: '22.8%',
            mt: '10px',
          }}
        >
          {topic && (
            <TopicTag variant='special' label={topic} color={'black'} />
          )}
          <Typography variant={'h4'}>{title}</Typography>
          <Typography
            variant='b3'
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            data-testid={`${testId}-authorName`}
          >
            {Date.parse(issueDate) ? timeAgo.format(Date.parse(issueDate)) : ''}
            {<Typography sx={{ mx: '4px' }}>&#8226;</Typography>}
            {authorName ? authorName : ''}
          </Typography>
          <CtaButton
            href={paths.blog({ slug: slug })}
            sx={{
              width: { md: 'fit-content' },
            }}
            color='primary'
            label='Read More'
          ></CtaButton>
        </Box>
      </Card>
    </Card>
  )
}

SpotlightArticleTile.propTypes = {
  testId: string,
  slug: string,
  imageUrl: string,
  title: string,
  topic: string,
  authorName: string,
  issueDate: string,
}
