import { Grid } from '@mui/material'
import { string, array } from 'prop-types'
import SearchGridItem from '../SearchGridItem'

export default function SearchGridSectionItems({
  testId = 'SearchGridSectionItems',
  hits,
}) {
  const mediaTypes = ['video', 'webinar', 'podcast']
  let sideItems = []
  if (hits?.some((hit) => mediaTypes.includes(hit.type))) {
    sideItems = hits?.slice(1, 2)
  } else {
    sideItems = hits?.slice(1, 4)
  }
  return (
    <Grid container data-testid={testId}>
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
        data-testid={`${testId}-large-item`}
      >
        {hits?.[0] && (
          <SearchGridItem
            testId={`${testId}-large`}
            submedia={false}
            item={hits?.[0]}
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
          spacing={3}
          sx={{
            paddingLeft: { xs: 0, md: 3 },
            height: { md: 504 },
          }}
          data-testid={`${testId}-small-items`}
        >
          {!!sideItems?.length &&
            sideItems?.map((item, key) => {
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
                      WebkitLineClamp: '2' /* number of lines to show */,
                      WebkitBoxOrient: 'vertical',
                    },
                    height: `calc(100% / ${hits.length - 1})`,
                  }}
                  data-testid={`${testId}-small-article`}
                >
                  <SearchGridItem
                    testId={`${testId}-submedia`}
                    submedia
                    item={item}
                  />
                </Grid>
              )
            })}
        </Grid>
      </Grid>
    </Grid>
  )
}

SearchGridSectionItems.propTypes = {
  testId: string,
  hits: array,
}
