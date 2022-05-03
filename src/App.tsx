import React from 'react'
import { FC } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './components/theme'
import Index from './components'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Index />
    </ThemeProvider>
  )
}

export default App
