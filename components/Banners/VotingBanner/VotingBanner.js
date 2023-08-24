import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, Grid, Typography } from '@mui/material'
import { string, oneOfType, array, bool, func, object } from 'prop-types'
import ReactMarkdown from 'react-markdown'
import useUserAccount from '../../../lib/hooks/useUserAccount'
import { moduleBGColor } from '../../../lib/utils'
import CtaButton from '../../interactives/Buttons/CtaButton'
import { pianoLogInHandler } from '../../piano/PianoManager'
import { SnipcartButton } from '../../Snipcart'
import TopicTag from '../../TopicTag'

/**
 * This is the original HeroHalfHalf for voting purposes
 */
export default function VotingBanner({
  testId = 'voting-banner',
  label,
  title,
  subtitle,
  titleAboveImage,
  titleCenterAlign,
  description,
  date,
  time,
  ctaLabel1,
  ctaLink1,
  ctaTarget1,
  ctaLabel2,
  ctaLink2,
  ctaTarget2,
  image,
  imageAlt,
  imagePos,
  snipcart,
  imageBorderCornerPosition,
  imageMobilePosition,
  backgroundColor,
}) {
  const buttonStyle = (theme) => ({
    width: { xs: '100%', md: 'auto' },
    paddingRight: theme.spacing(2),
    '& a': {
      justifyContent: 'center !important',
    },
    '& button': {
      width: '100%',
    },
    '& .MuiButton-label': {
      fontWeight: 600,
    },
  })

  const containerBorderStyle = () => {
    if (
      imagePos &&
      (imageBorderCornerPosition === 'bottom-left' ||
        !imageBorderCornerPosition)
    ) {
      return { xs: '0 0 0 0', sm: '8px 8px 8px 96px' }
    } else if (imagePos && imageBorderCornerPosition === 'top-left') {
      return { xs: '96px 0 0 0', md: '96px 8px 8px 8px' }
    } else if (!imagePos && imageBorderCornerPosition === 'top-right') {
      return { xs: '0 96px 0 0', md: '8px 96px 8px 8px' }
    } else if (!imagePos && imageBorderCornerPosition === 'bottom-right') {
      return { xs: '0 0 96px 0', md: '8px 8px 96px 8px' }
      /** mobile  exception */
    } else if (!imagePos && imageBorderCornerPosition === 'top-left') {
      return { xs: '96px 0 0 0', sm: '8px 8px 8px 8px' }
    } else {
      return { xs: '0 0 0 0', md: '8px 8px 8px 8px' }
    }
  }

  const imageBorderStyle = () => {
    switch (imageBorderCornerPosition) {
      case 'top-left':
        return { xs: '96px 0 0 0', md: '96px 8px 8px 8px' }
      case 'top-right':
        return { xs: '0 96px 0 0', md: '8px 96px 8px 8px' }
      case 'bottom-right':
        return { xs: '0 0 96px 0', md: '8px 8px 96px 8px' }
      case 'bottom-left':
      default:
        return { xs: '0 0 0 96px', md: '8px 8px 8px 96px' }
    }
  }

  const { userAccountUser } = useUserAccount()
  const loginHandler = pianoLogInHandler
  const [eligible, setEligible] = useState(false)
  const [state, setState] = useState()
  const [country, setCountry] = useState()
  const startDateTimeEST = Date.parse(
    new Date(ctaLink1).toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
  )

  const endDateTimeEST = Date.parse(
    new Date(ctaLink2).toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
  )
  const currentDate = Date.parse(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
  )

  const displayStartDate = new Date(ctaLink1).toLocaleString('en-US', {
    timeZone: 'America/New_York',
  })

  const displayEndDate = new Date(ctaLink2).toLocaleString('en-US', {
    timeZone: 'America/New_York',
  })

  const getCustomFieldValue = (fieldName) => {
    const results = userAccountUser?.custom_fields?.filter((field) => {
      return field.fieldName === fieldName
    })
    return results?.length > 0
      ? results[0]?.value
        ? results[0]?.value.toString().replace('["', '').replace('"]', '')
        : 'N/A'
      : 'N/A'
  }

  useEffect(() => {
    if (ctaLabel2 === 'Vote' && userAccountUser?.uid) {
      setState(getCustomFieldValue('sa_state'))
      setCountry(getCustomFieldValue('sa_country'))

      fetch(`/api/voter-eligibility?id=${userAccountUser?.uid}`)
        .then(function (response) {
          if (response.ok) {
            return response.json()
          }
          throw new Error(response.statusText)
        })
        .then(function (data) {
          if (data.length > 0) {
            setEligible(data[0].Eligibility)
          } else {
            setEligible(false)
          }
        })
        .catch(function (error) {
          console.log('not able to connect to the DB: ', error.message)
          setEligible(false)
        })
    } else {
      setEligible(false)
    }
  }, [userAccountUser?.uid])

  return (
    <Grid
      container
      sx={{
        width: '100%',
        backgroundColor: moduleBGColor(backgroundColor),
        borderRadius: containerBorderStyle(),
      }}
      data-testid={testId}
    >
      {titleAboveImage && (
        <Grid
          xs={12}
          mt={2}
          mb={2}
          px={2}
          order={{ xs: imageMobilePosition === 'above-title' ? 2 : 1, sm: 1 }}
        >
          {title && (
            <Typography
              variant='h1'
              color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
              textAlign={titleCenterAlign ? 'center' : 'left'}
              data-testid={`${testId}-title`}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant='body2'
              color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
              textAlign={titleCenterAlign ? 'center' : 'left'}
              mt={1}
              data-testid={`${testId}-subtitle`}
            >
              <strong>{subtitle}</strong>
            </Typography>
          )}
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sm={6}
        order={{
          xs: imageMobilePosition === 'below-body' ? 2 : 3,
          sm: imagePos ? 3 : 2,
        }}
        sx={{
          height: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
          paddingTop: 3,
          paddingBottom: 3,
          marginTop: 'auto',
          marginBottom: 'auto',
          paddingLeft: { xs: 1, md: 2 },
        }}
      >
        <Box ml={[3, 2, 0]} mr={[3, 0]} width='468px'>
          {label && (
            <Box pb={1} data-testid={`${testId}-label`}>
              <TopicTag
                label={label}
                variant='special'
                color='black'
                textTransform='uppercase'
              />
            </Box>
          )}
          <Box>
            {!titleAboveImage && title && (
              <Typography
                variant='h1'
                color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
                textAlign={titleCenterAlign ? 'center' : 'left'}
                data-testid={`${testId}-title`}
              >
                {title}
              </Typography>
            )}
            {!titleAboveImage && subtitle && (
              <Typography
                variant='body2'
                color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
                textAlign={titleCenterAlign ? 'center' : 'left'}
                mt={1}
                data-testid={`${testId}-subtitle`}
              >
                <strong>{subtitle}</strong>
              </Typography>
            )}

            {date && time && (
              <>
                <Typography
                  variant='subtitle2'
                  color={
                    backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'
                  }
                  data-testid={`${testId}-date-time`}
                >{`${date} - ${time} EST`}</Typography>
              </>
            )}
            <Box
              mt={2}
              sx={{
                maxWidth: { md: '85%' },
              }}
            >
              <Typography
                variant='subtitle2'
                color={backgroundColor === 'dark_green' ? '#FFFFFF' : '#000000'}
                data-testid={`${testId}-description`}
              >
                {Array.isArray(description) ? (
                  description
                ) : (
                  <Box
                    sx={{
                      '& a': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <ReactMarkdown>{description}</ReactMarkdown>
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            mt={5}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              textAlign: 'center',
            }}
            data-testid={`${testId}-cta-label`}
          >
            {ctaLabel1 &&
              (ctaLabel1 === 'Log In' ? (
                userAccountUser ? (
                  !eligible && (
                    <Box display='flex' flexDirection='column'>
                      <Box
                        align='left'
                        alignItems='end'
                        variant='h8'
                        color={
                          backgroundColor === 'dark_green'
                            ? '#FFFFFF'
                            : '#000000'
                        }
                      >
                        You are not authorized to vote. If you think you should
                        be able to vote, please contact
                      </Box>
                      <Box>
                        <Link href={`mailto:member@ascd.org`} target='_New'>
                          <a>
                            <Box>
                              <Typography variant='buttonLarge' color='#005e47'>
                                ASCD Support
                              </Typography>
                            </Box>
                          </a>
                        </Link>
                      </Box>
                    </Box>
                  )
                ) : (
                  <Box pt={0} sx={buttonStyle}>
                    <CtaButton
                      variant='outlined'
                      color={
                        backgroundColor === 'dark_green'
                          ? 'secondary'
                          : 'primary'
                      }
                      label='Log In'
                      onclick={() => loginHandler && loginHandler()}
                      data-testid={`${testId}-label`}
                    />
                  </Box>
                )
              ) : (
                <Box pt={0} sx={buttonStyle}>
                  <CtaButton
                    variant='contained'
                    color={
                      backgroundColor === 'dark_green' ? 'secondary' : 'primary'
                    }
                    width='100%'
                    size='large'
                    label={ctaLabel1}
                    onclick={
                      typeof ctaLink1 !== 'string'
                        ? () => ctaLink1()
                        : undefined
                    }
                    href={typeof ctaLink1 === 'string' ? ctaLink1 : null}
                    target={ctaTarget1}
                  />
                </Box>
              ))}

            {snipcart && (
              <Box pt={[2, 0, 0]} sx={buttonStyle}>
                <SnipcartButton snipcart={snipcart} />
              </Box>
            )}
            {ctaLabel2 &&
              (ctaLabel2 === 'Vote' ? (
                userAccountUser &&
                eligible &&
                (currentDate >= startDateTimeEST &&
                currentDate <= endDateTimeEST ? (
                  <form
                    action={process.env.NEXT_PUBLIC_YES_ELECTIONS_URI}
                    method='post'
                    target='_blank'
                    id='yesElections'
                  >
                    <input
                      type='hidden'
                      id='CustomerID'
                      name='CustomerID'
                      value={
                        process.env.NEXT_PUBLIC_YES_ELECTIONS_ASCD_CUSTOMER_ID
                      }
                    />
                    <input
                      type='hidden'
                      id='ID'
                      name='ID'
                      value={userAccountUser?.uid}
                    />
                    <input
                      type='hidden'
                      id='FirstName'
                      name='FirstName'
                      value={userAccountUser?.first_name}
                    />
                    <input
                      type='hidden'
                      id='LastName'
                      name='LastName'
                      value={userAccountUser?.last_name}
                    />
                    <input
                      type='hidden'
                      id='Data1'
                      name='Data1'
                      value={state}
                    />
                    <input
                      type='hidden'
                      id='Data2'
                      name='Data2'
                      value={country}
                    />
                    <input
                      type='hidden'
                      id='Status'
                      name='Status'
                      value='ACTIVE'
                    />
                    <CtaButton
                      variant='outlined'
                      color={
                        backgroundColor === 'dark_green'
                          ? 'secondary'
                          : 'primary'
                      }
                      width='100%'
                      size='large'
                      label={ctaLabel2}
                      onclick={() =>
                        document.getElementById('yesElections').submit()
                      }
                    />
                  </form>
                ) : currentDate <= startDateTimeEST ? (
                  'Voting will start on ' + displayStartDate
                ) : currentDate >= endDateTimeEST ? (
                  'Voting has ended on ' + displayEndDate
                ) : (
                  ''
                ))
              ) : (
                <Box pt={[2, 2, 0]} sx={buttonStyle}>
                  <CtaButton
                    variant='outlined'
                    color={
                      backgroundColor === 'dark_green' ? 'secondary' : 'primary'
                    }
                    width='100%'
                    size='large'
                    label={ctaLabel2}
                    href={ctaLink2}
                    target={ctaTarget2}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        order={{
          xs:
            imageMobilePosition === 'below-body'
              ? 3
              : imageMobilePosition === 'above-title'
              ? 1
              : 2,
          sm: imagePos ? 2 : 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            objectFit: 'cover',
            overflow: 'hidden',
            height: { xs: 375, md: 500 },
            maxHeight: { xs: 375, md: 500 },
            width: { xs: '100%', md: 500 },
            borderRadius: imageBorderStyle(),
          }}
          data-testid={`${testId}-image`}
        >
          {image && (
            <img
              src={image}
              alt={imageAlt}
              style={{ width: '100%', height: 'inherit', objectFit: 'cover' }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

VotingBanner.propTypes = {
  testId: string,
  label: string,
  title: string,
  subtitle: string,
  titleAboveImage: bool,
  titleCenterAlign: bool,
  description: oneOfType([array, string]),
  date: string,
  time: string,
  ctaLabel1: string,
  ctaLink1: oneOfType([string, func]),
  ctaTarget1: string,
  ctaLabel2: string,
  ctaLink2: oneOfType([string, func]),
  ctaTarget2: string,
  image: string,
  imageAlt: string,
  imagePos: bool,
  snipcart: object,
  imageBorderCornerPosition: string,
  imageMobilePosition: string,
  backgroundColor: string,
}
