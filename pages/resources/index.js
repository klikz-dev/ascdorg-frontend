import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import dateFormat from 'dateformat'
import IssueBannerTitle from '../../components/Banners/IssueBannerTitle'
import GridSection from '../../components/GridSection'
import HorizontalScroll from '../../components/HorizontalScroll'
import ViewAllCTA from '../../components/interactives/Buttons/ViewAllCTA'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import Topics from '../../components/Topics'
import TwoColumnCta from '../../components/TwoColumnCta'
import PodcastPlayer from '../../components/VideoComponents/PodcastPlayer'
import PodcastThumbnail from '../../components/VideoComponents/PodcastThumbnail'
import CustomBlock from '../../const/CustomBlocks'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_TOPICS from '../../lib/schema/getTopics.graphql'
import GET_TWO_COL_CONTENT_LIST from '../../lib/schema/getTwoColContentList.graphql'
import GET_TWO_COL_CTA from '../../lib/schema/getTwoColCta.graphql'
import GET_BOOK_NO_LINKS from '../../lib/schema/pages/getBookNoLinks.graphql'
import GET_PARTIAL_ARTICLE from '../../lib/schema/pages/getPartialArticle.graphql'
import GET_PODCAST from '../../lib/schema/pages/getPodcast.graphql'
import GET_PUBISSUE from '../../lib/schema/pages/getPubIssue.graphql'
import GET_VIDEO from '../../lib/schema/pages/getVideo.graphql'
import GET_PROFILE from '../../lib/schema/profileSummaryById.graphql'
import paths from '../../paths/path'

