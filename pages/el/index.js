import Head from 'next/head'
import { useReactiveVar } from '@apollo/client'
import { Box, Container } from '@mui/material'
import IssueBannerTitle from '../../components/Banners/IssueBannerTitle'
import GridSection from '../../components/GridSection'
import HorizontalScroll from '../../components/HorizontalScroll'
import HorizontalSection from '../../components/HorizontalSection'
import NextImageWrapper from '../../components/images/NextImageWrapper'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import PodcastPlayer from '../../components/VideoComponents/PodcastPlayer'
import CustomBlock from '../../const/CustomBlocks'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { hasPaidMembershipVar } from '../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import GET_IMAGE from '../../lib/schema/getImage.graphql'
import GET_PROFILE_CATEGORIES from '../../lib/schema/getProfileCategories.graphql'
import GET_RICH_TEXT from '../../lib/schema/getRichText.graphql'
import GET_SEARCH_CAROUSEL from '../../lib/schema/getSearchCarousel.graphql'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_TWO_COL_CTA from '../../lib/schema/getTwoColCta.graphql'
import GET_PARTIAL_ARTICLE from '../../lib/schema/pages/getPartialArticle.graphql'
import GET_PODCAST from '../../lib/schema/pages/getPodcast.graphql'
import GET_PUBISSUE from '../../lib/schema/pages/getPubIssue.graphql'
import paths from '../../paths/path'

