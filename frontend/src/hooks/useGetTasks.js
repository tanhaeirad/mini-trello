import { useQuery, gql } from '@apollo/client'

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      content
      indexOrder
      listId
    }
  }
`

export const useGetTasks = () => {
  const { loading: loadingTasks, error: errorTasks, data } = useQuery(GET_TASKS)

  const tasks = data?.tasks || []

  return { loadingTasks, errorTasks, tasks }
}
