import { Box, Container, Divider } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import GreenBanner from '../../components/Banners/GreenBanner'
import HeroHalfHalf from '../../components/Banners/HeroHalfHalf'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import TwoColContentListing from '../../components/TwoColContentListing'
import CustomBlock from '../../const/CustomBlocks'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import {
  contentfulImageTransformation,
  contentfulAPIToSEOHead,
} from '../../lib/data-transformations'
import GET_EVENT from '../../lib/schema/pages/getEvent.graphql'
import GET_EVENT_LIST_QUERY from '../../lib/schema/pages/getEventList.graphql'
import GET_FUTURE_EVENTS from '../../lib/schema/pages/getFutureEvents.graphql'

export default function Event({
  title,
  location,
  description,
  thumbnail,
  seo,
  link,
  dateTime,
  endingTime,
  linkButton,
  eventId,
  priceMember,
  nonMemberPrice,
  taxJar,
  embeddedMediaContent,
  otherModules,
  futureEvents,
  button1,
  button2,
}) {
  return (
    <Layout>
      <SEOHead seo={seo} />
      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <HeroHalfHalf
          title={title}
          description={description}
          imagePos={false}
          image={contentfulImageTransformation(thumbnail)}
          imageAlt={thumbnail?.alternate}
          ctaItems={[
            ...(button1?.__typename
              ? [
                  {
                    ...button1,
                    buttonStyle: ['Large'],
                  },
                ]
              : []),
            ...(button2?.__typename
              ? [
                  {
                    __typename: button2?.__typename,
                    linkUrl: button2?.buttonTwoLinkUrl,
                    linkLabel: button2?.buttonTwoLinkLabel,
                    linkTarget: button2?.buttonTwoLinkTarge,
                    buttonStyle: [
                      'Color: White w/gray border and black text',
                      'Large',
                    ],
                  },
                ]
              : []),
          ]}
        />
      </Box>
      <GreenBanner
        title={title}
        link={link}
        location={location}
        dateTime={dateTime}
        endingTime={endingTime}
        linkButton={linkButton}
        eventId={eventId}
        image={contentfulImageTransformation(thumbnail)}
        description={description}
        priceMember={priceMember}
        nonMemberPrice={nonMemberPrice}
        taxJar={taxJar}
      />
      {embeddedMediaContent && (
        <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
          <CustomBlock item={embeddedMediaContent} />
        </Box>
      )}
      {!!otherModules?.items.length &&
        otherModules?.items.map((item, key) => (
          <Box py={4} maxWidth={['100%', '1024px']} margin='auto' key={key}>
            <CustomBlock item={item} />
          </Box>
        ))}
      <Container maxWidth='lg'>
        <Divider />
        <Box mt={[5, 10]} mb={8}>
          <TwoColContentListing
            title='More events from ASCD'
            items={futureEvents}
            limit={4}
            body={
              <ReactMarkdown>
                Register today for an upcoming event. From one-hour virtual
                webinars to multi-day in-person conferences, we have events that
                fit your learning pace and path.
              </ReactMarkdown>
            }
            variant='event'
          />
        </Box>
        <Divider />
        <Box my={10}>
          <TextCTA
            title='Become a Member'
            description='Save on event registration fees and enjoy access to exclusive webinars.'
            ctaLabel='Join'
            ctaLink='/memberships'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { events: eventData },
  } = await contentfulDirectClient.query({
    query: GET_EVENT_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
    },
  })

  return {
    paths: eventData?.items?.map((item) => ({
      params: { event: item.slug },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { events },
  } = await contentfulDirectClient.query({
    query: GET_EVENT,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: { slug: params.event },
      limit: 1,
    },
  })

  const {
    data: { futureEvents },
  } = await contentfulDirectClient.query({
    query: GET_FUTURE_EVENTS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: { slug_not: params.event, dateTime_gt: new Date() },
      limit: 4,
      order: 'dateTime_ASC',
    },
  })

  if (!events?.items.length) {
    return {
      notFound: true,
    }
  }

  const {
    title,
    location,
    description,
    thumbnail,
    seo,
    link,
    dateTime,
    endingTime,
    linkButton,
    eventId,
    priceMember,
    nonMemberPrice,
    taxJar,
    embeddedMediaContent,
    otherModules,
    __typename,
    sys,
    button1,
    button2,
  } = events?.items[0] || null

  return {
    props: {
      title,
      location,
      description,
      thumbnail,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          description: description?.json,
          thumbnail,
          sys,
          __typename,
        }),
      link,
      dateTime,
      endingTime,
      linkButton,
      eventId,
      priceMember,
      nonMemberPrice,
      taxJar,
      embeddedMediaContent,
      otherModules,
      futureEvents: futureEvents?.items || [],
      button1,
      button2,
    },
    revalidate: 20,
  }
}
