import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useReactiveVar } from '@apollo/client'
import {
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
  Link,
} from '@mui/material'
import useSWR from 'swr'
import Banner from '../../components/Banners/Banner'
import Layout from '../../components/layout'
import TwoColumnCta from '../../components/TwoColumnCta'
import OktaProfile from '../../components/UserAccount/OktaProfile'
import { oktaAccountIdVar } from '../../lib/apollo-client/cache'
import useUserAccount from '../../lib/hooks/useUserAccount'
import { formatDateToCalendarLong } from '../../lib/utils'

const PianoAccount = dynamic(
  () => import('../../components/piano/pianoaccount'),
  {
    ssr: false,
  }
)
export default function UserAccount() {
  const oktaUid = useReactiveVar(oktaAccountIdVar)

  const { data: oktaUser } = useSWR(
    oktaUid ? `/api/okta/get-user/?userId=${oktaUid}` : undefined,
    (url) => fetch(url).then((res) => res.json())
  )

  const { userAccountUser } = useUserAccount()
  const [memberSince, setMemberSince] = useState(0)
  useEffect(() => {
    if (userAccountUser?.create_date) {
      setMemberSince(
        formatDateToCalendarLong(userAccountUser?.create_date * 1000)
      )
    }
  }, [userAccountUser?.create_date])

  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout>
      <Head>
        <title>{`ASCD: My Account`}</title>
      </Head>

      <Banner title='My Account' borderBottomLeft />

      {oktaUser && (
        <Container>
          <Typography variant='h5' pt={3}>
            To view your book order history, go to your
            <Link href='/account/orders'>
              <a>
                <Typography pl={1} variant='medium-link' color='#005E47'>
                  book order history
                </Typography>
              </a>
            </Link>
          </Typography>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mt={5}
          >
            <Grid item>
              <Typography variant='subtitle1'>
                Member ID: {oktaUser?.id}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>
                {`Member Since: ${memberSince}`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}

      <Container>
        <Box mt={5} mb={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            aria-label='My Account'
          >
            <Tab
              label='Profile'
              id='tab-profile'
              aria-controls='tabpanel-profile'
              sx={{
                color: 'common.black',
              }}
            />

            <Tab
              label='Membership'
              id='tab-membership'
              aria-controls='tabpanel-membership'
              sx={{
                color: 'common.black',
              }}
            />
          </Tabs>
        </Box>

        <Box id='tabpanel-profile' role='tabpanel' hidden={activeTab !== 0}>
          <Box>
            {oktaUser?.profile && (
              <OktaProfile userId={oktaUser?.id} profile={oktaUser?.profile} />
            )}
          </Box>
        </Box>

        <Box id='tabpanel-membership' role='tabpanel' hidden={activeTab !== 1}>
          <Box p={4}>
            <PianoAccount />
            <Box id='my-account'>Loading...</Box>
          </Box>
        </Box>
      </Container>

      <Container>
        <Box my={11}>
          <TwoColumnCta
            testId='user-account-2-col-cta'
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
