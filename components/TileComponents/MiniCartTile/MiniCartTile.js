import { useRouter } from 'next/router'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { string, shape, number, func } from 'prop-types'
import paths from '../../../paths/path'
import { SnipcartButton } from '../../Snipcart'

export default function MiniCartTile({
  snipcart,
  onClick = () => null,
  testId = 'minicart-tile',
}) {
  const { dataItemUrl, dataItemId, dataItemName, dataItemPrice } = snipcart
  const router = useRouter()
  return (
    <>
      <Card
        sx={{
          position: 'relative',
          width: '100%',
          height: '80px',
          boxShadow:
            '0px -12px 17px rgba(0, 0, 0, 0.03), 0px -5px 22px rgba(0, 0, 0, 0.04), 0px -7px 8px rgba(0, 0, 0, 0.08)',
          padding: '10px',
        }}
        square
        elevation={0}
        data-testid={testId}
      >
        <CardActionArea
          onClick={() =>
            router.push(
              paths.books({
                slug: dataItemUrl,
                variant: dataItemId,
              })
            )
          }
          sx={{
            '& .MuiCardActionArea-root': {
              '&:hover': {
                '& .MuiCardActionArea-focusHighlight': { opacity: '0' },
              },
            },
          }}
          disableRipple
        >
          <CardContent
            sx={{
              width: '68%',
              minHeight: '80px',
              padding: 0,
            }}
          >
            <Box
              sx={{
                mt: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
              data-testid={`${testId}-name`}
            >
              <Typography variant='h6'>{dataItemName}</Typography>
            </Box>
            <Typography
              sx={{
                mt: 1,
                mb: 3,
                fontSize: (theme) => theme.typography.pxToRem(16),
                fontWeight: '700',
                lineHeight: (theme) => theme.typography.pxToRem(18),
                letterSpacing: '0.2px',
              }}
              data-testid={`${testId}-price`}
            >
              {`$${dataItemPrice}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            bottom: '20px',
          }}
          data-testid={`${testId}-snipcart`}
        >
          <SnipcartButton
            sx={{
              bgcolor: 'primary.main',
              color: 'text.secondary',
              border: '2px solid #fff',
              borderRadius: '2px',
              height: '40px',
              minWidth: { xs: '100%', md: '117px' },
              padding: '0px 16px',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'hover.main',
                textDecoration: 'underline',
              },
            }}
            snipcart={snipcart}
            onClick={onClick}
          />
        </Box>
      </Card>
    </>
  )
}

MiniCartTile.propTypes = {
  snipcart: shape({
    dataItemUrl: string,
    dataItemId: string,
    dataItemName: string,
    dataItemPrice: number,
  }),
  onClick: func,
  testId: string,
}
