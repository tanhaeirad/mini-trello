import { useMutation, gql } from '@apollo/client'

const CREATE_LIST = gql`
  mutation CreateList($id: ID!, $title: String!, $indexOrder: Int!) {
    createList(
      listData: {
        id: $id
        title: $title
        boardId: "1"
        indexOrder: $indexOrder
      }
    ) {
      list {
        id
      }
    }
  }
`

const GET_LISTS = gql`
  query GetLists {
    lists {
      id
      title
      indexOrder
    }
  }
`

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