export default function EducationalLearning({
  publications,
  featuredArticles,
  featuredAuthors,
  richText,
  twoColumnCTA,
  twoColumnCTAWriteForEL,
  SEO,
  bannerImage,
  searchCarousel,
  wistiaId,
  featuredColTopic,
  featuredColTitle,
  featuredColAuthors,
  featuredColSlug,
  featuredColSys,
}) {
  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Head>
        <script
          src='https://fast.wistia.com/embed/medias/8qu1yof6os.jsonp'
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <Container maxWidth='lg'>
        <Box
          mt={[6, 10]}
          pb={1}
          mx={[1, 'auto']}
          sx={{
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
          }}
        >
          <IssueBannerTitle
            landing={{
              title: 'EL Magazine: By Educators, for Educators',
              subtitle:
                'Since 1943, Educational Leadership has been a trusted source of evidence-based, peer-to-peer guidance and inspiration.',
            }}
            ctaLabel={useMemberPrice ? '' : 'Join'}
            ctaLink={paths.subscribe}
            authors={{
              ctaLabel: '100+ Featured Authors',
              ctaLink: paths.authors,
            }}
            featuredAuthors={featuredAuthors}
            align='left'
            twoThirds
          />
          <Box>
            <NextImageWrapper
              sx={{ pt: 10 }}
              src={contentfulImageTransformation(bannerImage)}
              width={300}
              height={300}
              layout='fixed'
            />
          </Box>
        </Box>

        <Box mt={[4, 8]} mx={[1, 'auto']}>
          <HorizontalScroll
            title='Recent Issues'
            ctaLabel='View all'
            ctaLink={paths.el({ slug: 'all' })}
            items={publications}
            type='issuetile'
          />
        </Box>
        <Box mt={[3, 5]} mx={[1, 'auto']}>
          <GridSection
            title='Featured Articles'
            ctaLink={paths.search({
              types: ['article'],
              featured: ['true'],
            })}
            items={featuredArticles}
            variant='articleOverlay'
          />
        </Box>
        {featuredColTitle && (
          <Box mt={[6, 10]} mx={[1, 'auto']}>
            <HorizontalSection
              title='Featured Column'
              viewAllLink={false}
              label={featuredColTopic?.title}
              linkText={featuredColTitle}
              linkSlug={featuredColSlug}
              date={featuredColSys.publishedAt}
              imageSlug={featuredColAuthors?.[0]?.slug}
              authorImage={contentfulImageTransformation(
                featuredColAuthors?.[0]?.thumbnail,
                true
              )}
              authorTitle={featuredColAuthors?.[0]?.title}
              authorSubtitle={featuredColAuthors?.[0]?.position}
            />
          </Box>
        )}
        {twoColumnCTA && (
          <Box mt={[6, 10]} mx={[1, 'auto']}>
            <CustomBlock item={twoColumnCTA} />
          </Box>
        )}
        {searchCarousel && (
          <Box my={[6, 10]} mt={[3, 10]} mx={[1, 'auto']}>
            <CustomBlock item={searchCarousel} />
          </Box>
        )}
        <Box mt={[6, 10]} mx={[1, 'auto']}>
          <PodcastPlayer
            sectionTitle='Listen & Learn'
            podcast={wistiaId}
            ctaLink={'/podcasts'}
          />
        </Box>
        {twoColumnCTAWriteForEL && (
          <Box mt={[6, 10]} mx={[1, 'auto']}>
            <CustomBlock item={twoColumnCTAWriteForEL} />
          </Box>
        )}
        <Box my={[6, 10]} mt={[3, 10]} mx={[1, 'auto']}>
          <Box mt={[6, 10]} mx={[1, 'auto']} key={richText.title}>
            <CustomBlock item={richText} />
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { categories },
  } = await contentfulDirectClient.query({
    query: GET_PROFILE_CATEGORIES,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      authorsLimit: 3,
      where: { title: 'Author' },
    },
  })

  const {
    data: { articles: featuredColumn },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_ARTICLE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: {
        featured: true,
        elArticleType: 'Articles in Columns/Departments Section',
      },
      order: 'issueDate_DESC',
    },
  })

  const {
    topic: featuredColTopic,
    title: featuredColTitle,
    authors: { items: featuredColAuthors },
    slug: featuredColSlug,
    sys: featuredColSys,
  } = featuredColumn?.items[0]

  /** exclude the featured column from featured articles */
  const {
    data: { articles: featuredArticles },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_ARTICLE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 3,
      where: { featured: true, sys: { id_not: featuredColSys.id } },
      order: 'issueDate_DESC',
    },
  })

  const {
    data: { publications },
  } = await contentfulDirectClient.query({
    query: GET_PUBISSUE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      pubissueLimit: 0,
      pubissuesLimit: 8,
      order: 'publicationDate_DESC',
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
    data: { richText },
  } = await contentfulDirectClient.query({
    query: GET_RICH_TEXT,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '1vfUK4xaxM4sxfQRzwDhjF',
    },
  })

  const twoColCtaElTopicSelects = await contentfulDirectClient.query({
    query: GET_TWO_COL_CTA,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '5pF8CMHkWCFyMlt9SAvV8F',
    },
  })

  const twoColCtaWriteForEL = await contentfulDirectClient.query({
    query: GET_TWO_COL_CTA,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '1tatxklS7dJdWuCvaplU29',
    },
  })

  const {
    data: { searchCarousel },
  } = await contentfulDirectClient.query({
    query: GET_SEARCH_CAROUSEL,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '4S1RUJmzx4JD2Ny0aM1XIc',
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '6fopBd4wEsu1n16GXwnF53',
    },
  })

  const {
    data: { image },
  } = await contentfulDirectClient.query({
    query: GET_IMAGE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '2Mb9gET4xCmVcdYclSWFzs',
    },
  })

  const {
    linkedFrom: { authors },
  } = categories?.items[0]

  const { wistiaId } = podcast?.items[0]

  return {
    props: {
      publications: publications.items,
      featuredArticles: featuredArticles.items,
      featuredAuthors: authors.items,
      richText: richText || null,
      twoColumnCTA: twoColCtaElTopicSelects?.data?.twoColCta || null,
      twoColumnCTAWriteForEL: twoColCtaWriteForEL?.data?.twoColCta || null,
      SEO: seo || {},
      bannerImage: image || {},
      searchCarousel: searchCarousel || null,
      wistiaId,
      featuredColTopic,
      featuredColTitle,
      featuredColAuthors,
      featuredColSlug,
      featuredColSys,
    },
    revalidate: 20,
  }
}
