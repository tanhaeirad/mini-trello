import { gql } from '@apollo/client'

export const CREATE_LIST = gql`
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
export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      ok
      id
    }
  }
`

export const UPDATE_LIST = gql`
  mutation UpdateList($id: ID!, $indexOrder: Int!) {
    updateList(id: $id, listData: { indexOrder: $indexOrder }) {
      list {
        id
        indexOrder
      }
    }
  }
`