import { NextApiHandler } from 'next'
import fetchRegisterPianoUser from '../../lib/fetches/fetchRegisterPianoUser'

const handler: NextApiHandler = async (req, res) => {
  const response = await fetchRegisterPianoUser(
    req.body.data.userProfile.email,
    req.body.data.userProfile.firstName,
    req.body.data.userProfile.lastName
  )
  if (response?.status === 200) {
    res.status(response.status).json({
      ...response,
      commands: [
        {
          type: 'com.okta.user.profile.update',
          value: {
            login: req.body.data.userProfile.email,
          },
        },
      ],
    })
  } else {
    res.status(500).json({
      commands: [
        {
          type: 'com.okta.action.update',
          value: {
            registration: 'DENY',
          },
        },
      ],
      error: {
        errorSummary: response.errorSummary,
        errorCauses: {
          errorSummary: response.errorSummary,
        },
      },
    })
  }
}

export default handler
