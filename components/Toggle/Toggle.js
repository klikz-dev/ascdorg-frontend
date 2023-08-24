import { Box, FormControlLabel, Switch, Typography } from '@mui/material'

export default function Toggle({
  leftTitle,
  rightTitle,
  testId = 'toggleComponent',
  toggle,
  setToggle,
}) {
  const handleChange = () => {
    setToggle(() => !toggle)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
      data-testid={testId}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: '20px', md: '32px' },
          wordSpacing: 0.2,
          lineHeight: '28px',
          textShadow: '0px 0px 15px rgba(0, 255, 193, 0.3)',
          whiteSpace: 'nowrap',
        }}
        data-testid={`${testId}-leftTitle`}
      >
        {leftTitle}
      </Typography>
      <FormControlLabel
        data-testid={`${testId}-switch`}
        onChange={handleChange}
        control={
          <Switch
            sx={{
              mr: -4,
              width: { xs: '72px', sm: '82px', md: '92px' },
              height: '42px',
              '& .MuiSwitch-switchBase': {
                padding: 0,
                '&.Mui-checked': {
                  transform: {
                    xs: 'translateX(30px)',
                    sm: 'translateX(40px)',
                    md: 'translateX(44px)',
                  },
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#E3EFEC',
                    border: '4px solid #8DAFA7',
                  },
                },
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: '#005E47',
                width: { xs: '28px', sm: '34px', md: '40px' },
                height: { xs: '28px', sm: '34px', md: '40px' },
                margin: { xs: 0.75, sm: 0.5, md: 0 },
              },
              '& .MuiSwitch-track': {
                backgroundColor: '#E3EFEC',
                borderRadius: '25px',
                border: '4px solid #8DAFA7',
              },
            }}
          />
        }
      />
      <Typography
        sx={{
          wordSpacing: 0.2,
          fontSize: { xs: '20px', md: '32px' },
          lineHeight: '28px',
          whiteSpace: 'nowrap',
        }}
        data-testid={`${testId}-rightTitle`}
      >
        {rightTitle}
      </Typography>
    </Box>
  )
}
