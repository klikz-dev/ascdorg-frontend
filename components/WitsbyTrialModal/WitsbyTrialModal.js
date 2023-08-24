import { useEffect, useState, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Button, Typography, Grid } from '@mui/material'
import { string, bool, func } from 'prop-types'
import useSWR from 'swr'
import { showSignIn, oktaAccountIdVar } from '../../lib/apollo-client/cache'
import fetchPianoGrantAccess from '../../lib/fetches/fetchPianoGrantAccess'
import fetchSalesforceLeads from '../../lib/fetches/fetchSalesforceLeads'
import postSalesforceLead from '../../lib/fetches/postSalesforceLead'
import useUserAccount from '../../lib/hooks/useUserAccount'

const BUTTON_TEXT = {
  REGISTER: 'Register',
  CLOSE: 'Close',
  SIGN_IN: 'Sign In',
}

const useOktaUser = (uid) => {
  return useSWR(uid ? `/api/okta/get-user/?userId=${uid}` : undefined, (url) =>
    fetch(url).then((res) => res.json())
  )
}

const ButtonComponent = ({ testid, onClick, buttonText, showButton }) => {
  return (
    showButton && (
      <Button
        data-testid={`${testid}-button`}
        sx={{
          color: 'text.secondary',
          bgcolor: 'primary.main',
          borderRadius: '4px',
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    )
  )
}

ButtonComponent.propTypes = {
  testid: string,
  onClick: func,
  buttonText: string,
  showButton: bool,
}

export default function WitsbyTrialModal({
  handleClose,
  showButton = false,
  title = 'Witsby Trial',
  text = 'Register for Witsby Trial',
  testid = 'witsby-trial-modal',
}) {
  const oktaUid = useReactiveVar(oktaAccountIdVar)
  const { data: oktaUser, mutate } = useOktaUser(oktaUid)
  const { userAccountUser } = useUserAccount()
  const [witsbyTrialStatus, setWitsbyTrialStatus] = useState(text)
  const [buttonText, setButtonText] = useState(BUTTON_TEXT.SIGN_IN)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (userAccountUser) {
      setButtonText(isClicked ? BUTTON_TEXT.CLOSE : BUTTON_TEXT.REGISTER)
    } else {
      setButtonText(BUTTON_TEXT.SIGN_IN)
    }
  }, [userAccountUser, isClicked])

  const CONTRACT_GROUP_ID = '293644'

  const handleRegister = useCallback(async () => {
    const { profile } = oktaUser ?? {}
    const witsbyTrialEndDate = profile?.witsbyTrialEndDate
      ? new Date(profile.witsbyTrialEndDate)
      : null

    const actions = {
      [BUTTON_TEXT.REGISTER]: async () => {
        if (profile?.witsbyContractGroupId === CONTRACT_GROUP_ID) {
          setWitsbyTrialStatus('You have access through your institution')
        } else {
          await handleRegistration(witsbyTrialEndDate)
        }
        setIsClicked(true)
      },
      [BUTTON_TEXT.SIGN_IN]: () => showSignIn(true),
      [BUTTON_TEXT.CLOSE]: () => handleClose(),
    }

    const action = actions[buttonText]
    if (action) await action()
  }, [buttonText, oktaUser, userAccountUser])

  const handleRegistration = async (witsbyTrialEndDate) => {
    if (witsbyTrialEndDate === null) {
      await grantAccess()
      await addSalesforceLead()
    } else {
      checkAccess(witsbyTrialEndDate)
    }
  }

  const grantAccess = async () => {
    try {
      const EXPIRY_PERIOD = Math.floor(Date.now() / 1000) + 1209600 // 2 weeks from now
      const grantStatus = await fetchPianoGrantAccess(
        userAccountUser?.uid,
        process.env.NEXT_PUBLIC_PIANO_WISTBY_RESOURCE_ID,
        EXPIRY_PERIOD
      )
      if (grantStatus?.data?.code === 0) {
        setWitsbyTrialStatus('You have registered Witsby access successfully')
      } else {
        throw new Error(grantStatus?.data?.message)
      }
    } catch (error) {
      setWitsbyTrialStatus(`There was an error: ${error?.message}`)
    }
  }

  const checkAccess = (witsbyTrialEndDate) => {
    if (witsbyTrialEndDate >= Date.now()) {
      setWitsbyTrialStatus(
        `You already have access. Expires: ${oktaUser?.profile?.witsbyTrialEndDate}`
      )
    } else {
      setWitsbyTrialStatus(
        'You have exceeded the number of eligible Witsby trial registrations.'
      )
    }
  }

  const addSalesforceLead = async () => {
    try {
      if (await checkSalesforceLead()) {
        /** we need to force this to fetch this data again
         * @todo: probably does nothing */
        const updatedOktaUser = await mutate(
          oktaUid ? `/api/okta/get-user/?userId=${oktaUid}` : undefined,
          (url) => fetch(url).then((res) => res.json())
        )
        const {
          profile: {
            firstName,
            lastName,
            login,
            title,
            state,
            countryCode = 'US',
            zipCode,
            districtName,
          },
        } = updatedOktaUser ?? {}
        await postSalesforceLead({
          FirstName: firstName,
          LastName: lastName,
          Company: districtName || 'Witsby Individual Trial Account',
          Status: 'Open',
          Email: login,
          ...(zipCode ? { PostalCode: zipCode } : {}),
          ...(title ? { Title: title } : {}),
          /**
           * we have to change the country code into a country, if it is a 2-letter code
           * and have 'United States' as a backup in case there is no country code provided
           */
          Country:
            countryCode?.length === 2
              ? new Intl.DisplayNames(['en'], { type: 'region' }).of(
                  countryCode
                )
              : countryCode,
          ...(state ? { State: state } : {}),
          LeadSource: 'Okta Witsby',
        })
      } else {
        setWitsbyTrialStatus(
          'You already have an eligible trial lead.  If you think this is an error, please contact your administrator.'
        )
      }
    } catch (error) {
      setWitsbyTrialStatus(`There was an error: ${error.message}`)
    }
  }

  /** util for checking whether the current user's lead exists in the records */
  const checkRecords = (currentLeads) =>
    currentLeads.some(({ Email, LeadSource }) => {
      return (
        Email === oktaUser?.profile?.email &&
        ['Witsby Landing Page', 'Okta Witsby'].includes(LeadSource)
      )
    })

  /**
   * this function iterates through all salesforce leads.  Since grabbing
   * them only returns 2k at a time, we have to fetch the first bit, check,
   * and then continue fetching until we either reach the end or we find
   * a matching lead.
   * @returns {Promise<boolean>}
   */
  const checkSalesforceLead = async () => {
    // this is false to start, and will eventually be true when it reaches the last entry
    let finished = false
    // this is a string that is used for a next url, rather than the whole url
    let next = ''

    while (!finished) {
      const {
        done,
        records: currentRecords,
        nextRecordsUrl,
      } = await fetchSalesforceLeads(next)
      if (checkRecords(currentRecords)) {
        return false
      }
      if (nextRecordsUrl) {
        /** split the nextRecordUrl to the string we need */
        const parts = nextRecordsUrl.split('/')
        const nextRecord = parts[parts.length - 1]
        /** set next to the next record */
        next = nextRecord
      }
      /** set finished as the result of 'done' from the call */
      finished = done
    }

    /** return true if no record was found */
    return true
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby={`witsby-trial-modal-${title}`}
      aria-describedby={`witsby-trial-modal-text-${title}`}
    >
      <Box
        data-testid={testid}
        sx={{
          color: 'text.secondary',
          bgcolor: 'primary.main',
          width: { xs: '100vw', md: '560px' },
          position: 'absolute',
          padding: (theme) => theme.spacing(2, 0, 0, 0),
          top: { md: '15%' },
          left: { md: '50%' },
          transform: { md: 'translate(-50%, -10%)' },
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box display='flex' alignItems='flex-end' mb={2} pl={2} pr={2}>
            <IconButton
              data-testid={`${testid}-icon-button`}
              aria-label='Close modal button'
              sx={{
                mr: 2,
                color: 'text.secondary',
              }}
              size='large'
              onClick={handleClose}
            >
              <CloseIcon size='small' />
            </IconButton>
            <Typography variant='h5' data-testid={`${testid}-title`}>
              {title}
            </Typography>
          </Box>

          <Box mb={2} pl={2} pr={2}>
            <Typography variant='subtitle3'>
              {userAccountUser?.email ?? ''}
            </Typography>
          </Box>
        </Box>

        <Grid
          container
          justifyContent='space-between'
          direction='column'
          alignItems='flex-end'
          sx={{
            color: 'text.primary',
            bgcolor: 'text.secondary',
            height: '97%',
          }}
        >
          <Grid
            item
            sx={{
              mt: 2,
              mb: 2,
              pr: 2,
              pl: 2,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography variant='h6' data-testid={`${testid}-text`}>
              {witsbyTrialStatus}
            </Typography>
          </Grid>
          <Grid item sx={{ mr: 2, mb: { xs: 4, md: 2 } }}>
            <ButtonComponent
              testid={testid}
              onClick={handleRegister}
              buttonText={buttonText}
              showButton={showButton}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

WitsbyTrialModal.propType = {
  handleClose: func,
  showButton: bool,
  title: string,
  text: string,
  testid: string,
}
