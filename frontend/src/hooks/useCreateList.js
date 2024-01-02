import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_LIST } from '../graphql/mutations'
import { GET_DATA } from '../graphql/queries'

export const useCreateList = () => {
  const client = useApolloClient()
  const [createListMutation] = useMutation(CREATE_LIST, {
    update(cache, { data: { createList } }) {
      const existingData = cache.readQuery({ query: GET_DATA })
      if (existingData) {
        const updatedLists = [...existingData.board.lists, createList.list]
        cache.writeQuery({
          query: GET_DATA,
          data: {
            board: { ...existingData.board, lists: updatedLists },
          },
        })
      }
    },
  })

  const createList = (id) => {
    const existingLists = client.readQuery({ query: GET_DATA })
    const maxIndexOrder =
      existingLists?.board?.lists?.reduce(
        (max, list) => Math.max(list.indexOrder, max),
        0,
      ) || 0
    const newIndexOrder = maxIndexOrder + 1

    const title = `List ${existingLists?.board?.lists?.length + 1 || 1}`

    createListMutation({
      variables: { title, id, indexOrder: newIndexOrder },
      optimisticResponse: {
        createList: {
          list: {
            id: id,
            title: title,
            indexOrder: newIndexOrder,
          },
        },
      },
    })
  }

  return createList
}
