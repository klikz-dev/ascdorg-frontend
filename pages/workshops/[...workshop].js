import dynamic from 'next/dynamic'
import { Box, Container, Divider } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout'
import ProductBanner from '../../components/layouts/ProductBanner'
import WorkshopSectionTopLeft from '../../components/layouts/workshop/WorkshopSectionTopLeft'
import SEOHead from '../../components/SEOHead'
import TwoColContentListingWorkshop from '../../components/TwoColContentListingWorkshop'
import NeverMiss from '../../components/WorkshopComponents/NeverMiss'
import SpotlightImage from '../../components/WorkshopComponents/SpotlightImage'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { contentfulAPIToSEOHead } from '../../lib/data-transformations'
import GET_WORKSHOP from '../../lib/schema/pages/getWorkshop.graphql'
import GET_WORKSHOP_LIST_QUERY from '../../lib/schema/pages/getWorkshopList.graphql'

const WorkshopSectionTopRight = dynamic(
  () => import('../../components/layouts/workshop/WorkshopSectionTopRight'),
  { ssr: true }
)

export default function Workshop({
  title,
  slug,
  clockHours,
  description,
  type,
  spotlightImage,
  grades,
  keywords,
  roles,
  materials,
  authors,
  variations,
  recommendedWorkshops,
  variationId,
  seo,
}) {
  return (
    <Layout>
      <SEOHead seo={seo} />
      {slug && (
        <Container maxWidth='lg'>
          <Box mt={5} mb={5}>
            {spotlightImage?.imgSrc && (
              <SpotlightImage
                imgUrl={spotlightImage.imgSrc}
                imgTitle={spotlightImage.alternate}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'space-between' },
              flexWrap: { xs: 'wrap', sm: 'unset' },
            }}
          >
            <Box pr={7}>
              <WorkshopSectionTopLeft
                type={type}
                title={title}
                description={description}
                roles={roles}
                grades={grades}
                keywords={keywords}
                authors={authors}
              />
            </Box>
            <Box
              sx={{
                width: { xs: '100%', sm: '348px' },
                minWidth: { xs: 'unset', sm: '348px' },
              }}
            >
              <WorkshopSectionTopRight
                spotlightImage={spotlightImage}
                variations={variations}
                slug={slug}
                title={title}
                materials={materials}
                clockHours={clockHours}
                selectedVariationId={variationId}
              />
            </Box>
          </Box>
          <Box mt={[5, 9]}>
            {materials.items.map((book, i) => (
              <Box pt={2} pb={2} key={i}>
                <ProductBanner
                  data={book}
                  defaultProductVariantId={
                    book.bookVersions.items[0].productNumber
                  }
                />
              </Box>
            ))}
          </Box>
          <Box mt={[5, 9]}>
            <Divider
              sx={{
                display: { xs: 'none', sm: 'initial' },
              }}
            />
          </Box>
          <Box mt={[5, 10]} mb={8}>
            {recommendedWorkshops?.length > 0 && (
              <TwoColContentListingWorkshop
                title='More Virtual Workshops from ASCD'
                items={recommendedWorkshops}
                limit={3}
                body={
                  <ReactMarkdown>
                    Register today for an upcoming author Workshop. Registered
                    attendees have access to each session&apos;s recording for
                    seven days after the live date.
                  </ReactMarkdown>
                }
                variant='workshop'
              />
            )}
          </Box>
          <Divider />
          <NeverMiss />
        </Container>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { workshops: workshopData },
  } = await contentfulDirectClient.query({
    query: GET_WORKSHOP_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: workshopData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { workshop: item.slug.split('/') },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { workshops: workshop },
  } = await contentfulDirectClient.query({
    query: GET_WORKSHOP,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params?.workshop[0] },
      topicsLimit: 9,
    },
  })

  const {
    data: { workshops },
  } = await contentfulDirectClient.query({
    query: GET_WORKSHOP,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 3,
      where: { slug_not: params?.workshop[0] },
      topicsLimit: 9,
    },
  })

  if (!workshop || !workshop.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    title,
    slug,
    clockHours,
    description,
    type,
    spotlightImage,
    grades,
    keywords,
    roles,
    materials,
    authors,
    variations,
    sys,
    __typename,
  } = workshop.items?.[0]

  return {
    props: {
      title,
      slug,
      clockHours,
      description,
      type,
      spotlightImage,
      grades,
      seo: contentfulAPIToSEOHead({
        title,
        description: description?.json,
        image: spotlightImage,
        sys,
        __typename,
      }),
      keywords,
      roles,
      materials,
      authors,
      variations,
      variationId: params.workshop[1] || null,
      recommendedWorkshops: workshops.items || null,
    },
    revalidate: 20,
  }
}
