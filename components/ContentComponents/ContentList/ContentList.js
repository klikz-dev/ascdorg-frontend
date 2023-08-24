import { Box, Typography } from '@mui/material'
import { string, bool, shape, array, number, object, arrayOf } from 'prop-types'
import ViewAllCTA from '../../interactives/Buttons/ViewAllCTA'
import ContentListItems from '../ContentListItems'

export default function ContentList({
  testId,
  title,
  items,
  ctaLabel,
  ctaLink,
  ctaTarget,
  variant = null,
  noImage = false,
  align = 'center',
  lines,
}) {
  return (
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems={align}
        mb={2}
        data-testid={testId}
      >
        <Typography variant='h5' data-testid={`${testId}-title`}>
          {title}
        </Typography>
        {ctaLabel && (
          <ViewAllCTA label={ctaLabel} href={ctaLink} target={ctaTarget} lg />
        )}
      </Box>
      <ContentListItems
        items={items.filter((item) => !!item)}
        variant={variant}
        noImage={noImage}
        lines={lines}
      />
    </Box>
  )
}

ContentList.propTypes = {
  testId: string,
  title: string,
  items: arrayOf(
    shape({
      image: object,
      title: string,
      premium: bool,
      topic: object,
      issueDate: string,
      ctaLink: string,
      slug: string,
      date: string,
      authors: shape({ items: array }),
    })
  ),
  ctaLabel: string,
  ctaLink: string,
  ctaTarget: string,
  variant: string,
  noImage: bool,
  align: string,
  lines: number,
}
