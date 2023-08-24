import { Box, Divider, Grid, Typography } from '@mui/material'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import paths from '../../paths/path'
import ArticleItem from '../ArticleComponents/ArticleItem'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'

/** @todo: merge with SearchGridSection (or visa versa) */
export default function GridSection({
  testId = 'grid-section',
  title,
  ctaLink,
  items,
  variant = 'articleOverlay',
}) {
  let sideItems = []
  if (items?.length) {
    sideItems = items.slice(1, 4)
  }

  return (
    <Box data-testid={testId}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        {title && <Typography variant='h4'>{title}</Typography>}
        <ViewAllCTA label='View all' href={ctaLink} lg />
      </Box>
      <Grid container sx={{}}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            '& h3': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2' /* number of lines to show */,
              WebkitBoxOrient: 'vertical',
            },
            marginBottom: { xs: '20px', md: 0 },
          }}
        >
          {variant == 'articleOverlay' && (
            <ArticleItem
              actionHref={paths[items[0].__typename.toLowerCase()]({
                slug: items[0].slug,
              })}
              mediaImg={contentfulImageTransformation(items[0].image)}
              title={items?.[0]?.title}
              premium={items?.[0]?.premium}
              topicTag={items?.[0]?.topic?.title}
              authorName={items?.[0]?.authors?.items}
              datePublished={items?.[0]?.issueDate}
              overlay
            />
          )}
          {variant == 'articleUnder' && (
            <ArticleItem
              actionHref={paths[items[0].__typename.toLowerCase()]({
                slug: items[0].slug,
              })}
              mediaImg={contentfulImageTransformation(items[0].image)}
              title={items?.[0]?.title}
              premium={items?.[0]?.premium}
              topicTag={items?.[0]?.topic?.title}
              authorName={items?.[0]?.authors?.items}
              datePublished={items?.[0]?.issueDate}
              hasImage
            />
          )}
          {variant == 'articleUnder' && (
            <Divider
              sx={{
                display: { xs: 'block', md: 'none' },
                marginTop: (theme) => theme.typography.pxToRem(20),
              }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Grid
            container
            spacing={variant == 'articleOverlay' ? 3 : 1}
            sx={{
              paddingLeft: { xs: 0, md: 3 },
              height: { md: variant === 'articleOverlay' ? 504 : 554 },
              marginTop: { md: '-12px' },
            }}
          >
            {sideItems.map(
              (
                {
                  __typename,
                  slug,
                  image,
                  title,
                  premium,
                  topic,
                  authors,
                  issueDate,
                },
                key
              ) => {
                const divider = sideItems.length > key + 1
                return (
                  <Grid
                    item
                    xs={12}
                    key={key}
                    sx={{
                      '& h3': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2 /* number of lines to show */,
                        WebkitBoxOrient: 'vertical',
                      },
                      height: `calc(100% / ${items.length - 1})`,
                    }}
                  >
                    {variant == 'articleOverlay' && (
                      <ArticleItem
                        actionHref={paths[__typename.toLowerCase()]({
                          slug: slug,
                        })}
                        mediaImg={contentfulImageTransformation(image)}
                        title={title}
                        premium={premium}
                        topicTag={topic?.title}
                        authorName={authors?.items}
                        datePublished={issueDate}
                        submedia
                        overlay
                      />
                    )}
                    {variant == 'articleUnder' && (
                      <ArticleItem
                        actionHref={paths[__typename.toLowerCase()]({
                          slug: slug,
                        })}
                        mediaImg={contentfulImageTransformation(image)}
                        title={title}
                        premium={premium}
                        topicTag={topic?.title}
                        authorName={authors?.items}
                        datePublished={issueDate}
                        firstSubItem={key == 0}
                      />
                    )}
                    {divider && variant == 'articleUnder' && <Divider />}
                  </Grid>
                )
              }
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
