import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, Typography } from '@mui/material'
import { string, oneOfType, object, bool } from 'prop-types'
import { options } from '../../const'

export default function ReadMore({
  testId = 'read-more',
  links,
  title,
  short,
  long,
  hideSummaryWhenExpanded = false,
  textAlign = 'center',
  titleVariant,
  more = 'Read more',
  less = 'Read less',
  buttonSx,
  descriptionSx,
  bodySx,
}) {
  const [expand, setExpand] = useState(false)

  const showReadMore =
    long ||
    (short &&
      short.nodeType &&
      short.content.filter((node) => node.nodeType === 'paragraph').length > 1)

  const firstParagraph = () => {
    if (short && short.nodeType === 'document') {
      const doc = { ...short }
      const first = doc.content.find((node) => node.nodeType === 'paragraph')
      doc.content = [first]
      return doc
    }
    return null
  }

  const extraContent = () => {
    if (short && short.nodeType === 'document') {
      return short
    }
    return null
  }

  const firstParagraphData = firstParagraph()
  const extraContentData = extraContent()

  return (
    <Box display='flex' flexDirection='column' textAlign={textAlign}>
      <Typography
        data-testid={`${testId}-title`}
        variant={titleVariant ? titleVariant : 'h5'}
        sx={descriptionSx || {}}
      >
        {title}
      </Typography>
      <Box>
        {!expand && (
          <Box
            id='read-more-collapsed'
            sx={{
              '& .MuiBox-root': {
                marginTop: '8px',
              },
            }}
          >
            <Typography
              variant={'body1'}
              data-testid={`${testId}-content`}
              sx={bodySx || {}}
            >
              {firstParagraphData?.content[0]
                ? documentToReactComponents(firstParagraphData, options(links))
                : short}
            </Typography>
          </Box>
        )}
        {expand && !hideSummaryWhenExpanded && (
          <Box
            id='read-more-collapsed'
            sx={{
              '& .MuiBox-root': {
                marginTop: '8px',
              },
            }}
          >
            <Typography
              variant={'body1'}
              data-testid={`${testId}-content`}
              sx={bodySx || {}}
            >
              {firstParagraphData?.content[0]
                ? documentToReactComponents(firstParagraphData, options(links))
                : short}
            </Typography>
          </Box>
        )}
        {expand && (
          <Typography variant={'body1'} sx={bodySx || {}}>
            {extraContentData?.content[0]
              ? documentToReactComponents(extraContentData, options(links))
              : long}
          </Typography>
        )}
        {showReadMore && (
          <Box>
            <Button
              sx={buttonSx ? { ...buttonSx } : { padding: '0', minHeight: 24 }}
              endIcon={
                expand ? (
                  <ExpandLessIcon sx={{ color: 'primary.main' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: 'primary.main' }} />
                )
              }
              onClick={() => setExpand(!expand)}
            >
              <Typography
                variant='buttonLarge'
                data-testid={`${testId}-read-more`}
              >
                {expand ? less : more}
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

ReadMore.proptypes = {
  testId: string,
  title: string,
  short: oneOfType([string, object]),
  long: oneOfType([string, object]),
  links: object,
  hideSummaryWhenExpanded: bool,
  textAlign: string,
  titleVariant: string,
  more: string,
  less: string,
  buttonSx: object,
  descriptionSx: object,
  bodySx: object,
}
