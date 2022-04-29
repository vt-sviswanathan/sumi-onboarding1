import React, { FunctionComponent, useEffect } from 'react'

import { Box, Paper, Typography } from '@mui/material'
import Navbar from './Navbar'
declare global {
  interface Window {
    aiware: any
  }
}

const Home: React.FC = () => {
  window.aiware = window.aiware || {}

  useEffect(() => {
    window.aiware.init(
      {
        baseUrl: VERITONE_ENVIRONMENT_GQL_URL,
        applicationId: 'app-123',
        withAuth: true,
        authToken: token,
      },
      function () {
        window.aiware.mountWidget({
          name: 'APP_BAR',
          elementId: 'app-bar',
          config: {
            title: 'Tony Onboarding',
            backgroundColor: '#1f2937',
          },
        })

        window.aiware.on('fileUpload', (error: any, file: any) => {
          if (error) {
            alert('Error during the file upload!')
            throw error
          }

          console.log(file)
          setTimeout(() => {
            setFile(file)
            console.log('Closing Importer panel')
          }, 500)
        })
        window.aiware.on(
          'fileUploadProgress',
          function (error: any, file: any) {
            if (error) {
              alert('Error during the file upload!')
              throw error
            }
            console.log('Progress: ', file)
          }
        )
      }
    )
  }, [])

  return (
    <>
      <Navbar />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={3}
          sx={{ padding: '1rem', backgroundColor: 'secondary.light' }}
        >
          <Typography color="primary.dark" variant="h1">
            Starter App
          </Typography>
        </Paper>
      </Box>
    </>
  )
}
export default Home
