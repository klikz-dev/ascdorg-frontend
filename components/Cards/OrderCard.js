import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Card, IconButton, Modal, Typography } from '@mui/material'
import { string, number, shape, arrayOf } from 'prop-types'
import CtaButton from '../../components/interactives/Buttons/CtaButton'
import CarouselLeftButton from '../../components/interactives/Carousel/CarouselLeftButton'
import CarouselRightButton from '../../components/interactives/Carousel/CarouselRightButton'
import Invoice from '../UserAccount/InvoiceComponents/Invoice'
import OrderDetails from './OrderDetails'

export default function CardItem({ cardData }) {
  const [open, setOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(0)
  const goLeft = () => {
    setCurrentItem((prevState) =>
      prevState === 0 ? cardData.orderItems?.length - 1 : prevState - 1
    )
  }
  const goRight = () => {
    setCurrentItem((prevState) =>
      prevState < cardData.orderItems?.length - 1 ? prevState + 1 : 0
    )
  }

  return (
    <Card p={5}>
      <Box>
        <Box
          height='25%'
          bgcolor='#E4E9EC'
          display='flex'
          p={1}
          justifyContent='space-between'
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            display='flex'
            mx={2}
            sx={{
              flexDirection: { xs: 'row', sm: 'column' },
              width: { xs: '80%', sm: '33%' },
              justifyContent: { xs: 'space-between' },
            }}
          >
            <Box>
              <Typography variant='subtitle2'>
                {cardData.header0Text}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6'>{cardData.header0Value}</Typography>
            </Box>
          </Box>
          <Box
            display='flex'
            mx={2}
            sx={{
              flexDirection: { xs: 'row', sm: 'column' },
              width: { xs: '80%', sm: '33%' },
              justifyContent: { xs: 'space-between' },
            }}
          >
            <Box>
              <Typography variant='subtitle2'>
                {cardData.header1Text}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6'>{cardData.header1Value}</Typography>
            </Box>
          </Box>
          <Box
            display='flex'
            sx={{
              flexDirection: { xs: 'row', sm: 'column' },
              width: { xs: '80%', sm: '33%' },
              justifyContent: { xs: 'space-between' },
              marginLeft: { xs: 2 },
            }}
          >
            <Box>
              <Typography variant='subtitle2'>
                {cardData.header2Text}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6'>{cardData.header2Value}</Typography>
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='flex-end'
            mx={2}
            sx={{
              flexDirection: { xs: 'row', sm: 'column' },
              width: { xs: '80%', sm: '33%' },
              justifyContent: { xs: 'space-between' },
            }}
          >
            <Box>
              <Typography variant='subtitle2'>
                {cardData.header3Text}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6'>{cardData.header3Value}</Typography>
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='flex-end'
            mx={2}
            sx={{
              flexDirection: { xs: 'row', sm: 'column' },
              width: { xs: '80%', sm: '33%' },
              justifyContent: { xs: 'space-between' },
            }}
          >
            <Box>
              <CtaButton
                variant='contained'
                color='primary'
                fullWidth={true}
                size='medium'
                label='Receipt/Invoice'
                onclick={() => {
                  setOpen(true)
                }}
              />
            </Box>
          </Box>
        </Box>
        {cardData?.orderItems && (
          <OrderDetails
            oi={cardData?.orderItems[currentItem]}
            key={cardData?.orderItems[currentItem]?.itemTitle}
          />
        )}
        <Box pb={2}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box pr={4}>
              <Typography variant='h5'>Order Items</Typography>
            </Box>

            <CarouselLeftButton
              goLeft={goLeft}
              buttonSize={30}
              sxProp={{
                width: '32px',
                height: '32px',
                '& svg': {
                  width: '28px',
                  height: '28px',
                },
              }}
            />
            <Box px={2}>
              <Typography variant='h5'>
                {currentItem + 1} of {cardData?.orderItems?.length}
              </Typography>
            </Box>
            <CarouselRightButton
              goRight={goRight}
              buttonSize={30}
              sxProp={{
                width: '32px',
                height: '32px',
                '& svg': {
                  width: '28px',
                  height: '28px',
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby={`invoice-modal-${cardData?.itemTitle}`}
        aria-describedby={`invoice-modal-description-${cardData?.itemTitle}`}
      >
        <Box
          sx={{
            color: 'common.white',
            backgroundColor: 'grey.dark',
            height: { xs: '100vh', md: '85vh' },
            width: { xs: '100vw', md: '85vw' },
            position: 'absolute',
            padding: (theme) => theme.spacing(2, 0, 0, 0),
            borderRadius: { md: '16px' },
            top: { md: '15%' },
            left: { md: '50%' },
            transform: { md: 'translate(-50%, -10%)' },
            boxShadow: { md: (theme) => theme.shadows[5] },
          }}
        >
          <Box display='flex' alignItems='flex-end' mb={2} pl={2} pr={2}>
            <IconButton
              aria-label='Close modal button'
              sx={{
                marginRight: 3,
                color: 'common.white',
              }}
              size='large'
            >
              <CloseIcon size='small' onClick={() => setOpen(null)} />
            </IconButton>
            <Typography variant='h5'>Invoice</Typography>
          </Box>
          <Invoice invoiceItem={cardData.invoiceItem} />
        </Box>
      </Modal>
    </Card>
  )
}

CardItem.propTypes = {
  cardData: shape({
    header0Text: string,
    header0Value: string,
    itemTitle: string,
    header1Text: string,
    header1Value: string,
    header2Text: string,
    header2Value: string,
    header3Text: string,
    header3Value: string,
    orderItems: arrayOf(
      shape({
        itemTitle: string,
        itemData1Text: string,
        itemData1Value: string,
        itemData2Text: string,
        itemData2Value: string,
        itemDate3Text: string,
        itemDate3Value: string,
        productNumber: string,
        status: string,
        downloadURL: string,
      })
    ),
    invoiceItem: shape({
      orderNumber: number,
      invoiceNumber: string,
      poNumber: string,
      emailId: string,
      shipName: string,
      shippingAddress1: string,
      shippingAddress2: string,
      shippingCity: string,
      shippingState: string,
      shippingCountry: string,
      shippingZip: string,
      purchaseItem: string,
      orderDate: string,
      billingName: string,
      billingAddress1: string,
      billingAddress2: string,
      billingCity: string,
      billingState: string,
      billingCountry: string,
      billingZip: string,
      productCode: string,
      fulFillStatus: string,
      fulFillDate: string,
      shipmethod: string,
      shipDate: string,
      unitPrice: string,
      discount: string,
      productTotal: string,
      tax: number,
      shipPrice: number,
      totalPrice: number,
      quantity: string,
    }),
  }),
}
