import { useQuery } from '@apollo/client'
import { GET_DATA } from '../graphql/queries'

export const useGetData = () => {
  const { loading, error, data } = useQuery(GET_DATA)
  const tasks = data?.board?.tasks || []
  const lists = data?.board?.lists || []

  return { loading, error, tasks, lists }
}
