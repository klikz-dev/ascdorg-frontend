import { useState } from 'react'
import { Close, Tune } from '@mui/icons-material'
import {
  Box,
  Grid,
  Typography,
  Drawer,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { string, object, func } from 'prop-types'
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  ScrollTo,
  Stats,
} from 'react-instantsearch-dom'
import { renderLabel } from '../../../lib/utils'
import CustomCurrentRefinements from '../../AlgoliaComponents/CustomCurrentRefinements'
import CustomSearchBox from '../../AlgoliaComponents/CustomSearchBox'
import ProfileHitComponent from '../ProfieHitComponent'
import SearchFilters from '../SearchFilters'

export default function ProfileSearch({
  testId = 'search',
  searchClient,
  onSearchStateChange,
  searchState,
  createURL,
  indexName,
}) {
  const mobileView = useMediaQuery((theme) =>
    theme.breakpoints.down('mobileCutoff')
  )

  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false)

  const searchRefinementsArray = [
    {
      categoryName: 'Featured',
      attribute: 'featured',
      operator: 'and',
      transformItems: (items) =>
        items.map((item) => ({
          ...item,
          label: item.label === 'false' ? 'No' : 'Yes',
        })),
    },
    {
      categoryName: 'Content Type',
      attribute: 'contentTypes',
      operator: 'and',
      transformItems: (items) =>
        items.map((item) => ({
          ...item,
          label: renderLabel(item),
        })),
    },
    { categoryName: 'Topics', attribute: 'topics', operator: 'and' },
    { categoryName: 'Profile Type', attribute: 'profileType', operator: 'and' },
    {
      categoryName: 'Areas of Expertise',
      attribute: 'keywords',
      operator: 'and',
      showMoreLimit: 30,
    },
  ]

  return (
    <Grid container data-testid={testId}>
      <InstantSearch
        searchClient={searchClient}
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
        createURL={createURL}
        indexName={indexName}
      >
        <Configure hitsPerPage={12} />
        <Grid item xs={12}>
          <ScrollTo>
            <Box
              sx={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                backgroundColor: 'grey.dark',
                borderRadius: '0px 0px 0px 64px',
                padding: '52px 0 40px',
                marginBottom: { xs: '12px', md: '56px' },
              }}
            >
              <CustomSearchBox
                delay={1500}
                disableUnderline
                customContainerSx={{
                  maxWidth: '850px !important',
                  width: 'calc(98%-1rem) !important',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                customInputSx={{
                  color: 'white',
                  margin: 'auto',
                  width: '100%',
                  height: '60px',
                  fontSize: '20px',
                  fontWeight: '700',
                  letterSpacing: '0.2px',
                  fontFamily: 'Mulish, Arial',
                  padding: '5px 0px 5px 16px',
                  borderBottom: '1px solid',
                }}
              />
            </Box>
          </ScrollTo>
        </Grid>
        {mobileView ? (
          <>
            <Drawer
              anchor={'right'}
              open={filtersDrawerOpen}
              onClose={() => setFiltersDrawerOpen(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: { xs: '80%', sm: 'unset' },
                },
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: 'background.light',
                  padding: '20px 12px 12px',
                  borderBottom: '1px solid rgba(33, 33, 33, 0.08)',
                }}
              >
                <IconButton
                  sx={{
                    color: 'grey.medium',
                    marginRight: '10px',
                    '&:hover': {
                      color: 'hover.main',
                    },
                  }}
                  onClick={() => setFiltersDrawerOpen(false)}
                  size='large'
                >
                  <Close />
                </IconButton>
                <Typography variant='h4'>Filters</Typography>
              </Box>
              <SearchFilters searchRefinementsArray={searchRefinementsArray} />
            </Drawer>
          </>
        ) : (
          <Grid item xs={12} md={4}>
            <SearchFilters searchRefinementsArray={searchRefinementsArray} />
          </Grid>
        )}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: { xs: '24px', md: '30px' },
              marginTop: { xs: '24px', md: 0 },
            }}
          >
            <Typography
              variant='h5'
              sx={{
                marginRight: '24px',
              }}
            >
              <Stats
                translations={{
                  stats(nbHits) {
                    return `${nbHits.toLocaleString()} results`
                  },
                }}
              />
            </Typography>
            {mobileView && (
              <Button
                variant='outlined'
                color='primary'
                startIcon={<Tune />}
                onClick={() => setFiltersDrawerOpen(true)}
              >
                Filters
              </Button>
            )}
          </Box>
          <Grid container>
            <Grid item sx={{ width: '95.5%' }}>
              <Box>
                <CustomCurrentRefinements />
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                'div > ul': {
                  pl: 0,
                  li: {
                    listStyle: 'none',
                  },
                },
              }}
            >
              <Hits hitComponent={ProfileHitComponent} />
            </Grid>
          </Grid>
          <Box
            py={3}
            sx={{
              'div > ul': {
                display: 'flex',
                li: {
                  listStyle: 'none',
                },
              },
            }}
          >
            <Pagination
              showFirst={true}
              showPrevious={false}
              showNext={false}
              showLast={true}
              className='search-pagination'
              translations={{
                first: '<',
                last: '>',
                ariaFirst: 'First page',
                ariaLast: 'Last page',
                page(currentRefinement) {
                  return currentRefinement
                },
                ariaPage(currentRefinement) {
                  return `Page ${currentRefinement}`
                },
              }}
            />
          </Box>
        </Grid>
      </InstantSearch>
    </Grid>
  )
}

ProfileSearch.proptypes = {
  testId: string,
  searchState: object,
  onSearchStateChange: func,
  createURL: func,
  indexName: string,
  searchClient: object,
}
