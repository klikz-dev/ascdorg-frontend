import { Box, Typography } from '@mui/material'
import { string, number } from 'prop-types'
import NextImageWrapper from '../../images/NextImageWrapper'

/**
 * Image Component from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */

const Image = ({
  testId,
  title,
  alternate,
  copyright,
  caption,
  width,
  height,
  src,
}) => {
  return (
    <Box
      data-testid={testId}
      sx={{ marginTop: '24px', marginBottom: '24px', width: '100%' }}
    >
      <NextImageWrapper
        width={width}
        height={height}
        objectFit='contain'
        src={src}
        alt={title || alternate || ''}
      />
      {copyright && <em>Credit: {copyright}</em>}
      <Box mt={[1, 2]}>
        {caption && (
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '20px',
              letterSpacing: '0.2px',
            }}
          >
            {caption}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

Image.propTypes = {
  testId: string,
  __typename: string,
  alternate: string,
  title: string,
  caption: string,
  copyright: string,
  width: number,
  height: number,
  src: string,
}

export default Image
