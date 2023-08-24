import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import CtaButton from '../Buttons/CtaButton'
import MemberPriceItem from '../MemberPriceItem'

export default function MemberPrice({
  title,
  price,
  priceCaption,
  button,
  memberPriceItemCollection,
  popular,
  popularTitle = 'MOST POPULAR',
  testId = 'memberPrice',
}) {
  return (
    <Box
      sx={{
        border: popular ? '3px solid #646464' : '1px solid #353535',
        height: '100%',
        minHeight: {
          xs: '100%',
          sm: `${popular ? '772px' : '734px'}`,
          md: `${popular ? '709px' : '663px'}`,
        },
        width: {
          xs: '100%',
          sm: `${popular ? '306px' : '251px'}`,
          md: `${popular ? '436px' : '386px'}`,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: popular ? '#EFF2F4' : 'white',
        position: 'relative',
        zIndex: 99,
        marginTop: { xs: '0xp', sm: popular ? '0px' : '20px' },
      }}
      data-testid={testId}
    >
      {popular && (
        <Box
          sx={{
            backgroundColor: '#8DD1C1',
            paddingRight: '38px',
            paddingLeft: '38px',
            paddingTop: '3px',
            paddingBottom: '3px',
            height: {
              xs: '100%',
              sm: '40px',
            },
            width: {
              xs: '100%',
              sm: '195px',
              md: '315px',
            },
            position: { xs: 'none', sm: 'absolute', md: 'absolute' },
            top: -20,
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '28px',
            letterSpacing: '3.2px',
            whiteSpace: 'nowrap',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data-testid={`${testId}-popularTitle`}
        >
          {popularTitle}
        </Box>
      )}
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: '28px',
          lineHeight: '28px',
          letterSpacing: 0.2,
          marginTop: popular ? '44px' : '24px',
          marginBottom: '21px',
          textAlign: 'center',
        }}
        data-testid={`${testId}-title`}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: '56px',
          lineHeight: '28px',
          letterSpacing: 0.2,
          marginBottom: '10px',
        }}
        data-testid={`${testId}-price`}
      >
        {price}
      </Typography>
      <Typography
        sx={{ fontSize: '16px', lineHeight: '28px', letterSpacing: 0.2 }}
        data-testid={`${testId}-priceCaption`}
      >
        {priceCaption}
      </Typography>
      <CtaButton
        variant='contained'
        styles={{
          fontWeight: 900,
          fontSize: '24px',
          lineHeight: '28px',
          letterSpacing: 0.2,
          '&:hover': {
            textDecoration: 'none',
          },
          marginBottom: '28px',
          marginTop: '10px',
        }}
        data-testid={`${testId}-button`}
        label={button?.linkLabel}
        target={button?.linkTarget}
        href={button?.linkUrl}
        id={button?.id}
        backgroundColor={'#3C64B1'}
      />
      <Box
        data-testid={`${testId}-memberPrice`}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {memberPriceItemCollection?.map((item, idx) => {
          return (
            <MemberPriceItem
              description={documentToReactComponents(item?.description?.json)}
              checkIcon={item?.checkIcon}
              infoIcon={item?.infoIcon}
              infoIconPopoverMessage={documentToReactComponents(
                item?.infoIconPopoverMessage?.json
              )}
              key={idx}
            />
          )
        })}
      </Box>
    </Box>
  )
}
