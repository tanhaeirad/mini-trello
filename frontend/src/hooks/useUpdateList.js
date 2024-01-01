import { useMutation } from '@apollo/client'
import { UPDATE_LIST_TITLE } from '../graphql/mutations'
import { GET_LISTS } from '../graphql/queries'

export const useUpdateList = () => {
  const [updateListMutation] = useMutation(UPDATE_LIST_TITLE, {
    update(cache, { data: { updateList } }) {
      const existingLists = cache.readQuery({ query: GET_LISTS })

      if (existingLists) {
        const updatedLists = existingLists.lists.map((list) =>
          list.id === updateList.list.id
            ? { ...list, title: updateList.list.title }
            : list,
        )

        cache.writeQuery({
          query: GET_LISTS,
          data: { lists: updatedLists },
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
