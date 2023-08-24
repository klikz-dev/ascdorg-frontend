import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Container, Divider, Skeleton } from '@mui/material'
import ContentGrid from '../../components/ContentComponents/ContentGrid'
import DaysAgo from '../../components/info/DaysAgo'
import Layout from '../../components/layout'
import ReadMore from '../../components/ReadMore'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import Topics from '../../components/Topics'
import TopicTag from '../../components/TopicTag'
import TwoColumnCta from '../../components/TwoColumnCta'
import PodcastPlayer from '../../components/VideoComponents/PodcastPlayer'
import { options } from '../../const'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import {
  contentfulImageTransformation,
  contentfulAPIToSEOHead,
} from '../../lib/data-transformations'
import GET_PODCAST from '../../lib/schema/pages/getPodcast.graphql'
import GET_PODCAST_LIST_QUERY from '../../lib/schema/pages/getPodcastList.graphql'
import paths from '../../paths/path'

export default function Podcast({
  topicSecondary,
  featuredBook,
  seo,
  wistiaId,
  topic,
  premium,
  date,
  description,
  podcasts,
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

  const latestPodcasts = [...podcasts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const book = featuredBook

  return (
    <Layout>
      <SEOHead seo={seo} />
      <Container>
        <Box mt={5} id='podcast'>
          <PodcastPlayer podcast={wistiaId} />
          <Box
            mt={3}
            mb={3}
            display='flex'
            flexDirection='row'
            alignItems='center'
            sx={{
              '& .MuiChip-root': {
                marginBottom: 0,
              },
            }}
          >
            <TopicTag
              variant='special'
              label={topic?.title}
              premium={premium}
            />
            <Box ml={1}>
              <DaysAgo input={date} variant='body3' />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box mb={[0, 10]}>
        <Divider />
      </Box>

      <Container>
        <Box maxWidth={850}>
          {description && (
            <Box mt={[2, 3]} id='about'>
              <ReadMore
                title='In this podcast'
                short={description?.json}
                textAlign='left'
                titleVariant='h4'
                hideSummaryWhenExpanded
              />
            </Box>
          )}
          {!!topics?.length && (
            <Box mt={6} id='topics'>
              <Topics
                title='Topics covered'
                topics={topics}
                contentType='podcast'
                titleVariant='h4'
                variant='basicSmall'
              />
            </Box>
          )}
        </Box>
        {book && (
          <Box my={11}>
            <TwoColumnCta
              testId='podcast-book-2-col-cta'
              title={book?.title}
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
              label={book?.topic?.title}
              image={contentfulImageTransformation(book.featuredImage)}
              imagePos='right'
              variant='grey'
            />
          </Box>
        )}
        <Box mt={11}>
          <ContentGrid
            sectionTitle='Latest Podcasts'
            items={latestPodcasts}
            viewAllLink={paths.search({ types: ['podcast'] })}
            type={'podcast'}
          />
        </Box>
        <Box my={9}>
          <TextCTA
            ctaLabel='Listen to more podcasts'
            ctaLink={paths.podcasts}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { podcasts: podcastData },
  } = await contentfulDirectClient.query({
    query: GET_PODCAST_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: podcastData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { podcast: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { podcast, podcasts },
  } = await contentfulDirectClient.query({
    query: GET_PODCAST,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      podcastLimit: 1,
      podcastslimit: 100,
      wherePodcast: { slug: params?.podcast },
      wherePodcasts: { slug_not: params?.podcast },
    },
  })

  if (!podcast || !podcast?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    topicSecondary,
    featuredBook,
    seo,
    wistiaId,
    topic,
    premium,
    date,
    description,
    sys,
    title,
    thumbnail,
    __typename,
  } = podcast.items?.[0]

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
      wistiaId,
      topic,
      premium,
      date,
      description,
      podcasts: podcasts.items || [],
    },
    revalidate: 20,
  }
}
