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
import GET_WEBINAR from '../../lib/schema/pages/getWebinar.graphql'
import paths from '../../paths/path'

export default function Webinars({ featuredWebinars, webinars, SEO }) {
  const otherWebinars = webinars.filter(
    (webinar) =>
      featuredWebinars &&
      webinar.sys.id !== featuredWebinars[0]?.sys.id &&
      webinar.sys.id !== featuredWebinars[1]?.sys.id
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <MediaBanner
        title='Videos, Podcasts & Webinars'
        subtitle='Watch effective, research-based practices in action. Listen to advice from skilled practitioners. Accelerate your learning journey on your time and your path.'
      />
      <Box mt={[8, 10]}>
        <MediaTabs tabValue={2} />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[6, 10]}>
          <Box display='flex' justifyContent='space-between' mb={3}>
            <Typography variant='h4'>Featured Webinars</Typography>
            <ViewAllCTA
              href={paths.search({ types: ['webinar'], featured: ['true'] })}
              label='View all'
              lg
            />
          </Box>
          <Grid container spacing={5}>
            {featuredWebinars.map(
              ({ slug, thumbnail, topic, title, date, authors }, index) => (
                <Grid item md={8 / (index + 1)} xs={12} key={index}>
                  <PodcastThumbnail
                    slug={slug}
                    thumbnail={thumbnail}
                    topic={topic}
                    title={title}
                    date={date}
                    authors={authors}
                    path='webinar'
                  />
                </Grid>
              )
            )}
          </Grid>
          <Box mt={[6, 10]}>
            <ContentGrid
              sectionTitle='Latest Webinars'
              items={otherWebinars}
              viewAllLink={paths.search({ types: ['webinar'] })}
              type='webinar'
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
    data: { webinar: featuredWebinars, webinars },
  } = await contentfulDirectClient.query({
    query: GET_WEBINAR,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      webinarLimit: 2,
      webinarslimit: 100,
      orderWebinar: 'date_DESC',
      orderWebinars: 'date_DESC',
      whereWebinar: { featured: true },
    },
  })
  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '4TMqYC85BMZPx0FNNRpeau',
    },
  })
  return {
    props: {
      featuredWebinars: featuredWebinars.items || [],
      webinars: webinars.items || [],
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
