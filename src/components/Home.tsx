import React, { useEffect, useState } from 'react'

import { Box, Paper, Typography, Button } from '@mui/material'
import Navbar from './Navbar'

declare global {
  interface Window {
    aiware: any
  }
}

const Home: React.FC = () => {
  window.aiware = window.aiware || {}
  const [file, setFile] = useState(null)

  // To obtain this token, login to https://login.stage.veritone.com/
  // open developer tools and go to:
  //
  // "Application" tab
  // -> "Cookies", under Storage panel
  // -> "admin.stage.us-1.veritone.com"
  //
  // From the list, select "stage-veritone-session-id"
  // -> copy the uuid displayed in the "Cookie Value" panel.

  useEffect(() => {
    window.aiware.init(
      {
        baseUrl: 'https://api.stage.us-1.veritone.com/v3/graphql',
        applicationId: 'app-123',
        withAuth: true,
        authToken: '0fd8d3c8-aaa9-48dd-a827-aa49360fc0e9',
      },
      function () {
        window.aiware.mountWidget({
          name: 'APP_BAR',
          elementId: 'app-bar',
          config: {
            title: 'Onboarding',
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

  const handleUpload = () => {
    const microFrontend = {
      name: 'DATA_CENTER_IMPORTER',
      config: {
        name: 'Local Importer',
      },
    }

    const panelConfig = {
      type: 'APP_BAR_PANEL_TEMPLATE',
      marginTop: 55,
      marginStart: 0,
      size: 'large',
      zIndex: 1000,
      dimmed: 0,
    }
    setTimeout(() => {
      window.aiware.mountPanel({
        panelId: 'DATA_CENTER_IMPORTER',
        microFrontend: microFrontend,
        panelConfig: panelConfig,
      })
    }, 0)
    setTimeout(() => {
      console.log('Click browse button')
      // document.querySelector(`[data-test="data-center-importer-local-upload-button"]`).click()
    }, 1)
  }

  console.log('File', file)
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
        <Paper>
          <Button onClick={handleUpload}>upload file</Button>
        </Paper>
        <Paper></Paper>
      </Box>
    </>
  )
}
export default Home
