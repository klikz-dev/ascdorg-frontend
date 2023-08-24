import Image from 'next/image'
import { Avatar, Box, Container, Grid, Typography } from '@mui/material'
import { string } from 'prop-types'

export default function SpotlightQuoteTile({
  testId = 'SpotlightQuoteTile',
  title,
  description,
  authorThumbnail,
  authorName,
  expertise,
}) {
  const avatarStyle = {
    width: '15vw',
    height: '15vw',
    minWidth: '128px',
    minHeight: '128px',
    maxHeight: '212px',
    maxWidth: '212px',
    border: {
      xs: '4px solid #FFFFFF',
      sm: '4px solid #FFFFFF',
      md: '8px solid #FFFFFF',
    },
    backgroundColor: 'primary.main',
  }

  return (
    <Box data-testid={testId}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
        data-testid={`${testId}-title`}
      >
        {title && <Typography variant='h4'>{title}</Typography>}
      </Box>
      <Box
        sx={{
          width: '1040px',
          height: '350px',
          padding: { xs: '36px 28px', md: '46px 96px ' },
          borderRadius: { xs: '8px 8px 8px 48px', md: '8px 8px 8px 96px' },
          backgroundColor: 'grey.extraLight',
          backgroundImage:
            'linear-gradient(to top right, rgba(255, 255, 255, 0.4) 50%, #E4E9EC 50%)',
          '& .MuiContainer-root': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <Container>
          <Grid
            container
            alignItems='center'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={12} sm={8} md={7}>
              <Box
                sx={{
                  textAlign: 'left',
                }}
              >
                <Box display='flex'>
                  <Box pr={2}>
                    <Image
                      src='/images/quote.svg'
                      width={20}
                      height={20}
                      style={{
                        backgroundColor: 'transparent',
                        minWidth: '25px',
                        marginTop: '5px',
                      }}
                      layout='fixed'
                      data-testid={`${testId}-image`}
                    />
                  </Box>
                  <Typography
                    variant='h4'
                    data-testid={`${testId}-description`}
                  >
                    {description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={authorThumbnail}
                alt={undefined}
                sx={avatarStyle}
                data-testid={`${testId}-authorImage`}
              />
              <Typography
                variant='h4'
                data-testid={`${testId}-authorName`}
                sx={{ fontSize: '20px' }}
              >
                {authorName}
              </Typography>
              <Typography
                color='#546366'
                variant='caption'
                data-testid={`${testId}-expertise`}
              >
                {expertise}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

SpotlightQuoteTile.propTypes = {
  testId: string,
  title: string,
  description: string,
  authorThumbnail: string,
  authorName: string,
  expertise: string,
}
