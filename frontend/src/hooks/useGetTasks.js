import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../graphql/queries'

export const useGetTasks = () => {
  const { loading: loadingTasks, error: errorTasks, data } = useQuery(GET_TASKS)

  const tasks = data?.tasks || []

  return { loadingTasks, errorTasks, tasks }
}
