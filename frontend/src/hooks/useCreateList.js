import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_LIST } from '../graphql/mutations'
import { GET_LISTS } from '../graphql/queries'

export const useCreateList = () => {
  const client = useApolloClient()
  const [createListMutation] = useMutation(CREATE_LIST, {
    update(cache, { data: { createList } }) {
      const existingLists = cache.readQuery({ query: GET_LISTS })
      if (existingLists) {
        cache.writeQuery({
          query: GET_LISTS,
          data: { lists: [...existingLists.lists, createList.list] },
        })
      }
    },
  })

  const createList = (id) => {
    const existingLists = client.readQuery({ query: GET_LISTS })
    const maxIndexOrder =
      existingLists?.lists?.reduce(
        (max, list) => Math.max(list.indexOrder, max),
        0,
      ) || 0
    const newIndexOrder = maxIndexOrder + 1

    const title = `List ${existingLists?.lists?.length + 1 || 1}`

    createListMutation({
      variables: { title, id, indexOrder: newIndexOrder },
      optimisticResponse: {
        createList: {
          __typename: 'List',
          id: id,
          title: title,
          indexOrder: newIndexOrder,
        },
      },
    })
  }

  return createList
}
