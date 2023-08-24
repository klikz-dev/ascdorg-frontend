import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { string, number, object, array, func, bool } from 'prop-types'
import paths from '../../../../paths/path'

export default function BookBannerPrice({
  testId = 'book-banner-price',
  memberOriginalPrice,
  originalPrice,
  memberDiscountedPrice,
  discountedPrice,
  isCollection = false,
  version,
  versions,
  onChange,
  hasMemberBookPrice,
}) {
  const [currentVersion, setCurrentVersion] = useState(version?.productNumber)
  const [options, setOptions] = useState([])

  const handleChange = (event) => {
    setCurrentVersion(event.target.value)
    onChange(event.target.value)
  }

  useEffect(() => {
    if (versions) {
      const versionOptions = versions.map((v) => {
        return {
          label: v?.bookType?.title,
          value: v?.productNumber,
        }
      })
      setOptions(versionOptions)
    }
  }, [versions])

  return (
    <Box data-testid={testId}>
      <Box display='flex' alignItems='flex-end' mb={1}>
        {isCollection ? (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box mr={1}>
              <Typography
                variant='strikeThrough'
                data-testid={`${testId}-strikethrough-collection`}
              >
                {`$${
                  hasMemberBookPrice
                    ? memberOriginalPrice?.toFixed(2)
                    : originalPrice?.toFixed(2)
                }`}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h2'
                color='#A61E3B'
                data-testid={`${testId}-price-collection`}
              >
                {`$${
                  hasMemberBookPrice
                    ? memberDiscountedPrice?.toFixed(2)
                    : discountedPrice?.toFixed(2)
                }`}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant='h3' data-testid={`${testId}-price-book`}>
            {`$${
              hasMemberBookPrice
                ? version?.priceMember?.toFixed(2)
                : version?.priceNonMember?.toFixed(2)
            }`}
          </Typography>
        )}
        {!isCollection && (
          <FormControl sx={{ margin: 0, marginLeft: 2 }}>
            <Select
              labelId='select-book-version-label'
              id='select-book-version'
              value={currentVersion}
              onChange={handleChange}
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
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography variant='buttonSmall'>{option.label}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {isCollection ? (
        <Box display='flex' justifyContent='left' alignItems='center'>
          <Box mr={1}>
            <Typography
              variant='smallStrikeThrough'
              data-testid={`${testId}-small-strikethrough-collection`}
            >
              {`$${
                hasMemberBookPrice
                  ? originalPrice?.toFixed(2)
                  : memberOriginalPrice?.toFixed(2)
              }`}
            </Typography>
          </Box>
          <Box mr={1}>
            <Typography
              variant='subtitle1'
              color='#A61E3B'
              fontWeight={700}
              data-testid={`${testId}-small-opposite-price-collection`}
            >
              {`$${
                hasMemberBookPrice
                  ? discountedPrice?.toFixed(2)
                  : memberDiscountedPrice?.toFixed(2)
              }`}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='left' alignItems='center'>
            <Box mr={1}>
              <Typography
                variant='subtitle2'
                data-testid={`${testId}-label-opposite-collection`}
              >{` ${
                hasMemberBookPrice ? 'non-' : ''
              }member price `}</Typography>
            </Box>
            <Link href={paths.subscribe}>
              <a>
                <Typography variant='medium-link' color='#005E47'>
                  {'join now'}
                </Typography>
              </a>
            </Link>
          </Box>
        </Box>
      ) : (
        <Typography
          variant='subtitle2'
          data-testid={`${testId}-member-price-book`}
        >
          {`$${version?.priceMember?.toFixed(2)} member price `}
          {!hasMemberBookPrice && (
            <Link href={paths.subscribe}>
              <a data-testid={`${testId}-join-link-book`}>
                <Typography variant='medium-link' color='#005E47'>
                  {'join now'}
                </Typography>
              </a>
            </Link>
          )}
        </Typography>
      )}
    </Box>
  )
}

BookBannerPrice.propTypes = {
  testId: string,
  memberOriginalPrice: number,
  originalPrice: number,
  memberDiscountedPrice: number,
  discountedPrice: number,
  isCollection: bool,
  version: object,
  versions: array,
  onChange: func,
  hasMemberBookPrice: bool,
}
