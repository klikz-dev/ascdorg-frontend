import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Container, Grid, Skeleton } from '@mui/material'
import IssueBanner from '../../components/Banners/IssueBanner'
import ContentList from '../../components/ContentComponents/ContentList'
import HorizontalScroll from '../../components/HorizontalScroll'
import Layout from '../../components/layout'
import ReadMore from '../../components/ReadMore'
import SEOHead from '../../components/SEOHead'
import TOCNav from '../../components/TOCNav'
import PodcastPlayer from '../../components/VideoComponents/PodcastPlayer'
import VideoPlayer from '../../components/VideoComponents/VideoPlayer'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulAPIToSEOHead } from '../../lib/data-transformations'
import GET_PUBISSUE from '../../lib/schema/pages/getPubIssue.graphql'
import GET_PUBISSUE_LIST_QUERY from '../../lib/schema/pages/getPubissueList.graphql'
import paths from '../../paths/path'

/** @todo: refactor */
export default function Publication({
  testId = 'publication-page',
  articles,
  issueNo,
  shortDescription,
  video,
  podcast,
  seo,
  description,
  thumbnail,
  publicationDate,
  title,
  volNo,
  slug,
  bookVersion,
  pdfFreeDownload,
  pdfUrl,
  pdfUrlLabel,
  publications,
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

  const features = articles?.items
    ? articles?.items?.filter((article) => {
        return article?.elArticleType == 'Feature Articles'
      })
    : null

  const columns = articles?.items
    ? articles?.items?.filter(
        (article) =>
          article?.elArticleType == 'Articles in Columns/Departments Section'
      )
    : null

  const advisories = articles?.items
    ? articles?.items?.filter(
        (article) =>
          article?.elArticleType == 'Article in Advisory: Trends and Ideas'
      )
    : null

  const newvoices = articles?.items
    ? articles?.items?.filter(
        (article) => article?.elArticleType == 'New Voices'
      )
    : null

  const online = articles?.items
    ? articles?.items?.filter(
        (article) => article?.elArticleType == 'Online Only, Exclusives'
      )
    : null

  const tools = articles?.items
    ? articles?.items?.filter(
        (article) => article?.elArticleType == 'Tools for Implementation'
      )
    : null

  const videos = articles?.items
    ? articles?.items?.filter((article) => article?.elArticleType == 'Video')
    : null

  const morearticles = articles?.items
    ? articles?.items?.filter((article) => !article?.elArticleType)
    : null

  const recentPubs = publications.filter((pub) => pub?.issueNo !== issueNo)

  const toc_items = () => {
    const items = []

    if (shortDescription) items.push({ id: 'about', label: 'About this issue' })

    if (features?.length > 0) items.push({ id: 'features', label: 'Features' })

    if (columns?.length > 0) {
      items.push({ id: 'columns', label: 'Columns' })
    }

    if (advisories?.length > 0) {
      items.push({ id: 'advisories', label: 'Advisory: Trends and Ideas' })
    }

    if (newvoices?.length > 0) {
      items.push({ id: 'newvoices', label: 'New Voices' })
    }

    if (online?.length > 0) {
      items.push({ id: 'onlineonly', label: 'Online Exclusives' })
    }

    if (tools?.length > 0) {
      items.push({ id: 'tools', label: 'Tools for Implementation' })
    }

    if (videos?.length > 0) {
      items.push({ id: 'videos', label: 'Videos' })
    }

    if (podcast) items.push({ id: 'podcast', label: 'Featured Podcast' })

    if (video) {
      items.push({ id: 'video', label: 'Featured Video' })
    }

    if (morearticles?.length > 0) {
      items.push({ id: 'more', label: 'More Articles' })
    }
    return items
  }

  return (
    <Layout testId={testId}>
      <SEOHead seo={seo} />
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${podcast?.wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <IssueBanner
        thumbnail={thumbnail}
        publicationDate={publicationDate}
        title={title}
        volNo={volNo}
        issueNo={issueNo}
        slug={slug}
        bookVersion={bookVersion}
        shortDescription={shortDescription}
        pdfFreeDownload={pdfFreeDownload}
        pdfUrl={pdfUrl}
        pdfUrlLabel={pdfUrlLabel}
      />

      <Grid container>
        <Grid item xs={false} md={2}>
          <Box
            ml={[2, 2, 2, 10]}
            mt={6}
            sx={{
              position: { xs: 'relative', md: 'sticky' },
              top: { md: '250px' },
              zIndex: '1',
            }}
            display={['none', 'none', 'block']}
          >
            <TOCNav
              toc_items={toc_items()}
              activeBorderWidth='4px'
              backgroundColor='white'
              borderLeft
              maxWidth='290px'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} id='about-section'>
          <Container maxWidth='lg'>
            <Box
              margin='auto'
              sx={{
                width: '100%',
                maxWidth: '700px',
              }}
            >
              <Box
                mt={[6, 10]}
                id='about'
                width={['327px', '100%']}
                ml='auto'
                mr='auto'
              >
                {shortDescription && description && (
                  <ReadMore
                    title='About this Issue'
                    titleVariant='h4'
                    short={shortDescription}
                    long={description}
                  />
                )}
              </Box>

              {features?.length > 0 && (
                <Box mt={[6, 10]} id='features'>
                  <ContentList
                    title='Features'
                    items={features}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {columns?.length > 0 && (
                <Box mt={4} id='columns'>
                  <ContentList
                    title='Columns'
                    items={columns}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {advisories?.length > 0 && (
                <Box mt={4} id='advisories'>
                  <ContentList
                    title='Advisory: Trends and Ideas'
                    items={advisories}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {newvoices?.length > 0 && (
                <Box mt={4} id='newvoices'>
                  <ContentList
                    title='New Voices'
                    items={newvoices}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {online?.length > 0 && (
                <Box mt={4} id='onlineonly'>
                  <ContentList
                    title='Online Exclusives'
                    items={online}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {tools?.length > 0 && (
                <Box mt={4} id='tools'>
                  <ContentList
                    title='Tools for Implementation'
                    items={tools}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {videos?.length > 0 && (
                <Box mt={4} id='videos'>
                  <ContentList
                    title='Videos'
                    items={videos}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {podcast && (
                <Box mt={[6, 10]} id='podcast'>
                  <PodcastPlayer
                    sectionTitle='Listen & Learn'
                    podcast={podcast?.wistiaId}
                    ctaLink={'/podcasts'}
                    autoplay
                  />
                </Box>
              )}

              {video && (
                <Box mt={[6, 10]} id='video'>
                  <VideoPlayer
                    sectionTitle='Featured Video'
                    ctaLink={'/videos'}
                    videoId={video?.videoId}
                    topic={video?.topic}
                    premium={video?.premium}
                    title={video?.title}
                    date={video?.date}
                  />
                </Box>
              )}

              {morearticles.length > 0 && (
                <Box mt={[6, 10]} id='more'>
                  <ContentList
                    title='More Articles'
                    items={morearticles}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}
            </Box>
            <Box mt={[3, 8]} mb={[3, 4]}>
              <HorizontalScroll
                title='Recent Issues'
                ctaLabel='View all'
                ctaLink={paths.el({ slug: 'all' })}
                items={recentPubs}
                type='issuetile'
              />
            </Box>
          </Container>
        </Grid>
        <Grid item xs={false} md={2}></Grid>
      </Grid>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { issues: issueData },
  } = await contentfulDirectClient.query({
    query: GET_PUBISSUE_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: issueData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { issue: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { publication, publications },
  } = await contentfulDirectClient.query({
    query: GET_PUBISSUE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      wherePubissue: { slug: params?.issue },
      wherePubissues: { slug_not: params?.issue },
      pubissueLimit: 1,
      pubissuesLimit: 8,
      order: 'publicationDate_DESC',
    },
  })

  if (!publication || !publication?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    articles,
    issueNo,
    shortDescription,
    video,
    podcast,
    seo,
    description,
    thumbnail,
    publicationDate,
    title,
    volNo,
    slug,
    bookVersion,
    pdfFreeDownload,
    pdfUrl,
    pdfUrlLabel,
    sys,
    __typename,
  } = publication.items?.[0]

  return {
    props: {
      articles,
      issueNo,
      shortDescription,
      video,
      podcast,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          description: description?.json,
          thumbnail,
          sys,
          __typename,
        }),
      description,
      thumbnail,
      publicationDate,
      title,
      volNo,
      slug,
      bookVersion,
      pdfFreeDownload,
      pdfUrl,
      pdfUrlLabel,
      publications: publications.items || null,
    },
    revalidate: 20,
  }
}
