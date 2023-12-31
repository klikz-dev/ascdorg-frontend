import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import { theme } from '../styles/mui'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MockedProvider>{children}</MockedProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
