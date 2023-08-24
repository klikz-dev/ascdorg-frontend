// import { useEffect, useState } from 'react'
import { Box, Container, Divider, Grid } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import HomeBanner from '../components/Banners/HomeBanner'
import ImageBanner from '../components/Banners/ImageBanner'
import GridSection from '../components/GridSection'
import HorizontalScroll from '../components/HorizontalScroll'
import Layout from '../components/layout'
import SEOHead from '../components/SEOHead'
import Topics from '../components/Topics'
import TwoColContentListing from '../components/TwoColContentListing'
import CustomBlock from '../const/CustomBlocks'
import { getContentfulDirectClient } from '../lib/apollo-client'
import GET_BUTTON from '../lib/schema/getButton.graphql'
import GET_COMPONENT_GRID from '../lib/schema/getComponentGrid.graphql'
import GET_HOME_BANNER from '../lib/schema/getHomeBanner.graphql'
import GET_IMAGE_BANNER from '../lib/schema/getImageBanner.graphql'
import GET_SEO from '../lib/schema/getSeo.graphql'
import GET_TOPICS from '../lib/schema/getTopics.graphql'
import GET_TWO_COL_CTA from '../lib/schema/getTwoColCta.graphql'
import GET_BOOK_NO_LINKS from '../lib/schema/pages/getBookNoLinks.graphql'
import GET_FUTURE_EVENTS from '../lib/schema/pages/getFutureEvents.graphql'
import GET_PARTIAL_ARTICLE from '../lib/schema/pages/getPartialArticle.graphql'
import GET_PARTIAL_BLOG from '../lib/schema/pages/getPartialBlog.graphql'
import paths from '../paths/path'

