import { useMutation } from '@apollo/client'
import { UPDATE_LIST_TITLE } from '../graphql/mutations'
import { GET_DATA } from '../graphql/queries'

export const useUpdateList = () => {
  const [updateListMutation] = useMutation(UPDATE_LIST_TITLE, {
    update(cache, { data: { updateList } }) {
      const existingData = cache.readQuery({ query: GET_DATA })

      if (existingData) {
        const updatedLists = existingData.board.lists.map((list) =>
          list.id === updateList.list.id
            ? { ...list, title: updateList.list.title }
            : list,
        )

        cache.writeQuery({
          query: GET_DATA,
          data: {
            board: {
              ...existingData.board,
              lists: updatedLists,
            },
          },
        })
      }
    },
    optimisticResponse: ({ id, title }) => ({
      updateList: {
        __typename: 'List',
        list: { id, title, __typename: 'List' },
      },
    }),
  })

  const updateList = (id, title) => {
    updateListMutation({ variables: { id, title } })
  }

  return updateList
}
