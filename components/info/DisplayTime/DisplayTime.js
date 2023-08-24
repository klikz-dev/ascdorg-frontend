import { Typography } from '@mui/material'
import { string } from 'prop-types'

export default function DisplayTime({ startTime, endTime, variant }) {
  if (startTime === null) startTime = ''
  if (endTime === null) endTime = ''

  function getTimezoneName(startTime) {
    const today = new Date(startTime)
    const short = today.toLocaleDateString(undefined)
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' })

    const shortIndex = full.indexOf(short)
    if (shortIndex >= 0) {
      const trimmed =
        full.substring(0, shortIndex) +
        full.substring(shortIndex + short.length)

      const trim = trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '')

      const splitWord = trim.split(' ')
      return splitWord.map((word) => word[0]).join('')
    } else {
      // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
      return full
    }
  }

  function formatDateToTime(dateStr) {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  let sTime = formatDateToTime(startTime)
  let eTime = formatDateToTime(endTime)

  function modifyTime(time) {
    let newTimeArray = time.split('')

    if (newTimeArray[0] === '0') {
      return newTimeArray.slice(1, newTimeArray.length).join('')
    } else {
      return newTimeArray.join('')
    }
  }

  let startingTime = modifyTime(sTime)
  let endingTime = modifyTime(eTime)

  if (startingTime === 'Invalid Date') {
    startingTime = ''
  }

  if (endingTime === 'Invalid Date') {
    endingTime = ''
  }

  if (startingTime === 'Invalid Date' && endingTime === 'Invalid Date') {
    startingTime = ''
    endingTime = ''
  }

  function displayTime(startingTime, endingTime, startTime, variant) {
    if (startingTime) {
      if (startingTime && endingTime) {
        return startingTime + ` - ${endingTime} ${getTimezoneName(startTime)}`
      } else {
        return startingTime + ' ' + getTimezoneName(startTime)
      }
    } else {
      return (
        <Typography variant={variant} color={'red'}>
          Time could not be retrieved
        </Typography>
      )
    }
  }

  return (
    <Typography variant={variant}>
      {displayTime(startingTime, endingTime, startTime, variant)}
    </Typography>
  )
}

DisplayTime.propTypes = {
  variant: string,
  startTime: string,
  endTime: string,
}

DisplayTime.defaultProps = {
  variant: 'h7',
}
