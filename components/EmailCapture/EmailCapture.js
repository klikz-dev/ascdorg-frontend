import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import { Box, TextField, Grid, Button, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { validateEmail } from '../../lib/utils'

export default function EmailCapture({
  title,
  description,
  context = 'Workshop',
}) {
  const [emailSent, setEmailSent] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const promptForEmailAddress = 'Your email address'

  const send = async (emailAddress, context) => {
    if (validateEmail(emailAddress)) {
      setEmailSent(true)
      try {
        const res = await fetch('/api/add-captured-email-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailAddress,
            context,
          }),
        })

        const json = await res.json()
        if (res.ok !== true) {
          setEmailSent(false)
          throw Error(json.message)
        }
      } catch (e) {
        setEmailSent(false)
        console.log('Function send: ' + e.message)
      }
    }
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '300px',
        bgcolor: '#BBE3DA',
        display: 'flex',
        direction: 'row',
        marginBottom: '80px',
        flexDirection: { xs: 'column !important', sm: 'row' },
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: '100%',
          flexGrow: '1',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: { sm: 0 },
        }}
      >
        <Box
          sx={{
            marginTop: { xs: '40px !important', sm: '94px !important' },
            marginLeft: '48px',
          }}
        >
          <Typography
            variant='h3'
            sx={{
              width: '402px',
              height: '34px !important',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: '402px',
              height: '200px !important',
              overflow: 'hidden',
            }}
          >
            <Typography variant='subtitle2'>
              <ReactMarkdown>{description}</ReactMarkdown>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          width: '100%',
          height: '300px',
          maxHeight: '300px',
          justifyContent: 'left',
          alignItems: 'left',
        }}
      >
        <Box
          sx={{
            marginTop: { xs: '30px !important', sm: '112px' },
            marginLeft: { xs: '48px', sm: '98px' },
            marginBottom: { xs: '40px !important', sm: 0 },
          }}
        >
          <TextField
            variant='outlined'
            label={promptForEmailAddress}
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  disabled={emailAddress === '' || emailSent}
                  sx={{
                    marginRight: '-20px',
                    marginLeft: '-20px',
                    bgcolor: 'transparent !important',
                  }}
                  endIcon={
                    <SendIcon
                      sx={{
                        color: '#0C8671',
                      }}
                      onClick={() => send(emailAddress, context)}
                    />
                  }
                />
              ),
              sx: {
                width: '326px',
                height: '54px',
                color: 'grey.medium',
                borderColor: '#6200EE',
                borderRadius: '3.5px',
                borderWidth: '1px',
                bgcolor: 'background.light',
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'grey.medium',
              },
            }}
          ></TextField>
        </Box>
      </Grid>
    </Grid>
  )
}
