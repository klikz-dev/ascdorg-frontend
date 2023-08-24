import Head from 'next/head'
import { Box, Container } from '@mui/material'
import Layout from '../../components/layout'
import CustomBlock from '../../const/CustomBlocks'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_PAGE_BY_SLUG_QUERY_FIVE from '../../lib/schema/pages/getPageBySlugFive.graphql'
import GET_PAGE_BY_SLUG_QUERY_FOUR from '../../lib/schema/pages/getPageBySlugFour.graphql'
import GET_PAGE_BY_SLUG_QUERY_ONE from '../../lib/schema/pages/getPageBySlugOne.graphql'
import GET_PAGE_BY_SLUG_QUERY_THREE from '../../lib/schema/pages/getPageBySlugThree.graphql'
import GET_PAGE_BY_SLUG_QUERY_TWO from '../../lib/schema/pages/getPageBySlugTwo.graphql'
import { reconcilePageData } from '../../lib/utils'

export default function Blogs({ blogs }) {
  return (
    <Layout>
      <Head>
        <title>{`ASCD: Blogs`}</title>
      </Head>
      {blogs && (
        <Container maxWidth='lg'>
          {blogs?.content.items?.map((component, index) => {
            return (
              <Box key={index} mt={[5, 10, 15]} mb={[5, 10, 15]}>
                <CustomBlock item={component} />
              </Box>
            )
          })}
        </Container>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
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
      where: { sys: { id: '7CU91SYu99OmC4zoQwVPUP' } },
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
      where: { sys: { id: '7CU91SYu99OmC4zoQwVPUP' } },
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
      where: { sys: { id: '7CU91SYu99OmC4zoQwVPUP' } },
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
      memberPriceItemCollectionLimit: 10,
      memberPriceCollectionLimit: 6,
      where: { sys: { id: '7CU91SYu99OmC4zoQwVPUP' } },
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
          where: { sys: { id: '7CU91SYu99OmC4zoQwVPUP' } },
        },
      }),
    ])
  }

  const itemsData = await Promise.all(promiseChain)

  const restItems = [...itemsData.flat()]
    .map((items) => items?.data?.pages.items?.[0]?.content?.items)
    .flat()

  const itemsFour = [{ content: { items: [...restItems] } }]

  const page = reconcilePageData(
    items,
    itemsTwo,
    itemsThree,
    itemsFour,
    itemsFive
  )

  if (!page || !page.content?.items || page.content?.items.length === 0) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      blogs: page || null,
    },
    revalidate: 20,
  }
}
