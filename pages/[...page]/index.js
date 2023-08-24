import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container } from '@mui/material'
import Layout from '../../components/layout'
import GreyTwoColumnFooter from '../../components/layouts/page/GreyTwoColumnFooter'
import PageContent from '../../components/PageContentComponents/PageContent'
import WriteForUsContent from '../../components/PageContentComponents/WriteForUsContent'
import SEOHead from '../../components/SEOHead'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulAPIToSEOHead } from '../../lib/data-transformations'
import GET_PAGE_BY_SLUG_QUERY_FIVE from '../../lib/schema/pages/getPageBySlugFive.graphql'
import GET_PAGE_BY_SLUG_QUERY_FOUR from '../../lib/schema/pages/getPageBySlugFour.graphql'
import GET_PAGE_BY_SLUG_QUERY_ONE from '../../lib/schema/pages/getPageBySlugOne.graphql'
import GET_PAGE_BY_SLUG_QUERY_THREE from '../../lib/schema/pages/getPageBySlugThree.graphql'
import GET_PAGE_BY_SLUG_QUERY_TWO from '../../lib/schema/pages/getPageBySlugTwo.graphql'
import GET_PAGE_LIST_QUERY from '../../lib/schema/pages/getPageList.graphql'
import { reconcilePageData } from '../../lib/utils'

export default function Page({ slug, content, seo, pageId, buttonLink }) {
  const router = useRouter()

  useEffect(() => {
    const slug = router.asPath?.split('#').pop()
    if (slug) {
      const checkExist = setInterval(function () {
        const el = document.getElementById(slug)
        if (el) {
          navigateTo(el)
          clearInterval(checkExist)
        }
      }, 3000)
    }
  }, [router.asPath])

  const navigateTo = (el) => {
    const r = el.getBoundingClientRect()
    window.scrollTo({ top: scrollY + r.top - 130, behavior: 'smooth' })
  }

  if (!content.items.length) return null

  return (
    <Layout grey={slug === 'activate' || slug === 'services'}>
      <SEOHead seo={seo} />
      <Box mt={[0, 0, 5]} mb={[6, 10]}>
        {<PageContent content={content} pageId={pageId} />}
      </Box>
      {slug === 'write-for-ascd' && (
        <Container>
          <WriteForUsContent />
        </Container>
      )}
      {slug !== 'activate' && (
        <GreyTwoColumnFooter variant={slug} buttonLink={buttonLink} />
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { pages: pageData },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  const paths = pageData?.items
    ?.filter(
      (item) => item?.slug && !['workshops', 'blogs'].includes(item?.slug)
    )
    .map((item) => ({
      params: { page: item.slug.split('/') },
    }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  /** The page query as a whole is too large for Contentful limits (8kb query size), so
   * it is being broken into 3 parts and reconciled after fetching
   */
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: {
      pages: { items },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_ONE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.page.join('/') },
    },
  })

  const {
    data: {
      pages: { items: itemsTwo },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_TWO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.page.join('/') },
    },
  })

  const {
    data: {
      pages: { items: itemsThree },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_THREE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.page.join('/') },
    },
  })

  const {
    data: {
      pages: { items: itemsFive },
    },
  } = await contentfulDirectClient.query({
    query: GET_PAGE_BY_SLUG_QUERY_FIVE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      memberPriceCollectionLimit: 6,
      memberPriceItemCollectionLimit: 10,
      where: { slug: params.page.join('/') },
    },
  })

  /** rich text component is 'too complex' for single query here */
  let promiseChain = []

  for (let i = 0; i < 5; i++) {
    promiseChain.push([
      await contentfulDirectClient.query({
        query: GET_PAGE_BY_SLUG_QUERY_FOUR,
        variables: {
          preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
          skip: 10 * i,
          limit: 1,
          contentCollectionLimit: 10,
          where: { slug: params.page.join('/') },
        },
      }),
    ])
  }

  const itemsData = await Promise.all(promiseChain)

  const restItems = [...itemsData.flat()]
    .map((items) => items?.data?.pages?.items?.[0]?.content?.items)
    .flat()

  const itemsFour = [{ content: { items: [...restItems] } }]

  const page = reconcilePageData(
    items,
    itemsTwo,
    itemsThree,
    itemsFour,
    itemsFive
  )

  if (!page || !page?.content?.items || page?.content?.items?.length === 0) {
    return {
      notFound: true,
    }
  }

  const {
    slug,
    content,
    seo,
    pageId,
    buttonLink,
    title,
    summary,
    sys,
    __typename,
  } = page

  return {
    props: {
      slug,
      content,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          summary: summary?.json,
          sys,
          __typename,
        }),
      pageId,
      buttonLink,
    },
    revalidate: 20,
  }
}
