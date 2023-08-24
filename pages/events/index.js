import { Box, Container, Divider, Grid } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import ContentGrid from '../../components/ContentComponents/ContentGrid'
import EventCard from '../../components/EventCard'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TwoColContentListing from '../../components/TwoColContentListing'
import TwoColumnCTA from '../../components/TwoColumnCta'
import CustomBlock from '../../const/CustomBlocks'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import GET_COMPONENT_BANNER from '../../lib/schema/getComponentBanner.graphql'
import GET_COMPONENT_GRID from '../../lib/schema/getComponentGrid.graphql'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_EVENT from '../../lib/schema/pages/getEvent.graphql'
import GET_FUTURE_EVENTS from '../../lib/schema/pages/getFutureEvents.graphql'
import GET_WEBINAR from '../../lib/schema/pages/getWebinar.graphql'
import { renderTime } from '../../lib/utils'
import paths from '../../paths/path'

export default function Events({
  description,
  thumbnail,
  eventUrlDestination,
  type,
  title,
  dateTime,
  endingTime,
  eventUrlLabel,
  eventUrlTarget,
  slug,
  futureEvents,
  webinars,
  SEO,
  events,
  about,
}) {
  const learnmore = [
    {
      title: 'Proposals & Presenters',
      body: 'Find out which events are actively seeking proposal submissions and sign up to be notified when they do. ',
      ctaLabel: 'Learn More',
      ctaLink: 'https://events.ascd.org/proposals',
    },
    {
      title: 'Sponsors & Exhibitors',
      body: "Connect your company to today's education leaders and decision makers at our events.",
      ctaLabel: 'Learn More',
      ctaLink: '/sponsors-exhibitors',
    },
    {
      title: 'Registration Rules',
      body: 'Attendees must be 18 years of age or older, unless advanced written authorization from ASCD is secured.',
      ctaLabel: 'Learn More',
      ctaLink: '/event-registration-policies',
    },
  ]

  const featuredEventDescription = (
    <ReactMarkdown>{`${description}`}</ReactMarkdown>
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />

      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        {events && <CustomBlock item={events} />}
      </Box>

      <Box my={5}>
        <Divider />
      </Box>
      <Container maxWidth='lg'>
        <Box
          mt={10}
          px={[3, 0]}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Grid container spacing={5}>
            {about && <CustomBlock item={about} />}
          </Grid>
        </Box>
        {slug && (
          <Box mt={10}>
            <TwoColumnCTA
              testId='events-2-col-cta'
              label={type?.title}
              title={title}
              date={renderTime(dateTime, endingTime)}
              description={featuredEventDescription}
              image={contentfulImageTransformation(thumbnail)}
              imagePos={'right'}
              variant='grey'
              ctaItems={[
                {
                  __typename: 'ButtonLinkComponent',
                  linkUrl: paths.event({
                    slug: eventUrlDestination || slug,
                  }),
                  linkLabel: eventUrlLabel || 'Learn more',
                  linkTarget: eventUrlTarget ? eventUrlTarget : null,
                },
              ]}
            />
          </Box>
        )}

        <Box pt={10} id='upcoming-events'>
          <TwoColContentListing
            title='Upcoming Events'
            body={
              <ReactMarkdown>
                Register today for an upcoming event. From one-hour virtual
                webinars to multi-day in-person conferences, we have events that
                fit your learning pace and path.
              </ReactMarkdown>
            }
            items={futureEvents}
            variant='event'
          />
        </Box>
      </Container>

      <Box
        mt={10}
        mx={[2, 0]}
        py={[5, 10]}
        px={[3, 0]}
        sx={{
          color: 'text.primary',
          borderTop: '1px',
          borderBottom: '1px',
          border: { md: 0 },
          borderColor: 'grey.extraLight',
          bgcolor: { md: 'grey.extraLight' },
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            {learnmore.map((item, key) => (
              <Grid item xs={12} md={4} key={key}>
                <EventCard
                  title={item.title}
                  body={item.body}
                  ctaLabel={item.ctaLabel}
                  ctaLink={item.ctaLink}
                  ctaTarget={item.ctaTarget}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxWidth='lg'>
        <Box my={11}>
          <ContentGrid
            sectionTitle='Past Webinars'
            items={webinars}
            showFilters={false}
            showDivider={false}
            contentLimit={3}
            viewAllLink={paths.search({ types: ['webinar'] })}
            type='webinar'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()

  const {
    data: { banner },
  } = await contentfulDirectClient.query({
    query: GET_COMPONENT_BANNER,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '1g91BsI01wQ4dMphccgymY',
    },
  })

  const {
    data: { grid },
  } = await contentfulDirectClient.query({
    query: GET_COMPONENT_GRID,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '4CyCpURFHTEaM1fw0nLbdi',
    },
  })

  const {
    data: { webinars },
  } = await contentfulDirectClient.query({
    query: GET_WEBINAR,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      webinarLimit: 0,
      webinarslimit: 3,
      orderWebinars: 'date_DESC',
    },
  })

  const {
    data: { events: featuredEvents },
  } = await contentfulDirectClient.query({
    query: GET_EVENT,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: { featured: true },
      limit: 1,
    },
  })

  const {
    data: { futureEvents },
  } = await contentfulDirectClient.query({
    query: GET_FUTURE_EVENTS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: { dateTime_gt: new Date() },
      limit: 4,
      order: 'dateTime_ASC',
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '1QutpZ1AlKfctrNXtm943j',
    },
  })

  const {
    description,
    thumbnail,
    eventUrlDestination,
    type,
    title,
    dateTime,
    endingTime,
    eventUrlLabel,
    eventUrlTarget,
    slug,
  } = featuredEvents.items[0]

  return {
    props: {
      webinars: webinars.items || [],
      description,
      thumbnail,
      eventUrlDestination,
      type,
      title,
      dateTime,
      endingTime,
      eventUrlLabel,
      eventUrlTarget,
      slug,
      futureEvents: futureEvents.items || [],
      SEO: seo || {},
      events: banner || null,
      about: grid || null,
    },
    revalidate: 20,
  }
}
