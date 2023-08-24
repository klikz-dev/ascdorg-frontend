import { Box } from '@mui/material'
import { string } from 'prop-types'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { baseUrl } from '../../../../lib/utils'

const renderEmailSubject = (title) => {
  return `${title} via ASCD`
}

const renderEmailBody = (url, title) => {
  return `${title} via ASCD`
}

const renderShareUrl = (url) => `${baseUrl}${url}`

export default function ShareButtons({
  url,
  title,
  showEmailLink,
  testId = 'ShareButtons',
}) {
  return (
    <Box display='flex' flexDirection='row' data-testid={testId} gap={1}>
      <Box data-testid={`${testId}-facebook`}>
        <FacebookShareButton
          url={renderShareUrl(url)}
          quote={`${title} via ASCD`}
        >
          <FacebookIcon size={38} borderRadius={10} />
        </FacebookShareButton>
      </Box>
      <Box data-testid={`${testId}-linkedin`}>
        <LinkedinShareButton
          url={renderShareUrl(url)}
          title={title}
          summary={title}
          source='via ASCD'
        >
          <LinkedinIcon size={38} borderRadius={10} />
        </LinkedinShareButton>
      </Box>
      <Box data-testid={`${testId}-twitter`}>
        <TwitterShareButton url={renderShareUrl(url)} title={title} via='ASCD'>
          <TwitterIcon size={38} borderRadius={10} />
        </TwitterShareButton>
      </Box>
      {showEmailLink && (
        <EmailShareButton
          url={renderShareUrl(url)}
          subject={renderEmailSubject(title)}
          body={renderEmailBody(renderShareUrl(url), title)}
          data-testid={`${testId}-email`}
        >
          <EmailIcon size={38} borderRadius={10} />
        </EmailShareButton>
      )}
    </Box>
  )
}

ShareButtons.propTypes = {
  testId: string,
  url: string,
  title: string,
  showEmailLink: string,
}
