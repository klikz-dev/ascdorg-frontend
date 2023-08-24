import { useReactiveVar } from '@apollo/client'
import { Box, List } from '@mui/material'
import { menuItems } from '../../../const'
import { hasActivateSubscriptionVar } from '../../../lib/apollo-client/cache'
import useUserAccount from '../../../lib/hooks/useUserAccount'
import paths from '../../../paths/path'
import CtaButton from '../../interactives/Buttons/CtaButton'
import NavMenuItem from '../NavMenuItem'

export default function NavMenu({ mobile }) {
  const { userAccountUser } = useUserAccount()
  const isActivateUser = useReactiveVar(hasActivateSubscriptionVar)

  return (
    <Box
      component='nav'
      aria-label='Main Navigation'
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: '18px',
        letterSpacing: '0.2px',
        padding: { xs: '40px 0 20px', mobileCutoff: 0 },
        '& ul': {
          listStyleType: 'none',
          paddingLeft: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
          width: '100%',
          '& li': {
            display: { xs: 'block', mobileCutoff: 'inline-block' },
            margin: { xs: '18px 24px', mobileCutoff: 0 },
          },
        },
      }}
    >
      <ul>
        {userAccountUser && isActivateUser
          ? menuItems.map((item) => <NavMenuItem key={item.id} {...item} />)
          : menuItems
              .filter((i) => i.id !== 'menu-activateHome')
              .map((item) => <NavMenuItem key={item.id} {...item} />)}
      </ul>
      {mobile && (
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            '& li:first-child': {
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '26px',
              letterSpacing: 0.2,
              color: 'grey.medium',
              marginBottom: 0,
            },
          }}
        >
          <li key='Subscribe intro'>Not a member?</li>
          <li key='Subscribe button'>
            <CtaButton
              variant='contained'
              color='primary'
              width='104'
              height='42'
              label='Subscribe to ASCD'
              href={paths.subscribe}
            />
          </li>
        </List>
      )}
    </Box>
  )
}
