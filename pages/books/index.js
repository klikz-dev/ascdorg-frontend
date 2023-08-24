import Link from 'next/link'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Box, Container, Typography } from '@mui/material'
import BannerMessage from '../../components/Banners/BannerMessage'
import HorizontalScroll from '../../components/HorizontalScroll'
import SubNav from '../../components/interactives/SubNav'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import TwoColumnCta from '../../components/TwoColumnCta'
import CustomBlock from '../../const/CustomBlocks'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import GET_BANNER from '../../lib/schema/getComponentBanner.graphql'
import GET_SEARCH_CAROUSEL from '../../lib/schema/getSearchCarousel.graphql'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_TWO_COL_CTA from '../../lib/schema/getTwoColCta.graphql'
import GET_BOOK_NO_LINKS from '../../lib/schema/pages/getBookNoLinks.graphql'
import paths from '../../paths/path'

export default function Books({
  featuredBooks,
  newBooks,
  upcomingBooks,
  leadershipSummaries,
  SEO,
  memberBooksPrem,
  banner,
}) {
  const nonQRGFeaturedBooks = [...featuredBooks].filter((book) => {
    const bookVersion = book?.bookVersions?.items?.find(
      (version) => version?.bookType?.title !== 'Quick Reference Guides'
    )
    return !!bookVersion
  })

  const featuredQRGs = [...featuredBooks].filter((book) => {
    const bookVersion = book?.bookVersions?.items?.find(
      (version) => version?.bookType?.title === 'Quick Reference Guides'
    )
    return !!bookVersion
  })

  const descriptionPlainText = (document) => {
    const desc = documentToPlainTextString(document)
    return desc.substring(0, desc.indexOf('.') + 1)
  }

  const featuredQrgImage = contentfulImageTransformation(
    featuredQRGs[0]?.featuredImage
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />

      <Container maxWidth='lg'>
        <Box sx={{ mt: 20 }}>
          <CustomBlock item={banner} />
        </Box>
        <Box pt={[8, 10, 9]} mb={10}>
          <SubNav
            items={[
              {
                subNavLinkLabel: 'All Books',
                subNavLinkUrl: paths.search({ types: ['book'] }),
              },
              {
                subNavLinkLabel: 'Featured Books',
                subNavLinkUrl: paths.search({
                  types: ['book'],
                  featured: [true],
                }),
              },
              {
                subNavLinkLabel: 'New Books',
                subNavLinkUrl: paths.search({
                  types: ['book'],
                  bookFilters: ['New Releases'],
                }),
              },
              {
                subNavLinkLabel: 'Collections',
                subNavLinkUrl: '/book-collections',
              },
            ]}
            subNav={[
              {
                dropDownLinkLabel: 'Quick Reads',
                dropDownLinkUrl: '/quick-reference-guides',
              },
            ]}
          />
        </Box>
      </Container>

      {!!nonQRGFeaturedBooks.length && (
        <Box mt={10}>
          <Container>
            <HorizontalScroll
              title='Featured Books'
              ctaLabel='View all'
              ctaLink={paths.search({ types: ['book'] })}
              items={nonQRGFeaturedBooks?.slice(1)}
              type='carttile'
            />
          </Container>
        </Box>
      )}

      {newBooks?.length > 0 && (
        <Box mt={12}>
          <Container>
            <HorizontalScroll
              title='New Books'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['book'],
                bookFilters: ['New Releases'],
              })}
              items={newBooks}
              type='carttile'
            />
          </Container>
        </Box>
      )}

      <Container maxWidth='lg'>
        <Box
          mt={6}
          mb={11}
          alignItems='center'
          display='flex'
          justifyContent='center'
        >
          <BannerMessage variant='special'>
            <Typography variant='body2'>
              Premium members receive 9 new books a year. &nbsp;
              <Link href={paths.subscribe}>
                <a>
                  <Typography color='black' variant='large-link'>
                    {'Join today'}
                  </Typography>
                </a>
              </Link>
            </Typography>
          </BannerMessage>
        </Box>
      </Container>

      <Container maxWidth='lg'>
        <Box mt={11}>
          <TextCTA
            title='Get to know our industry-leading authors'
            ctaLabel='View all authors'
            ctaLink={paths.author({ slug: 'all' })}
          />
        </Box>

        {featuredQRGs?.length > 0 && (
          <Box my={11}>
            <TwoColumnCta
              testId='books-qrg-2-col-cta'
              label='Quick Reference Guides'
              title={featuredQRGs?.[0]?.title}
              description={descriptionPlainText(featuredQRGs[0]?.description)}
              ctaItems={[
                {
                  __typename: 'ButtonLinkComponent',
                  linkUrl: paths.book({
                    slug: featuredQRGs?.[0]?.slug,
                    variant: featuredQRGs?.[0]?.bookVersions[0]?.productNumber,
                  }),
                  linkLabel: 'Shop',
                },
                {
                  __typename: 'ButtonLinkComponent',
                  linkUrl: '/quick-reference-guides',
                  linkLabel: 'View more guides',
                  buttonStyle: ['Text Link w/Arrow (Preset #2)'],
                },
              ]}
              imagePos='right'
              image={featuredQrgImage}
              imageAlt={
                featuredQRGs?.[0]?.featuredImage
                  ? featuredQRGs?.[0]?.featuredImage?.title
                  : featuredQRGs?.[0]?.thumbnail?.title
              }
            />
          </Box>
        )}
      </Container>

      {upcomingBooks?.length > 0 && (
        <Box mt={12}>
          <Container>
            <HorizontalScroll
              title='Pre-Order Books'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['book'],
                bookFilters: ['Upcoming Pre-Order Books'],
              })}
              items={upcomingBooks}
              type='carttile'
              cellHeight={478}
              cols={4.2}
            />
          </Container>
        </Box>
      )}

      {memberBooksPrem && (
        <Container>
          <Box my={12}>
            <CustomBlock item={memberBooksPrem} />
          </Box>
        </Container>
      )}

      {leadershipSummaries && (
        <Container>
          <Box my={12}>
            <CustomBlock item={leadershipSummaries} />
          </Box>
        </Container>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { books: featuredBooks },
  } = await contentfulDirectClient.query({
    query: GET_BOOK_NO_LINKS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 20,
      chaptersLimit: 0,
      collectionLimit: 0,
      bookVersionLimit: 1,
      where: { featured: true },
      order: 'datePublished_DESC',
    },
  })

  const today = new Date()

  const {
    data: { books: newBooks },
  } = await contentfulDirectClient.query({
    query: GET_BOOK_NO_LINKS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 10,
      chaptersLimit: 0,
      collectionLimit: 0,
      bookVersionLimit: 1,
      where: {
        datePublished_gte: new Date(today.setFullYear(today.getFullYear() - 1)),
        datePublished_lt: new Date(),
      },
      order: 'datePublished_DESC',
    },
  })

  const {
    data: { books: upcomingBooks },
  } = await contentfulDirectClient.query({
    query: GET_BOOK_NO_LINKS,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 10,
      chaptersLimit: 0,
      collectionLimit: 0,
      bookVersionLimit: 1,
      where: {
        datePublished_gt: new Date(),
      },
      order: 'datePublished_DESC',
    },
  })

  const {
    data: { twoColCta },
  } = await contentfulDirectClient.query({
    query: GET_TWO_COL_CTA,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '5JJjDYfV0PMezLNVPdBc4v',
    },
  })

  const {
    data: { searchCarousel },
  } = await contentfulDirectClient.query({
    query: GET_SEARCH_CAROUSEL,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '7i1P65YCg9hT2mRYL6JmP',
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '6m28LDxNkE9zEuurAT8SGU',
    },
  })

  const {
    data: { banner },
  } = await contentfulDirectClient.query({
    query: GET_BANNER,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '5wFN8rwDYxQ8xvMbqyrSBz',
    },
  })

  return {
    props: {
      featuredBooks: featuredBooks.items || [],
      newBooks: newBooks?.items || [],
      upcomingBooks: upcomingBooks?.items || [],
      leadershipSummaries: twoColCta || null,
      SEO: seo || {},
      memberBooksPrem: searchCarousel || null,
      banner: banner || null,
    },
    revalidate: 20,
  }
}
