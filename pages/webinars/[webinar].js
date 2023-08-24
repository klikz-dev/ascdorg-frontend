import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Container, Divider, Skeleton } from '@mui/material'
import ArticleAuthors from '../../components/ArticleComponents/ArticleAuthors'
import ContentGrid from '../../components/ContentComponents/ContentGrid'
import Layout from '../../components/layout'
import ReadMore from '../../components/ReadMore'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import Topics from '../../components/Topics'
import TwoColumnCta from '../../components/TwoColumnCta'
import VideoPlaylist from '../../components/VideoComponents/VideoPlaylist'
import { options } from '../../const'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import {
  contentfulImageTransformation,
  contentfulAPIToSEOHead,
} from '../../lib/data-transformations'
import GET_WEBINAR from '../../lib/schema/pages/getWebinar.graphql'
import GET_WEBINAR_LIST_QUERY from '../../lib/schema/pages/getWebinarList.graphql'
import paths from '../../paths/path'

export default function Webinar({
  topicSecondary,
  featuredBook,
  seo,
  videoId,
  title,
  topic,
  premium,
  date,
  description,
  authors,
  webinars,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton
        animation='wave'
        variant='rectangular'
        width='100%'
        height='100px'
      />
    )
  }

  const secondaryTopics =
    topicSecondary &&
    topicSecondary.items.reduce((unique, o) => {
      if (!unique.includes(o)) {
        unique.push(o)
      }
      return unique
    }, [])

  const topics = [...secondaryTopics, topic]

  const latestWebinars = [...webinars].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const relatedWebinars = latestWebinars.filter(
    (item) => item?.topic?.title === topic?.title
  )

  const book = featuredBook
  return (
    <Layout>
      <SEOHead seo={seo} />
      <Container>
        <Box pb={3} mt={2}>
          <VideoPlaylist
            topic={topic}
            videoId={videoId}
            premium={premium}
            title={title}
            date={date}
            videos={relatedWebinars}
            type='webinar'
          />
        </Box>
      </Container>

      <Box mb={[0, 10]}>
        <Divider />
      </Box>

      <Container>
        <Box maxWidth={850}>
          {description?.json && (
            <Box mt={[5, 0]} id='about'>
              <ReadMore
                title='In this Webinar'
                titleVariant='h4'
                short={description?.json}
                textAlign='left'
                hideSummaryWhenExpanded
              />
            </Box>
          )}
          {authors.items && authors.items.length > 0 && (
            <Box mt={[5, 9]} id='webinar-presenter'>
              <ArticleAuthors
                authors={authors.items}
                title='About the presenter'
              />
            </Box>
          )}
          {!!topics?.length && (
            <Box mt={6} id='topics'>
              <Topics
                title='Topics covered'
                titleVariant='h4'
                topics={topics}
                contentType='webinar'
                variant='basicSmall'
              />
            </Box>
          )}
        </Box>
        {book && (
          <Box my={11}>
            <TwoColumnCta
              testId='webinar-book-2-col-cta'
              title={book.title}
              description={
                documentToReactComponents(book?.description?.json, options())[0]
              }
              ctaItems={[
                {
                  __typename: 'ButtonLinkComponent',
                  linkUrl: paths.book({ slug: book?.slug }),
                  linkLabel: 'Shop',
                },
              ]}
              label={book.topic?.title}
              image={contentfulImageTransformation(book.featuredImage)}
              imagePos='right'
              variant='grey'
            />
          </Box>
        )}
        <Box mt={11}>
          <ContentGrid
            sectionTitle='Latest Webinars'
            items={latestWebinars}
            viewAllLink={paths.search({ types: ['webinar'] })}
          />
        </Box>
        <Box my={9}>
          <TextCTA
            title='Learn and Connect With Peers'
            description='Join us for one of our upcoming live events to continue learning while having the opportunity to connect with educators from around the world!'
            ctaLabel='Upcoming Events'
            ctaLink={paths.events}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { webinars: webinarData },
  } = await contentfulDirectClient.query({
    query: GET_WEBINAR_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: webinarData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { webinar: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { webinar, webinars },
  } = await contentfulDirectClient.query({
    query: GET_WEBINAR,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      whereWebinar: { slug: params?.webinar },
      whereWebinars: { slug_not: params?.webinar },
      webinarLimit: 1,
      webinarsLimit: 100,
    },
  })

  if (!webinar || !webinar.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    topicSecondary,
    featuredBook,
    seo,
    videoId,
    title,
    topic,
    premium,
    date,
    description,
    authors,
    thumbnail,
    sys,
    __typename,
  } = webinar.items?.[0]

  return {
    props: {
      topicSecondary,
      featuredBook,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          description: description?.json,
          thumbnail,
          sys,
          __typename,
        }),
      videoId,
      title,
      topic,
      premium,
      date,
      description,
      authors,
      webinars: webinars.items || [],
    },
    revalidate: 20,
  }
}
