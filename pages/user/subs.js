import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import Banner from '../../components/Banners/Banner'
import Layout from '../../components/layout'
import TwoColumnCta from '../../components/TwoColumnCta'

const PianoAccount = dynamic(
  () => import('../../components/piano/pianoaccount'),
  {
    ssr: false,
  }
)

export default function UserSubs() {
  return (
    <Layout>
      <Head>
        <title>{`ASCD: My Account`}</title>
      </Head>
      <Banner title='My Account' borderBottomLeft />
      <Container>
        <Box my={11}>
          <PianoAccount />
        </Box>
      </Container>
      <Container>
        <Box my={11}>
          <TwoColumnCta
            testId='user-subs-2-col-cta'
            title='Write for ASCD'
            description='We publish insightful, actionable, relevant work from educators across all levels of education that help educators learn, teach and lead.'
            ctaItems={[
              {
                __typename: 'ButtonLinkComponent',
                linkUrl: '/write-for-ascd',
                linkLabel: 'Learn more',
              },
            ]}
            image='/images/write_for_ascd.svg'
            imagePos='left'
          />
        </Box>
      </Container>
    </Layout>
  )
}
