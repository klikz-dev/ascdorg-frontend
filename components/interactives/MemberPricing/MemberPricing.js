import { Box, Container, Typography } from '@mui/material'
import MemberPricingCard from './MemberPricingItems/MemberPricingCard'

export default function MemberPricing({
  testId = 'MemberPricing',
  title,
  items,
  bodyCentered,
  body,
}) {
  const gridSizing = (items) => {
    if (items?.length < 4) {
      return 'nowrap'
    } else if (items?.length >= 4) {
      return 'wrap'
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 5,
      }}
      data-testid={testId}
    >
      {title && (
        <Box
          sx={{
            mt: { xs: 6, md: 12 },
            mb: { xs: 6, md: 12 },
            display: 'flex',
            alignItems: bodyCentered ? 'center' : 'start',
            flexDirection: 'column',
          }}
          data-testid={`${testId}-title`}
        >
          <Typography variant='h2'>{title}</Typography>
          {body}
        </Box>
      )}

      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
            justifyContent: { xs: 'center', sm: 'center', md: 'center' },
            gap: items?.length > 2 ? '24px' : '50px',
            flexWrap: gridSizing(items),
          }}
        >
          <MemberPricingCard items={items} />
        </Box>
      </Container>
    </Box>
  )
}
