import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Divider, Typography } from '@mui/material'
import { string, shape, array, object } from 'prop-types'
import { articleEndNoteOptions } from '../../../const/options'

export default function ArticleEndNote({
  testId = 'article-end-note',
  title,
  notes,
}) {
  return (
    <Box
      sx={{
        '& blockquote': {
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },
      }}
      data-testid={testId}
    >
      <Box mb={2}>
        <Typography variant='h5' data-testid={`${testId}-title`}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'common.black' }} />
      <Box mx={2} mt={1} data-testid={`${testId}-notes`}>
        {documentToReactComponents(notes, articleEndNoteOptions)}
      </Box>
    </Box>
  )
}

ArticleEndNote.proptypes = {
  testId: string,
  title: string,
  notes: shape({
    data: object,
    content: array,
    DocumentType: string,
  }),
}
