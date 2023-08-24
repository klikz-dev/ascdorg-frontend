import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Container, Divider, Skeleton } from '@mui/material'
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
import GET_VIDEO from '../../lib/schema/pages/getVideo.graphql'
import GET_VIDEO_LIST_QUERY from '../../lib/schema/pages/getVideoList.graphql'
import paths from '../../paths/path'

export default function Video({
  topicSecondary,
  featuredBook,
  seo,
  videoId,
  title,
  topic,
  premium,
  date,
  description,
  videos,
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

  const latestVideos = [...videos].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const relatedVideos = latestVideos.filter(
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
            videos={relatedVideos}
            type='video'
          />
        </Box>
      </Container>
      <Box mb={[0, 10]}>
        <Divider />
      </Box>

      <Container>
        <Box maxWidth={850}>
          {description && (
            <Box mt={[5, 0]} id='about'>
              <ReadMore
                title='In this Video'
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
              testId='video-book-2-col-cta'
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
              image={contentfulImageTransformation(book?.featuredImage)}
              imagePos='right'
              variant='grey'
            />
          </Box>
        )}
        <Box mt={11}>
          <ContentGrid
            sectionTitle='Latest Videos'
            items={latestVideos}
            viewAllLink={paths.search({ types: ['video'] })}
          />
        </Box>
        <Box my={9}>
          <TextCTA ctaLabel='Watch more videos' ctaLink={paths.videos} />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { videos: videoData },
  } = await contentfulDirectClient.query({
    query: GET_VIDEO_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: videoData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { video: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { video, videos },
  } = await contentfulDirectClient.query({
    query: GET_VIDEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      whereVideo: { slug: params?.video },
      whereVideos: { slug_not: params?.video },
      videoLimit: 1,
      videosLimit: 100,
    },
  })

  if (!video || !video.items?.length) {
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
    thumbnail,
    sys,
    __typename,
  } = video.items?.[0]

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
      videos: videos.items || [],
    },
    revalidate: 20,
  }
}
