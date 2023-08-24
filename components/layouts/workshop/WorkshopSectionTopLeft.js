import { Box, Typography } from '@mui/material'
import ProfileSummary from '../../info/ProfileSummary'
import ReadMore from '../../ReadMore'
import Topics from '../../Topics'
import TopicTag from '../../TopicTag'

const WorkshopSectionTopLeft = ({
  type,
  title,
  description,
  roles,
  grades,
  keywords,
  authors,
}) => {
  return (
    <Box>
      <Box mb={1}>
        {type?.title && <TopicTag variant='topic' label={type?.title} />}
      </Box>
      <Box mb={2}>
        <Typography variant={'h1'}>{title}</Typography>
      </Box>
      <Box id='about' style={{ margin: '0px' }}>
        <ReadMore
          more='Show more'
          less='Show less'
          buttonSx={{
            color: 'primary.main',
            textDecoration: 'under',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'background.light',
            },
          }}
          short={description?.json}
          textAlign='left'
          hideSummaryWhenExpanded
        />
      </Box>

      <Box mt={3} data-testid='roles'>
        <Topics
          title='Who should attend?'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={roles?.items}
          contentType='workshop'
        />
      </Box>
      <Box mt={3} data-testid='grades'>
        <Topics
          title='Grade Levels'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={grades?.items}
          contentType='workshop'
        />
      </Box>
      <Box mt={3} data-testid='topicsCovered'>
        <Topics
          title='Topics covered'
          titleVariant='h6'
          variant='basicSmall'
          mt={2}
          topics={keywords?.items}
          contentType='workshop'
        />
      </Box>
      <Box mt={5}>
        <ProfileSummary
          profiles={authors?.items}
          title={
            authors?.items?.length > 0
              ? 'About the Authors'
              : 'About the Author'
          }
        />
      </Box>
    </Box>
  )
}

export default WorkshopSectionTopLeft
