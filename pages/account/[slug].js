import { useEffect, useState } from 'react'
import { Box, Container, Typography, Link } from '@mui/material'
import useSWR from 'swr'
import AccountBanner from '../../components/Banners/AccountBanner'
import OrderCard from '../../components/Cards/OrderCard'
// import DownloadDataGrid from '../../components/DownloadDataGrid'
import Layout from '../../components/layout'
import AccountSettings from '../../components/UserAccount/AccountSettings'
import {
  MY_ACCOUNT,
  ORDERS,
  MY_DOWNLOADS,
  ACCOUNT_SETTINGS,
} from '../../const/myaccount-tabs'
import { orderItemToCardData } from '../../lib/data-transformations'
import useUserAccount from '../../lib/hooks/useUserAccount'
// import useUserDownloads from '../../lib/hooks/useUserDownloads'

export default function AccountTab({ tab }) {
  // const { downloads, getUserDownloads, fetchCompleted } = useUserDownloads()
  const { userAccountUser } = useUserAccount()
  const [orders, setorders] = useState([])
  // const [showDownloads, setShowDownloads] = useState()
  const { data } = useSWR(
    userAccountUser?.email
      ? `/api/orders?emailId=${userAccountUser?.email}`
      : undefined,
    (url) => fetch(url).then((res) => res.json())
  )

  useEffect(() => {
    const fetchSnipcartOrder = async (token) => {
      const request = await fetch(
        `https://app.snipcart.com/api/orders/${token}`,
        {
          headers: {
            Authorization: `Basic ${`${process.env.NEXT_PUBLIC_BASE64_ENCODED_ORDERS_SNIPCART_SECRET}`}`,
            Accept: 'application/json',
          },
        }
      )
      return await request.json()
    }
    const fetchUserOrders = async () => {
      try {
        const formattedOrders = data?.reduce((acc, currentValue) => {
          let groupKey = currentValue['ORDER_NO']
          if (!acc[groupKey]) {
            acc[groupKey] = []
          }
          acc[groupKey].push(currentValue)
          return acc
        }, {})

        const mappedOrders = await Promise.all(
          Object.values(formattedOrders).map(async (value) => {
            /**
             * Grab the first entry of value  per order and
             * if it is a snipcart type, fetch the data and add to it. */
            if (value[0].SOURCE === 'Snipcart') {
              try {
                const {
                  creditCardLast4Digits,
                  completionDate,
                  cardType,
                  paymentMethod,
                  paymentStatus,
                } = await fetchSnipcartOrder(`${value[0].TOKEN}`)
                return {
                  items: value.map((item) => {
                    return {
                      ...item,
                      creditCardLast4Digits,
                      completionDate,
                      cardType,
                      paymentMethod,
                      paymentStatus,
                    }
                  }),
                }
              } catch (error) {
                console.log(error)
              }
            } else {
              return { items: value }
            }
          })
        )
        setorders(mappedOrders)
      } catch (err) {
        console.log(err)
      }
    }

    if (userAccountUser?.uid) {
      fetchUserOrders()
    }
    // else {
    //   setShowDownloads()
    // }
  }, [userAccountUser?.uid, data])

  // useEffect(() => {
  //   if (fetchCompleted) {
  //     setShowDownloads(fetchCompleted)
  //   }
  // }, [fetchCompleted])

  // useEffect(() => {
  //   if (userAccountUser?.masterCustomerId) {
  //     getUserDownloads(userAccountUser?.masterCustomerId)
  //   }
  // }, [userAccountUser?.masterCustomerId])
  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={tab}
          title={userAccountUser ? userAccountUser.name : 'Please log in'}
        />
      </Box>

      <Container maxWidth='lg'>
        <Box mt={8} mb={10}>
          {tab === ORDERS && (
            <Typography variant='h5' pb={3}>
              Your book orders as of August 1, 2021 are listed below. For an
              overview of your membership and event order history, go to your
              <Link href='/user/account'>
                <a>
                  <Typography pl={1} variant='medium-link' color='#005E47'>
                    transactions history
                  </Typography>
                </a>
              </Link>
              .
            </Typography>
          )}
          {tab === ORDERS &&
            userAccountUser?.uid &&
            orders &&
            orders.map((i) => (
              <Box mb={5} key={i}>
                <OrderCard key={i} cardData={orderItemToCardData(i)} />
              </Box>
            ))}
        </Box>
        <Box mt={8} mb={10}>
          {/* {tab === MY_DOWNLOADS && showDownloads && (
            <DownloadDataGrid downloads={downloads} />
          )} */}
          {tab === ACCOUNT_SETTINGS && <AccountSettings />}
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const tabs = [MY_ACCOUNT, ORDERS, MY_DOWNLOADS, ACCOUNT_SETTINGS]
  return {
    paths: tabs.map((tab) => ({
      params: { slug: tab },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      tab: params.slug,
    },
    revalidate: 20,
  }
}
