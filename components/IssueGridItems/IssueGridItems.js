import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  CardContent,
  Typography,
} from '@mui/material'
import dateFormat from 'dateformat'
import { arrayOf, string, object } from 'prop-types'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import paths from '../../paths/path'
import NextImageWrapper from '../images/NextImageWrapper'

/** @todo: reconcile with similar looking components (issueTile) */
export default function IssueGridItems({
  testId = 'issue-grid-items',
  items,
  year,
  topic,
}) {
  return (
    <Grid
      data-testid={testId}
      container
      style={{ marginLeft: '-10px', marginRight: '-10px' }}
      spacing={1.5}
    >
      {items
        .filter(({ publicationDate }) => {
          if (year !== '') {
            const pubYear = publicationDate?.substring(0, 4)

            if (year !== pubYear) return false
          }

          return true
        })
        .filter(({ topics }) => {
          if (topic !== '') {
            if (!topics || (topics && topics.title !== topic)) return false
          }

          return true
        })
        .map(({ slug, thumbnail, publicationDate, volNo, issueNo }, key) => {
          return (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={key}
              data-testid={`${testId}-item`}
            >
              <Card
                sx={{
                  width: '100%',
                  transition: 'all .2s ease-in-out',
                  padding: '10px',
                  marginBottom: '20px',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow:
                      '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
                    borderRadius: '4px',
                  },
                }}
                elevation={0}
                square
              >
                <CardActionArea
                  href={paths.el({ slug: slug })}
                  sx={{
                    '&:hover': {
                      textDecoration: 'none',
                      '& .MuiCardActionArea-focusHighlight': {
                        opacity: 0,
                      },
                    },
                  }}
                  disableRipple
                >
                  <CardMedia title={thumbnail?.alternate}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        minHeight: { xs: '445px', sm: '309px' },
                        objectFit: 'fill',
                      }}
                    >
                      {thumbnail && (
                        <NextImageWrapper
                          src={contentfulImageTransformation(thumbnail)}
                          alt={thumbnail.alternate}
                          width={464}
                          height={600}
                        />
                      )}
                    </Box>
                  </CardMedia>

                  <CardContent
                    sx={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {publicationDate && (
                      <Typography variant='h5'>
                        {dateFormat(publicationDate.slice(0, -1), 'mmm yyyy')}
                      </Typography>
                    )}
                    <Box display='flex'>
                      {volNo && (
                        <Typography variant='caption'>Vol {volNo}</Typography>
                      )}
                      {issueNo && (
                        <Typography variant='caption'>
                          , No. {issueNo}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

IssueGridItems.propTypes = {
  testId: string,
  items: arrayOf(object),
  year: string,
  topic: string,
}