export default function Home({
  imageBanner,
  subscribeCTA,
  articles,
  topics,
  books,
  futureEvents,
  SEO,
  homeBanner,
  membership,
  buttonLinkComponent,
}) {
  // will comment back in after july 9th.
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   let pageView = sessionStorage.getItem('pageView')
  //   if (pageView == null) {
  //     pageView = 1
  //   } else {
  //     pageView = Number(pageView) + 1
  //   }
  //   sessionStorage.setItem('pageView', pageView)
  //   setCount(pageView)
  // }, [])
  return (
    <Layout
      paywall
      testId='home-page'
      buttonLinkComponent={buttonLinkComponent}
    >
      <SEOHead seo={SEO} />
      {/* {count === 1 && buttonLinkComponent?.id === 'merger' && (
        <Typography
          sx={{
            fontSize: { xs: '0.75rem', sm: '1rem' },
            textAlign: {
              xs: 'center',
              md: 'none',
            },
          }}
          display='flex'
          backgroundColor='#005e47'
          justifyContent='center'
          py={1}
          color='#ffffff'
          fontWeight='bold'
          lineHeight='1.65rem'
          data-testid='index-merger-banner'
        >
          <span>
            Free shipping for a limited time valid on orders over $50. Use promo
            code FREESHIP23; terms and conditions apply.&nbsp;
            <Link
              href='https://www.ascd.org/books'
              sx={{
                color: '#ffffff',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#bee3da',
                  '& .MuiSvgIcon-root': {
                    color: '#bee3da',
                  },
                },
              }}
              target='_new'
              data-testid='index-learn-more-link'
            >
              Learn more.
            </Link>
          </span>
        </Typography>
      )} */}
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <HomeBanner
            testId='index-home-banner'
            items={homeBanner?.slice(1, 5)}
            button1={homeBanner?.[0]?.button1}
            button2={homeBanner?.[0]?.button2}
            imageContent={homeBanner?.[0]?.imageContent}
            displayTitle={homeBanner?.[0]?.displayTitle}
            bodyText={homeBanner?.[0]?.bodyText?.json}
            backgroundColor={homeBanner?.[0]?.backgroundColor}
          />
          <ImageBanner
            testId='index-image-banner'
            body={imageBanner?.body}
            displayTitle={imageBanner?.displayTitle}
            image={imageBanner?.imageContent?.imageContentful?.url}
          />
        </Box>
        <Divider />
        {articles.length > 0 && (
          <Box
            sx={{
              marginTop: { xs: '56px', md: '78px' },
            }}
          >
            <GridSection
              testId='index-latest-articles'
              title='Latest Articles'
              ctaLink={paths.search({ types: ['blog', 'article'] })}
              items={articles}
              variant='articleUnder'
            />
          </Box>
        )}
        <Box
          mt={4}
          sx={{
            marginTop: { xs: '48px 0', md: '24px' },
          }}
        >
          <Divider />
          <Box mt={[4, 6]} mb={[4, 7.5]}>
            <Topics
              testId='index-topics'
              title='Topics that can be found on ASCD'
              topics={topics}
              center={true}
              maxWidth={'100%'}
              background={'transparent'}
            />
          </Box>
          <Divider />
        </Box>
        {books && books.length > 0 && (
          <Box my={5}>
            <HorizontalScroll
              testId='index-shop-books'
              title='Shop Books'
              ctaLabel='View all'
              ctaLink={paths.search({ types: ['book'] })}
              items={books}
              type='carttile'
            />
          </Box>
        )}
      </Container>
      <Container maxWidth='lg'>
        <Box
          mt={10}
          px={3}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Grid container spacing={5}>
            {membership && (
              <CustomBlock item={membership} testId='index-membership' />
            )}
          </Grid>
        </Box>
      </Container>
      <Container maxWidth='lg'>
        <Box
          sx={{
            margin: { xs: '48px 8px 24px', sm: '88px auto 60px' },
          }}
        >
          <TwoColContentListing
            testId='upcoming-events-index'
            title={'Upcoming Events'}
            items={futureEvents}
            limit='4'
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
        {!!subscribeCTA && (
          <Box
            sx={{
              margin: { xs: '48px 8px 24px', sm: '88px auto 60px' },
            }}
          >
            <CustomBlock item={subscribeCTA} testId='index-subscribe-cta' />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { grid },
  } = await contentfulDirectClient.query({
    query: GET_COMPONENT_GRID,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '4of03frCxsVeVNQtPpVdi3',
    },
  })
  const {
    data: { articles: articleData },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_ARTICLE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 4,
      where: { featured: true },
      order: 'issueDate_DESC',
    },
  })

  const {
    data: { blogs },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_BLOG,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 4,
      where: { featured: true },
      order: 'date_DESC',
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
    data: { topics },
  } = await contentfulDirectClient.query({
    query: GET_TOPICS,
    variables: {
      where: { title_exists: true },
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
    },
  })

  const {
    data: { books },
  } = await contentfulDirectClient.query({
    query: GET_BOOK_NO_LINKS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 8,
      bookVersionLimit: 5,
      collectionLimit: 1,
      chaptersLimit: 100,
      order: 'datePublished_DESC',
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '2RNMPGJ96C1h7dJRQtCF9e',
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
    data: { homeBanner },
  } = await contentfulDirectClient.query({
    query: GET_HOME_BANNER,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '594JqaY1rIOUkHQ50gJZJp',
      limit: 5,
    },
  })

  const {
    data: { imageBanner },
  } = await contentfulDirectClient.query({
    query: GET_IMAGE_BANNER,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '23fcuLLilDYMebZXy6rtQH',
    },
  })

  const {
    data: { buttonLinkComponent },
  } = await contentfulDirectClient.query({
    query: GET_BUTTON,

    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '3aYfiDXMbkIICNJv8xonlj',
    },
  })

  /** Adds the latest 4 blogs + articles */
  const allArticles = [
    ...articleData?.items,
    ...blogs?.items?.map((blog) => {
      return {
        ...blog,
        premium: false,
        isBlog: true,
      }
    }),
  ]
    .sort((a, b) => {
      return Date.parse(b.issueDate) - Date.parse(a.issueDate)
    })
    .slice(0, 4)

  return {
    props: {
      membership: grid || null,
      articles: allArticles,
      subscribeCTA: twoColCta || null,
      topics: topics?.items || [],
      books: books?.items || [],
      futureEvents: futureEvents?.items || [],
      SEO: seo || {},
      homeBanner: homeBanner?.homeBannerItems?.items || null,
      imageBanner: imageBanner || null,
      buttonLinkComponent: buttonLinkComponent || [],
    },
    revalidate: 20,
  }
}
