import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Container,
  Typography,
  Input,
  InputAdornment,
} from '@mui/material'
import Banner from '../../components/Banners/Banner'
import Directory from '../../components/Directory'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_AFFILIATES from '../../lib/schema/pages/getAffiliates.graphql'

export default function AffiliateLocations({ affiliateLocations, SEO }) {
  const [searchText, setSearchText] = useState('')

  const sortedLocations = [...affiliateLocations].sort((a, b) =>
    a?.title?.localeCompare(b?.title)
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Banner
        title='ASCD Affiliate Directory'
        subitle='ASCD affiliates work collaboratively as part of the ASCD community to foster common values and goals.'
        borderBottomLeft
      />

      <Container maxWidtg='lg'>
        <Box mt={5} mb={7}>
          <Input
            placeholder='Search by location'
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              width: '100%',
              fontSize: '30px',
            }}
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>
      </Container>
      {sortedLocations.map((location, index) => {
        const filteredLocations = location.affiliates.items.filter(
          (affiliate) => {
            if (searchText !== '') {
              if (
                !affiliate.title
                  .toUpperCase()
                  .includes(searchText.toUpperCase())
              )
                return false
            }
            return true
          }
        )
        return (
          filteredLocations.length > 0 && (
            <Container key={index}>
              <Box my={5} ml={2}>
                <Typography variant='h1'>{location.title}</Typography>
              </Box>
              <Directory items={filteredLocations} />
            </Container>
          )
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { affiliateLocations },
  } = await contentfulDirectClient.query({
    query: GET_AFFILIATES,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 10,
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '3xjQMA1CF7CzdR4rpaq3Fv',
    },
  })

  return {
    props: {
      affiliateLocations: affiliateLocations.items,
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
