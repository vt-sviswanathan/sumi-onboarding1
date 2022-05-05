import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Stack } from '@mui/material'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import { UploadBtn, TransBtn, DefinitionBtn } from '../components/Butons'
import {
  startEngine,
  jobStatus,
  jobResults,
  generateAudioJobResults,
  parseAudioJobResults,
} from '../api'
import { TOKEN, GRAPHQL_URL } from '../../config'

declare global {
  interface Window {
    aiware: any
  }
}

const Index: React.FC = () => {
  window.aiware = window.aiware || {}
  const [file, setFile] = useState(null)
  const [dictionaryResponse, setDictionaryResponse] = useState(null)
  const [word, setWord] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [transcribeDuration, setTranscribeDuration] = useState(0)
  const [scanBtn, setScanBtn] = useState(false)
  // const [result, setResult] = useState(null)
  const timer = 3500

  //Testing PlayStation PlayStation PlayStation PlayStation test one two three
 const result = 'Testing PlayStation PlayStation PlayStation PlayStation test one two three'
  // var str = "This is an simple sentence.";
  const singlwWords = result.split(" ");
  console.log(singlwWords);
  if(singlwWords) {
      singlwWords.map((item, index) => {
          console.log({item})
      })
  }


  useEffect(() => {
    window.aiware.init(
      {
        baseUrl: GRAPHQL_URL,
        applicationId: 'app-123',
        withAuth: true,
        authToken: TOKEN,
      },
      function () {
        window.aiware.mountWidget({
          name: 'APP_BAR',
          elementId: 'app-bar',
          config: {
            title: 'Transcribe',
            backgroundColor: '#1f2937',
          },
        })

        window.aiware.on('fileUpload', (error: any, file: any) => {
          if (error) {
            alert('Error during the file upload!')
            throw error
          }

          setTimeout(() => {
            setFile(file)
            const cancel = document.querySelector(
              `[data-test="data-center-importer-cancel-btn"]`
            ) as HTMLButtonElement | null
            if (cancel != null) {
              cancel.click()
            }
            const confirmCancel = document.querySelector(
              `[data-test="data-center-importer-dialog-confirm-close-btn"]`
            ) as HTMLButtonElement | null
            if (confirmCancel !== null) {
              confirmCancel.click()
            }
            console.log('File test test test test ', file)
            setScanBtn(true)
          }, 500)
        })
        window.aiware.on(
          'fileUploadProgress',
          function (error: any, file: any) {
            if (error) {
              alert('Error during the file upload!')
              throw error
            }
            // console.log('Progress: 1111111111111 ', file)
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
  }

  const handleTranscribe = () => {
    startEngine(file)
      .then(response => {
        const id = response.data.launchSingleEngineJob.id
        const targetId = response.data.launchSingleEngineJob.targetId
        console.log('response =====', { response, targetId, id })

        pollStatus(targetId, id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const pollStatus = (tdoId, id) => {
    // let counter = 0;
    const poll = setInterval(() => {
      // counter += API_POLL_FREQUENCY;
      jobStatus(tdoId, id).then(res => {
        const { status } = res.data.temporalDataObject.jobs.records[0]
        if (status === 'complete') {
          clearInterval(poll)

          jobResults(id).then(res => {
            console.log('parseAudioJobResults ------', res)

            const parsedResults = generateAudioJobResults(
              parseAudioJobResults(res)
            )

            console.log('REsult REsult Result', parsedResults)
            // needed this
            // setResult(parsedResults)
            setIsFinished(true)
          })
        }
      })
    }, 3500)
  }

  const wordSubmit = () => {
    Axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=851546ba-e972-4cc3-89f2-71ffc1ecfbe3`
    ).then(response => {
      if (response.status === 200) {
        setDictionaryResponse(response)
        setModalOpen(true)
      } else {
        console.log('Something went wrong')
      }
    })
  }

  const closeModal = () => {
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
                  {!scanBtn ? (
                    <UploadBtn onClick={handleUpload} variant="outlined">
                      upload file
                    </UploadBtn>
                  ) : (
                    <TransBtn onClick={handleTranscribe} variant={'outlined'}>
                      Transcribe audio to text
                    </TransBtn>
                  )}
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
              {result && <div className="finalResults">{result}</div>}
                <div style={{display: 'flex'}}>

                {
                    singlwWords.map((item, index) => {
                       return  <button key ={index}
                       style={{
                           border: 'none',
                           backgroundColor: "transparent",
                           cursor:'pointer'
                       }}
                        onClick={closeModal}
                       > {item}</button>
                    })
                }
                </div>
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
