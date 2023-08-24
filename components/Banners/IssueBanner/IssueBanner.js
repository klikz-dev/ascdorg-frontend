import { useReactiveVar } from '@apollo/client'
import { Box, Container, Grid } from '@mui/material'
import { string, shape, array, number, bool } from 'prop-types'
import { hasPaidMembershipVar } from '../../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import NextImageWrapper from '../../images/NextImageWrapper'
import IssueBannerTitle from '../IssueBannerTitle'

export default function IssueBanner({
  testId,
  thumbnail,
  publicationDate,
  title,
  volNo,
  issueNo,
  slug,
  bookVersion,
  shortDescription,
  pdfFreeDownload,
  pdfUrl,
  pdfUrlLabel,
}) {
  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  return (
    <Box
      sx={{
        minHeight: { xs: '580px', sm: '520px', md: '515px' },
        height: { md: '515px' },
        mb: { md: '150px' },
        bgcolor: 'grey.extraLight',
      }}
      data-testid={testId}
    >
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            height: '100%',
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            lg={5}
            sx={{
              position: 'relative',
              marginTop: { xs: '20px', md: 0 },
            }}
          >
            <Box
              sx={{
                display: 'block',
                position: { xs: 'relative', md: 'absolute' },
                width: { xs: '100%', md: '424px' },
                top: { md: '46px' },
                boxShadow: 10,
              }}
            >
              {thumbnail && (
                <NextImageWrapper
                  data-testid={`${testId}-image`}
                  src={contentfulImageTransformation(thumbnail)}
                  alt={thumbnail?.alternate}
                  width={424}
                  height={582}
                  layout='responsive'
                  priority
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={7}>
            <Box
              pl={[0, 6]}
              mt={[2, 0]}
              display='flex'
              alignItems={['flex-start', 'center']}
              height='100%'
              width={['100%', '100%', '90%']}
            >
              <IssueBannerTitle
                tag='Educational Leadership'
                title={title}
                datePosted={publicationDate}
                volumeNo={volNo}
                issueNo={issueNo}
                slug={slug}
                bookVersion={bookVersion}
                imgUrl={contentfulImageTransformation(thumbnail)}
                description={shortDescription}
                pdfFreeDownload={pdfFreeDownload}
                pdfUrl={pdfUrl}
                pdfUrlLabel={pdfUrlLabel}
                ctaLabel={useMemberPrice ? '' : 'Join'}
                ctaLink={paths.subscribe}
                align='left'
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

IssueBanner.propTypes = {
  testId: string,

  thumbnail: shape({
    title: string,
    imageBynder: array,
    imageContentful: shape({
      url: string,
    }),
    alternate: string,
  }),
  title: string,
  publicationDate: string,
  volNo: number,
  issueNo: number,
  slug: string,
  bookVersion: shape({
    dateRelease: string,
    productNumber: string,
    priceMember: number,
    taxJar: string,
    royaltyFlag: bool,
    digitalFileGuid: string,
  }),
  shortDescription: string,
  pdfFreeDownload: string,
  pdfUrl: string,
  pdfUrlLabel: string,
}
