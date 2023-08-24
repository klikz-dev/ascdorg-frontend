import { Typography, Box } from '@mui/material'
import CtaButton from '../components/interactives/Buttons/CtaButton'

export const writeForASCDItem = {
  key: 1,
  title: 'Write for EL Magazine',
  subtitle:
    'Contribute to our flagship magazine written by practitioners for practitioners',
  description: (
    <>
      <Typography variant='h5'>What we look for</Typography>
      <Typography variant='body2'>
        Educational Leadership® magazine is primarily written by practitioners
        for practitioners. We look for high-quality, original submissions that
        shed light on our monthly themes.
      </Typography>
      <Box my={5}>
        <Typography variant='h5'>Articles should:</Typography>
        <Typography variant='body2'>
          <ul>
            <li>Contain fresh information</li>
            <li>Be research-based</li>
            <li>Give practical guidance to improve practice</li>
          </ul>
        </Typography>
      </Box>
      <CtaButton
        variant='outlined'
        color='primary'
        label='View Full Guidelines'
        href={'/guidelines-for-el'}
      />
    </>
  ),
  ctaLink: 'https://elmagazine.submittable.com/submit',
}
