import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { string, number } from 'prop-types'

export default function MediaTabs({ tabValue, testId = 'MediaTabs' }) {
  const tabStyle = {
    color: 'grey.medium',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '1.375rem',
    textTransform: 'capitalize',
    minHeight: '50px',
    position: 'relative',
    opacity: '1',
    '& svg': {
      position: 'absolute',
      right: 0,
      top: '25px',
      color: '#11C142',
      width: '10px',
      height: '10px',
    },
    '& .Mui-selected': {
      color: 'common.black',
    },
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none',
    },
  }

  return (
    <>
      <Box my={1} data-testid={testId}>
        <Container>
          <Tabs
            value={tabValue}
            centered
            aria-label='Trending webinars tabs'
            TabIndicatorProps={{
              style: {
                backgroundColor: '#005E47',
                height: '6px',
                color: 'black',
              },
            }}
            data-testid={`${testId}-tabs`}
          >
            <Tab
              label='Videos'
              id='wrapped-tab-0'
              sx={tabStyle}
              href='/videos'
            />
            <Tab
              label='Podcasts'
              id='wrapped-tab-1'
              sx={tabStyle}
              href='/podcasts'
            />
            <Tab
              label='Past Webinars'
              id='wrapped-tab-2'
              sx={tabStyle}
              href='/webinars'
            />
          </Tabs>
        </Container>
        <Divider
          sx={{
            height: '1px',
            bgcolor: 'grey.light',
            width: '100%',
          }}
        />
      </Box>
    </>
  )
}

MediaTabs.propTypes = {
  tabValue: number,
  testId: string,
}
