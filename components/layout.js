import { useEffect, useState } from 'react'
import { Box, Link, Typography } from '@mui/material'
import CustomBlock from '../const/CustomBlocks'
import { getContentfulDirectClient } from '../lib/apollo-client'
import SITEWIDE_MESSAGE_QUERY from '../lib/schema/sitewideMessage.graphql'
import Footer from './NavigationComponents/Footer'
import Header from './NavigationComponents/Header'

export default function Layout({
  testId = 'layout',
  children,
  paywall,
  grey = false,
}) {
  const [sitewideMessageProps, setSitewideMessageProps] = useState({})
  useEffect(() => {
    const fetchSitewideProps = async () => {
      try {
        const contentfulDirectClient = await getContentfulDirectClient()
        const sitewideMessageData = await contentfulDirectClient.query({
          query: SITEWIDE_MESSAGE_QUERY,
          variables: {
            preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
          },
        })
        setSitewideMessageProps(
          sitewideMessageData.data.siteWideMessageCollection || {}
        )
      } catch (err) {
        console.log(err)
      }
    }
    fetchSitewideProps()
  }, [])

  return (
    <Box data-testid={testId}>
      <Header />
      <Box
        component='main'
        data-testid={`${testId}-content`}
        id='mainContent'
        sx={{
          marginTop: { xs: '56px', md: '72px' },
        }}
      >
        {
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
              Free shipping for a limited time valid on orders over $50. Use
              promo code FREESHIP23; terms and conditions apply.&nbsp;
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
        }
        {children}
      </Box>

      <Footer grey={grey} />
      {paywall && (
        <Box
          id='piano-three-quarters-wall'
          sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            zIndex: 1,
          }}
        />
      )}
      {paywall && (
        <Box
          id='piano-bottom-ribbon'
          sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
          }}
        />
      )}
      {!!sitewideMessageProps?.items?.[0]?.onOffSwitch && (
        <CustomBlock item={sitewideMessageProps} />
      )}
    </Box>
  )
}
