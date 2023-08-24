import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton } from '@mui/material'
import ReactPlayer from 'react-player/wistia'

export default function VideoBanner({ close }) {
  const wistiaendpoint =
    process?.env?.WISTIA_ENDPOINT || 'https://ascd.wistia.com/medias/'

  const closeBanner = () => {
    close()
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: { xs: '350px', md: '550px', lg: '617px' },
        bgcolor: 'grey.dark',
      }}
    >
      <IconButton
        aria-label='Close video banner button'
        sx={{
          position: 'absolute',
          top: { xs: '8px', md: '24px' },
          right: { xs: '8px', md: '24px' },
          color: 'common.white',
        }}
        onClick={() => closeBanner()}
        size='large'
      >
        <CloseIcon size='small' />
      </IconButton>

      <Box
        sx={{
          width: { xs: '100%', sm: '60%', md: '783px' },
          height: { xs: '250px', md: '400px', lg: '521px' },
        }}
      >
        <ReactPlayer
          url={`${wistiaendpoint}72jvholg15`}
          config={{
            wistia: {
              options: {},
              playerId: '72jvholg15',
            },
          }}
          playing
          controls
          width='100%'
          height='100%'
        />
      </Box>
    </Box>
  )
}
