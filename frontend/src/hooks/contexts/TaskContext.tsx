import { createContext, FC, ProviderProps, useContext } from 'react'
import { Task } from '../../types/task'

const TaskContext = createContext<Task | null>(null)

export const TaskProvider: FC<ProviderProps<Task>> = ({ value, children }) => {
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTask = (): Task => {
  const context = useContext(TaskContext)
  if (context === null) {
    throw new Error('useTask can only be used in a TaskProvider')
  }
  return context
}
