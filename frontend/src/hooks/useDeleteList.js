import { gql, useMutation } from '@apollo/client'

const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      ok
      id
    }
  }
`

export const useDeleteList = () => {
  const [deleteListMutation] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      if (deleteList.ok) {
        cache.modify({
          fields: {
            lists(existingListRefs, { readField }) {
              return existingListRefs.filter(
                (listRef) => readField('id', listRef) !== deleteList.id,
              )
            },
          },
        })
      }
    },
    optimisticResponse: ({ id }) => ({
      __typename: 'Mutation',
      deleteList: {
        __typename: 'List',
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
