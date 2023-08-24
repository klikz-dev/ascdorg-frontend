import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import Cookies from 'universal-cookie'
import {
  userAccountIdVar,
  showSignUp,
  pianoTokenVar,
} from '../../lib/apollo-client/cache'
import { hostnameForCookie, pianoClient } from '../../lib/utils'

const cookies = new Cookies()

/**
 * Piano Manager is used to manage api interactions with the piano client sdk.
 * This also is implementing our Activate Integration cookie
 *
 * The manager updates the userAccountIdVar which will trigger updates to the User Account query.
 * This will then update the site and components that use User Account related info.
 *
 * @return {Component}
 */
const PianoManager = () => {
  const pianoToken = useReactiveVar(pianoTokenVar)
  const userAccountId = useReactiveVar(userAccountIdVar)
  const [offerParams, setOfferParams] = useState()

  useEffect(() => {
    pianoClient?.push([
      'init',
      function () {
        pianoClient?.push([
          'addHandler',
          'loginRequired',
          function (params) {
            // Sign Up
            if (!pianoClient?.pianoIdLite?.isUserValid()) {
              // Start sign up or login with Okta then show offer when completed
              setOfferParams(params)
              showSignUp(true)
              pianoClient?.offer.close()
            } else if (pianoClient?.pianoIdLite?.isUserValid()) {
              pianoClient?.offer.startCheckout(params)
            } else {
              pianoClient?.offer.close()
            }
          },
        ])
      },
    ])
  }, [])

  useEffect(() => {
    if (!pianoToken) {
      pianoClient?.pianoId?.logout()
    }
    pianoClient.push(['setExternalJWT', pianoToken])
    if (pianoClient?.pianoIdLite?.isUserValid() && offerParams) {
      // Show offer when user has completed login/signup with Okta
      pianoClient?.offer.startCheckout(offerParams)
      setOfferParams()
    }
  }, [pianoToken, offerParams])

  useEffect(() => {
    if (userAccountId && !cookies.get('.ASCD')) {
      var url = process.env.NEXT_PUBLIC_COOKIE_API_URL + userAccountId
      fetch(url, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((response) => {
          cookies.set('.ASCD', response, {
            path: '/',
            domain: hostnameForCookie,
          })
        })
        .catch()
    } else if (!userAccountId) {
      cookies.remove('.ASCD', { path: '/', domain: hostnameForCookie })
    }
  }, [userAccountId])

  return <></>
}

/**
 * Calls the piano client to show the login screen
 */
export const pianoLogInHandler = () => pianoClient?.pianoId?.show()

/**
 * Calls the piano client to show the login screen
 */
export const pianoRegisterHandler = (targetUrl) =>
  pianoClient?.pianoId?.show({
    screen: 'register',
    loggedIn: () => (location.href = targetUrl || '\\'),
  })

/**
 * Calls the piano client to logout the user and clear client user account
 */
export const pianoLogOutHandler = () => {
  pianoClient?.user?.logout()
  userAccountIdVar(undefined)
  cookies.remove('.ASCD', { path: '/', domain: hostnameForCookie })
}

export default PianoManager
