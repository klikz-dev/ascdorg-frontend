import { Box, Card, CardContent, Typography } from '@mui/material'
import { string, number, oneOfType, bool } from 'prop-types'
import InventorySummary from '../../info/InventorySummary'
import CtaButton from '../../interactives/Buttons/CtaButton'
import TopicTag from '../../TopicTag'
import SpotlightImage from '../../WorkshopComponents/SpotlightImage'

export default function WorkshopItem({
  mediaImg,
  title,
  topicTag,
  authorName,
  workshopDate,
  clockHours,
  memberPrice,
  nonMemberPrice,
  id,
  actionHref,
  useMemberBookPrice,
  hasImage,
  firstSubItem,
}) {
  return (
    <Card
      sx={{
        backgroundColor: 'common.white',
        borderRadius: '4px',
        width: '100%',
        height: { md: '100%' },
      }}
      square
      elevation={0}
    >
      {mediaImg && (
        <Box>
          <SpotlightImage imgUrl={mediaImg} imgTitle={title} />
        </Box>
      )}
      {workshopDate && (
        <CardContent
          sx={{
            height: {
              xs: hasImage ? '40%' : '100%',
              md: hasImage ? '30%' : '100%',
            },
            pl: 0,
            pt: { md: hasImage ? 2 : !firstSubItem ? '12px' : '12px' },
            pb: { md: hasImage ? 2 : '12px' },
          }}
        >
          <Box
            sx={{
              backgroundColor: 'common.white',
              borderRadius: '4px',
              width: '100%',
              height: { md: '100%' },
            }}
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
          >
            {topicTag && (
              <Box display='block'>
                <Box mb={1}>
                  <TopicTag textTransform='uppercase' label={topicTag} />
                </Box>
                {authorName && (
                  <Box mr={2}>
                    <Typography variant={'h2'}>{authorName}</Typography>
                  </Box>
                )}
              </Box>
            )}
            <Box display='block' justifyContent='space-between'>
              <Box>
                <Typography variant='h4'>{title}</Typography>
              </Box>
            </Box>
            <Box mt={1}>
              <Typography variant='h4'>{workshopDate}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Box mt={1} mb={1}>
                <Typography variant='h4'>{clockHours}</Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1'>
                  {memberPrice &&
                    nonMemberPrice &&
                    `$${useMemberBookPrice ? memberPrice : nonMemberPrice}
                  `}
                </Typography>
              </Box>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <InventorySummary id={id} />
              <Box>
                <CtaButton
                  variant='outlined'
                  color='primary'
                  label='Learn More'
                  href={actionHref}
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      )}
    </Card>
  )
}

WorkshopItem.propTypes = {
  id: string,
  title: string,
  actionHref: string,
  mediaImg: string,
  topicTag: string,
  authorName: string,
  workshopDate: string,
  memberPrice: oneOfType([string, number]),
  nonMemberPrice: oneOfType([string, number]),
  clockHours: string,
  seatsRemaining: number,
  useMemberBookPrice: bool,
  hasImage: bool,
  firstSubItem: string,
}
