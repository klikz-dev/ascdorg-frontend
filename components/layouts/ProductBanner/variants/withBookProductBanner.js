import { useState, Fragment } from 'react'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import { Box, Typography } from '@mui/material'
import { hasMemberBookPriceVar } from '../../../../lib/apollo-client/cache'
import paths from '../../../../paths/path'
import NextImageWrapper from '../../../images/NextImageWrapper'
import BuyButton from '../../../interactives/Buttons/BuyButton'
import PriceDisplay from '../plugins/PriceDisplay'

const withBookProductBanner = (
  WrappedComponent,
  book,
  defaultProductVariantId
) => {
  const BookImage = () => (
    <NextImageWrapper
      src={book.thumbnail.imgSrc}
      alt={book.thumbnail.alternate}
      width={307}
      height={428}
    />
  )

  const BookContent = () => {
    const [selectedVariantId, setSelectedVariantId] = useState(
      defaultProductVariantId
    )

    const handlePriceOnChange = (variantId) => setSelectedVariantId(variantId)
    const hasMemberPricing = useReactiveVar(hasMemberBookPriceVar)
    const prices = book.bookVersions.items.map((version) => ({
      key: version.productNumber,
      name: version.bookType.title,
      priceNonMember: version.priceNonMember,
      priceMember: version.priceMember,
      default: version.productNumber === defaultProductVariantId,
    }))

    return (
      <>
        <Box my={1}>
          <Typography variant='h2'>{book.title}</Typography>
        </Box>
        <Box my={1} display='flex' alignItems='center' flexWrap='wrap'>
          <Box mr={1}>
            <Typography variant='body3'>By </Typography>
          </Box>
          {book.authors.items.map((author, key) => (
            <Fragment key={key}>
              <Link href={paths.author({ slug: author.slug })}>
                <a>
                  <Typography variant='medium-link' color='#005E47'>
                    {`${author.firstName} ${author.lastName}`}
                    {key < book.authors.items.length - 1 ? ',' : ''}
                  </Typography>
                </a>
              </Link>
              &nbsp;
            </Fragment>
          ))}
        </Box>
        <Box my={1}>
          <PriceDisplay
            prices={prices}
            id={book.slug}
            handleOnChange={handlePriceOnChange}
          />
        </Box>
        <Box my={1} display='flex' alignItems='center'>
          <BuyButton
            data={book}
            selectedVariantId={selectedVariantId}
            hasMemberPricing={hasMemberPricing}
          />
        </Box>
      </>
    )
  }

  return <WrappedComponent left={<BookImage />} right={<BookContent />} />
}

export default withBookProductBanner
