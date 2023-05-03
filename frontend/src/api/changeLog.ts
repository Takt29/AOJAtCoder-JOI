import axios, { AxiosResponse } from 'axios'
import { ChangeLogRecord } from '../types/changeLog'

export const fetchChangeLog = async (): Promise<ChangeLogRecord[]> => {
  const res: AxiosResponse<ChangeLogRecord[]> = await axios.get(
    '/data/changelog.json',
  )
  return res.data
}