export default function Resources({
  articles,
  subscribeCTA,
  topics,
  videos,
  books,
  SEO,
  wistiaId,
  pubImage,
  pubTitle,
  pubDate,
  pubVolNo,
  pubIssueNo,
  pubSlug,
  authorThumbnail,
  authorSlug,
  authorTitle,
  shortBio,
  componentTwoColumnContentList,
}) {
  const popularTopics = topics.reduce((unique, o) => {
    if (!unique.includes(o)) {
      unique.push(o)
    }
    return unique
  }, [])

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <Box mt={[6, 10]} display='flex' justifyContent='center'>
              <IssueBannerTitle
                landing={{
                  title: 'Read, Watch & Listen to Top Educators',
                  subtitle:
                    'Accelerate your path with high-quality content that helps you reach new heights',
                }}
                align='center'
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={[6, 10]}>
              <GridSection
                title='Featured Articles'
                ctaLink={paths.search({
                  types: ['article'],
                  featured: ['true'],
                })}
                items={articles}
              />
            </Box>
            <Box mt={[6, 10]}>
              <TwoColumnCta
                testId='resources-publication-2-col-cta'
                imagePos={'right'}
                image={contentfulImageTransformation(pubImage)}
                title={pubTitle}
                description={`${dateFormat(
                  pubDate.slice(0, -1),
                  'mmmm d, yyyy'
                )}   |   Volume ${pubVolNo}   |   Number ${pubIssueNo}`}
                ctaItems={[
                  {
                    __typename: 'ButtonLinkComponent',
                    linkUrl: paths.el({ slug: pubSlug }),
                    linkLabel: 'Read Now',
                  },
                  {
                    __typename: 'ButtonLinkComponent',
                    linkUrl: paths.el({ slug: 'all' }),
                    linkLabel: 'View all issues',
                    buttonStyle: ['Text Link w/Arrow (Preset #2)'],
                  },
                ]}
              />
            </Box>
            {wistiaId && (
              <Box mt={[6, 10]}>
                <PodcastPlayer
                  sectionTitle='Listen & Learn'
                  podcast={wistiaId}
                  ctaLink={'/podcasts'}
                />
              </Box>
            )}
            <Grid item xs={12}>
              <Box mt={[6, 10]}>
                <HorizontalScroll
                  title='Browse Our Latest Titles'
                  ctaLabel='View all'
                  ctaLink={paths.search({ types: ['book'] })}
                  items={books}
                  cellHeight={478}
                  cols={4.2}
                  type='carttile'
                />
              </Box>
            </Grid>
            <Box mt={[6, 10]}>
              <Box display='flex' justifyContent='space-between' mb={3}>
                <Typography variant='h4'>Featured Videos</Typography>
                <ViewAllCTA
                  label='View all'
                  href={paths.search({
                    types: ['video'],
                    featured: ['true'],
                  })}
                  lg
                />
              </Box>
              {videos && videos.length > 0 && (
                <Grid container spacing={5}>
                  {videos.map(
                    (
                      { slug, thumbnail, topic, title, date, authors },
                      index
                    ) => (
                      <Grid item md={8 / (index + 1)} xs={12} key={index}>
                        <PodcastThumbnail
                          slug={slug}
                          thumbnail={thumbnail}
                          topic={topic}
                          title={title}
                          date={date}
                          authors={authors}
                          path='video'
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              )}
            </Box>
            <Box mt={[6, 10]}>
              <TwoColumnCta
                testId='resources-featured-auth-2-col-cta'
                imagePos={'left'}
                image={contentfulImageTransformation(authorThumbnail)}
                title={authorTitle}
                description={shortBio}
                descriptionLineNumbers={3}
                ctaItems={[
                  {
                    __typename: 'ButtonLinkComponent',
                    linkUrl: paths.author({ slug: authorSlug }),
                    linkLabel: 'Learn more',
                  },
                  {
                    __typename: 'ButtonLinkComponent',
                    linkUrl: paths.author({ slug: 'all' }),
                    linkLabel: 'View all authors',
                    buttonStyle: ['Text Link w/Arrow (Preset #2)'],
                  },
                ]}
                label='Featured Author'
              />
            </Box>
          </Grid>
        </Grid>
        {!!subscribeCTA && (
          <Box
            sx={{
              margin: { xs: '48px 8px 24px', sm: '88px auto 60px' },
            }}
          >
            <CustomBlock item={subscribeCTA} />
          </Box>
        )}
        <Box mt={[6, 10]} id='topics'>
          <Topics
            title='Explore Popular Topics'
            topics={popularTopics}
            contentType='article'
            center={true}
          />
        </Box>
        {componentTwoColumnContentList && (
          <Box id='catalogs' my={[6, 10]}>
            <CustomBlock item={componentTwoColumnContentList} />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { books },
  } = await contentfulDirectClient.query({
    query: GET_BOOK_NO_LINKS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      order: 'datePublished_DESC',
      limit: 10,
    },
  })

  const {
    data: { videos },
  } = await contentfulDirectClient.query({
    query: GET_VIDEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      whereVideos: { featured: true },
      videoLimit: 0,
      videosLimit: 2,
      orderVideos: 'date_DESC',
    },
  })

  const {
    data: { podcast },
  } = await contentfulDirectClient.query({
    query: GET_PODCAST,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      podcastLimit: 1,
      podcastslimit: 0,
      wherePodcast: { wistiaId_exists: true },
      orderPodcast: 'date_DESC',
    },
  })

  const {
    data: { publication },
  } = await contentfulDirectClient.query({
    query: GET_PUBISSUE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      pubissueLimit: 1,
      pubissuesLimit: 0,
      order: 'publicationDate_DESC',
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
    data: { articles },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_ARTICLE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 3,
      where: { featured: true },
      order: 'issueDate_DESC',
    },
  })

  const {
    data: {
      profileCollection: { profiles },
    },
  } = await contentfulDirectClient.query({
    query: GET_PROFILE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { featured: true },
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '0190GhkkJZcpi5N1POmbAh',
    },
  })

  const {
    data: { twoColCta },
  } = await contentfulDirectClient.query({
    query: GET_TWO_COL_CTA,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '4RfJS1vY0b5z7YAo6vq49r',
    },
  })

  const {
    data: { componentTwoColumnContentList },
  } = await contentfulDirectClient.query({
    query: GET_TWO_COL_CONTENT_LIST,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '4sYFGo4kXBRXL7Cyh2AMGy',
    },
  })

  const { wistiaId } = podcast?.items[0]

  const {
    featuredImage: pubImage,
    title: pubTitle,
    publicationDate: pubDate,
    volNo: pubVolNo,
    issueNo: pubIssueNo,
    slug: pubSlug,
  } = publication?.items[0]

  const {
    thumbnail: authorThumbnail,
    slug: authorSlug,
    title: authorTitle,
    shortBio,
  } = profiles?.[0]

  return {
    props: {
      articles: articles?.items,
      topics: topics.items,
      videos: videos.items,
      books: books?.items,
      SEO: seo || {},
      subscribeCTA: twoColCta || null,
      wistiaId,
      pubImage,
      pubTitle,
      pubDate,
      pubVolNo,
      pubIssueNo,
      pubSlug,
      authorThumbnail,
      authorSlug,
      authorTitle,
      shortBio,
      componentTwoColumnContentList: componentTwoColumnContentList || null,
    },
    revalidate: 20,
  }
}
