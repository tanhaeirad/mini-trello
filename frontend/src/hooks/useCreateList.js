import { useMutation } from '@apollo/client'
import { CREATE_LIST } from '../graphql/mutations'
import { GET_LISTS } from '../graphql/queries'

export const useCreateList = () => {
  const [
    createListMutation,
    { data, loading: loadingCreateList, error: errorCreateList },
  ] = useMutation(CREATE_LIST, {
    refetchQueries: [{ query: GET_LISTS }],
  })

  const createList = (title, id, indexOrder) => {
    createListMutation({ variables: { title, id, indexOrder } })
  }

  return { createList, data, loadingCreateList, errorCreateList }
}

// TODO: Add cache and optimisticResponse
