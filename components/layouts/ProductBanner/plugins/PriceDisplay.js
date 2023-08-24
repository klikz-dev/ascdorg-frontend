import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { string, arrayOf, shape, number, bool, func } from 'prop-types'
import { hasMemberBookPriceVar } from '../../../../lib/apollo-client/cache'
import paths from '../../../../paths/path'

const PriceDisplay = ({ id, prices, membershipVar, handleOnChange }) => {
  const hasMemberPricing = useReactiveVar(membershipVar)

  const [price, setPrice] = useState(
    prices.find((price) => price.default) || prices[0]
  )

  const handlePriceChange = (e) =>
    setPrice(
      prices.find(
        (price) => price.key === e.target.value || price.name === e.target.value
      )
    )

  useEffect(() => handleOnChange && price && handleOnChange(price.key), [price])

  return (
    <Box>
      <Box display='flex' alignItems='flex-end' mb={1}>
        <Typography variant='h3'>
          {`$${hasMemberPricing ? price.priceMember : price.priceNonMember}`}
        </Typography>
        <FormControl
          sx={{
            margin: 0,
            marginLeft: 2,
          }}
        >
          <Select
            labelId={`price-label-${id}`}
            id={`price-select-${id}`}
            value={price.key || price.name}
            onChange={handlePriceChange}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '& *': {
                textTransform: 'uppercase',
              },
              '& svg': {
                color: 'grey.medium',
              },
            }}
            disableUnderline
            autoWidth
          >
            {prices.map((option) => (
              <MenuItem
                key={option.key || option.name}
                value={option.key || option.name}
              >
                <Typography variant='buttonSmall'>{option.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {!hasMemberPricing ? (
        <Typography variant='subtitle2'>
          {`$ ${price.priceMember?.toFixed(2)} member price  `}
          <Link href={paths.subscribe}>
            <a>
              <Typography variant='medium-link' color='#005E47'>
                {'join now'}
              </Typography>
            </a>
          </Link>
        </Typography>
      ) : (
        <Typography variant='subtitle2'>
          {`$${price.priceNonMember?.toFixed(2)} non-member price`}
        </Typography>
      )}
    </Box>
  )
}

export default PriceDisplay

PriceDisplay.propTypes = {
  id: string.isRequired,
  prices: arrayOf(
    shape({
      key: string,
      name: string.isRequired,
      priceMember: number.isRequired,
      priceNonMember: number.isRequired,
      default: bool,
    })
  ),
  membershipVar: func,
  handleOnChange: func,
}

PriceDisplay.defaultProps = {
  membershipVar: hasMemberBookPriceVar,
}
