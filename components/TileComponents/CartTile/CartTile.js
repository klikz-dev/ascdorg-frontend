import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material'
import paths from '../../../paths/path'
import { SnipcartButton } from '../../Snipcart'

export default function CartTile({
  showCart = true,
  snipcart,
  publicationDate = null,
  onclick = null,
  noHover = false,
  variant,
  memberOriginalPrice,
  originalPrice,
  memberDiscountedPrice,
  discountedPrice,
  memberBook,
  useMemberBookPrice,
}) {
  return (
    <Card
      sx={
        noHover
          ? {
              position: 'relative',
              width: '205px',
              height: '100%',
              minHeight: '382px',
              padding: '10px',
            }
          : {
              position: 'relative',
              width: '205px',
              height: '100%',
              padding: '10px',
              transition: 'all .2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow:
                  '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
                borderRadius: '4px',
              },
            }
      }
      square
      elevation={0}
    >
      <CardActionArea
        href={
          noHover
            ? null
            : variant === 'collection'
            ? paths.collection({
                slug: snipcart.dataItemUrl,
              })
            : variant === 'pubissue'
            ? paths.el({ slug: snipcart.dataItemUrl })
            : paths.book({
                slug: snipcart.dataItemUrl,
                variant: snipcart.dataItemId,
              })
        }
        sx={{
          '&:hover': {
            textDecoration: 'none',
            '& .MuiCardActionArea-focusHighlight': {
              opacity: 0,
            },
          },
        }}
        disableRipple
      >
        <CardMedia
          image={snipcart.dataItemImage}
          title={snipcart.dataItemName}
          sx={{ width: 185, height: 240, backgroundSize: '185px 240px' }}
        />
        <CardContent
          sx={{
            width: 170,
            height: 110,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
          }}
        >
          <Box height={variant !== 'collection' ? '78px' : '60px'}>
            <Box
              sx={{
                marginTop: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2' /* number of lines to show */,
                WebkitBoxOrient: 'vertical',
                '&:hover': {
                  color: 'hover.main',
                  textDecoration: 'underline',
                },
              }}
            >
              <Typography variant='h7'>{snipcart.dataItemName}</Typography>
            </Box>
            {variant !== 'collection' && (
              <Typography
                sx={{
                  marginTop: 1,
                  fontSize: (theme) => theme.typography.pxToRem(12),
                  fontWeight: 400,
                  lineHeight: (theme) => theme.typography.pxToRem(20),
                  letterSpacing: 0.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1' /* number of lines to show */,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {snipcart?.dataItemAuthors?.items?.[0] &&
                  `By ${snipcart.dataItemAuthors?.items?.[0].title}
                ${snipcart.dataItemAuthors.items?.length > 1 ? ' et al.' : ''}`}
                {variant === 'pubissue' && `${publicationDate}`}
              </Typography>
            )}
          </Box>
          {variant === 'collection' ? (
            <Box display='flex' justifyContent='left' alignItems='center'>
              <Box mr={1}>
                <Typography variant='tinyStrikeThrough'>
                  ${useMemberBookPrice ? memberOriginalPrice : originalPrice}
                </Typography>
              </Box>
              <Box>
                <Typography variant='h4' color='#A61E3B'>
                  $
                  {useMemberBookPrice ? memberDiscountedPrice : discountedPrice}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(15),
                fontWeight: 700,
                lineHeight: (theme) => theme.typography.pxToRem(18),
                letterSpacing: '0.2px',
                mt: 1,
              }}
            >
              {showCart && `$${snipcart.dataItemPrice}`}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {showCart && (
        <Box
          sx={{
            '& button': {
              '&:hover, &:focus': {
                color: 'text.secondary',
                border: '2px solid',
                borderColor: 'hover.main',
                textDecoration: 'underline',
                backgroundColor: 'hover.main',
              },
            },
          }}
        >
          <SnipcartButton
            sx={
              noHover
                ? {
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
                  }
                : {
                    height: '32px',
                    fontSize: '12px',
                    lineHeight: '20px',
                    padding: '0px 16px',
                  }
            }
            snipcart={snipcart}
            onclick={() => (onclick ? onclick() : void 0)}
          />
        </Box>
      )}
      <Box pt={1}>
        {memberBook && memberBook !== 'No' && (
          <Box pb={1}>
            <Typography variant='h7'>Member Book</Typography>
          </Box>
        )}
      </Box>
    </Card>
  )
}
