import Head from 'next/head'
import { Box, Container } from '@mui/material'
import Layout from '../components/layout'
import TwoColumnCTA from '../components/TwoColumnCta'

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>500 internal server error</title>
      </Head>
      <Container>
        <Box my={20}>
          <TwoColumnCTA
            testId='500-2-col-cta'
            title='500'
            ctaItems={[
              {
                __typename: 'ButtonLinkComponent',
                linkUrl: '/',
                linkLabel: 'Back to ascd.org',
                buttonStyle: ['Text Link w/Arrow (Preset #2)'],
              },
            ]}
            description='Error occurred while processing your request.'
            image='/images/image404.svg'
            imagePos='right'
            variant='error'
            descriptionLineNumbers={2}
          />
        </Box>
      </Container>
    </Layout>
  )
}
