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
import GET_PODCAST from '../../lib/schema/pages/getPodcast.graphql'
import paths from '../../paths/path'

export default function Podcasts({ featuredPodcasts, podcasts, SEO }) {
  const otherPodcasts = podcasts?.filter(
    (podcast) =>
      featuredPodcasts &&
      podcast.sys.id !== featuredPodcasts[0]?.sys.id &&
      podcast.sys.id !== featuredPodcasts[1]?.sys.id
  )
  return (
    <Layout>
      <SEOHead seo={SEO} />

      <MediaBanner
        title='Videos, Podcasts & Webinars'
        subtitle='Watch effective, research-based practices in action. Listen to advice from skilled practitioners. Accelerate your learning journey on your time and your path.'
      />
      <Box mt={[6, 10]}>
        <MediaTabs tabValue={1} />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[8, 10]}>
          {featuredPodcasts.length > 0 && (
            <>
              <Box display='flex' justifyContent='space-between' mb={3}>
                <Typography variant='h4'>Featured Podcasts</Typography>
                <ViewAllCTA
                  href={paths.search({
                    types: ['podcast'],
                    featured: ['true'],
                  })}
                  label='View all'
                  lg
                />
              </Box>

              <Grid container spacing={5}>
                {featuredPodcasts.map(
                  ({ slug, thumbnail, topic, title, date, authors }, index) => (
                    <Grid item md={8 / (index + 1)} xs={12} key={index}>
                      <PodcastThumbnail
                        slug={slug}
                        thumbnail={thumbnail}
                        topic={topic}
                        title={title}
                        date={date}
                        authors={authors}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </>
          )}
          <Box mt={[6, 10]}>
            <ContentGrid
              sectionTitle='Latest Podcasts'
              items={otherPodcasts}
              viewAllLink={paths.search({ types: ['podcast'] })}
              type='podcast'
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
    data: { podcast: featuredPodcasts, podcasts },
  } = await contentfulDirectClient.query({
    query: GET_PODCAST,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      podcastLimit: 2,
      podcastslimit: 100,
      orderPodcast: 'date_DESC',
      orderPodcasts: 'date_DESC',
      wherePodcast: { featured: true },
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '6ENDelZ9oNIKWJJXfNS2PV',
    },
  })

  return {
    props: {
      featuredPodcasts: featuredPodcasts.items || [],
      podcasts: podcasts.items || [],
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
