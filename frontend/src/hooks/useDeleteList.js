import { useMutation } from '@apollo/client'
import { DELETE_LIST } from '../graphql/mutations'

export const useDeleteList = () => {
  const [deleteListMutation] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      if (deleteList.ok) {
        cache.modify({
          fields: {
            board(existingBoardData, { readField }) {
              const currentLists = existingBoardData.lists

              const updatedLists = currentLists.filter(
                (listRef) => readField('id', listRef) !== deleteList.id,
              )
              return { ...existingBoardData, lists: updatedLists }
            },
          },
        })
      }
    },
    optimisticResponse: ({ id }) => ({
      deleteList: {
        id: id,
        ok: true,
      },
    }),
  })

  const deleteList = (id) => {
    deleteListMutation({ variables: { id } })
  }

  return deleteList
}

// TODO: should delete related tasks
