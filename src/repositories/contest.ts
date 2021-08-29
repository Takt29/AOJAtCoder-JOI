import axios, { AxiosResponse } from 'axios'
import { Contest } from '../types/contest'

export const fetchContests = async (): Promise<Contest[]> => {
  const res: AxiosResponse<Contest[]> = await axios.get('/data/contests.json')
  return res.data
}
