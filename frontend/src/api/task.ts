import axios, { AxiosResponse } from 'axios'
import { Task } from '../types/task'

export const fetchTasks = async (): Promise<Task[]> => {
  const res: AxiosResponse<Task[]> = await axios.get(
    'https://storage.googleapis.com/aojatcoder-joi.appspot.com/data/tasks.json',
  )
  return res.data
}
