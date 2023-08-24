import { useEffect, useRef, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Grid, Typography } from '@mui/material'
import { string, object } from 'prop-types'
import { options } from '../../../const'

/**
 * HTML Component from Contentful as Embedded Component
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test ID String
 * @returns {JSX.Element} React JSX
 */
const EmbedHtmlComponent = ({
  testId,
  displayTitle,
  displayTitleTextAlignment = 'left',
  body,
  bodyTextAlignment = 'left',
  htmlCode,
  displayFormat,
  backgroundColor,
}) => {
  const htmlCodeRef = useRef()
  const [isHsForm, setIsHsForm] = useState(false)

  const isFullWidth = () => {
    return (
      displayFormat === 'Full-width HTML bottom' ||
      displayFormat === 'Full-width HTML top'
    )
  }

  const isReverse = () => {
    return (
      displayFormat === 'Full-width HTML top' ||
      displayFormat === '2-column HTML left'
    )
  }

  const moduleBGColor = () => {
    switch (backgroundColor) {
      case 'Pale pink':
        return 'background.lightPink'
      case 'Pale green':
        return 'background.lightGreen'
      case 'Pale gray':
        return 'background.lightGrey'
      default:
        return 'background.light'
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      if (
        typeof window !== 'undefined' &&
        typeof window.hbspt !== 'undefined'
      ) {
        if (htmlCode?.includes('hbspt.forms.create')) {
          setIsHsForm(true)
        }
        htmlCodeRef.current.innerHTML = ''
        htmlCodeRef.current.appendChild(
          document.createRange().createContextualFragment(htmlCode)
        )
      }
    })
  }, [htmlCode])

  return (
    <Box>
      <Grid
        container
        sx={(theme) => ({
          display: 'flex',
          flexDirection: `${isFullWidth() ? 'column' : 'row'}${
            isReverse() ? '-reverse' : ''
          }`,
          [theme.breakpoints.down('sm')]: {
            flexDirection: isReverse() ? 'column-reverse' : 'column',
          },
        })}
        data-testid={testId}
      >
        <Grid
          item
          sm={isFullWidth() ? 12 : 6}
          xs={12}
          sx={{ p: 4, backgroundColor: moduleBGColor() }}
        >
          <Box>
            {displayTitle && (
              <Typography
                variant={isFullWidth() ? 'h2' : 'h3'}
                color={'#000000'}
                textAlign={isFullWidth() ? displayTitleTextAlignment : 'left'}
                data-testid={`${testId}-title`}
              >
                {displayTitle}
              </Typography>
            )}
            <Box
              sx={{
                textAlign: isFullWidth() ? bodyTextAlignment : 'left',
              }}
            >
              {documentToReactComponents(body?.json, options(body?.links))}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={isFullWidth() ? 12 : 6}
          xs={12}
          sx={(theme) => ({
            pl: isFullWidth() ? 0 : isReverse() ? 0 : 2,
            pt: isFullWidth() && !isReverse() ? 4 : 0,
            backgroundColor: isHsForm ? 'unset' : moduleBGColor(),
            [theme.breakpoints.down('sm')]: {
              pt: isReverse() ? 0 : 4,
              pl: 0,
            },
          })}
        >
          <Box
            sx={{
              '& > *': {
                width: '100% !important',
              },
            }}
            ref={htmlCodeRef}
            data-testid={`${testId}-html-code`}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

EmbedHtmlComponent.propTypes = {
  testId: string,
  displayTitle: string,
  displayTitleTextAlignment: string,
  body: object,
  bodyTextAlignment: string,
  displayFormat: string,
  htmlCode: string,
  backgroundColor: string,
}

export default EmbedHtmlComponent
