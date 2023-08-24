import { useEffect } from 'react'
import Router from 'next/router'
import { Box, Container } from '@mui/material'
import AccountBanner from '../../components/Banners/AccountBanner'
import Layout from '../../components/layout'
import { MY_ACCOUNT } from '../../const/myaccount-tabs'
import useUserAccount from '../../lib/hooks/useUserAccount'
import paths from '../../paths/path'

export default function MainTab() {
  const { userAccountUser } = useUserAccount()

  useEffect(() => {
    Router.replace(
      paths.account({
        slug: 'orders',
      })
    )
  }, [])

  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={MY_ACCOUNT}
          title={userAccountUser ? userAccountUser.name : 'Please log in'}
        />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={1} mb={80}></Box>
      </Container>
    </Layout>
  )
}
