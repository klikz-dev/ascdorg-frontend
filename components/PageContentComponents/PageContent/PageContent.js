import { Box, Typography, Container } from '@mui/material'
import CustomBlock from '../../../const/CustomBlocks'

export default function PageContent({ content, pageId }) {
  return (
    content &&
    content?.items?.map((item, key) => {
      if (item?.__typename === 'ComponentBanner') {
        return (
          <>
            <Box
              pl={[0, 0, 3, 0]}
              pb={[1, 3]}
              maxWidth={['100%', '1024px']}
              margin='auto'
              key={key}
            >
              <CustomBlock item={item} />
              {item?.title === 'About Us' && (
                <Typography textAlign='right' variant='caption'>
                  <Box textAlign='right'>Illustration: Ryan Johnson</Box>
                </Typography>
              )}
            </Box>
          </>
        )
      } else {
        return (
          <Container maxWidth='lg' key={key}>
            <Box mt={[5, 10]}>
              <CustomBlock item={item} pageId={pageId} />
            </Box>
          </Container>
        )
      }
    })
  )
}
