import React from 'react'
// import { useRouter } from 'next/router'
import { Box } from '@mui/material'
// import Axios from 'axios'
import PropTypes from 'prop-types'
// import qs from 'qs'
// import descriptionMock from '../../../__mocks__/descriptionMock'
// import useMembership from '../../../lib/hooks/useMembership'
// import paths from '../../../paths/path'
// import HeroHalfHalf from '../../Banners/HeroHalfHalf'
const MyAccount = ({ membershipData, testId = 'my-account' }) => {
  // const router = useRouter()
  // const { description, getMoreText, upgradeData } = useMembership(
  //   membershipData?.membershipKeyword,
  //   membershipData?.period
  // )
  // const handleCancelMembership = () => {
  //   var data = qs.stringify({
  //     api_token: `${process.env.NEXT_PUBLIC_PIANO_API_KEY}`,
  //     aid: `${process.env.NEXT_PUBLIC_PIANO_APP_ID}`,
  //     subscription_id: membershipData?.subscriptionId,
  //   })
  //   var config = {
  //     method: 'post',
  //     url: `${process.env.NEXT_PUBLIC_PIANO_API_BASE_URL}/publisher/subscription/cancel`,
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data: data,
  //   }
  //   Axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data))
  //       router.reload(window.location.pathname)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  return (
    <Box data-testid={testId}>
      {membershipData?.period == 'month' && (
        <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
          {/** @todo: will no longer work with new version of hero half half */}
          {/* <HeroHalfHalf
            title='Get more from ASCD and save'
            description='Switch your monthly membership to an annual membership and enjoy two months of ASCD for free.'
            image='images/monthlyMembership.png'
            imageAlt='Events banner image'
            ctaLabel1='Upgrade Membership'
            upgradeAnnualId='upgrade2annual'
          /> */}
        </Box>
      )}
      <Box
        pt={[0, 7]}
        pb={7}
        maxWidth={['100%', '1024px']}
        margin='auto'
        data-testid={`${testId}-body`}
      >
        {/** @todo: will no longer work with new version of hero half half */}
        {/* <HeroHalfHalf
          title={getMoreText}
          description={descriptionMock}
          image='images/halfMembership.png'
          imageAlt='Events banner image'
          ctaLabel1={
            membershipData?.membershipName
              ? 'Upgrade Membership'
              : 'Buy Membership'
          }
          ctaLink1={
            membershipData?.membershipName ? null : paths.membershipDetails
          }
          ctaLabel2='Cancel Membership'
          ctaLink2={() => handleCancelMembership()}
          imagePos='left'
          variant='membership'
          membershipData={{ ...membershipData, description }}
          upgradeData={
            membershipData?.membershipName
              ? [
                  {
                    slug: membershipData?.membershipKeyword,
                    upgradeId: '',
                    description: description,
                  },
                ].concat(upgradeData)
              : []
          }
        /> */}
      </Box>
    </Box>
  )
}
MyAccount.propTypes = {
  testId: PropTypes.string,
  membershipData: PropTypes.shape({
    membershipName: PropTypes.string,
    autoRenew: PropTypes.bool,
    expireDate: PropTypes.string,
    price: PropTypes.number,
    period: PropTypes.string,
    membershipKeyword: PropTypes.string,
    subscriptionId: PropTypes.string,
  }),
}
export default MyAccount
