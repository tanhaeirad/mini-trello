import { useQuery } from '@apollo/client'
import { GET_LISTS } from '../graphql/queries'

export const useGetLists = () => {
  const { loading: loadingLists, error: errorLists, data } = useQuery(GET_LISTS)

  const lists = data?.lists || []

  return { loadingLists, errorLists, lists }
}
