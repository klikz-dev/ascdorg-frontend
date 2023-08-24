import Link from 'next/link'
import { Box, Typography, Button, Tooltip } from '@mui/material'
import { shape, string, number } from 'prop-types'
import { mutate } from 'swr'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import { useBookByProductId } from '../../lib/hooks/useBookByProductId'
import useUserAccount from '../../lib/hooks/useUserAccount'
import paths from '../../paths/path'
import NextImageWrapper from '../images/NextImageWrapper'

export default function OrderDetails({ oi }) {
  const { userAccountUser } = useUserAccount()
  const maxDownloadTimes = 3
  const showDownloadButton = (subSystem, downloadURL, downloadCounter) => {
    return (
      subSystem?.toUpperCase() === 'ECD' &&
      downloadURL &&
      downloadCounter < maxDownloadTimes
    )
  }
  const getDownloadRemainingTimes = (downloadCounter) =>
    downloadCounter ? maxDownloadTimes - downloadCounter : maxDownloadTimes
  const updateDownloadCounter = async (url, body) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }
  const clickHandler = async (orderNumber, orderLineNumber, productCode) => {
    try {
      const result = await updateDownloadCounter(
        '/api/orders-update-download-counter',
        {
          orderNumber: orderNumber,
          orderLineNumber: orderLineNumber,
          productCode: productCode,
        }
      )
      if (result?.status === 200) {
        mutate(`/api/orders?emailId=${userAccountUser?.email}`)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const { data: bookData } = useBookByProductId(oi?.productNumber)
  const imageUrl = contentfulImageTransformation(
    bookData && bookData.items[0]
      ? bookData?.items[0].linkedFrom.bookCollection.items[0].thumbnail
      : ''
  )
  const slug =
    bookData && bookData.items[0]
      ? bookData?.items[0].linkedFrom.bookCollection.items[0].slug
      : ''
  return (
    <Box
      height='75%'
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      my={3}
      mx={4}
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
      }}
      data-testid={oi?.productNumber}
    >
      <Box>
        <NextImageWrapper src={imageUrl} width={250} height={250} />
      </Box>
      <Box
        ml={4}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box>
          <Link href={paths.book({ slug: slug })}>
            <a>
              <Typography variant='medium-link' color='#005E47'>
                {oi?.itemTitle}
              </Typography>
            </a>
          </Link>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          sx={{
            marginTop: { xs: 3 },
            marginBottom: { xs: 3 },
          }}
        >
          {oi?.itemData1Value && (
            <Box>
              <Typography variant='subtitle2'>
                {oi.itemData1Text} {oi?.itemData1Value}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography variant='subtitle2'>
              {oi?.itemData2Text} {oi?.itemData2Value}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2'>
              {oi?.itemDate3Text} {oi?.itemDate3Value}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2'>Status: {oi?.status}</Typography>
          </Box>
          {showDownloadButton(
            oi?.subSystem,
            oi?.downloadURL,
            oi?.downloadCounter
          ) && (
            <Box>
              <Tooltip
                title={`${getDownloadRemainingTimes(
                  oi?.downloadCounter
                )} time(s) left`}
              >
                <Button
                  variant='contained'
                  color='primary'
                  width='100%'
                  size='medium'
                  href={oi?.downloadURL}
                  onClick={() =>
                    clickHandler(
                      oi?.orderNumber,
                      oi?.orderLineNumber,
                      oi?.productNumber,
                      oi?.downloadURL
                    )
                  }
                  target='_blank'
                >
                  Download PDF
                </Button>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
OrderDetails.propTypes = {
  oi: shape({
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
    subSystem: string,
    orderNumber: string,
    orderLineNumber: number,
    downloadCounter: number,
  }),
}
