import dynamic from 'next/dynamic'
import { Box } from '@mui/material'

const PianoAccount = dynamic(() => import('@/components/piano/pianoaccount'), {
  ssr: false,
})

const AccountSettings = () => {
  return (
    <Box>
      <Box my={11}>
        <PianoAccount />
        <Box id='my-account'>Loading...</Box>
      </Box>
    </Box>
  )
}

export default AccountSettings
