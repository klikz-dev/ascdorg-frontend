import { useState, useEffect } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Close } from '@mui/icons-material'
import { Modal, Box, IconButton, Typography } from '@mui/material'
import { string, arrayOf, shape, object } from 'prop-types'
import { getCookie, setCookie, hostnameForCookie } from '../../../lib/utils'
import NextImageWrapper from '../../images/NextImageWrapper'

export default function SiteWideMessage({
  testId = 'site-wide-message',
  items,
}) {
  const {
    title,
    text: { json },
  } = items?.[0]
  const [openModal, setOpenModal] = useState(!getCookie('ascd-sitewide-cookie'))

  useEffect(() => {
    /** when the component renders, set the cookie */
    setCookie('ascd-sitewide-cookie', 'true', '/', hostnameForCookie, 86400)
  }, [])

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false)
      }}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      data-testid={testId}
    >
      <Box
        sx={{
          backgroundColor: 'common.white',
          color: 'grey.dark',
          height: 'min-content',
          width: { xs: '100vw', md: '80vw' },
          maxWidth: { md: '550px' },
          position: 'absolute',
          padding: (theme) => theme.spacing(2, 4, 2, 4),
          overflowY: 'auto',
          top: { xs: '25%', md: '15%' },
          left: { md: '50%' },
          transform: { md: 'translate(-50%, -10%)' },
          boxShadow: { md: 5 },
        }}
      >
        <Box
          display='flex'
          alignItems='left'
          justifyContent='flex-end'
          mb={2}
          pl={2}
          pr={2}
        >
          <IconButton
            aria-label='Close modal button'
            sx={{
              mr: '5px',
              color: 'grey.dark',
            }}
            size='large'
            onClick={() => {
              setOpenModal(false)
            }}
          >
            <Close size='small' />
          </IconButton>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <NextImageWrapper
            priority
            src={`/images/logo.svg`}
            width={100}
            height={100}
            layout='fixed'
            alt={'ascd-logo'}
            placeholder='empty'
          />
          <Typography
            variant='h2'
            sx={{
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              textAlign: 'center',
            }}
          >
            {documentToReactComponents(json)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}

SiteWideMessage.propTypes = {
  testId: string,
  items: arrayOf(
    shape({
      title: string,
      text: shape({ json: object }),
    })
  ),
}
