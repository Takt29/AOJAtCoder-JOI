import axios, { AxiosResponse } from 'axios'
import { Contest } from '../types/contest'

export const fetchContests = async (): Promise<Contest[]> => {
  const res: AxiosResponse<Contest[]> = await axios.get(
    'https://storage.googleapis.com/aojatcoder-joi.appspot.com/data/contests.json',
  )
  return res.data
}
