import { Box } from '@mui/material'
import { string, func, arrayOf, shape } from 'prop-types'
import paths from '../../../paths/path'
import TopicTag from '../../TopicTag'

export default function SearchPopoverTopicsList({
  testId = 'search-popover-topics-list',
  items,
  closeSearchPopover,
  path,
}) {
  return (
    <Box
      sx={{
        flexGrow: '1',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: { xs: '12px', md: '16px' },
        '& p': {
          flexGrow: '1',
        },
      }}
      data-testid={testId}
    >
      {items &&
        items
          ?.filter((item) => !!item.title)
          ?.map((topic, key) => (
            <Box key={key} p={0.5}>
              <TopicTag
                label={topic?.title}
                href={paths.search({
                  [`${path}`]: [topic?.title],
                })}
                onClick={() => {
                  closeSearchPopover()
                }}
                variant='basic'
                textTransform='uppercase'
              />
            </Box>
          ))}
    </Box>
  )
}

SearchPopoverTopicsList.propTypes = {
  testId: string,
  items: arrayOf(
    shape({
      title: string,
    })
  ),
  closeSearchPopover: func,
  path: string,
}
