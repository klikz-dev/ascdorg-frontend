import { Box, Container, Grid, Typography } from '@mui/material'
import MediaBanner from '../../components/Banners/MediaBanner'
import ContentGrid from '../../components/ContentComponents/ContentGrid'
import ViewAllCTA from '../../components/interactives/Buttons/ViewAllCTA'
import Layout from '../../components/layout'
import MediaTabs from '../../components/MediaTabs'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import PodcastThumbnail from '../../components/VideoComponents/PodcastThumbnail'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_VIDEO from '../../lib/schema/pages/getVideo.graphql'
import paths from '../../paths/path'

export default function Videos({ featuredVideos, videos, SEO }) {
  const otherVideos = videos.filter(
    (video) =>
      featuredVideos &&
      video.sys.id !== featuredVideos[0]?.sys.id &&
      video.sys.id !== featuredVideos[1]?.sys.id
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <MediaBanner
        title='Videos, Podcasts & Webinars'
        subtitle='Watch effective, research-based practices in action. Listen to advice from skilled practitioners. Accelerate your learning journey on your time and your path.'
      />
      <Box mt={[8, 10]}>
        <MediaTabs tabValue={0} />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[6, 10]}>
          {featuredVideos.length > 0 && (
            <>
              <Box display='flex' justifyContent='space-between' mb={3}>
                <Typography variant='h4'>Featured Videos</Typography>
                <ViewAllCTA
                  href={paths.search({ types: ['video'], featured: ['true'] })}
                  label='View all'
                  lg
                />
              </Box>

              <Grid container spacing={5}>
                {featuredVideos.map(
                  ({ slug, thumbnail, topic, title, date, authors }, index) => (
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
            </>
          )}
          <Box mt={[6, 10]}>
            <ContentGrid
              sectionTitle='Latest Videos'
              items={otherVideos}
              viewAllLink={paths.search({ types: ['video'] })}
              type='video'
            />
          </Box>
        </Box>
        <Box my={[4, 10]} mt={[2, 6]}>
          <TextCTA
            ctaLabel='Become a member to access more great content'
            ctaLink={paths.subscribe}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { video: featuredVideos, videos },
  } = await contentfulDirectClient.query({
    query: GET_VIDEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      videoLimit: 2,
      videoslimit: 100,
      orderVideo: 'date_DESC',
      orderVideos: 'date_DESC',
      whereVideo: { featured: true },
    },
  })
  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '3HMNqksrR1IVedKhome77I',
    },
  })
  return {
    props: {
      featuredVideos: featuredVideos.items || [],
      videos: videos.items || [],
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
