import { useQuery, gql } from '@apollo/client'

const GET_LISTS = gql`
  query GetLists {
    lists {
      id
      title
      indexOrder
    }
  }
`

export const useGetLists = () => {
  const { loading: loadingLists, error: errorLists, data } = useQuery(GET_LISTS)

  const lists = data?.lists || []

  return { loadingLists, errorLists, lists }
}
