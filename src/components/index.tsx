import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, Container, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import Navbar from './Navbar'
import Definition from './Definition'
import Modal from './Modal'

declare global {
  interface Window {
    aiware: any
  }
}

export const UploadBtn = styled(Button)({
  height: '50px',
  border: '1px solid #42BCB6',
  margin: '20px auto',
  display: 'block',
  backgroundColor: '#59D4CE',
  '&:hover': {
    backgroundColor: '#35938E',
  },
})

export const DefinitionBtn = styled(Button)({
  height: '50px',
  border: '1px solid #42BCB6',
  margin: '20px auto !important',
  display: 'block',
  backgroundColor: '#59D4CE',
  '&:hover': {
    backgroundColor: '#35938E',
  },
})

const Index: React.FC = () => {
  window.aiware = window.aiware || {}
  const [file, setFile] = useState(null)
  const [dictionaryResponse, setDictionaryResponse] = useState(null)
  const [word, setWord] = useState('mask')
  const [modalOpen, setModalOpen] = useState(false)

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
        authToken: '740bcbd1-b8cd-4367-bff6-6ee4a0a66bf2',
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
            console.log('1111111', file)
            // const cancel =  document.querySelector(`[data-test="data-center-importer-cancel-btn"]`) as HTMLButtonElement | null
            // if( cancel != null) {
            //   console.log(cancel.innerText)
            //   cancel.click()
            // }
            // const confirmCancel = document.querySelector(`[data-test="data-center-importer-dialog-confirm-close-btn"]`) as HTMLButtonElement | null
            // if( confirmCancel !== null) {
            //   console.log("Confirm")
            //   confirmCancel.click()
            // }
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

  const wordSubmit = () => {
    Axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=851546ba-e972-4cc3-89f2-71ffc1ecfbe3`
    ).then(response => {
      // setData(response.data[0]);
      console.log('response ===', response)
      if (response.status === 200) {
        setDictionaryResponse(response)
        setModalOpen(true)
      } else {
        console.log('Something went wrong')
      }
    })
  }

  const closeModal = () => {
    console.log("I am in close modal", modalOpen)
    setModalOpen(!modalOpen)
  }

  return (
    <div id={'home'}>
      <div className={!dictionaryResponse && 'backgroundImage'}>
        <Container>
          <Navbar />
          <div className="btnWrapper">
            <Stack direction="column" spacing={2}>
              {!dictionaryResponse ? (
                <>
                  <UploadBtn onClick={handleUpload} variant="outlined">
                    upload file
                  </UploadBtn>
                  {word && (
                    <DefinitionBtn onClick={wordSubmit} variant="outlined">
                      Click to see the definition of the {word}
                    </DefinitionBtn>
                  )}
                </>
              ) : (
                <Modal
                  word={word}
                  dictionaryResponse={dictionaryResponse}
                  modalOpen={modalOpen}
                  closeModal={closeModal}
                />
              )}
              {/*{dictionaryResponse &&*/}
              {/*    <Definition word={word} dictionaryResponse={dictionaryResponse}/>*/}
              {/*}*/}
              {/*{dictionaryResponse && (*/}
              {/*  <Modal*/}
              {/*    word={word}*/}
              {/*    dictionaryResponse={dictionaryResponse}*/}
              {/*    modalOpen={modalOpen}*/}
              {/*    closeModal={closeModal}*/}
              {/*  />*/}
              {/*)}*/}
            </Stack>
          </div>
          {/*{ file && file.getUrl ?*/}
          {/*    <audio*/}
          {/*        className="audio-player"*/}
          {/*        data-test-id="audio-player"*/}
          {/*        controls*/}
          {/*        src={file.getUrl}*/}
          {/*    >*/}
          {/*      Your browser does not support the*/}
          {/*      <code>audio</code> element.*/}
          {/*    </audio>*/}
          {/*    : null}*/}
        </Container>
      </div>
    </div>
  )
}
export default Index
