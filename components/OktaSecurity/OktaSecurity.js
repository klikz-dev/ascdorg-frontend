import { useMemo, createContext, useContext, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { OktaAuth } from '@okta/okta-auth-js'
import Cookies from 'universal-cookie'
import { COOKIE_NAME } from '../../const'
import {
  signOutUser,
  pianoTokenVar,
  userAccountIdVar,
  pianoUserAccount,
  pianoUserLoading,
  showSignUp,
  oktaAccountIdVar,
} from '../../lib/apollo-client/cache'
import fetchPianoUserById from '../../lib/fetches/fetchPianoUserbyId'
import fetchPianoUserToken from '../../lib/fetches/fetchPianoUserToken'
import { sendLoginEvent } from '../../lib/ga'
import { baseUrl, getParamValue, hostnameForCookie } from '../../lib/utils'
import OktaSiwWrapper from './OktaSiwWrapper'

const cookies = new Cookies()

const OktaSecurityContext = createContext()
export const useOktaSecurity = () => useContext(OktaSecurityContext)

/**
 * This component controls sign in and out
 */
const OktaSecurity = ({ children }) => {
  const executeSignOut = useReactiveVar(signOutUser)

  useEffect(() => {
    const oktaSignOut = async () => {
      try {
        await authClient.closeSession()
        signOutUser(false)
      } catch (e) {
        if (e.xhr && e.xhr.status === 429) {
          // Too many requests
        }
        signOutUser(false)
        console.log(e)
      }
      await authClient.revokeAccessToken()
      // Remove cookie
      cookies.remove(COOKIE_NAME, {
        path: '/',
        domain: hostnameForCookie,
      })
    }
    if (executeSignOut) {
      oktaSignOut()
    }
  }, [executeSignOut, authClient])

  const authClient = useMemo(
    () =>
      new OktaAuth({
        clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID,
        issuer: process.env.NEXT_PUBLIC_OKTA_ISSUER,
        redirectUri: `${baseUrl}/login/callback`,
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
      }),
    []
  )

  const userAccountId = useReactiveVar(userAccountIdVar)
  useEffect(() => {
    const loadPianoUser = async () => {
      pianoUserLoading(true)

      const fetchUserResponse = await fetchPianoUserById(userAccountId)
      pianoUserAccount(fetchUserResponse?.data?.userAccount)

      pianoUserLoading(false)
    }

    if (userAccountId) {
      loadPianoUser()
    } else {
      pianoUserAccount(undefined)
    }
  }, [userAccountId])

  // Subscribe to authState change event.
  authClient.authStateManager.subscribe((authState) => {
    // Logic based on authState is done here.
    if (!authState.isAuthenticated) {
      userAccountIdVar(undefined)
      pianoTokenVar(undefined)
      oktaAccountIdVar(undefined)

      if (getParamValue('register')) {
        showSignUp(true)
      }
      return
    }

    // Render authenticated view

    if (authState.isAuthenticated) {
      oktaAccountIdVar(authState.idToken.claims.sub)

      // Set Piano Account ID and Token so website works as normal with Piano by setting the Accoutn ID and Piano Token
      if (!userAccountIdVar() || !pianoTokenVar()) {
        fetchPianoUserToken(
          authState.idToken.claims.pianoUid,
          authState.idToken.claims.email,
          authState.idToken.claims.givenName,
          authState.idToken.claims.familyName,
          authState.idToken.claims.exp
        ).then((fetchTokenRes) => {
          userAccountIdVar(fetchTokenRes?.pianoUid)
          pianoTokenVar(fetchTokenRes?.pianoToken)
          // Used primarily for the registration for Community forums
          if (getParamValue('target') && typeof window !== 'undefined') {
            window.location.href = getParamValue('target')
          }
        })
      }

      // Push a loginEvent datalayer to GA
      sendLoginEvent({ loginMethod: 'email' })
    }
  })

  authClient.start()

  return (
    <OktaSecurityContext.Provider
      value={{
        authClient: authClient,
      }}
    >
      <OktaSiwWrapper />
      {children}
    </OktaSecurityContext.Provider>
  )
}

export default OktaSecurity
