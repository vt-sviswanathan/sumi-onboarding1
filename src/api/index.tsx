import { ENGINE_ID, CLUSTER_ID } from '../../config'
import {
  launchSingleEngineJob,
  postGraphQlQuery,
  checkingStatusQuery,
  engineResultsQuery,
} from './engine'

export const startEngine = async file => {
  const file_getUrl = file.getUrl
  console.log('Api ===file', { CLUSTER_ID, ENGINE_ID, file, file_getUrl })

  const launchJobQuery = launchSingleEngineJob(file_getUrl)

  const response = await postGraphQlQuery(launchJobQuery)
  console.log('api response', response)
  //response will have id and targetId
  //Need them to start the
  return response
}

export const jobStatus = async (targetId, jobId) => {
  const jobStatusQuery = checkingStatusQuery(targetId)
  const response = await postGraphQlQuery(jobStatusQuery)
  console.log('DAta sfter th job status ===', response)
  return response
}

export const jobResults = async targetId => {
  const engineStatusQuery = engineResultsQuery(targetId)
  const data = await postGraphQlQuery(engineStatusQuery)
  console.log('Response received')
  return data
}

export const parseAudioJobResults = response => {
  const { series } = response.data.engineResults.records[0].jsondata
  const words = []
  series.forEach(word => {
    words.push(word?.words[0]?.word)
  })
  return words
    .join(' ')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .trim()
}

export const generateAudioJobResults = text => {
  const textWordArray = text.toLowerCase().split(' ')
  const results = {
    text,
    length: textWordArray.length,
  }
  console.log('results', results, text)

  return results
}
