import { Typography } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { string } from 'prop-types'

export default function DaysAgo({ input, ...props }) {
  if (!input) return ''
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return (
    <Typography variant={props.variant ? props.variant : 'overline'}>
      {Date.parse(input)
        ? timeAgo.format(Date.parse(input))
        : 'Invalid time format'}
    </Typography>
  )
}

DaysAgo.propTypes = {
  input: string,
  variant: string,
}
