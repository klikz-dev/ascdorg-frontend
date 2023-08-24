import { forwardRef } from 'react'
import { Box } from '@mui/material'
import { string, node } from 'prop-types'

const ArticleBody = forwardRef(({ testId = 'article-body', children }, ref) => {
  return (
    <Box
      id='articleBody'
      data-testid={testId}
      ref={ref}
      sx={{
        '& blockquote': {
          borderLeft: (theme) =>
            `${theme.spacing(1)} solid ${theme.palette.primary.main}`,
          pl: 2,
        },
      }}
    >
      {children}
    </Box>
  )
})

export default ArticleBody

ArticleBody.propTypes = {
  testId: string,
  children: node,
}
