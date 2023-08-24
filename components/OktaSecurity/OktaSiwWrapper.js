import { useCallback, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import Modal from '@mui/material/Modal'
import {
  showSignIn,
  showSignUp,
  showResetPassword,
} from '../../lib/apollo-client/cache'
import { baseUrl } from '../../lib/utils'
import { useOktaSecurity } from './OktaSecurity'

const OktaSiwWrapper = () => {
  const { authClient } = useOktaSecurity()
  const showOktaSignIn = useReactiveVar(showSignIn)
  const showOktaSignUp = useReactiveVar(showSignUp)
  const showOktaResetPassword = useReactiveVar(showResetPassword)
  const [oktaSignIn, setOktaSignIn] = useState()
  const [showModal, setShowModal] = useState(false)

  const createSiw = useCallback(async () => {
    if (oktaSignIn) return
    const OktaSignIn = (await import('@okta/okta-signin-widget')).default
    setOktaSignIn(
      new OktaSignIn({
        baseUrl: baseUrl,
        issuer: process.env.NEXT_PUBLIC_OKTA_ISSUER,
        clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID,
        redirectUri: `${baseUrl}${process.env.NEXT_PUBLIC_OKTA_REDIRECT_URI_PATH}`,
        useInteractionCodeFlow: true,
        logo: '/images/logo.svg',
        authClient: authClient,
        colors: {
          brand: '#005E47',
        },
      })
    )
  }, [authClient, oktaSignIn])

  useEffect(() => createSiw(), [createSiw])

  const oktaSignInModalRef = useCallback(
    async (node) => {
      if (!node || !oktaSignIn) return
      try {
        const tokens = await oktaSignIn.showSignInToGetTokens({ el: node })
        if (tokens) {
          authClient.tokenManager.setTokens(tokens)
          handleClose()
        }
      } catch (error) {
        handleClose()
        console.log(error)
      }
    },
    [authClient, oktaSignIn, handleClose]
  )

  const startFlow = useCallback(
    async (flow) => {
      await authClient.idx.startTransaction({
        flow: flow,
      })
      resetShowStates()
      setShowModal(true)
    },
    [authClient.idx]
  )

  const sessionFlow = useCallback(async () => {
    /** attempts to set a token without prompt from an existing session, or normal flow */

    const authenticated =
      authClient.authStateManager.getAuthState()?.isAuthenticated
    if (!authenticated) {
      try {
        const { tokens } = await authClient.token.getWithoutPrompt()
        if (tokens) {
          authClient.tokenManager.setTokens(tokens)
        }
        /** do not print the error, do not track the error
         * until we resolve the api issue with sessions/me
         */
        // eslint-disable-next-line no-empty
      } catch (err) {}
    }

    if (showOktaSignIn) {
      startFlow('default')
    } else if (showOktaSignUp) {
      startFlow('signup')
    } else if (showOktaResetPassword) {
      startFlow('resetPassword')
    }
  }, [
    authClient.authStateManager,
    authClient.token,
    authClient.tokenManager,
    showOktaResetPassword,
    showOktaSignIn,
    showOktaSignUp,
    startFlow,
  ])

  useEffect(() => {
    sessionFlow()
  }, [sessionFlow])

  const resetShowStates = () => {
    showSignIn(false)
    showSignUp(false)
    showResetPassword(false)
  }

  const handleClose = useCallback(() => {
    resetShowStates()
    setShowModal(false)
    oktaSignIn.remove()
  }, [oktaSignIn])

  return (
    <Modal open={showModal} onClose={handleClose} style={{ overflow: 'auto' }}>
      <div
        ref={oktaSignInModalRef}
        style={{ margin: 'auto', width: 'fit-content' }}
      />
    </Modal>
  )
}

export default OktaSiwWrapper
