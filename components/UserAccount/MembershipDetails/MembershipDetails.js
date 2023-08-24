import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal, IconButton, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const MembershipDetails = ({ membershipData }) => {
  const [openModal, setOpenModal] = useState(false)
  {
    /**@todo: styles on this page need to be redone when the next set of changes are made, we are not sure if this will even be in this feature yet.*/
  }
  return (
    <Box
      item
      xs={12}
      md={4}
      sx={{
        background: 'primary.main',
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        minHeight: 384,
        height: '100%',
        width: '80%',
      }}
    >
      <Box pl={1} textAlign='left'>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: (theme) => theme.typography.pxToRem(16),
            lineHeight: (theme) => theme.typography.pxToRem(26),
          }}
        >
          Account Status
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: (theme) => theme.typography.pxToRem(24),
            lineHeight: (theme) => theme.typography.pxToRem(34),
          }}
        >
          {membershipData?.membershipName
            ? membershipData.membershipName
            : 'Free User'}
        </Typography>
        {membershipData?.membershipName && (
          <Box>
            <Box mt={1} mb={1} display='flex'>
              <Typography vairant='currency'>$</Typography>
              <Typography vairant='body2'>{membershipData?.price}</Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  color: 'common.white',
                  opacity: 0.6,
                  alignSelf: 'flex-end',
                }}
              >
                /
                {membershipData?.period === 'year'
                  ? 'annually'
                  : membershipData?.period}
              </Typography>
            </Box>
            <Box pl={2}>
              <Typography variant='h4'>
                {membershipData?.autoRenew ? 'Renews ' : 'Expires '}
                {membershipData?.expireDate}
              </Typography>

              <Typography
                onClick={() => setOpenModal(true)}
                variant='overlineLarge'
              >
                Membership Details
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        data-testid='mebershipDetails-modal'
      >
        <Box
          sx={{
            position: 'absolute',
            height: { xs: '100vh', sm: 702 },
            width: { xs: '100vw', sm: 606 },
            backgroundColor: 'common.white',
            top: { sm: '50%' },
            left: { sm: '50%' },
            transform: { sm: 'translate(-50%, -50%)' },
            boxShadow: {
              sm: '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
            },
            borderRadius: { sm: 8 },
          }}
        >
          <Box
            pl={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 77,
              justifyContent: 'space-between',
              margin: 0,
              boxShadow:
                '0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.04), 0px 3px 5px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Typography variant='sessionDate'>Membership Details</Typography>
            <IconButton
              aria-label='Close modal button'
              sx={{
                marginRight: (theme) => theme.spacing(2),
                color: 'grey.dark',
              }}
              onClick={() => setOpenModal(false)}
            >
              <CloseIcon size='small' />
            </IconButton>
          </Box>

          <Box mt={5} pl={5}>
            <Typography variant='sessionDate'>Includes:</Typography>
            <ReactMarkdown>{membershipData?.description}</ReactMarkdown>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

MembershipDetails.propTypes = {
  membershipData: PropTypes.shape({
    membershipName: PropTypes.string,
    autoRenew: PropTypes.bool,
    expireDate: PropTypes.string,
    price: PropTypes.number,
    period: PropTypes.string,
    membershipKeyword: PropTypes.string,
    subscriptionId: PropTypes.string,
    description: PropTypes.string,
  }),
}
export default MembershipDetails
