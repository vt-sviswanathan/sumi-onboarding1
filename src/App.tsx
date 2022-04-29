import React from 'react'
import { FC } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './components/theme'
import Home from './components/Home'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}

export default App
