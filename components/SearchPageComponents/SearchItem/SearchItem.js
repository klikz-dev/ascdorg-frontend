import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import { Box, Typography, Link as MUILink } from '@mui/material'
import dateFormat from 'dateformat'
import { string, number, bool, arrayOf, shape, oneOfType } from 'prop-types'
import { imageoptimization, constSnipcart } from '../../../const'
import { hasMemberBookPriceVar } from '../../../lib/apollo-client/cache'
import { getCartButtonCaptionLabel } from '../../../lib/utils'
import paths from '../../../paths/path'
import { SnipcartButton } from '../../Snipcart'

export default function SearchItem({ testId = 'search-item', hit }) {
  /** @todo: use highlight */
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const cardDate =
    !!hit?.dateTimeStamp &&
    dateFormat(
      dateFormat(new Date(hit.dateTimeStamp), 'isoDateTime'),
      'mmmm d, yyyy'
    )
  const cartButtonCaptionLabel =
    !!hit?.dateTimeStamp && getCartButtonCaptionLabel(hit?.dateTimeStamp)

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      key={hit.objectID}
      data-testid={testId}
    >
      <MUILink
        sx={{
          textDecoration: 'initial',
          color: 'common.black',
          position: 'relative',
          width: '108%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          padding: '32px 26px 26px',
          marginBottom: { xs: '16px 16px 16px', sm: '16px 30px', md: '4px' },
          transition: 'transform .2s ease-in-out',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '3.5%',
            width: '93%',
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
          },
          '&:hover, &:focus': {
            transform: 'scale(1.01)',
            textDecoration: 'none',
            boxShadow: {
              xs: 'none',
              md: '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
            },
            borderRadius: { xs: 0, md: '4px' },
            '& $searchResultsCardContentTitle': {
              color: 'hover.main',
              textDecoration: 'underline',
            },
            '&:after': {
              borderBottom: { xs: '1px solid rgba(0, 0, 0, 0.2)', md: 0 },
            },
          },
        }}
        href={
          hit.type === 'book'
            ? `${hit.url}?variant=${hit.productNumber}`
            : hit.url
        }
        aria-label={hit.title}
        data-testid={`${testId}-link`}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '65%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            alignSelf: 'stretch',
            marginRight: { sm: 0, md: '20px' },
          }}
        >
          {' '}
          {hit.topic && !!hit.topic[hit.topic.length - 1] && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginBottom: '8px',
                '& span': {
                  padding: '2px 8px',
                  backgroundColor: 'grey.extraLight',
                  borderRadius: '4px',
                },
              }}
            >
              {hit.premium && (
                <Box
                  component='img'
                  src='/images/premium.png'
                  alt='premium resources logo'
                  style={{ width: '20px', margin: '0 6px 0 0' }}
                  data-testid={`${testId}-premium`}
                />
              )}
              {hit.topic && hit.topic.length > 0 && (
                <Typography variant='overline' data-testid={`${testId}-topic`}>
                  {hit.topic[hit.topic.length - 1]}
                </Typography>
              )}
            </Box>
          )}
          <Typography
            variant='h4'
            sx={{
              marginBottom: '6px',
              '&:hover': {
                color: 'hover.main',
                textDecoration: 'underline',
              },
            }}
            data-testid={`${testId}-title`}
          >
            {hit.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              color: 'grey.medium',
              marginBottom: { sm: '12px', md: '20px' },
              '& h6': {
                marginRight: '8px',
                textTransform: 'uppercase',
              },
            }}
          >
            <Typography variant='h6' data-testid={`${testId}-type`}>
              {hit.type === 'pubissue' ? 'Publication' : hit.type}
            </Typography>
            {hit.author && (
              <Typography variant='caption' data-testid={`${testId}-author`}>
                {hit.author.join(', ')}
              </Typography>
            )}
          </Box>
          {['collection', 'book'].includes(hit.type) && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginBottom: { sm: '12px', md: '20px' },
              }}
              data-testid={`${testId}-details-section`}
            >
              <SnipcartButton
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  padding: '6px 12px',
                  fontSize: '12px',
                  lineHeight: '18px',
                  marginRight: '12px',
                  boxShadow: 'none',
                  letterSpacing: '0.2px',
                  fontWeight: '600',
                  minWidth: '64px',
                  boxSizing: 'border-box',
                  transition:
                    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  borderRadius: '2px',
                  textTransform: 'none',
                  border: 0,
                  cursor: 'pointer',
                  color: 'text.secondary',
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'hover.main',
                    textDecoration: 'underline',
                    boxShadow:
                      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                  },
                }}
                snipcart={{
                  label: cartButtonCaptionLabel,
                  dataItemId: hit.productNumber,
                  dataItemName: hit.title,
                  dataItemAuthors: hit.author ? hit.author : '',
                  dataItemUrl: hit.url,
                  dataItemImage: hit.thumbnail,
                  dataItemDescription: hit.description,
                  dataItemPrice:
                    hit.type === 'collection'
                      ? hasMemberBookPrice
                        ? hit.memberDiscountedPrice
                        : hit.discountedPrice
                      : hasMemberBookPrice
                      ? hit.priceMember
                      : hit.priceNonmember,
                  dataItemCustom1Value: hit?.taxJarId ? hit.taxJarId : '',
                  dataItemCustom2Value: hit?.royaltyFlag
                    ? hit?.royaltyFlag
                    : false,
                  dataItemCustom3Value: hit?.authorInfo ? hit?.authorInfo : '',
                  dataItemCustom4Value:
                    cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
                  digitalFileGuid: hit.digitalFileGuid,
                  productReleaseDate: hit.dateTimeStamp,
                }}
              />
              {hit.type === 'collection' ? (
                <Box data-testid={`${testId}-collection-only`}>
                  <Box display='flex' justifyContent='left' alignItems='center'>
                    <Box mr={1}>
                      <Typography
                        variant='strikeThrough'
                        data-testid={`${testId}-collection-strikethrough`}
                      >
                        {`$${
                          hasMemberBookPrice
                            ? hit.memberOriginalPrice
                            : hit.originalPrice
                        }`}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant='h2'
                        color='#A61E3B'
                        data-testid={`${testId}-collection-discounted`}
                      >
                        {`$${
                          hasMemberBookPrice
                            ? hit.memberDiscountedPrice
                            : hit.discountedPrice
                        }`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display='flex' justifyContent='left' alignItems='center'>
                    <Box mr={1}>
                      <Typography
                        variant='smallStrikeThrough'
                        data-testid={`${testId}-collection-original-strikethrough`}
                      >
                        {`$${
                          hasMemberBookPrice
                            ? hit.originalPrice
                            : hit.memberOriginalPrice
                        }`}
                      </Typography>
                    </Box>
                    <Box mr={1}>
                      <Typography
                        variant='subtitle1'
                        fontWeight={700}
                        color='#A61E3B'
                        data-testid={`${testId}-collection-original-discounted`}
                      >
                        {`$${
                          hasMemberBookPrice
                            ? hit.discountedPrice
                            : hit.memberDiscountedPrice
                        }`}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant='subtitle3'
                        sx={{ marginRight: '8px', whiteSpace: 'nowrap' }}
                      >
                        {hasMemberBookPrice
                          ? ' non-member price'
                          : ' member price '}
                      </Typography>
                    </Box>
                    {!hasMemberBookPrice && (
                      <Link href={paths.subscribe}>
                        <a data-testid={`${testId}-collection-join-now`}>
                          <Typography
                            variant='small-link'
                            color='#005E47'
                            sx={{ whiteSpace: 'nowrap' }}
                          >
                            {'join now'}
                          </Typography>
                        </a>
                      </Link>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box data-testid={`${testId}-non-collection`}>
                  <Typography
                    variant='h3'
                    data-testid={`${testId}-non-collection-other-price`}
                  >{`$${
                    hasMemberBookPrice ? hit.priceMember : hit.priceNonmember
                  }`}</Typography>
                  <Typography
                    variant='subtitle2'
                    data-testid={`${testId}-non-collection-price`}
                  >
                    {`$${
                      hasMemberBookPrice ? hit.priceNonmember : hit.priceMember
                    } ${
                      hasMemberBookPrice ? 'non-member price' : 'member price '
                    }`}
                    {!hasMemberBookPrice && (
                      <Link href={paths.subscribe}>
                        <a data-testid={`${testId}-non-collection-join-now`}>
                          <Typography variant='medium-link' color='#005E47'>
                            {'join now'}
                          </Typography>
                        </a>
                      </Link>
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 'auto',
              marginBottom: { xs: '16px', md: '-5px' },
              '& button': {
                marginRight: '10px',
                '&:first-of-type': {
                  marginRight: '2px',
                },
                '& .MuiButton-startIcon': {
                  marginRight: '4px',
                },
              },
            }}
          >
            {hit.dateTimeStamp && (
              <Typography
                variant='caption'
                sx={{
                  color: 'grey.medium',
                  textTransform: 'uppercase',
                }}
                data-testid={`${testId}-card-date`}
              >
                {cardDate}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: '35%' },
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-end' },
            alignSelf: 'stretch',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '200px',
              height: '160px',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
              '& img': {
                maxWidth: '300px',
                maxHeight: '160px',
                width: 'auto',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          >
            <Box
              component='img'
              src={
                hit.thumbnail
                  ? hit.thumbnail +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              alt='card'
              data-testid={`${testId}-thumbnail`}
            />
            {['video', 'podcast'].includes(hit.type) && (
              <Box
                component='img'
                alt=''
                src='/images/playButton.svg'
                sx={{
                  position: 'absolute',
                  top: 'calc(50% - 30px)',
                  left: 'calc(50% - 30px)',
                  color: 'common.white',
                  width: 60,
                  height: 60,
                }}
                data-testid={`${testId}-playbutton`}
              />
            )}
          </Box>
        </Box>
      </MUILink>
    </Box>
  )
}

SearchItem.propTypes = {
  testId: string,
  hit: oneOfType([
    /** book */
    shape({
      type: string,
      url: string,
      content: string,
      topic: arrayOf(string),
      yearPublished: number,
      language: arrayOf(string),
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      description: string,
      authorInfo: arrayOf(string),
      memberBook: string,
      quickRead: bool,
      title: string,
      priceMember: number,
      priceNonmember: number,
      taxJarId: string,
      royaltyFlag: bool,
      dateTimeStamp: string,
      unixTimeStamp: number,
      bookFilters: arrayOf(string),
      productNumber: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** collection */
    shape({
      type: string,
      url: string,
      productNumber: string,
      title: string,
      description: string,
      content: string,
      originalPrice: number,
      discountedPrice: number,
      memberOriginalPrice: number,
      memberDiscountedPrice: number,
      taxJarId: string,
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      topic: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** event */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** press release */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      featured: bool,
      keywords: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** page */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      dateTimeStamp: string,
      unixTimeStamp: number,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** podcast */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      dateTimeStamp: string,
      unixTimeStamp: number,
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      featured: bool,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** video */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      unixTimeStamp: null,
      author: arrayOf(string),
      thumbnail: string,
      featured: bool,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** article */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      grade: arrayOf(string),
      subject: arrayOf(string),
      role: arrayOf(string),
      keywords: arrayOf(string),
      premium: bool,
      author: arrayOf(string),
      featured: bool,
      thumbnail: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** book chapter */
    shape({
      type: string,
      topic: arrayOf(string),
      yearPublished: number,
      language: arrayOf(string),
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      freeChapter: bool,
      studyGuide: bool,
      bookFilters: arrayOf(string),
      url: string,
      title: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** pubissue */
    shape({
      type: string,
      url: string,
      title: string,
      thumbnail: string,
      shortDescription: string,
      description: string,
      volNo: number,
      issueNo: number,
      dateTimeStamp: string,
      unixTimeStamp: number,
      topic: arrayOf(string),
      podcast: arrayOf(string),
      video: arrayOf(string),
      featuredImage: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** blog */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      author: arrayOf(string),
      featured: bool,
      keywords: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** webinar */

    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      featured: bool,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** workshop */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      author: arrayOf(string),
      thumbnail: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
  ]),
}
