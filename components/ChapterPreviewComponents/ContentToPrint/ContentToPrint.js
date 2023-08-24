import { forwardRef } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { chapterPreviewOptions } from '../../../const/options'

const ContentToPrint = forwardRef(
  ({ currentChapter, userAccountUser, chapterDetails, loading }, ref) => (
    <table>
      <tbody>
        <tr>
          <td>
            <Box
              sx={{
                height: '100vh',
                width: '100vw',
                paddingBottom: '32px',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              display='block'
            >
              <Box
                sx={{
                  overflowX: 'auto',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                color='black'
                pl={[6.5, 8, 3]}
                pt={3}
                pr={[6, 3, 7]}
                display='block'
                minWidth={['80vw', '30vw', '35vw', '27vw']}
                height={['83vh', 'auto']}
              >
                <Box ref={ref} p={6}>
                  <Typography color='black' variant='h3'>
                    {currentChapter?.title}
                  </Typography>
                  {!loading
                    ? documentToReactComponents(
                        chapterDetails[0]?.body?.json,
                        chapterPreviewOptions(chapterDetails[0]?.body?.links)
                      )
                    : ''}
                  <Box
                    sx={{
                      marginTop: '16px',
                      bottom: '0',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle3'>
                      Printed by {userAccountUser?.name} for personal use only
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </td>
        </tr>
      </tbody>
    </table>
  )
)

export default ContentToPrint
