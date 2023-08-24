import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Divider, Skeleton } from '@mui/material'
import BookBanner from '../../components/Banners/BookBanner'
import HorizontalScroll from '../../components/HorizontalScroll'
import Layout from '../../components/layout'
import ReadMore from '../../components/ReadMore'
import SEOHead from '../../components/SEOHead'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulAPIToSEOHead } from '../../lib/data-transformations'
import GET_COLLECTION from '../../lib/schema/pages/getCollection.graphql'
import GET_COLLECTION_LIST_QUERY from '../../lib/schema/pages/getCollectionList.graphql'

export default function Collection({
  items,
  seo,
  about,
  thumbnail,
  slug,
  title,
  description,
  memberOriginalPrice,
  originalPrice,
  memberDiscountedPrice,
  discountedPrice,
  taxJar,
  collectionProductNumber,
}) {
  const router = useRouter()
  const [productNumber, setProductNumber] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const variant = url.searchParams.get('variant')
      setProductNumber(collectionProductNumber || variant)
    }
  }, [collectionProductNumber])

  /** React Hooks must be called before conditional rendering */
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

  const filteredItems = items?.items.map((book) => {
    const filteredVersions =
      book.bookVersions?.items?.length > 0
        ? book.bookVersions.items?.filter(
            (bv) => bv.bookType.title !== 'Poster'
          )
        : []

    return { ...book, bookVersions: filteredVersions }
  })

  return (
    <Layout>
      <SEOHead seo={seo} />
      <Container maxWidth='lg'>
        <Box
          sx={{
            maxWidth: '800',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
          }}
        >
          <Box mt={[5, 9]}>
            <BookBanner
              items={filteredItems}
              thumbnail={thumbnail}
              slug={slug}
              title={title}
              description={description}
              memberDiscountedPrice={memberDiscountedPrice}
              discountedPrice={discountedPrice}
              memberOriginalPrice={memberOriginalPrice}
              originalPrice={originalPrice}
              taxJar={taxJar}
              isCollection
              productNumber={productNumber}
              updateProductNumber={(pn) => setProductNumber(pn)}
            />
          </Box>
          <Box mt={[5, 9]} id='about'>
            <ReadMore
              title='About this collection'
              titleVariant='h4'
              short={about.json}
              textAlign='left'
              hideSummaryWhenExpanded
            />
          </Box>
        </Box>
        <Box my={[5, 9]}>
          <Divider />
        </Box>
        {filteredItems.length > 0 && (
          <Box mb={[5, 9]}>
            <HorizontalScroll
              title='Resources in this collection'
              items={filteredItems}
              type='resourcetile'
            />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { collections: collectionData },
  } = await contentfulDirectClient.query({
    query: GET_COLLECTION_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: collectionData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { collection: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { collections },
  } = await contentfulDirectClient.query({
    query: GET_COLLECTION,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: { slug: params.collection },
      limit: 1,
    },
  })

  if (!collections || !collections?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    items,
    seo,
    about,
    thumbnail,
    slug,
    title,
    description,
    memberOriginalPrice,
    originalPrice,
    memberDiscountedPrice,
    discountedPrice,
    taxJar,
    productNumber,
    sys,
    __typename,
  } = collections?.items[0] || null

  return {
    props: {
      items,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          description,
          thumbnail,
          sys,
          __typename,
        }),
      about,
      thumbnail,
      slug,
      title,
      description,
      memberOriginalPrice,
      originalPrice,
      memberDiscountedPrice,
      discountedPrice,
      productNumber,
      taxJar,
      collectionProductNumber: productNumber,
    },
    revalidate: 20,
  }
}
