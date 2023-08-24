import { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import DateFnsUtils from '@date-io/date-fns'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import {
  Box,
  Container,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  ButtonBase,
  Typography,
} from '@mui/material'
import dateFormat from 'dateformat'
import ContentGrid from '../../components/ContentComponents/ContentGrid'
import CtaButton from '../../components/interactives/Buttons/CtaButton'
import Layout from '../../components/layout'
import WorkshopPageContent from '../../components/PageContentComponents/WorkshopPageContent/WorkshopPageContent'
import SEOHead from '../../components/SEOHead'
import NeverMiss from '../../components/WorkshopComponents/NeverMiss'
import WorkshopItem from '../../components/WorkshopComponents/WorkshopItem'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import GET_BUTTON from '../../lib/schema/getButton.graphql'
import GET_TOPICS from '../../lib/schema/getTopics.graphql'
import GET_PAGE_BY_SLUG_QUERY_FIVE from '../../lib/schema/pages/getPageBySlugFive.graphql'
import GET_PAGE_BY_SLUG_QUERY_FOUR from '../../lib/schema/pages/getPageBySlugFour.graphql'
import GET_PAGE_BY_SLUG_QUERY_ONE from '../../lib/schema/pages/getPageBySlugOne.graphql'
import GET_PAGE_BY_SLUG_QUERY_THREE from '../../lib/schema/pages/getPageBySlugThree.graphql'
import GET_PAGE_BY_SLUG_QUERY_TWO from '../../lib/schema/pages/getPageBySlugTwo.graphql'
import GET_WORKSHOP from '../../lib/schema/pages/getWorkshop.graphql'
import { reconcilePageData, findEarliestSessionDate } from '../../lib/utils'
import paths from '../../paths/path'

export default function AuthorWorkshop({
  page,
  featuredWorkshop,
  workshops,
  topics,
  buttonLinkComponent,
}) {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 60 * 4.5 + 8,
        width: 250,
      },
    },
  }

  const featuredVariation = featuredWorkshop?.variations?.items?.[0]

  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const [value, setValue] = useState([new Date(), null])
  const [dateTouched, setDateTouched] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState(['All Topics'])
  const [listOfGridWorkShops, setListOfGridWorkShops] = useState([])

  useEffect(() => {
    let otherWorkshopsFiltered = workshops
    if (!selectedTopics.includes('All Topics')) {
      otherWorkshopsFiltered = workshops.filter(
        (ow) =>
          ow.topics &&
          ow.topics.items?.some(
            (t) => selectedTopics && selectedTopics.some((s) => s === t.title)
          )
      )
    }

    if (value[0] !== null && otherWorkshopsFiltered) {
      const ows = otherWorkshopsFiltered.filter(
        (ow) =>
          ow.variations &&
          ow.variations.items?.some(
            (v) =>
              v?.sessions &&
              v?.sessions.items?.every((s) => {
                return value[1]
                  ? new Date(s?.startDatetime) >= new Date(value[0]) &&
                      new Date(s?.startDatetime) <= new Date(value[1])
                  : new Date(s?.startDatetime) >= new Date(value[0])
              })
          )
      )

      /** we want separate variations now instead of later */
      /** sort the list by the earliest session date of each variation */
      const separateVariations = ows
        .map((item) =>
          item.variations.items?.map((variation) => {
            return { ...item, variation }
          })
        )
        .flat()
        .sort((a, b) => findEarliestSessionDate(a) - findEarliestSessionDate(b))

      setListOfGridWorkShops(separateVariations)
    }
  }, [value, selectedTopics])

  return (
    <Layout>
      <SEOHead seo={page.seo || page} />
      <Box mb={[6, 10]}>
        <WorkshopPageContent content={page?.content?.items} />
      </Box>
      <Container>
        {featuredWorkshop && (
          <Box mb={[6, 10]} mt={[6, 10]}>
            <Box mb={3}>
              <Typography variant='h4' id='allworkshops'>
                Upcoming Author Workshops
              </Typography>
            </Box>
            <WorkshopItem
              hasMemberBookPrice
              mediaImg={contentfulImageTransformation(
                featuredWorkshop?.spotlightImage
              )}
              title={featuredVariation?.title}
              topicTag={featuredWorkshop?.type?.title}
              authorName={featuredWorkshop?.authors?.items
                ?.map((a) => `${a?.firstName} ${a?.lastName}`)
                .join(' & ')}
              workshopDate={
                featuredVariation &&
                dateFormat(
                  findEarliestSessionDate({
                    variation: featuredVariation,
                  }),
                  'mediumDate'
                )
              }
              clockHours={`${featuredWorkshop.clockHours} Clock Hours`}
              memberPrice={featuredVariation?.memberPrice}
              nonMemberPrice={featuredVariation?.nonMemberPrice}
              id={featuredVariation?.variationId}
              actionHref={paths.workshop({
                slug: `${featuredWorkshop.slug}/${
                  featuredVariation ? featuredVariation.variationId : ''
                }`,
              })}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'center' },
          }}
        >
          <Box pl={1}>
            <FormControl
              variant='outlined'
              sx={{
                margin: 1,
                minWidth: '150px',
                maxWidth: '150px',
              }}
            >
              <Select
                multiple
                value={selectedTopics}
                MenuProps={MenuProps}
                onChange={(event) => setSelectedTopics(event.target.value)}
                displayEmpty
              >
                <MenuItem value='All Topics'>All Topics</MenuItem>
                {topics.map((topic) => (
                  <MenuItem key={topic?.title} value={topic?.title}>
                    {topic?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box pl={1}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <DateRangePicker
                calendars={2}
                value={value}
                inputFormat='MMM dd, yyyy'
                /** set the min date to today so past events cant be searched */
                minDate={new Date()}
                /** https://github.com/mui/material-ui/issues/30490#issuecomment-1046902445 */
                disableMaskedInput={true}
                onChange={(newValue) => {
                  setValue(newValue)
                  setDateTouched(true)
                }}
                renderInput={({ inputProps, ...startProps }, endProps) => {
                  const startValue = inputProps.value
                  delete inputProps.value
                  return (
                    <OutlinedInput
                      {...startProps}
                      /** it's being passed in from startProps, but it gives a warning because it's set to false */
                      focused={undefined}
                      style={{ width: 280 }}
                      inputProps={{ ...inputProps, readOnly: true }}
                      placeholder='Select Date Range'
                      notched={false}
                      label='Date Range'
                      type='text'
                      value={
                        dateTouched
                          ? `${startValue} - ${endProps?.inputProps?.value}`
                          : 'Filter By Date'
                      }
                      endAdornment={<CalendarTodayIcon />}
                    />
                  )
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              pt: { xs: 1, md: 0 },
              pl: { xs: 0, md: 1 },
            }}
          >
            <ButtonBase
              onClick={() => {
                setSelectedTopics(['All Topics'])
                setValue([new Date(), null])
                setDateTouched(false)
              }}
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  color: 'hover.main',
                  textDecoration: 'underline',
                },
              }}
            >
              <Typography variant='body2'>Clear Filters</Typography>
            </ButtonBase>
          </Box>
        </Box>
        {listOfGridWorkShops && listOfGridWorkShops[0] ? (
          <Box mb={[6, 10]} mt={[6, 10]}>
            <ContentGrid
              showFilters={false}
              showDivider={false}
              showViewAll={false}
              items={listOfGridWorkShops}
              columnWidth={4}
              limit={6}
              variant='workshop'
              useMemberBookPrice={hasMemberBookPrice}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CtaButton
                variant='contained'
                label={buttonLinkComponent?.linkLabel}
                href={buttonLinkComponent?.linkUrl}
                target={buttonLinkComponent?.linkTarget}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant='h4'>No Events Found.</Typography>
          </Box>
        )}
        <Box>
          <NeverMiss />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  /** The page query as a whole is too large for Contentful limits (8kb query size), so
   * it is being broken into 3 parts and reconciled after fetching
   */
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: {
      pages: { items },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_ONE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { sys: { id: 'WpvgWmRtYdbaQdWZnDwtR' } },
    },
  })

  const {
    data: {
      pages: { items: itemsTwo },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_TWO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { sys: { id: 'WpvgWmRtYdbaQdWZnDwtR' } },
    },
  })

  const {
    data: {
      pages: { items: itemsThree },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_THREE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { sys: { id: 'WpvgWmRtYdbaQdWZnDwtR' } },
    },
  })

  const {
    data: {
      pages: { items: itemsFive },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_FIVE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      memberPriceCollectionLimit: 6,
      memberPriceItemCollectionLimit: 10,
      where: { sys: { id: 'WpvgWmRtYdbaQdWZnDwtR' } },
    },
  })

  /** rich text component is 'too complex' for single query here */
  let promiseChain = []

  for (let i = 0; i < 5; i++) {
    promiseChain.push([
      await contentfulDirectClient.query({
        query: GET_PAGE_BY_SLUG_QUERY_FOUR,
        variables: {
          preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
          skip: 10 * i,
          limit: 1,
          contentCollectionLimit: 10,
          where: { sys: { id: 'WpvgWmRtYdbaQdWZnDwtR' } },
        },
      }),
    ])
  }

  const itemsData = await Promise.all(promiseChain)

  const restItems = [...itemsData.flat()]
    .map((items) => items?.data?.pages.items?.[0]?.content?.items)
    .flat()

  const itemsFour = [{ content: { items: [...restItems] } }]

  const page = reconcilePageData(
    items,
    itemsTwo,
    itemsThree,
    itemsFour,
    itemsFive
  )

  if (!page || !page.content?.items || page.content?.items.length === 0) {
    return {
      notFound: true,
    }
  }

  const {
    data: { workshops: featuredWorkshops },
  } = await contentfulDirectClient.query({
    query: GET_WORKSHOP,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { featured_not: null, featured: true },
      topicsLimit: 9,
    },
  })

  const {
    data: { workshops },
  } = await contentfulDirectClient.query({
    query: GET_WORKSHOP,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 8,
      where: { variationsCollection_exists: true },
      topicsLimit: 9,
    },
  })

  const {
    data: { topics },
  } = await contentfulDirectClient.query({
    query: GET_TOPICS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
    },
  })

  const {
    data: { buttonLinkComponent },
  } = await contentfulDirectClient.query({
    query: GET_BUTTON,

    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',

      id: '3L2xD88tB1UCIvMAfEVZ8w',
    },
  })

  return {
    props: {
      page: page || null,
      featuredWorkshop: featuredWorkshops.items[0] || [],
      workshops: workshops.items || [],
      topics: topics.items || [],
      buttonLinkComponent: buttonLinkComponent || [],
    },
    revalidate: 20,
  }
}
