import { useMutation } from '@apollo/client'
import { GET_LISTS } from '../graphql/queries'
import { UPDATE_LIST_ORDER } from '../graphql/mutations'

export const useSwapListOrder = (lists) => {
  const [updateList] = useMutation(UPDATE_LIST_ORDER, {
    update: (cache, { data: { updateList } }) => {
      const existingLists = cache.readQuery({ query: GET_LISTS })

      const newListArray = existingLists.lists.map((list) => {
        if (list.id === updateList.list.id) {
          return { ...list, indexOrder: updateList.list.indexOrder }
        }
        return list
      })
      cache.writeQuery({
        query: GET_LISTS,
        data: { __typename: 'UpdateList', lists: newListArray },
      })
    },
  })

  const swapListOrder = (id1, id2, indexOrder1, indexOrder2) => {
    try {
      for (const list of lists) {
        if (indexOrder1 < list.indexOrder && indexOrder2 >= list.indexOrder) {
          updateList({
            variables: { id: list.id, indexOrder: list.indexOrder - 1 },
            optimisticResponse: {
              __typename: 'Mutation',
              updateList: {
                __typename: 'UpdateList',
                list: {
                  id: list.id,
                  indexOrder: list.indexOrder - 1,
                  __typename: 'List',
                },
              },
            },
          })
        }
      }

      for (const list of lists) {
        if (indexOrder1 > list.indexOrder && indexOrder2 <= list.indexOrder) {
          updateList({
            variables: { id: list.id, indexOrder: list.indexOrder + 1 },
            optimisticResponse: {
              __typename: 'Mutation',
              updateList: {
                __typename: 'UpdateList',
                list: {
                  id: list.id,
                  indexOrder: list.indexOrder + 1,
                  __typename: 'List',
                },
              },
            },
          })
        }
      }
      updateList({
        variables: { id: id1, indexOrder: indexOrder2 },
        optimisticResponse: {
          __typename: 'Mutation',
          updateList: {
            __typename: 'UpdateList',
            list: {
              id: id1,
              indexOrder: indexOrder2,
              __typename: 'List',
            },
          },
        },
      })
    } catch (error) {
      console.error('Error swapping list order:', error)
    }
  }

  return swapListOrder
}
