import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/mui'
import CssBaseline from '@mui/material/CssBaseline'
import { withTests } from '@storybook/addon-jest'
import results from '../test-results/report.json'
import * as nextImage from 'next/image'

/** https://github.com/vercel/next.js/issues/18393#issuecomment-750910068 Allows for rendering of Next images */
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    const { width, height } = props
    const ratio = (height / width) * 100
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: 'relative',
        }}
      >
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            minWidth: '100%',
            minHeight: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          {...props}
        />
      </div>
    )
  },
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
  withTests({
    results,
  }),
]
