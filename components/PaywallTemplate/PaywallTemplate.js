import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Link, Typography } from '@mui/material'
import { string, bool, number } from 'prop-types'
import { showSignUp } from '../../lib/apollo-client/cache'
import paths from '../../paths/path'

export default function PaywallTemplate({
  testId = 'paywall-template',
  articleCount,
  isLoggedIn,
}) {
  const [showTemplate, setShowTemplate] = useState(true)
  return (
    <>
      {showTemplate && (
        <Box
          data-testid={testId}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '1rem 3rem 1.5rem 1rem',
            borderRadius: '0.3125rem 0.3125rem 0 0',
            color: '#fff',
            backgroundColor: '#000',
            zIndex: 900,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: 'auto',
              maxWidth: '55rem',
            }}
          >
            <Typography
              data-testid={`${testId}-title`}
              sx={{
                fontSize: '1.4rem',
                borderRight: '1px solid #777',
                marginRight: '2vw',
                paddingRight: '2vw',
              }}
            >
              You have&nbsp;
              <span style={{ color: '#c3dddb' }}>
                {articleCount} {isLoggedIn ? `free signup` : `free`}
              </span>
              &nbsp;articles left this month.
            </Typography>

            <Typography
              data-testid={`${testId}-description`}
              sx={{
                fontSize: '1.3rem',
                textAlign: { md: 'left', sm: 'center' },
                whiteSpace: { md: 'nowrap', sm: '' },
              }}
            >
              {isLoggedIn ? (
                <Link
                  sx={{ textDecoration: 'underline', color: '#fff' }}
                  href={paths.subscribe}
                >
                  Upgrade your account
                </Link>
              ) : (
                <Button
                  sx={{
                    textDecoration: 'underline',
                    color: '#fff',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline',
                    margin: 0,
                    padding: 0,
                    fontSize: '1.3rem',
                  }}
                  onClick={() => {
                    showSignUp(true)
                  }}
                >
                  Create an account
                </Button>
              )}
              &nbsp;
              {isLoggedIn
                ? 'now for unlimited access.'
                : 'and get additional free articles.'}
            </Typography>
          </Box>

          <IconButton
            aria-label='Close annotations'
            sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
            onClick={() => {
              setShowTemplate(false)
            }}
            size='large'
          >
            <CloseIcon sx={{ color: '#aaa', fontSize: '2rem' }} />
          </IconButton>
        </Box>
      )}
    </>
  )
}

PaywallTemplate.propTypes = {
  testId: string,
  articleCount: number,
  isLoggedIn: bool,
}
