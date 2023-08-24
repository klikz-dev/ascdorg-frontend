import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { Box, Chip, Typography } from '@mui/material'
import dateFormat from 'dateformat'
import {
  string,
  shape,
  number,
  bool,
  arrayOf,
  oneOfType,
  symbol,
} from 'prop-types'
import {
  hasPaidMembershipVar,
  hasELSubscriptionVar,
} from '../../../lib/apollo-client/cache'
import useUserAccount from '../../../lib/hooks/useUserAccount'
import { getCartButtonCaptionLabel } from '../../../lib/utils'
import paths from '../../../paths/path'
import AuthorGroup from '../../AuthorGroup'
import CtaButton from '../../interactives/Buttons/CtaButton'
import ShareButtons from '../../interactives/Buttons/ShareButtons'
import SnipcartButton from '../../Snipcart/SnipcartButton'

export default function IssueBannerTitle({
  testId = 'issue-banner-title',
  tag,
  landing,
  ctaLabel,
  ctaLink,
  ctaTarget,
  authors,
  featuredAuthors,
  align,
  twoThirds,
  ctaWidth,
  title,
  datePosted,
  volumeNo,
  issueNo,
  slug,
  bookVersion,
  imgUrl,
  description,
  pdfFreeDownload,
  pdfUrl,
  pdfUrlLabel,
}) {
  const router = useRouter()
  const { userAccountUser } = useUserAccount()
  const isPaidMember = useReactiveVar(hasPaidMembershipVar)
  const isELMember = useReactiveVar(hasELSubscriptionVar)
  const cartButtonCaptionLabel = getCartButtonCaptionLabel(
    bookVersion?.dateRelease
  )
  return (
    <Box
      sx={{
        textAlign: align,
        maxWidth: 650,
        margin: '0 auto',
        width: {
          xs: twoThirds && '100%',
          md: twoThirds ? '60%' : '100%',
        },
        marginLeft: twoThirds && 0,
      }}
      data-testid={testId}
    >
      {tag && (
        <Chip
          label='Educational Leadership'
          variant='outlined'
          sx={{
            '& .MuiChip-outlined': {
              bgcolor: 'common.white',
            },
          }}
        />
      )}

      {landing && landing.title && (
        <Box mt={3} data-testid={`${testId}-title`}>
          <Typography variant='h1'>{landing.title}</Typography>
        </Box>
      )}

      {landing && landing.subtitle && (
        <Box
          mt={2}
          display='flex'
          justifyContent={align == 'center' ? 'center' : 'flex-start'}
          data-testid={`${testId}-subtitle`}
        >
          <Typography variant='subtitle1'>{landing.subtitle}</Typography>
        </Box>
      )}

      {title && (
        <Box my={3} data-testid={`${testId}-issue-title`}>
          <Typography variant='h2'>{title}</Typography>
        </Box>
      )}

      {description && (
        <Box my={3} data-testid={`${testId}-description`}>
          <Typography variant='body2'>{description}</Typography>
        </Box>
      )}

      <Box>
        {datePosted && (
          <>
            <Typography component='span' variant='body3'>
              {dateFormat(datePosted, 'UTC:mmmm d, yyyy')}
            </Typography>
            <Typography
              component='span'
              variant='body2'
              sx={{
                display: 'inline-block',
                ml: 1,
                mr: 1,
              }}
            >
              |
            </Typography>
          </>
        )}
        {volumeNo && (
          <>
            <Typography
              component='span'
              variant='body3'
              data-testid={`${testId}-volume`}
            >
              Volume {volumeNo}
            </Typography>
            <Typography
              component='span'
              variant='body2'
              sx={{
                display: 'inline-block',
                ml: 1,
                mr: 1,
              }}
            >
              |
            </Typography>
          </>
        )}
        {issueNo && (
          <>
            <Typography
              component='span'
              variant='body3'
              data-testid={`${testId}-issueNo`}
            >
              Number {issueNo}
            </Typography>
          </>
        )}
      </Box>

      <Box
        mb={2}
        sx={{
          display: align !== 'center' ? 'flex' : 'block',
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: 'center',
          pt: { xs: 2, sm: 4 },
          alignItems: { xs: 'center', sm: 'unset' },
        }}
      >
        {bookVersion && (
          <Box display='flex'>
            <Box pr={2} alignSelf='center' data-testid={`${testId}-price`}>
              <Typography variant='h3'>
                {`$${bookVersion?.priceMember}`}
              </Typography>
              <Typography variant='h7'>Single Print Issue</Typography>
            </Box>
            <Box pr={2}>
              <SnipcartButton
                sx={{
                  bgcolor: 'primary.main',
                  color: 'text.secondary',
                  minWidth: { md: '100px' },
                  height: { md: '2.5rem' },
                  '&:hover': {
                    bgcolor: 'hover.main',
                    textDecoration: 'underline',
                  },
                }}
                snipcart={{
                  label: cartButtonCaptionLabel,
                  dataItemId: bookVersion?.productNumber,
                  dataItemName: title,
                  dataItemUrl: slug,
                  dataItemImage: imgUrl.startsWith('//')
                    ? 'https:' + imgUrl
                    : imgUrl,
                  dataItemDescription: description,
                  dataItemPrice: bookVersion.priceMember,
                  dataItemCustom1Value: bookVersion?.taxJar
                    ? bookVersion?.taxJar
                    : '',
                  dataItemCustom2Value: bookVersion?.royaltyFlag
                    ? bookVersion?.royaltyFlag
                    : false,
                  dataItemQuantity: 1,
                  digitalFileGuid: bookVersion?.digitalFileGuid,
                  productReleaseDate: bookVersion?.dateRelease,
                }}
              />
            </Box>
          </Box>
        )}
        {ctaLabel && (
          <Box
            mr={[0, 2]}
            my={[3, 0]}
            sx={{
              width: { xs: '100%', sm: 'unset' },
              '& a': {
                width: {
                  xs: '100%',
                  sm: ctaWidth ? ctaWidth : '100%',
                },
              },
            }}
            data-testid={`${testId}-cta`}
          >
            <CtaButton
              variant='contained'
              color='primary'
              width='100%'
              size='medium'
              label={ctaLabel}
              href={ctaLink}
              target={ctaTarget}
              align={align}
            />
          </Box>
        )}

        {authors && (
          <Box
            sx={{
              width: { xs: '100%', sm: 'unset' },
              '& a': {
                width: {
                  xs: '100%',
                  sm: ctaWidth ? ctaWidth : '100%',
                },
              },
            }}
            data-testid={`${testId}-authors`}
          >
            <AuthorGroup
              double
              authors={featuredAuthors}
              label={authors.ctaLabel}
              link={authors.ctaLink}
              onclick={() => router.push('/authors')}
            />
          </Box>
        )}
      </Box>
      {title && slug && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& div': {
              height: '38px',
            },
            '& button': {
              height: '38px',
            },
          }}
          data-testid={`${testId}-sharebutton`}
        >
          <ShareButtons url={paths.el({ slug: slug })} title={title} />
        </Box>
      )}
      {pdfFreeDownload &&
        (pdfFreeDownload === 'Everyone' || isPaidMember || isELMember ? (
          <Box my={2} px={[5, 0, 0]} textAlign={['center', 'left', 'left']}>
            {pdfUrl && (
              <Link href={pdfUrl}>
                <a target='_blank'>
                  <Typography variant='large-link'>{pdfUrlLabel}</Typography>
                </a>
              </Link>
            )}
          </Box>
        ) : (
          !userAccountUser && (
            <Typography variant='h5' pt={2}>
              Members/EL Subscribers: Log in to download issue PDF
            </Typography>
          )
        ))}
    </Box>
  )
}

IssueBannerTitle.propTypes = {
  testId: string,
  tag: string,
  title: string,
  slug: string,
  imgUrl: string,
  pdfFreeDownload: string,
  pdfUrl: string,
  pdfUrlLabel: string,
  description: string,
  bookVersion: shape({
    dateRelease: string,
    productNumber: string,
    priceMember: number,
    taxJar: string,
    royaltyFlag: bool,
    digitalFileGuid: string,
  }),
  datePosted: string,
  volumeNo: number,
  issueNo: number,
  landing: shape({
    title: string,
    subtitle: oneOfType([string, arrayOf(symbol)]),
  }),
  ctaLabel: string,
  ctaLink: string,
  ctaTarget: string,
  share: string,
  bookmark: string,
  authors: shape({
    images: arrayOf(string),
    ctaLabel: string,
    ctaLink: string,
  }),
  align: string,
  twoThirds: bool,
  ctaWidth: string,
  featuredAuthors: arrayOf(
    shape({
      thumbnail: shape({
        imageBynder: arrayOf(
          shape({
            src: string,
          })
        ),
        imageContentful: shape({
          file: shape({
            url: string,
          }),
        }),
      }),
    })
  ),
}
