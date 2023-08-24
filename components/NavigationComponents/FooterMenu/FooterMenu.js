import Link from 'next/link'
import { Box, Typography, List, ListItem } from '@mui/material'

export default function FooterMenu({ title, items }) {
  return (
    <Box pr={[0, 4, 5]} mt={[3, 0]}>
      <Typography variant='h5'>{title}</Typography>
      <Box mt={1}>
        <List
          sx={{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {items.map(({ label, href, testId }) => (
            <ListItem
              key={label}
              sx={{
                '& *': {
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                  },
                },
                margin: '3px 0px',
                padding: 0,
              }}
            >
              <Typography variant='body3'>
                <Link href={href}>
                  <a data-testid={testId}>{label}</a>
                </Link>
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
